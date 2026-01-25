import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { loginSchema } from '../../../shared/schemas'
import { useAuth } from '../hooks/use-auth'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

type LoginFormValues = {
  email: string
  password: string
}

export const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  })

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await login(values)
      navigate('/dashboard')
    } catch (error) {
      const message = (error as { error?: { message?: string } })?.error?.message
      toast.error(message ?? 'Impossible de se connecter.')
    }
  })

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-md">
        <CardContent className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold">Connexion admin</h1>
            <p className="text-sm text-muted-foreground">Accédez au tableau de bord H2 Débarras.</p>
          </div>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...form.register('email')} />
              {form.formState.errors.email ? (
                <p className="text-xs text-danger">{form.formState.errors.email.message}</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input id="password" type="password" {...form.register('password')} />
              {form.formState.errors.password ? (
                <p className="text-xs text-danger">{form.formState.errors.password.message}</p>
              ) : null}
            </div>
            <Button type="submit" className="w-full">
              Se connecter
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
