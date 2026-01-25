import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Users, PhoneCall, ClipboardList } from 'lucide-react'
import { cn } from '../../lib/utils'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/users', label: 'Utilisateurs', icon: Users },
  { to: '/contacts', label: 'Contacts', icon: PhoneCall },
  { to: '/demandes-de-devis', label: 'Demandes de devis', icon: ClipboardList }
]

export const Sidebar = () => (
  <aside className="flex h-full w-64 flex-col border-r border-border bg-card px-4 py-6">
    <div className="px-2">
      <p className="text-xs uppercase tracking-widest text-muted-foreground">H2 Débarras</p>
      <h2 className="text-lg font-semibold text-foreground">Admin</h2>
    </div>
    <nav className="mt-6 flex flex-1 flex-col gap-2">
      {navItems.map((item) => {
        const Icon = item.icon
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground',
                isActive && 'bg-muted text-foreground'
              )
            }
          >
            <Icon size={18} />
            {item.label}
          </NavLink>
        )
      })}
    </nav>
    <div className="mt-auto rounded-lg bg-muted px-3 py-3 text-xs text-muted-foreground">
      <p>Support interne</p>
      <p className="font-semibold text-foreground">admin@h2debarras.local</p>
    </div>
  </aside>
)
