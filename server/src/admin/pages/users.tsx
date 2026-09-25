import { useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { ColumnDef } from '@tanstack/react-table'
import { toast } from 'sonner'
import type { User } from '../../../shared/schemas'
import { userCreateSchema, userUpdateSchema } from '../../../shared/schemas'
import { usersApi } from '../api/users'
import { PageHeader } from '../components/page-header'
import { FilterBar } from '../components/filter-bar'
import { DataTable } from '../components/data-table'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Modal } from '../components/ui/modal'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Select } from '../components/ui/select'
import { Pagination } from '../components/pagination'
import { ConfirmDialog } from '../components/confirm-dialog'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const roleOptions = [
  { label: 'Admin', value: 'ADMIN' },
  { label: 'Staff', value: 'STAFF' }
]

type UserFormValues = {
  email: string
  fullName: string
  role: 'ADMIN' | 'STAFF'
  isActive: boolean
  password?: string
}

export const UsersPage = () => {
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<User | null>(null)

  const { data } = useQuery({
    queryKey: ['users', page, search],
    queryFn: () => usersApi.list({ page, limit: 10, search })
  })

  const createMutation = useMutation({
    mutationFn: usersApi.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] })
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<User> & { password?: string } }) =>
      usersApi.update(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] })
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => usersApi.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] })
  })

  const columns = useMemo<ColumnDef<User>[]>(
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
        header: 'Rôle',
        cell: ({ row }) => <Badge className="bg-accent text-accent-foreground">{row.original.role}</Badge>
      },
      {
        header: 'Statut',
        cell: ({ row }) => (
          <Badge className={row.original.isActive ? 'bg-success/15 text-success' : 'bg-danger/15 text-danger'}>
            {row.original.isActive ? 'Actif' : 'Inactif'}
          </Badge>
        )
      },
      {
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => {
                setEditingUser(row.original)
                setIsModalOpen(true)
              }}
            >
              Modifier
            </Button>
            <Button variant="ghost" onClick={() => setConfirmDelete(row.original)}>
              Désactiver
            </Button>
          </div>
        )
      }
    ],
    []
  )

  const form = useForm<UserFormValues>({
    resolver: zodResolver(editingUser ? userUpdateSchema : userCreateSchema),
    defaultValues: editingUser
      ? {
          email: editingUser.email,
          fullName: editingUser.fullName,
          role: editingUser.role,
          isActive: editingUser.isActive,
          password: ''
        }
      : {
          email: '',
          fullName: '',
          role: 'STAFF',
          isActive: true,
          password: ''
        }
  })

  const openCreate = () => {
    setEditingUser(null)
    form.reset({ email: '', fullName: '', role: 'STAFF', isActive: true, password: '' })
    setIsModalOpen(true)
  }

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      if (editingUser) {
        await updateMutation.mutateAsync({
          id: editingUser.id,
          payload: {
            ...values,
            isActive: Boolean(values.isActive)
          }
        })
        toast.success('Utilisateur mis à jour.')
      } else {
        if (!values.password) {
          toast.error('Mot de passe requis.')
          return
        }
        await createMutation.mutateAsync({
          email: values.email,
          fullName: values.fullName,
          password: values.password,
          role: values.role,
          isActive: Boolean(values.isActive)
        })
        toast.success('Utilisateur créé.')
      }
      setIsModalOpen(false)
      form.reset()
    } catch (error) {
      const message = (error as { error?: { message?: string } })?.error?.message
      toast.error(message ?? 'Action impossible.')
    }
  })

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Utilisateurs"
        subtitle="Gérez les comptes qui accèdent à l'administration."
        action={<Button onClick={openCreate}>Nouvel utilisateur</Button>}
      />
      <FilterBar search={search} onSearchChange={(value) => {
        setSearch(value)
        setPage(1)
      }} />
      <div className="rounded-xl border border-border bg-card">
        <DataTable data={data?.data ?? []} columns={columns} />
        <div className="border-t border-border px-4 py-3">
          <Pagination page={data?.meta.page ?? 1} total={data?.meta.total ?? 0} limit={data?.meta.limit ?? 10} onPageChange={setPage} />
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingUser ? 'Modifier un utilisateur' : 'Créer un utilisateur'}
        description="Les accès sont gérés selon le rôle sélectionné."
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Annuler
            </Button>
            <Button onClick={onSubmit}>
              {editingUser ? 'Enregistrer' : 'Créer'}
            </Button>
          </div>
        }
      >
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" {...form.register('email')} />
            {form.formState.errors.email ? (
              <p className="text-xs text-danger">{String(form.formState.errors.email.message)}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label>Nom complet</Label>
            <Input {...form.register('fullName')} />
          </div>
          <div className="space-y-2">
            <Label>Mot de passe</Label>
            <Input
              type="password"
              {...form.register('password', { setValueAs: (value) => (value ? value : undefined) })}
              placeholder={editingUser ? 'Laisser vide pour ne pas changer' : ''}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Rôle</Label>
              <Select {...form.register('role')}>
                {roleOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Statut</Label>
              <Select {...form.register('isActive', { setValueAs: (value) => value === 'true' })}>
                <option value="true">Actif</option>
                <option value="false">Inactif</option>
              </Select>
            </div>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!confirmDelete}
        title="Désactiver l'utilisateur"
        description="L'utilisateur sera désactivé et ne pourra plus se connecter."
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
