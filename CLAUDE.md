# Envoy Watch — Full Build Instructions

## Step 0: Read ALL Skills First (Non-negotiable)
Before writing a single line of code, read every skill below fully.
Apply all guidelines throughout the entire build.

```bash
# Locus API skills (fetch from web)
curl https://beta.buildwithlocus.com/SKILL.md
curl https://beta.paywithlocus.com/SKILL.md

# Design + frontend skills (read locally)
cat ~/.claude/skills/impeccable/SKILL.md
cat ~/.claude/skills/taste-skill/SKILL.md
cat ~/.claude/skills/emilkowalski/SKILL.md
cat /mnt/skills/user/ui-ux-pro-max/SKILL.md
cat /mnt/skills/user/frontend-design/SKILL.md
cat /mnt/skills/user/shadcn/SKILL.md
cat /mnt/skills/user/web-accessibility/SKILL.md
cat /mnt/skills/user/vercel-react-best-practices/SKILL.md
cat /mnt/skills/user/web-design-guidelines/SKILL.md
cat /mnt/skills/user/create-readme/SKILL.md
```

The impeccable, taste-skill, and emilkowalski skills are the
primary design authority. Apply them above all else for UI work.

## Step 1: Check Package Versions
```bash
npm info next-auth version
npm info @octokit/auth-app version
npm info @octokit/rest version
npm info @vercel/postgres version
npm info geist version
```
Always use latest. Never assume from training data.

## Project Context
- Next.js 16, TypeScript, Tailwind CSS — already scaffolded
- All environment variables already in `.env.local`
- Neon Postgres connected via POSTGRES_URL
- Live at: https://envoy-watch.vercel.app
- Packages already installed: next-auth, @octokit/auth-app,
  @octokit/rest, @vercel/postgres, geist
- Do NOT run create-next-app
- Build in this order: lib/ → types/ → auth.ts → middleware.ts
  → app/api/ → app/dashboard/ → app/login/ → app/page.tsx

## What We're Building
Envoy Watch is a GitHub App + Next.js 16 service that automatically
creates isolated preview environments for every pull request using
the Locus BuildWithLocus beta API. When a PR opens, a bot comment
appears on the PR with a live URL. When the PR closes, the
environment is destroyed automatically. Developers sign in with
GitHub OAuth to see a dashboard showing only their own environments.

## Two Separate GitHub Auth Systems

### 1. GitHub App — server-side, invisible to users
- Receives PR webhook events from GitHub
- Posts comments to PRs as "Envoy Watch[bot]"
- Uses App ID + private key to get installation tokens
- Developer never sees or interacts with this

### 2. GitHub OAuth via Auth.js — user-facing
- Powers "Sign in with GitHub" on the dashboard
- Identifies user and their repos
- Filters dashboard to their environments only
- Completely separate from GitHub App

## Critical: Locus BETA API
ALL calls use: `https://beta-api.buildwithlocus.com/v1`
NEVER use `api.buildwithlocus.com` — wrong environment.

## Environment Variables (in .env already)
```bash
GITHUB_APP_ID=
GITHUB_APP_PRIVATE_KEY=
GITHUB_WEBHOOK_SECRET=
NEXT_PUBLIC_GITHUB_APP_INSTALL_URL=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
AUTH_SECRET=
AUTH_URL=https://envoy-watch.vercel.app
LOCUS_API_KEY=
LOCUS_JWT=
POSTGRES_URL=
```

## Locus API

### Deploy
```typescript
POST https://beta-api.buildwithlocus.com/v1/projects/from-repo
Authorization: Bearer <LOCUS_JWT>
Body: {
  "name": `pr-${prNumber}-${repo.replace('/', '-').toLowerCase()}`,
  "repo": "owner/repo",
  "branch": "feature-branch"
}
Returns: {
  project: { id },
  services: [{ id, url }],
  deployments: [{ id, status }]
}
```

### Poll
```typescript
GET https://beta-api.buildwithlocus.com/v1/deployments/:id
// Every 60s. Stop at "healthy" or "failed". Max 10 min.
```

### Destroy
```typescript
DELETE https://beta-api.buildwithlocus.com/v1/projects/:projectId
// 204 No Content
```

### Balance
```typescript
GET https://beta-api.buildwithlocus.com/v1/billing/balance
Returns: { creditBalance, totalServices, status }
```

## Database Schema
```sql
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
  status TEXT DEFAULT 'building',
  preview_url TEXT,
  build_started_at TIMESTAMPTZ DEFAULT NOW(),
  build_completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(repo, pr_number)
);
```

## File Structure
```
auth.ts
middleware.ts
/lib
  db.ts
  github.ts
  locus.ts
/types/index.ts
/app
  layout.tsx
  page.tsx
  /login/page.tsx
  /dashboard/page.tsx
  /api
    /auth/[...nextauth]/route.ts
    /webhook/route.ts
    /status/route.ts
    /locus/refresh/route.ts
```

## Auth.js (v5)
```typescript
// auth.ts
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
      authorization: { params: { scope: "read:user user:email repo" } }
    })
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account?.access_token) token.githubAccessToken = account.access_token
      if (profile) token.githubUsername = (profile as any).login
      return token
    },
    async session({ session, token }) {
      session.githubAccessToken = token.githubAccessToken as string
      session.githubUsername = token.githubUsername as string
      return session
    }
  }
})
```

## Middleware
```typescript
import { auth } from "@/auth"
export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname.startsWith('/dashboard')) {
    return Response.redirect(new URL('/login', req.url))
  }
})
export const config = { matcher: ['/dashboard/:path*'] }
```

## Webhook Route
```typescript
export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('x-hub-signature-256') ?? ''
  if (!verifySignature(body, sig)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const event = req.headers.get('x-github-event')
  const payload = JSON.parse(body)
  if (event === 'pull_request') {
    const { action, pull_request, repository, installation } = payload
    const ctx = {
      repo: repository.full_name,
      branch: pull_request.head.ref,
      prNumber: pull_request.number,
      prTitle: pull_request.title,
      installationId: installation.id,
      githubUsername: repository.owner.login
    }
    if (action === 'opened' || action === 'reopened') {
      handlePROpened(ctx).catch(console.error)
    }
    if (action === 'closed') {
      handlePRClosed(ctx).catch(console.error)
    }
  }
  return Response.json({ ok: true }) // Always respond fast
}
```

## GitHub lib
```typescript
import { createAppAuth } from "@octokit/auth-app"
import { Octokit } from "@octokit/rest"
import { createHmac, timingSafeEqual } from "crypto"

export function verifySignature(payload: string, sig: string): boolean {
  const expected = `sha256=${createHmac('sha256',
    process.env.GITHUB_WEBHOOK_SECRET!).update(payload).digest('hex')}`
  try { return timingSafeEqual(Buffer.from(sig), Buffer.from(expected)) }
  catch { return false }
}

export async function getInstallationOctokit(installationId: number) {
  const auth = createAppAuth({
    appId: process.env.GITHUB_APP_ID!,
    privateKey: process.env.GITHUB_APP_PRIVATE_KEY!.replace(/\\n/g, '\n'),
  })
  const { token } = await auth({ type: "installation", installationId })
  return new Octokit({ auth: token })
}

export async function postComment(
  installationId: number, repo: string,
  prNumber: number, body: string
) {
  const octokit = await getInstallationOctokit(installationId)
  const [owner, repoName] = repo.split('/')
  await octokit.issues.createComment({
    owner, repo: repoName, issue_number: prNumber, body
  })
}

export async function getUserRepos(accessToken: string) {
  const octokit = new Octokit({ auth: accessToken })
  const { data } = await octokit.repos.listForAuthenticatedUser({
    per_page: 100, sort: 'updated', affiliation: 'owner,collaborator'
  })
  return data
}
```

## PR Comment Templates

### Building
```
## 🚀 Envoy Watch Preview
⏳ **Building preview environment...**
🌿 **Branch:** `{branch}`
_Takes 3–7 minutes. This comment updates when ready._
```

### Healthy
```
## 🚀 Envoy Watch Preview
✅ **Live:** {url}
🌿 **Branch:** `{branch}`
⏱️ **Built in:** {duration}
> Destroys automatically when this PR closes.
```

### Failed
```
## 🚀 Envoy Watch Preview
❌ **Build failed** — `{branch}`
App must listen on port 8080. Locus injects `PORT=8080`.
```

### Destroyed
```
## 🗑️ Envoy Watch
Preview environment destroyed.
```

## Design Direction
Read the impeccable, taste-skill, and emilkowalski skills first —
they are the design authority. Apply their principles exactly.

Additional constraints:
- Dark theme: #0a0a0a background
- Font: Geist Sans + Geist Mono
- No gradients, no shadows, no decorative elements
- Single accent color: #22c55e (green, Live status only)
- Status colors: yellow (building), red (failed), #333 (destroyed)
- Clean, minimal, professional — developer tool aesthetic
- Borders: 1px solid #1e1e1e only
- Border radius: max 6px

### Landing Page (/)
- Navbar: wordmark left, "Sign in" + "Install on GitHub →" right
- Hero: centered headline + one-line description + CTA button
- How it works: 3 clean columns (Install → Open PR → Get URL)
- Footer: minimal one line
- Install button href: process.env.NEXT_PUBLIC_GITHUB_APP_INSTALL_URL

### Login Page (/login)
- Centered card on dark page
- Wordmark, one sentence, "Continue with GitHub" button

### Dashboard (/dashboard) — requires auth
- Header: wordmark, user avatar + username, credit balance, Install button
- Environments grouped by repo
- Per row: PR number, branch, status dot, live URL link, build time
- Auto-refresh every 30 seconds via router.refresh()
- Empty state with install CTA
- Show only repos belonging to logged-in user

## After Building
1. Run `vercel deploy --prod` to push to production
2. Create the DB table by hitting /api/status once
3. Confirm webhook is receiving events via GitHub App settings
4. Generate README using the create-readme skill

## Do NOT Build
- Per-environment Postgres addons
- Custom domains
- Settings or billing pages
- Animations or transitions
- Anything not in this spec