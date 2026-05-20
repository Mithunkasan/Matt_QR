import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminLoading() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <Card className="border-white/10 bg-white/70 backdrop-blur-xl dark:bg-slate-950/60">
          <CardHeader>
            <Skeleton className="h-8 w-56" />
            <Skeleton className="h-14 w-full max-w-2xl" />
          </CardHeader>
          <CardContent className="flex gap-3">
            <Skeleton className="h-9 w-32 rounded-full" />
            <Skeleton className="h-9 w-32 rounded-full" />
          </CardContent>
        </Card>
        <div className="grid gap-4 sm:grid-cols-2">
          <Skeleton className="h-36 rounded-3xl" />
          <Skeleton className="h-36 rounded-3xl" />
          <Skeleton className="h-36 rounded-3xl" />
          <Skeleton className="h-36 rounded-3xl" />
        </div>
      </div>
      <Skeleton className="h-11 rounded-full" />
      <Skeleton className="h-[420px] rounded-[2rem]" />
    </div>
  )
}
