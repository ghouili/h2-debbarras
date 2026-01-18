import { Skeleton } from "@/components/ui/skeleton"

export default function ServiceLoading() {
  return (
    <div className="bg-background">
      {/* Hero skeleton */}
      <section className="bg-primary/10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-12 lg:grid-cols-2">
              <div className="space-y-6">
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-20" />
                </div>
                <Skeleton className="h-12 w-16 rounded-2xl" />
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-24 w-full" />
                <div className="grid grid-cols-2 gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-6 w-full" />
                  ))}
                </div>
                <div className="flex gap-4 pt-4">
                  <Skeleton className="h-14 w-48" />
                  <Skeleton className="h-14 w-36" />
                </div>
              </div>
              <div className="hidden lg:block">
                <Skeleton className="h-80 w-full rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features skeleton */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <Skeleton className="mx-auto h-6 w-32" />
              <Skeleton className="mx-auto mt-4 h-10 w-64" />
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-24 w-full rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process skeleton */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <Skeleton className="mx-auto h-6 w-40" />
              <Skeleton className="mx-auto mt-4 h-10 w-72" />
            </div>
            <div className="mt-12 space-y-8">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-28 w-full rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
