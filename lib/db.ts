import { sql } from "@vercel/postgres"

export { sql }

export async function createTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS preview_environments (
      id SERIAL PRIMARY KEY,
      repo TEXT NOT NULL,
      pr_number INTEGER NOT NULL,
      branch TEXT NOT NULL,
      pr_title TEXT,
      installation_id BIGINT NOT NULL,
      github_username TEXT,
      locus_project_id TEXT,
      locus_service_id TEXT,
      locus_deployment_id TEXT,
      comment_id BIGINT,
      status TEXT DEFAULT 'building',
      preview_url TEXT,
      build_started_at TIMESTAMPTZ DEFAULT NOW(),
      build_completed_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(repo, pr_number)
    )
  `
}
