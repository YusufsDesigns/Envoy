import { sql } from "@/lib/db"
import { pollDeployment } from "@/lib/locus"
import { updateComment } from "@/lib/github"
import type { PreviewEnvironment } from "@/types"

// GET /api/locus/refresh?repo=owner/repo&pr=123
// Re-polls a specific deployment and updates DB status.
// Useful for recovering stalled deployments.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const repo = searchParams.get("repo")
  const pr = searchParams.get("pr")

  if (!repo || !pr) {
    return Response.json({ error: "Missing repo or pr" }, { status: 400 })
  }

  const prNumber = parseInt(pr, 10)
  const { rows } = await sql<PreviewEnvironment>`
    SELECT * FROM preview_environments
    WHERE repo = ${repo} AND pr_number = ${prNumber}
  `

  if (!rows.length) {
    return Response.json({ error: "Not found" }, { status: 404 })
  }

  const env = rows[0]

  if (!env.locus_deployment_id) {
    return Response.json({ status: env.status })
  }

  if (env.status !== "building") {
    return Response.json({ status: env.status })
  }

  let deployment: { status: string }
  try {
    deployment = await pollDeployment(env.locus_deployment_id)
  } catch (err) {
    return Response.json({ error: String(err) }, { status: 502 })
  }

  if (deployment.status === "healthy") {
    await sql`
      UPDATE preview_environments SET
        status = 'healthy',
        build_completed_at = NOW(),
        updated_at = NOW()
      WHERE repo = ${repo} AND pr_number = ${prNumber}
    `
    if (env.comment_id && env.installation_id) {
      try {
        await updateComment(
          Number(env.installation_id),
          repo,
          Number(env.comment_id),
          `## 🚀 Envoy Watch Preview\n✅ **Live:** ${env.preview_url}\n🌿 **Branch:** \`${env.branch}\`\n> Destroys automatically when this PR closes.`
        )
      } catch {}
    }
    return Response.json({ status: "healthy", url: env.preview_url })
  }

  if (deployment.status === "failed") {
    await sql`
      UPDATE preview_environments SET
        status = 'failed',
        build_completed_at = NOW(),
        updated_at = NOW()
      WHERE repo = ${repo} AND pr_number = ${prNumber}
    `
    return Response.json({ status: "failed" })
  }

  return Response.json({ status: deployment.status })
}
