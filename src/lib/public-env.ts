import { PRODUCTION_APP_URL } from "@/lib/constants"

const configuredAppUrl = process.env.NEXT_PUBLIC_APP_URL
const isLocalAppUrl =
  configuredAppUrl?.includes("localhost") ||
  configuredAppUrl?.includes("127.0.0.1")

export const publicEnv = {
  appUrl: configuredAppUrl && !isLocalAppUrl ? configuredAppUrl : PRODUCTION_APP_URL,
}
