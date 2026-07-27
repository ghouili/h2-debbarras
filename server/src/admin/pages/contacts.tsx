import { useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { ColumnDef } from '@tanstack/react-table'
import { toast } from 'sonner'
import type { Contact, ContactStatus } from '../../../shared/schemas'
import { contactCreateSchema, contactUpdateSchema, contactStatusEnum } from '../../../shared/schemas'
import { contactsApi } from '../api/contacts'
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
  ...contactStatusEnum.options.map((status) => ({ label: status, value: status }))
]

type ContactFormValues = {
  fullName: string
  email?: string | null
  phone?: string | null
  source?: string | null
  message?: string | null
  status: ContactStatus
}

export const ContactsPage = () => {
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<Contact | null>(null)

  const { data } = useQuery({
    queryKey: ['contacts', page, search, status],
    queryFn: () => contactsApi.list({ page, limit: 10, search, status })
  })

  const createMutation = useMutation({
    mutationFn: contactsApi.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['contacts'] })
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Contact> }) => contactsApi.update(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['contacts'] })
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => contactsApi.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['contacts'] })
  })

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(editingContact ? contactUpdateSchema : contactCreateSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      source: '',
      message: '',
      status: 'NEW'
    }
  })

  const columns = useMemo<ColumnDef<Contact>[]>(
    () => [
      {
        header: 'Nom',
        cell: ({ row }) => <span className="font-medium">{row.original.fullName}</span>
      },
      {
        header: 'Email',
        accessorKey: 'email'
      },
      {
        header: 'Téléphone',
        accessorKey: 'phone'
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
                setEditingContact(row.original)
                form.reset({
                  fullName: row.original.fullName,
                  email: row.original.email,
                  phone: row.original.phone,
                  source: row.original.source,
                  message: row.original.message,
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
    setEditingContact(null)
    form.reset({ fullName: '', email: '', phone: '', source: '', message: '', status: 'NEW' })
    setIsModalOpen(true)
  }

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      if (editingContact) {
        await updateMutation.mutateAsync({ id: editingContact.id, payload: values })
        toast.success('Contact mis à jour.')
      } else {
        await createMutation.mutateAsync(values)
        toast.success('Contact créé.')
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
        title="Contacts"
        subtitle="Suivi des contacts entrants et demandes générales."
        action={<Button onClick={openCreate}>Nouveau contact</Button>}
      />
      <FilterBar
        search={search}
        onSearchChange={(value) => {
          setSearch(value)
          setPage(1)
        }}
        filters={statusFilters}
        filterValue={status}
        onFilterChange={(value) => {
          setStatus(value)
          setPage(1)
        }}
      />
      <div className="rounded-xl border border-border bg-card">
        <DataTable data={data?.data ?? []} columns={columns} />
        <div className="border-t border-border px-4 py-3">
          <Pagination page={data?.meta.page ?? 1} total={data?.meta.total ?? 0} limit={data?.meta.limit ?? 10} onPageChange={setPage} />
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingContact ? 'Modifier un contact' : 'Créer un contact'}
        description="Ajoutez ou modifiez les informations de contact."
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Annuler
            </Button>
            <Button onClick={onSubmit}>{editingContact ? 'Enregistrer' : 'Créer'}</Button>
          </div>
        }
      >
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label>Nom complet</Label>
            <Input {...form.register('fullName')} />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" {...form.register('email', { setValueAs: (value) => (value ? value : undefined) })} />
            </div>
            <div className="space-y-2">
              <Label>Téléphone</Label>
              <Input {...form.register('phone', { setValueAs: (value) => (value ? value : undefined) })} />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Source</Label>
              <Input {...form.register('source', { setValueAs: (value) => (value ? value : undefined) })} placeholder="web, call, autre" />
            </div>
            <div className="space-y-2">
              <Label>Statut</Label>
              <Select {...form.register('status')}>
                {contactStatusEnum.options.map((statusOption) => (
                  <option key={statusOption} value={statusOption}>
                    {statusOption}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Message</Label>
            <Textarea rows={4} {...form.register('message', { setValueAs: (value) => (value ? value : undefined) })} />
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!confirmDelete}
        title="Supprimer ce contact"
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
