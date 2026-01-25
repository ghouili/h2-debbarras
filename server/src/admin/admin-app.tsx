import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Shell } from './components/layout/shell'
import { RequireAuth } from './routes/require-auth'
import { LoginPage } from './pages/login'
import { DashboardPage } from './pages/dashboard'
import { UsersPage } from './pages/users'
import { ContactsPage } from './pages/contacts'
import { QuoteRequestsPage } from './pages/quote-requests'
import { useAuth } from './hooks/use-auth'

export const AdminApp = () => {
  const location = useLocation()
  const { user, logout } = useAuth()

  if (location.pathname === '/login') {
    return <LoginPage />
  }

  return (
    <Shell user={user} onLogout={logout}>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/demandes-de-devis" element={<QuoteRequestsPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </Shell>
  )
}
