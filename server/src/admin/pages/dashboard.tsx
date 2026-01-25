import { useQuery } from '@tanstack/react-query'
import { dashboardApi } from '../api/dashboard'
import { Card, CardContent } from '../components/ui/card'
import { PageHeader } from '../components/page-header'

export const DashboardPage = () => {
  const { data } = useQuery({
    queryKey: ['dashboard'],
    queryFn: dashboardApi.get
  })

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Dashboard"
        subtitle="Vue d'ensemble des contacts et demandes de devis."
      />
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="space-y-2">
            <p className="text-xs uppercase text-muted-foreground">Contacts nouveaux</p>
            <p className="text-2xl font-semibold">{data?.contacts.NEW ?? 0}</p>
            <p className="text-xs text-muted-foreground">En attente de traitement</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-2">
            <p className="text-xs uppercase text-muted-foreground">Contacts en cours</p>
            <p className="text-2xl font-semibold">{data?.contacts.IN_PROGRESS ?? 0}</p>
            <p className="text-xs text-muted-foreground">Suivi actif</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-2">
            <p className="text-xs uppercase text-muted-foreground">Contacts clôturés</p>
            <p className="text-2xl font-semibold">{data?.contacts.CLOSED ?? 0}</p>
            <p className="text-xs text-muted-foreground">Dossiers finalisés</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="space-y-2">
            <p className="text-xs uppercase text-muted-foreground">Devis nouveaux</p>
            <p className="text-2xl font-semibold">{data?.quoteRequests.NEW ?? 0}</p>
            <p className="text-xs text-muted-foreground">Demandes à qualifier</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-2">
            <p className="text-xs uppercase text-muted-foreground">Devis qualifiés</p>
            <p className="text-2xl font-semibold">{data?.quoteRequests.QUALIFIED ?? 0}</p>
            <p className="text-xs text-muted-foreground">En attente de planification</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-2">
            <p className="text-xs uppercase text-muted-foreground">Devis planifiés</p>
            <p className="text-2xl font-semibold">{data?.quoteRequests.SCHEDULED ?? 0}</p>
            <p className="text-xs text-muted-foreground">Interventions à venir</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="space-y-2">
            <p className="text-xs uppercase text-muted-foreground">Devis terminés</p>
            <p className="text-2xl font-semibold">{data?.quoteRequests.DONE ?? 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-2">
            <p className="text-xs uppercase text-muted-foreground">Devis perdus</p>
            <p className="text-2xl font-semibold">{data?.quoteRequests.LOST ?? 0}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
