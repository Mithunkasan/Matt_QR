import { getAdminSession } from "@/lib/auth"
import { getSubmissionExportRows, submissionsToCsv } from "@/lib/submissions"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const session = await getAdminSession()

  if (!session) {
    return Response.json(
      {
        error: "Unauthorized",
      },
      { status: 401 }
    )
  }

  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q") ?? ""
  const rows = await getSubmissionExportRows(query)
  const csv = submissionsToCsv(rows)

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="matt-enquiries.csv"`,
    },
  })
}
