import type { Metadata } from "next"

import { SubmissionForm } from "@/components/forms/submission-form"
import { MotionFade } from "@/components/shared/motion-fade"
import { Logo } from "@/components/shared/logo"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { resolveFormId } from "@/lib/qr"

type FormPageProps = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: FormPageProps): Promise<Metadata> {
  const { id } = await params
  const formId = resolveFormId(id)

  return {
    title: `Student enquiry form for ${formId}`,
    description:
      "Student enquiry form for brochure download and follow-up.",
  }
}

export default async function FormPage({ params }: FormPageProps) {
  const { id } = await params
  const formId = resolveFormId(id)

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fbff,#eef4ff)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-3xl items-center justify-center">
        <MotionFade className="w-full">
          <Card className="border-[#d8dfef] bg-white/95 text-[#123b84] shadow-[0_36px_100px_-60px_rgba(15,44,100,0.35)] dark:bg-white/95 dark:text-[#123b84]">
            <CardHeader className="space-y-5 text-center">
              <div className="mx-auto">
                <Logo size="lg" showTagline />
              </div>
              <div className="space-y-2">
                <CardTitle className="text-3xl text-[#123b84] sm:text-4xl">
                  Download Your DIY eBook
                </CardTitle>
                <CardDescription className="space-y-1 text-base leading-7 text-[#4a6296]">
                  <span className="block">
                    If you want us to develop and build it, contact us at +91
                    93454 86164.
                  </span>
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="text-[#123b84] dark:text-[#123b84]">
              <SubmissionForm formId={formId} />
            </CardContent>
          </Card>
        </MotionFade>
      </div>
    </main>
  )
}
