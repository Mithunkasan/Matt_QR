import type { Metadata } from "next"

import { QrGenerator } from "@/components/admin/qr-generator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DEMO_FORM_ID } from "@/lib/constants"

export const metadata: Metadata = {
  title: "QR generator",
  description: "Create and manage QR links for the public form.",
  robots: {
    index: false,
    follow: false,
  },
}

type QrGeneratorPageProps = {
  searchParams: Promise<{ id?: string }>
}

export default async function AdminQrGeneratorPage({
  searchParams,
}: QrGeneratorPageProps) {
  const params = await searchParams
  const initialFormId =
    typeof params.id === "string" && params.id.trim()
      ? params.id
      : DEMO_FORM_ID

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <Card className="border-white/15 bg-white/75 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:bg-slate-950/65">
        <CardHeader>
          <CardTitle className="text-3xl">QR generator</CardTitle>
          <CardDescription className="max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            Create a custom QR route, copy the public link, download the QR image, and share it across print or digital campaigns.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <QrGenerator initialFormId={initialFormId} />
        </CardContent>
      </Card>
    </div>
  )
}
