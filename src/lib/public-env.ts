import { PRODUCTION_APP_URL } from "@/lib/constants"

export const publicEnv = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? PRODUCTION_APP_URL,
}
