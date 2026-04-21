import { signIn } from "@/auth"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "Sign in — Envoy Watch",
}

export default async function LoginPage() {
  const session = await auth()
  if (session) redirect("/dashboard")

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 32px 32px",
        background: [
          "radial-gradient(ellipse 100% 70% at 50% -10%, oklch(0.93 0.07 145 / 0.45), transparent 60%)",
          "#fafaf8",
        ].join(", "),
        fontFamily: "var(--font-geist-sans)",
      }}
    >
      {/* Back to home */}
      <div style={{ width: "100%", maxWidth: "380px", marginBottom: "16px" }}>
        <Link
          href="/"
          className="nav-link"
          style={{
            fontSize: "13px",
            color: "#888",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            padding: "4px 0",
            borderRadius: "4px",
          }}
        >
          ← Envoy Watch
        </Link>
      </div>

      {/* Card */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #e8e8e8",
          borderRadius: "14px",
          padding: "48px 44px",
          width: "100%",
          maxWidth: "380px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
          animation: "scaleIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) both",
        }}
      >
        {/* Logo */}
        <Image
          src="/Logo.png"
          alt="Envoy Watch"
          width={52}
          height={52}
          style={{ borderRadius: "13px", marginBottom: "20px" }}
        />

        <h1
          style={{
            fontSize: "20px",
            fontWeight: "660",
            letterSpacing: "-0.035em",
            color: "#111",
            margin: "0 0 8px",
          }}
        >
          Sign in
        </h1>

        <p
          style={{
            fontSize: "13px",
            color: "#888",
            textAlign: "center",
            margin: "0 0 32px",
            lineHeight: "1.5",
          }}
        >
          Sign in with GitHub to manage your<br />preview environments.
        </p>

        <form
          action={async () => {
            "use server"
            await signIn("github", { redirectTo: "/dashboard" })
          }}
          style={{ width: "100%" }}
        >
          <button
            type="submit"
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "9px",
              padding: "11px 16px",
              background: "#1c1c1c",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontFamily: "var(--font-geist-sans)",
              fontWeight: "500",
              cursor: "pointer",
              letterSpacing: "-0.01em",
              transition: "background 0.15s ease",
            }}
          >
            <GitHubIcon />
            Continue with GitHub
          </button>
        </form>

      </div>
    </main>
  )
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}
