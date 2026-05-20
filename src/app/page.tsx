import Image from "next/image"
import Link from "next/link"
import {
  ArrowRightIcon,
  BookOpenIcon,
  CpuIcon,
  MailIcon,
  MapPinIcon,
  PhoneCallIcon,
  QrCodeIcon,
  ScanSearchIcon,
  ShieldCheckIcon,
} from "lucide-react"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { HeroQrPreview } from "@/components/shared/hero-qr-preview"
import { MotionFade } from "@/components/shared/motion-fade"
import { PosterIllustration } from "@/components/shared/poster-illustration"
import { SectionHeading } from "@/components/shared/section-heading"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  APP_DESCRIPTION,
  APP_TAGLINE,
  COMPANY_CONTACT,
  DEMO_FORM_ID,
} from "@/lib/constants"
import { cn } from "@/lib/utils"

const posterPattern = `url("data:image/svg+xml,${encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220' viewBox='0 0 220 220' fill='none'>
  <g stroke='#dfe4ef' stroke-width='2'>
    <rect x='18' y='24' width='62' height='42' rx='9'/>
    <path d='M32 78v17m34-17v17m-47 0h61'/>
    <rect x='138' y='28' width='48' height='36' rx='8'/>
    <path d='M150 74c12-15 30-15 42 0m-38 48h16m10 0h22'/>
    <circle cx='55' cy='156' r='22'/>
    <path d='M41 156h28M55 142v28'/>
    <path d='M118 126h34v28h-34z'/>
    <path d='M126 154v15m18-15v15m-28 0h38'/>
    <path d='M172 136c12 0 22 10 22 22s-10 22-22 22-22-10-22-22 10-22 22-22z'/>
    <path d='M163 174l18-18m-18 0 18 18'/>
  </g>
</svg>
`)}")`

const programCards = [
  {
    title: "Embedded Systems & Robotics",
    description:
      "Hands-on learning tracks focused on embedded systems, microcontrollers, robotics, and hardware interfacing.",
    icon: CpuIcon,
  },
  {
    title: "Programming & Digital Skills",
    description:
      "Industry-focused learning in programming, data science, web development, and cloud fundamentals.",
    icon: BookOpenIcon,
  },
  {
    title: "QR-Based Brochure Workflow",
    description:
      "Students scan a QR code, submit details, and instantly receive a downloadable course brochure or information kit.",
    icon: QrCodeIcon,
  },
]

const deliverySteps = [
  "Display a QR code on posters, brochures, or campus campaigns.",
  "Students scan and submit their contact details on the public form page.",
  "The system stores the enquiry, downloads the brochure, and updates the admin dashboard.",
]

const contactItems = [
  {
    label: "Call Us",
    value: COMPANY_CONTACT.phone,
    icon: PhoneCallIcon,
  },
  {
    label: "Email",
    value: COMPANY_CONTACT.email,
    icon: MailIcon,
  },
  {
    label: "Visit",
    value: `${COMPANY_CONTACT.addressLine1} ${COMPANY_CONTACT.addressLine2}`,
    icon: MapPinIcon,
  },
]

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fcfcfb]">
      <SiteHeader />
      <main>
        <section
          id="overview"
          className="relative overflow-hidden"
          style={{ backgroundImage: posterPattern }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(255,255,255,0.95))]" />
          <div className="absolute inset-y-0 right-0 hidden w-[22rem] bg-[#123b84] [clip-path:polygon(22%_0,100%_0,100%_100%,0_100%)] lg:block" />

          <div className="relative mx-auto max-w-7xl px-4 pt-10 pb-20 sm:px-6 lg:px-8 lg:pt-12">
            <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
              <MotionFade className="space-y-8">
                <div className="space-y-5">
                  <p className="font-heading text-sm font-semibold uppercase tracking-[0.36em] text-[#c93a31]">
                    {APP_TAGLINE}
                  </p>
                  <div className="space-y-4">
                    <h1 className="font-heading text-4xl font-semibold leading-tight tracking-tight text-[#1f4286] sm:text-5xl lg:text-6xl">
                      MATT Engineering Solutions
                    </h1>
                    <p className="max-w-3xl text-lg leading-9 text-[#334f88]">
                      <span className="font-semibold text-[#c93a31]">
                        MATT Engineering Solutions
                      </span>{" "}
                      offers hardware and software courses that prepare students
                      and professionals for today&apos;s tech world. We provide
                      hands-on training in embedded systems, microcontrollers,
                      robotics, programming, data science, web development, and
                      cloud computing, paired with modern QR-powered digital
                      registration and brochure delivery.
                    </p>
                  </div>
                </div>

                <PosterIllustration />

                <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
                  <Card className="border-[#d8dfef] bg-white/90 shadow-[0_24px_80px_-50px_rgba(15,44,100,0.35)] backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-3xl text-[#123b84]">
                        Contact Us
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {contactItems.map((item) => {
                        const Icon = item.icon

                        return (
                          <div key={item.label} className="flex items-start gap-3">
                            <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#123b84] text-white">
                              <Icon className="size-5" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[#1f4286]">
                                {item.label}
                              </p>
                              <p className="text-base leading-7 text-[#334f88]">
                                {item.value}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                    </CardContent>
                  </Card>

                  <Card className="border-[#d8dfef] bg-[#f8faff] shadow-[0_24px_80px_-50px_rgba(15,44,100,0.28)]">
                    <CardHeader>
                      <CardTitle className="text-2xl text-[#123b84]">
                        Digital brochure form
                      </CardTitle>
                      <CardDescription className="text-sm leading-7 text-[#4a6296]">
                        Use the QR-enabled enquiry form to collect leads and let
                        students download the brochure right after submission.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-col gap-3 sm:flex-row">
                        <Link
                          href={`/form/${DEMO_FORM_ID}`}
                          className={cn(
                            buttonVariants({ size: "lg" }),
                            "rounded-full bg-[#123b84] px-6 text-white hover:bg-[#0d2f69]"
                          )}
                        >
                          Open brochure form
                          <ArrowRightIcon />
                        </Link>
                        <Link
                          href="/admin/login"
                          className={cn(
                            buttonVariants({ variant: "outline", size: "lg" }),
                            "rounded-full border-[#d0d8eb] bg-white px-6 text-[#123b84] hover:bg-[#f3f6fb]"
                          )}
                        >
                          Admin portal
                        </Link>
                      </div>
                      <p className="text-sm leading-7 text-[#4a6296]">
                        {APP_DESCRIPTION}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </MotionFade>

              <MotionFade delay={0.08} className="relative min-h-[44rem]">
                <div className="absolute right-5 top-5 hidden text-white lg:flex lg:size-24 lg:items-center lg:justify-center lg:rounded-full lg:border lg:border-white/30">
                  <ScanSearchIcon className="size-10" strokeWidth={1.8} />
                </div>

                <div className="absolute right-10 top-[18rem] hidden flex-col gap-4 lg:flex">
                  {[0, 1, 2].map((triangle) => (
                    <div
                      key={triangle}
                      className="h-0 w-0 border-r-[14px] border-b-[22px] border-l-[14px] border-r-transparent border-b-white border-l-transparent opacity-95"
                    />
                  ))}
                </div>

                <HeroQrPreview
                  formId={DEMO_FORM_ID}
                  className="relative z-10 mx-auto mt-8 max-w-md lg:ml-4 lg:mt-28"
                />

                <div className="relative mx-auto mt-10 flex max-w-[26rem] justify-between lg:absolute lg:right-0 lg:bottom-10 lg:mt-0 lg:max-w-none lg:items-end">
                  <div className="relative flex size-52 items-center justify-center overflow-hidden rounded-full border-[14px] border-[#123b84] bg-white shadow-[0_32px_90px_-44px_rgba(15,44,100,0.45)] sm:size-64">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(223,100,70,0.2),transparent_35%),linear-gradient(135deg,#fdfefe,#eef3ff)]" />
                    <div className="relative z-10 flex flex-col items-center justify-center gap-3 p-6 text-center">
                      <div className="relative size-24 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md">
                        <Image
                          src="/logo.png"
                          alt="MATT Engineering Solutions"
                          fill
                          className="object-contain p-1"
                          sizes="96px"
                        />
                      </div>
                      <div>
                        <p className="font-heading text-lg font-semibold text-[#123b84]">
                          Brochure + Enquiry
                        </p>
                        <p className="mt-1 text-sm leading-6 text-[#4a6296]">
                          One scan opens the course request form instantly.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="relative -ml-10 flex size-40 flex-col justify-between overflow-hidden rounded-full border-[12px] border-[#123b84] bg-[#0f2f64] p-6 text-white shadow-[0_28px_80px_-40px_rgba(15,44,100,0.7)] sm:size-48">
                    <div className="font-mono text-[11px] leading-5 text-white/80">
                      /brochure
                      <br />
                      scan: true
                      <br />
                      submit: success
                      <br />
                      pdf: delivered
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <ShieldCheckIcon className="size-4" />
                      Digital ready
                    </div>
                  </div>
                </div>
              </MotionFade>
            </div>
          </div>
        </section>

        <section
          id="programs"
          className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
        >
          <MotionFade>
            <SectionHeading
              eyebrow="Programs"
              title="Training-led branding with a smart digital enquiry flow"
              description="The landing experience now mirrors your poster aesthetic while the platform underneath still powers a full QR-based submission, brochure delivery, and admin management workflow."
            />
          </MotionFade>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {programCards.map((card, index) => {
              const Icon = card.icon

              return (
                <MotionFade key={card.title} delay={index * 0.08}>
                  <Card className="h-full border-[#d8dfef] bg-white shadow-[0_24px_80px_-48px_rgba(15,44,100,0.28)]">
                    <CardHeader className="space-y-4">
                      <div className="flex size-12 items-center justify-center rounded-2xl bg-[#123b84] text-white">
                        <Icon className="size-5" />
                      </div>
                      <CardTitle className="text-xl text-[#123b84]">
                        {card.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm leading-7 text-[#4a6296]">
                        {card.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </MotionFade>
              )
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <MotionFade>
              <SectionHeading
                eyebrow="Digital flow"
                title="A clean QR journey for courses, campaigns, and student outreach"
                description="The same visual identity now carries through a practical funnel: scan, submit, download brochure, and review everything from the protected admin dashboard."
              />
            </MotionFade>

            <div className="grid gap-4">
              {deliverySteps.map((step, index) => (
                <MotionFade key={step} delay={index * 0.08}>
                  <div className="rounded-[1.8rem] border border-[#d8dfef] bg-white px-6 py-6 shadow-[0_22px_70px_-48px_rgba(15,44,100,0.3)]">
                    <div className="text-sm font-semibold uppercase tracking-[0.26em] text-[#c93a31]">
                      Step 0{index + 1}
                    </div>
                    <p className="mt-3 text-base leading-8 text-[#334f88]">
                      {step}
                    </p>
                  </div>
                </MotionFade>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="mx-auto max-w-7xl px-4 pt-2 pb-20 sm:px-6 lg:px-8"
        >
          <MotionFade>
            <div className="rounded-[2.3rem] border border-[#d8dfef] bg-[linear-gradient(135deg,#123b84,#274f9a)] p-8 text-white shadow-[0_32px_110px_-58px_rgba(15,44,100,0.85)] sm:p-10">
              <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div className="space-y-4">
                  <p className="font-heading text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
                    Ready to share your brochure?
                  </p>
                  <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                    Turn your printed campaigns into a smart digital response
                    system.
                  </h2>
                  <p className="max-w-2xl text-base leading-8 text-white/80">
                    Use the public form for course enquiries, workshop signups,
                    or information requests while your admin team manages every
                    response from a protected dashboard.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                  <Link
                    href={`/form/${DEMO_FORM_ID}`}
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "rounded-full bg-white px-6 text-[#123b84] hover:bg-[#eef3ff]"
                    )}
                  >
                    Open student form
                    <ArrowRightIcon />
                  </Link>
                  <Link
                    href="/admin/login"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "rounded-full border-white/25 bg-white/10 px-6 text-white hover:bg-white/15"
                    )}
                  >
                    Open admin
                  </Link>
                </div>
              </div>
            </div>
          </MotionFade>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
