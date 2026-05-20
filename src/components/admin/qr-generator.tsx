"use client"

import Link from "next/link"
import { DownloadIcon, ExternalLinkIcon, RefreshCwIcon } from "lucide-react"
import { QRCodeCanvas } from "qrcode.react"
import { startTransition, useState } from "react"
import { toast } from "sonner"

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import { publicEnv } from "@/lib/public-env"
import { buildFormPath, buildFormUrl, createRandomFormId, resolveFormId } from "@/lib/qr"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type QrGeneratorProps = {
  initialFormId: string
}

export function QrGenerator({ initialFormId }: QrGeneratorProps) {
  const [formId, setFormId] = useState(resolveFormId(initialFormId))
  const { copy, copiedText } = useCopyToClipboard()

  const resolvedId = resolveFormId(formId)
  const formUrl = buildFormUrl(resolvedId, publicEnv.appUrl)
  const canvasId = "matt-admin-qr"

  const handleCopy = async () => {
    await copy(formUrl)
    toast.success("QR link copied to clipboard.")
  }

  const handleDownload = () => {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement | null

    if (!canvas) {
      toast.error("QR preview is still loading.")
      return
    }

    const link = document.createElement("a")
    link.href = canvas.toDataURL("image/png")
    link.download = `${resolvedId}.png`
    document.body.append(link)
    link.click()
    link.remove()
    toast.success("QR image downloaded.")
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <Card className="border-white/15 bg-white/75 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:bg-slate-950/65">
        <CardHeader>
          <CardTitle>Create a shareable QR destination</CardTitle>
          <CardDescription>
            Use a custom identifier for campaigns, booths, stores, or onboarding packets.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="formId"
              className="text-sm font-medium text-slate-900 dark:text-slate-100"
            >
              Form ID
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                id="formId"
                value={formId}
                onChange={(event) => {
                  startTransition(() => {
                    setFormId(event.target.value)
                  })
                }}
                placeholder="expo-booth-a"
                className="h-11 rounded-full border-white/20 bg-white/80 dark:bg-slate-950/60"
              />
              <Button
                type="button"
                variant="outline"
                className="rounded-full"
                onClick={() => setFormId(createRandomFormId())}
              >
                <RefreshCwIcon />
                Randomize
              </Button>
            </div>
          </div>
          <div className="rounded-3xl border border-dashed border-white/20 bg-slate-950/[0.03] p-4 dark:bg-white/[0.03]">
            <p className="text-xs uppercase tracking-[0.26em] text-slate-500 dark:text-slate-400">
              Destination
            </p>
            <p className="mt-2 break-all text-sm text-slate-700 dark:text-slate-200">
              {formUrl}
            </p>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
              Route path: {buildFormPath(resolvedId)}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button type="button" className="rounded-full" onClick={handleCopy}>
              {copiedText === formUrl ? "Copied" : "Copy QR Link"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
              onClick={handleDownload}
            >
              <DownloadIcon />
              Download QR
            </Button>
            <Link
              href={buildFormPath(resolvedId)}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "rounded-full"
              )}
            >
              <ExternalLinkIcon />
              Open form
            </Link>
          </div>
        </CardContent>
      </Card>
      <Card className="border-white/15 bg-white/75 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:bg-slate-950/65">
        <CardHeader>
          <CardTitle>Live QR Preview</CardTitle>
          <CardDescription>
            Download this canvas or print it directly for posters, flyers, and kiosks.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-4">
          <div className="rounded-[2rem] border border-white/20 bg-white p-6 shadow-[0_32px_100px_-55px_rgba(8,47,73,0.8)]">
            <QRCodeCanvas
              id={canvasId}
              value={formUrl}
              size={240}
              bgColor="#ffffff"
              fgColor="#020617"
              includeMargin
            />
          </div>
          <div className="text-center">
            <p className="font-heading text-lg font-semibold text-slate-950 dark:text-white">
              {resolvedId}
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Scans open the public form instantly.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
