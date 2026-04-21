const LOCUS_BASE = "https://beta-api.buildwithlocus.com/v1"

function headers() {
  return {
    Authorization: `Bearer ${process.env.LOCUS_JWT}`,
    "Content-Type": "application/json",
  }
}

export interface LocusDeployResult {
  project: { id: string }
  services: Array<{ id: string; url: string }>
  deployments: Array<{ id: string; status: string }>
}

export async function deployProject(
  prNumber: number,
  repo: string,
  branch: string
): Promise<LocusDeployResult> {
  const name = `pr-${prNumber}-${repo.replace("/", "-").toLowerCase()}`
  const res = await fetch(`${LOCUS_BASE}/projects/from-repo`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ name, repo, branch }),
  })
  if (!res.ok) {
    throw new Error(`Locus deploy failed: ${res.status} ${await res.text()}`)
  }
  return res.json()
}

export async function pollDeployment(deploymentId: string): Promise<{ status: string }> {
  const res = await fetch(`${LOCUS_BASE}/deployments/${deploymentId}`, {
    headers: headers(),
  })
  if (!res.ok) {
    throw new Error(`Locus poll failed: ${res.status}`)
  }
  return res.json()
}

export async function destroyProject(projectId: string): Promise<void> {
  const res = await fetch(`${LOCUS_BASE}/projects/${projectId}`, {
    method: "DELETE",
    headers: headers(),
  })
  if (res.status !== 204 && !res.ok) {
    throw new Error(`Locus destroy failed: ${res.status}`)
  }
}

export async function getBalance(): Promise<{
  creditBalance: number
  totalServices: number
  status: string
}> {
  const res = await fetch(`${LOCUS_BASE}/billing/balance`, {
    headers: headers(),
    next: { revalidate: 60 },
  })
  if (!res.ok) {
    throw new Error(`Locus balance failed: ${res.status}`)
  }
  return res.json()
}
