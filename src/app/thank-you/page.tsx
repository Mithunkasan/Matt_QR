import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle2Icon, DownloadIcon } from "lucide-react"

import { MotionFade } from "@/components/shared/motion-fade"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PUBLIC_PDF_PATH } from "@/lib/constants"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Thank you",
  description: "Course enquiry complete.",
}

type ThankYouPageProps = {
  searchParams: Promise<{ formId?: string }>
}

export default async function ThankYouPage({
  searchParams,
}: ThankYouPageProps) {
  const params = await searchParams
  const formId = params.formId

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl items-center px-4 py-16 sm:px-6 lg:px-8">
      <MotionFade className="w-full">
        <Card className="overflow-hidden border-[#d8dfef] bg-white/90 shadow-[0_36px_120px_-56px_rgba(15,44,100,0.28)] dark:bg-slate-950/65">
          <CardContent className="space-y-8 p-8 sm:p-12">
            <div className="flex size-16 items-center justify-center rounded-3xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
              <CheckCircle2Icon className="size-8" />
            </div>
            <div className="space-y-4">
              <Badge variant="success">Enquiry received</Badge>
              <h1 className="font-heading text-4xl font-semibold tracking-tight text-[#123b84] sm:text-5xl dark:text-white">
                Your course enquiry was submitted successfully.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-[#4a6296] dark:text-slate-300">
                The brochure PDF should already be downloading. If the browser
                blocked it, use the button below to fetch it again.
              </p>
              {formId ? (
                <p className="text-sm text-[#687caa] dark:text-slate-400">
                  Reference QR route: /form/{formId}
                </p>
              ) : null}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={PUBLIC_PDF_PATH}
                download
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-full bg-[#123b84] px-6 text-white hover:bg-[#0d2f69]"
                )}
              >
                <DownloadIcon />
                Download brochure again
              </a>
              <Link
                href="/"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "rounded-full border-[#d0d8eb] bg-white px-6 text-[#123b84] hover:bg-[#f3f6fb] dark:bg-slate-950/55"
                )}
              >
                Back to landing page
              </Link>
            </div>
          </CardContent>
        </Card>
      </MotionFade>
    </main>
  )
}
