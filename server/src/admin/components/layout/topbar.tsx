import { Search } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import type { User } from '../../../../shared/schemas'

type TopbarProps = {
  user: User | null
  onLogout: () => void
  search?: string
  onSearchChange?: (value: string) => void
}

export const Topbar = ({ user, onLogout, search, onSearchChange }: TopbarProps) => (
  <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border bg-card px-6 py-4">
    <div className="flex items-center gap-2 rounded-md border border-input bg-white px-3 py-2 text-sm text-muted-foreground">
      <Search size={16} />
      <Input
        className="border-none bg-transparent p-0 focus:ring-0"
        placeholder="Rechercher..."
        value={search ?? ''}
        onChange={(event) => onSearchChange?.(event.target.value)}
      />
    </div>
    <div className="flex items-center gap-3">
      <div className="text-right">
        <p className="text-sm font-semibold text-foreground">{user?.fullName ?? 'Utilisateur'}</p>
        <p className="text-xs text-muted-foreground">{user?.email ?? ''}</p>
      </div>
      <Button variant="secondary" onClick={onLogout}>
        Se déconnecter
      </Button>
    </div>
  </header>
)
