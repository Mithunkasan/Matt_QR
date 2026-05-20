import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

type FieldWrapperProps = {
  htmlFor: string
  label: string
  hint?: string
  error?: string
  className?: string
  children: React.ReactNode
}

export function FieldWrapper({
  htmlFor,
  label,
  hint,
  error,
  className,
  children,
}: FieldWrapperProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between gap-3">
        <Label htmlFor={htmlFor}>{label}</Label>
        {hint ? (
          <span className="text-xs text-slate-500 dark:text-slate-400">{hint}</span>
        ) : null}
      </div>
      {children}
      <p className="min-h-5 text-xs text-destructive">{error ?? " "}</p>
    </div>
  )
}
