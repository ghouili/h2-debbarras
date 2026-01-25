import type { ReactNode } from 'react'
import { Sidebar } from './sidebar'
import { Topbar } from './topbar'
import type { User } from '../../../shared/schemas'

type ShellProps = {
  user: User | null
  onLogout: () => void
  children: ReactNode
  search?: string
  onSearchChange?: (value: string) => void
}

export const Shell = ({ user, onLogout, children, search, onSearchChange }: ShellProps) => (
  <div className="flex h-screen w-full bg-background text-foreground">
    <Sidebar />
    <div className="flex flex-1 flex-col">
      <Topbar user={user} onLogout={onLogout} search={search} onSearchChange={onSearchChange} />
      <main className="flex-1 overflow-y-auto bg-muted/30 px-8 py-6">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">{children}</div>
      </main>
    </div>
  </div>
)
