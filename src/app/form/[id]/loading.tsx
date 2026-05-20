import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function FormLoading() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fbff,#eef4ff)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-3xl items-center justify-center">
        <Card className="w-full border-[#d8dfef] bg-white/95 shadow-[0_36px_100px_-60px_rgba(15,44,100,0.2)]">
          <CardHeader className="space-y-4">
            <Skeleton className="mx-auto h-14 w-72 rounded-2xl" />
            <Skeleton className="mx-auto h-10 w-64" />
            <Skeleton className="mx-auto h-4 w-80" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Skeleton className="h-24 rounded-2xl" />
              <Skeleton className="h-24 rounded-2xl" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Skeleton className="h-24 rounded-2xl" />
              <Skeleton className="h-24 rounded-2xl" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Skeleton className="h-24 rounded-2xl" />
              <Skeleton className="h-24 rounded-2xl" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Skeleton className="h-24 rounded-2xl" />
              <Skeleton className="h-24 rounded-2xl" />
            </div>
            <Skeleton className="h-11 rounded-full" />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
