import type { Metadata } from "next"
import localFont from "next/font/local"

import { Providers } from "@/components/layout/providers"
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants"
import { publicEnv } from "@/lib/public-env"

import "./globals.css"

const bodyFont = localFont({
  src: [
    {
      path: "./fonts/segoeui.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/segoeuib.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-manrope",
})

const headingFont = localFont({
  src: "./fonts/bahnschrift.ttf",
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  metadataBase: new URL(publicEnv.appUrl),
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  applicationName: APP_NAME,
  keywords: [
    "MATT Engineering Solutions",
    "hardware and software courses",
    "QR brochure enquiry form",
  ],
  openGraph: {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    siteName: APP_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description: APP_DESCRIPTION,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bodyFont.variable} ${headingFont.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
