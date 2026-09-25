import { useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { ColumnDef } from '@tanstack/react-table'
import { toast } from 'sonner'
import type { QuoteRequest, QuoteStatus, ServiceType } from '../../../shared/schemas'
import {
  quoteRequestCreateSchema,
  quoteRequestUpdateSchema,
  quoteStatusEnum,
  serviceTypeEnum
} from '../../../shared/schemas'
import { quoteRequestsApi } from '../api/quote-requests'
import { PageHeader } from '../components/page-header'
import { FilterBar } from '../components/filter-bar'
import { DataTable } from '../components/data-table'
import { Button } from '../components/ui/button'
import { Modal } from '../components/ui/modal'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Select } from '../components/ui/select'
import { Textarea } from '../components/ui/textarea'
import { StatusBadge } from '../components/status-badge'
import { Pagination } from '../components/pagination'
import { ConfirmDialog } from '../components/confirm-dialog'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const statusFilters = [
  { label: 'Tous les statuts', value: '' },
  ...quoteStatusEnum.options.map((status) => ({ label: status, value: status }))
]

const serviceFilters = [
  { label: 'Tous les services', value: '' },
  ...serviceTypeEnum.options.map((service) => ({ label: service, value: service }))
]

type QuoteFormValues = {
  fullName: string
  phone: string
  email?: string | null
  postalCode: string
  departmentCode?: string | null
  city?: string | null
  serviceType: ServiceType
  volumeEstimate?: string | null
  accessNotes?: string | null
  preferredDate?: string | null
  status: QuoteStatus
}

export const QuoteRequestsPage = () => {
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [serviceType, setServiceType] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingQuote, setEditingQuote] = useState<QuoteRequest | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<QuoteRequest | null>(null)

  const { data } = useQuery({
    queryKey: ['quote-requests', page, search, status, serviceType],
    queryFn: () => quoteRequestsApi.list({ page, limit: 10, search, status, serviceType })
  })

  const createMutation = useMutation({
    mutationFn: quoteRequestsApi.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['quote-requests'] })
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<QuoteRequest> }) => quoteRequestsApi.update(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['quote-requests'] })
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => quoteRequestsApi.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['quote-requests'] })
  })

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(editingQuote ? quoteRequestUpdateSchema : quoteRequestCreateSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      postalCode: '',
      departmentCode: '',
      city: '',
      serviceType: 'MAISON',
      volumeEstimate: '',
      accessNotes: '',
      preferredDate: '',
      status: 'NEW'
    }
  })

  const columns = useMemo<ColumnDef<QuoteRequest>[]>(
    () => [
      {
        header: 'Nom',
        cell: ({ row }) => <span className="font-medium">{row.original.fullName}</span>
      },
      {
        header: 'Téléphone',
        accessorKey: 'phone'
      },
      {
        header: 'Service',
        accessorKey: 'serviceType'
      },
      {
        header: 'Code postal',
        accessorKey: 'postalCode'
      },
      {
        header: 'Statut',
        cell: ({ row }) => <StatusBadge status={row.original.status} />
      },
      {
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => {
                setEditingQuote(row.original)
                form.reset({
                  fullName: row.original.fullName,
                  phone: row.original.phone,
                  email: row.original.email,
                  postalCode: row.original.postalCode,
                  departmentCode: row.original.departmentCode,
                  city: row.original.city,
                  serviceType: row.original.serviceType,
                  volumeEstimate: row.original.volumeEstimate,
                  accessNotes: row.original.accessNotes,
                  preferredDate: row.original.preferredDate ? row.original.preferredDate.slice(0, 10) : '',
                  status: row.original.status
                })
                setIsModalOpen(true)
              }}
            >
              Modifier
            </Button>
            <Button variant="ghost" onClick={() => setConfirmDelete(row.original)}>
              Supprimer
            </Button>
          </div>
        )
      }
    ],
    [form]
  )

  const openCreate = () => {
    setEditingQuote(null)
    form.reset({
      fullName: '',
      phone: '',
      email: '',
      postalCode: '',
      departmentCode: '',
      city: '',
      serviceType: 'MAISON',
      volumeEstimate: '',
      accessNotes: '',
      preferredDate: '',
      status: 'NEW'
    })
    setIsModalOpen(true)
  }

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      if (editingQuote) {
        await updateMutation.mutateAsync({ id: editingQuote.id, payload: values })
        toast.success('Demande de devis mise à jour.')
      } else {
        await createMutation.mutateAsync(values)
        toast.success('Demande de devis créée.')
      }
      setIsModalOpen(false)
    } catch (error) {
      const message = (error as { error?: { message?: string } })?.error?.message
      toast.error(message ?? 'Action impossible.')
    }
  })

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Demandes de devis"
        subtitle="Pilotez les demandes entrantes et leur évolution."
        action={<Button onClick={openCreate}>Nouvelle demande</Button>}
      />
      <div className="flex flex-wrap items-center gap-3">
        <FilterBar
          search={search}
          onSearchChange={(value) => {
            setSearch(value)
            setPage(1)
          }}
        />
        <Select
          className="min-w-[180px]"
          value={status}
          onChange={(event) => {
            setStatus(event.target.value)
            setPage(1)
          }}
        >
          {statusFilters.map((filter) => (
            <option key={filter.value} value={filter.value}>
              {filter.label}
            </option>
          ))}
        </Select>
        <Select
          className="min-w-[180px]"
          value={serviceType}
          onChange={(event) => {
            setServiceType(event.target.value)
            setPage(1)
          }}
        >
          {serviceFilters.map((filter) => (
            <option key={filter.value} value={filter.value}>
              {filter.label}
            </option>
          ))}
        </Select>
      </div>
      <div className="rounded-xl border border-border bg-card">
        <DataTable data={data?.data ?? []} columns={columns} />
        <div className="border-t border-border px-4 py-3">
          <Pagination page={data?.meta.page ?? 1} total={data?.meta.total ?? 0} limit={data?.meta.limit ?? 10} onPageChange={setPage} />
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingQuote ? 'Modifier une demande' : 'Créer une demande'}
        description="Renseignez les informations du client et du service."
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Annuler
            </Button>
            <Button onClick={onSubmit}>{editingQuote ? 'Enregistrer' : 'Créer'}</Button>
          </div>
        }
      >
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Nom complet</Label>
              <Input {...form.register('fullName')} />
            </div>
            <div className="space-y-2">
              <Label>Téléphone</Label>
              <Input {...form.register('phone')} />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" {...form.register('email', { setValueAs: (value) => (value ? value : undefined) })} />
            </div>
            <div className="space-y-2">
              <Label>Service</Label>
              <Select {...form.register('serviceType')}>
                {serviceTypeEnum.options.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Code postal</Label>
              <Input {...form.register('postalCode')} />
            </div>
            <div className="space-y-2">
              <Label>Département</Label>
              <Input {...form.register('departmentCode', { setValueAs: (value) => (value ? value : undefined) })} />
            </div>
            <div className="space-y-2">
              <Label>Ville</Label>
              <Input {...form.register('city', { setValueAs: (value) => (value ? value : undefined) })} />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Volume estimé</Label>
              <Input {...form.register('volumeEstimate', { setValueAs: (value) => (value ? value : undefined) })} />
            </div>
            <div className="space-y-2">
              <Label>Date préférée</Label>
              <Input type="date" {...form.register('preferredDate', { setValueAs: (value) => (value ? value : undefined) })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Notes d'accès</Label>
            <Textarea rows={3} {...form.register('accessNotes', { setValueAs: (value) => (value ? value : undefined) })} />
          </div>
          <div className="space-y-2">
            <Label>Statut</Label>
            <Select {...form.register('status')}>
              {quoteStatusEnum.options.map((statusOption) => (
                <option key={statusOption} value={statusOption}>
                  {statusOption}
                </option>
              ))}
            </Select>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!confirmDelete}
        title="Supprimer cette demande"
        description="Cette action est définitive."
        onClose={() => setConfirmDelete(null)}
        onConfirm={async () => {
          if (!confirmDelete) return
          await deleteMutation.mutateAsync(confirmDelete.id)
          setConfirmDelete(null)
        }}
      />
    </div>
  )
}
