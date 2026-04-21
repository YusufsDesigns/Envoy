import { createTable, sql } from "@/lib/db"
import { getBalance } from "@/lib/locus"

export async function GET() {
  await createTable()
  const { rows } = await sql`SELECT COUNT(*) AS count FROM preview_environments`
  let balance = null
  try {
    balance = await getBalance()
  } catch {
    // Locus credentials may not be configured yet
  }
  return Response.json({ ok: true, environments: Number(rows[0].count), balance })
}
