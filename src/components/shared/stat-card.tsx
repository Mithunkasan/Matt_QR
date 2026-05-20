import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCompactNumber } from "@/lib/format"

type StatCardProps = {
  label: string
  value: number
  helper: string
}

export function StatCard({ label, value, helper }: StatCardProps) {
  return (
    <Card className="border-white/20 bg-white/70 shadow-[0_24px_80px_-42px_rgba(15,23,42,0.4)] backdrop-blur-xl dark:bg-slate-950/60">
      <CardHeader className="space-y-2">
        <CardTitle className="text-sm text-slate-600 dark:text-slate-300">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="font-heading text-3xl font-semibold text-slate-950 dark:text-white">
          {formatCompactNumber(value)}
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400">{helper}</p>
      </CardContent>
    </Card>
  )
}
