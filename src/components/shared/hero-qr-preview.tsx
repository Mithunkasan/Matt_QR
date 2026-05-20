"use client"

import { ShieldCheckIcon, SparklesIcon } from "lucide-react"
import { QRCodeCanvas } from "qrcode.react"

import { Badge } from "@/components/ui/badge"
import { publicEnv } from "@/lib/public-env"
import { buildFormUrl } from "@/lib/qr"
import { cn } from "@/lib/utils"

type HeroQrPreviewProps = {
  formId: string
  className?: string
}

export function HeroQrPreview({ formId, className }: HeroQrPreviewProps) {
  const formUrl = buildFormUrl(formId, publicEnv.appUrl)

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-[#dce4f5] bg-white p-5 shadow-[0_30px_80px_-44px_rgba(15,44,100,0.35)] dark:border-white/10 dark:bg-slate-950/70",
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(31,66,134,0.12),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(201,58,49,0.09),transparent_42%)]" />
      <div className="relative space-y-5">
        <Badge className="bg-[#eef3ff] text-[#1f4286]">Scan To Open Form</Badge>
        <div className="grid gap-5 sm:grid-cols-[0.95fr_1.05fr] sm:items-center">
          <div className="rounded-[1.75rem] border border-[#dce4f5] bg-white p-4 shadow-[0_18px_64px_-34px_rgba(15,23,42,0.18)]">
            <QRCodeCanvas
              value={formUrl}
              size={156}
              includeMargin
              bgColor="#ffffff"
              fgColor="#123b84"
              className="mx-auto"
            />
          </div>
          <div className="space-y-4">
            <div className="rounded-3xl border border-[#dce4f5] bg-[#f8faff] p-4 dark:border-white/10 dark:bg-white/5">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
                Digital route
              </p>
              <p className="mt-2 break-all text-sm text-[#274377] dark:text-slate-200">
                {formUrl}
              </p>
            </div>
            <div className="grid gap-3 text-sm text-[#274377] dark:text-slate-200">
              <div className="flex items-start gap-3 rounded-2xl border border-[#dce4f5] bg-[#f8faff] p-3 dark:border-white/10 dark:bg-white/5">
                <SparklesIcon className="mt-0.5 size-4 shrink-0 text-[#c93a31]" />
                <span>
                  Students scan once, submit details, and receive the brochure instantly.
                </span>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-[#dce4f5] bg-[#f8faff] p-3 dark:border-white/10 dark:bg-white/5">
                <ShieldCheckIcon className="mt-0.5 size-4 shrink-0 text-[#1f4286]" />
                <span>
                  Admins can review enquiries, export data, and manage campaign QR links.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
