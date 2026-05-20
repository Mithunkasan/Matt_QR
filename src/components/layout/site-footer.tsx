import Link from "next/link"
import { MailIcon, MapPinIcon, PhoneCallIcon } from "lucide-react"

import { COMPANY_CONTACT, DEMO_FORM_ID } from "@/lib/constants"
import { Logo } from "@/components/shared/logo"

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200/80 bg-white py-10 dark:border-white/10 dark:bg-slate-950">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr_0.8fr] lg:px-8">
        <div className="space-y-4">
          <Logo size="md" showTagline />
          <p className="max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            Hardware and software training, digital brochure delivery, and QR-enabled student enquiry workflows designed for the next generation of tech learners.
          </p>
        </div>
        <div className="space-y-3 text-sm text-slate-700 dark:text-slate-200">
          <div className="flex items-start gap-3">
            <PhoneCallIcon className="mt-0.5 size-4 text-[#1f4286]" />
            <span>{COMPANY_CONTACT.phone}</span>
          </div>
          <div className="flex items-start gap-3">
            <MailIcon className="mt-0.5 size-4 text-[#1f4286]" />
            <span>{COMPANY_CONTACT.email}</span>
          </div>
          <div className="flex items-start gap-3">
            <MapPinIcon className="mt-0.5 size-4 text-[#1f4286]" />
            <span>
              {COMPANY_CONTACT.addressLine1} {COMPANY_CONTACT.addressLine2}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3 text-sm text-slate-600 dark:text-slate-300">
          <Link
            href={`/form/${DEMO_FORM_ID}`}
            className="transition-colors hover:text-slate-950 dark:hover:text-white"
          >
            Brochure form
          </Link>
          <Link
            href="/thank-you"
            className="transition-colors hover:text-slate-950 dark:hover:text-white"
          >
            Thank you page
          </Link>
          <Link
            href="/admin/login"
            className="transition-colors hover:text-slate-950 dark:hover:text-white"
          >
            Admin login
          </Link>
        </div>
      </div>
    </footer>
  )
}
