import Link from "next/link"
import Image from "next/image"
import { FadeUp } from "./components/animate"

const INSTALL_URL = process.env.NEXT_PUBLIC_GITHUB_APP_INSTALL_URL || "#"

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff",
        fontFamily: "var(--font-geist-sans)",
        display: "flex",
        flexDirection: "column",
        color: "#111",
      }}
    >
      {/* ── Navbar ──────────────────────────── */}
      <nav
        aria-label="Main navigation"
        style={{
          borderBottom: "1px solid #e8e8e8",
          padding: "0 40px",
          height: "54px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          position: "sticky",
          top: 0,
          zIndex: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Image src="/Logo.png" alt="Envoy Watch" width={28} height={28} style={{ borderRadius: "6px" }} />
          <span style={{ fontSize: "15px", fontWeight: "650", letterSpacing: "-0.03em", color: "#111" }}>
            Envoy Watch
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Link
            href="/login"
            className="nav-link"
            style={{ fontSize: "13px", color: "#777", textDecoration: "none", padding: "6px 12px", borderRadius: "6px" }}
          >
            Sign in
          </Link>
          <a
            href={INSTALL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-scale"
            style={{
              fontSize: "13px",
              fontWeight: "500",
              padding: "7px 14px",
              background: "linear-gradient(135deg, oklch(0.72 0.19 145), oklch(0.56 0.18 145))",
              borderRadius: "7px",
              color: "#fff",
              textDecoration: "none",
              letterSpacing: "-0.01em",
              boxShadow: "0 1px 3px oklch(0.56 0.18 145 / 0.28), inset 0 1px 0 rgba(255,255,255,0.14)",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            Install on GitHub →
          </a>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────── */}
      <section
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "100px 32px 88px",
          textAlign: "center",
          overflow: "hidden",
          background: [
            "radial-gradient(ellipse 110% 75% at 50% -15%, oklch(0.93 0.07 145 / 0.55), transparent 66%)",
            "radial-gradient(ellipse 55% 40% at 82% 25%, oklch(0.96 0.04 160 / 0.28), transparent 60%)",
            "radial-gradient(ellipse 50% 38% at 12% 32%, oklch(0.95 0.05 130 / 0.22), transparent 58%)",
            "#fff",
          ].join(", "),
        }}
      >
        <div className="hero-eyebrow" style={{ marginBottom: "24px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              padding: "5px 14px",
              borderRadius: "100px",
              border: "1px solid oklch(0.83 0.08 145)",
              background: "oklch(0.97 0.03 145)",
            }}
          >
            <span className="building-dot" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "oklch(0.65 0.2 145)", flexShrink: 0 }} />
            <span style={{ fontSize: "11px", fontWeight: "500", color: "oklch(0.38 0.15 145)", letterSpacing: "0.02em" }}>
              Powered by Locus
            </span>
          </div>
        </div>

        <h1
          className="hero-h1"
          style={{
            fontSize: "clamp(42px, 6vw, 62px)",
            fontWeight: "700",
            letterSpacing: "-0.05em",
            lineHeight: "1.04",
            color: "#0d0d0d",
            margin: "0 0 20px 0",
            maxWidth: "600px",
          }}
        >
          Preview environments for every pull request.
        </h1>

        <p
          className="hero-sub"
          style={{ fontSize: "16px", color: "#5a5a5a", margin: "0 0 38px 0", maxWidth: "390px", lineHeight: "1.65" }}
        >
          Open a PR, get a live URL. Merge or close, it&rsquo;s gone. Zero config, fully automated.
        </p>

        <div className="hero-cta" style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "72px" }}>
          <a
            href={INSTALL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-scale"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "12px 24px",
              background: "linear-gradient(135deg, oklch(0.72 0.19 145), oklch(0.56 0.18 145))",
              borderRadius: "8px",
              color: "#fff",
              fontSize: "14px",
              fontWeight: "550",
              textDecoration: "none",
              letterSpacing: "-0.01em",
              boxShadow: "0 2px 8px oklch(0.56 0.18 145 / 0.32), inset 0 1px 0 rgba(255,255,255,0.15)",
            }}
          >
            Install on GitHub →
          </a>
          <Link
            href="/login"
            style={{
              display: "inline-flex",
              padding: "12px 24px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "450",
              color: "#444",
              textDecoration: "none",
              background: "#fff",
            }}
          >
            Sign in
          </Link>
        </div>

        {/* ── Mock PR comment ── */}
        <div
          className="hero-card"
          style={{
            width: "100%",
            maxWidth: "560px",
            background: "#fff",
            border: "1px solid #d0d7de",
            borderRadius: "10px",
            overflow: "hidden",
            textAlign: "left",
            boxShadow: "0 6px 30px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 16px",
              background: "#f6f8fa",
              borderBottom: "1px solid #d0d7de",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Logo.png"
                alt="envoy-watch[bot]"
                width={26}
                height={26}
                style={{ borderRadius: "50%", flexShrink: 0, objectFit: "cover" }}
              />
              <span style={{ fontSize: "13px", fontWeight: "600", color: "#1f2328" }}>envoy-watch[bot]</span>
              <span style={{ fontSize: "12px", color: "#656d76" }}>commented just now</span>
            </div>
            <span style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "100px", border: "1px solid #d0d7de", color: "#656d76", background: "#fff" }}>Bot</span>
          </div>

          <div style={{ padding: "16px 20px 18px" }}>
            <p style={{ margin: "0 0 12px", fontSize: "14px", fontWeight: "600", color: "#1f2328" }}>🚀 Envoy Watch Preview</p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 14px",
                background: "oklch(0.97 0.03 145)",
                border: "1px solid oklch(0.88 0.07 145)",
                borderRadius: "6px",
                marginBottom: "12px",
              }}
            >
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "oklch(0.65 0.2 145)", flexShrink: 0 }} />
              <span style={{ fontSize: "13px", fontWeight: "500", color: "#1f2328" }}>Live: </span>
              <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "12px", color: "oklch(0.42 0.15 145)" }}>
                https://pr-42-acme-app.buildwithlocus.com
              </span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
              <span style={{ fontSize: "12px", color: "#656d76" }}>
                🌿 Branch:{" "}
                <code style={{ fontFamily: "var(--font-geist-mono)", background: "#eef1f4", padding: "1px 6px", borderRadius: "4px", fontSize: "11px" }}>
                  feature/checkout-v2
                </code>
              </span>
              <span style={{ fontSize: "12px", color: "#656d76" }}>⏱️ Built in: ~4 min</span>
            </div>
            <p style={{ margin: "10px 0 0", fontSize: "11px", color: "#aaa", fontStyle: "italic" }}>Destroys automatically when this PR closes.</p>
          </div>
        </div>
      </section>

      {/* ── Dashboard preview ───────────────── */}
      <FadeUp style={{ background: "#fafaf8", borderTop: "1px solid #ebebeb", borderBottom: "1px solid #ebebeb" }}>
        <section style={{ padding: "80px 40px", maxWidth: "980px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: "11px", fontWeight: "500", letterSpacing: "0.1em", color: "#aaa", textTransform: "uppercase", margin: "0 0 12px" }}>
              Dashboard
            </p>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 36px)", fontWeight: "650", letterSpacing: "-0.04em", color: "#111", margin: "0 0 12px" }}>
              Every environment, at a glance.
            </h2>
            <p style={{ fontSize: "15px", color: "#666", margin: 0, maxWidth: "380px", marginInline: "auto", lineHeight: "1.6" }}>
              All your active preview URLs across every repo, live status, and build time — in one view.
            </p>
          </div>

          {/* Mockup */}
          <div
            style={{
              border: "1px solid #d8d8d8",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 8px 40px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)",
              background: "#fff",
            }}
          >
            {/* Browser chrome */}
            <div style={{ background: "#f3f3f1", borderBottom: "1px solid #ddd", padding: "10px 16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ display: "flex", gap: "6px" }}>
                {["#ff5f57","#ffbd2e","#28c841"].map(c => (
                  <div key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c }} />
                ))}
              </div>
              <div
                style={{
                  flex: 1,
                  maxWidth: "280px",
                  marginInline: "auto",
                  background: "#e8e8e6",
                  borderRadius: "4px",
                  padding: "4px 12px",
                  fontSize: "11px",
                  color: "#888",
                  fontFamily: "var(--font-geist-mono)",
                  textAlign: "center",
                }}
              >
                envoy-watch.vercel.app/dashboard
              </div>
            </div>

            {/* Dashboard header */}
            <div style={{ borderBottom: "1px solid #eee", padding: "0 20px", height: "48px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/Logo.png" alt="Envoy Watch" width={22} height={22} style={{ borderRadius: "5px" }} />
                <span style={{ fontSize: "14px", fontWeight: "650", letterSpacing: "-0.03em" }}>Envoy Watch</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "11px", fontFamily: "var(--font-geist-mono)", color: "#888" }}>$24.50</span>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "linear-gradient(135deg,#818cf8,#6366f1)" }} />
                  <span style={{ fontSize: "12px", color: "#666" }}>alice</span>
                </div>
                <div style={{ fontSize: "11px", padding: "4px 10px", border: "1px solid #e0e0e0", borderRadius: "5px", color: "#666" }}>Install App</div>
              </div>
            </div>

            {/* Stats bar */}
            <div style={{ display: "flex", gap: "1px", background: "#eee", borderBottom: "1px solid #eee" }}>
              {[
                { label: "Environments", val: "5" },
                { label: "Live", val: "3", accent: true },
                { label: "Building", val: "1" },
              ].map(({ label, val, accent }) => (
                <div key={label} style={{ flex: 1, background: "#fff", padding: "10px 20px" }}>
                  <div style={{ fontSize: "18px", fontWeight: "700", letterSpacing: "-0.04em", color: accent ? "oklch(0.55 0.18 145)" : "#111" }}>{val}</div>
                  <div style={{ fontSize: "11px", color: "#999", marginTop: "1px" }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Environments */}
            <div style={{ padding: "16px 20px 20px", background: "#fafaf8" }}>
              {[
                { repo: "acme-corp/frontend", envs: [
                  { pr: 58, branch: "feature/checkout-v2", status: "healthy", url: "pr-58-acme-frontend", mins: "5 min" },
                  { pr: 57, branch: "fix/mobile-nav", status: "building", url: null, mins: "—" },
                ]},
                { repo: "acme-corp/api", envs: [
                  { pr: 22, branch: "feat/rate-limits", status: "healthy", url: "pr-22-acme-api", mins: "3 min" },
                  { pr: 19, branch: "refactor/auth", status: "failed", url: null, mins: "7 min" },
                ]},
              ].map(({ repo, envs: repoEnvs }) => (
                <div key={repo} style={{ marginBottom: "16px" }}>
                  <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "11px", color: "#888", marginBottom: "8px", letterSpacing: "0.03em" }}>{repo}</div>
                  <div style={{ border: "1px solid #e8e8e8", borderRadius: "7px", overflow: "hidden", background: "#fff" }}>
                    {repoEnvs.map((env, i) => {
                      const pill = {
                        healthy:  { bg: "oklch(0.96 0.05 145)", color: "oklch(0.42 0.15 145)", label: "Live" },
                        building: { bg: "oklch(0.97 0.04 90)",  color: "oklch(0.5 0.14 90)",  label: "Building" },
                        failed:   { bg: "oklch(0.97 0.04 25)",  color: "oklch(0.52 0.17 25)",  label: "Failed" },
                      }[env.status] ?? { bg: "#f0f0ee", color: "#777", label: "—" }
                      return (
                        <div key={env.pr} style={{
                          display: "grid",
                          gridTemplateColumns: "52px 1fr 90px 1fr 60px",
                          alignItems: "center",
                          padding: "9px 14px",
                          gap: "12px",
                          borderTop: i === 0 ? "none" : "1px solid #f0f0ee",
                        }}>
                          <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "11px", color: "#aaa" }}>#{env.pr}</span>
                          <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "11px", color: "#333", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{env.branch}</span>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "2px 8px", borderRadius: "100px", background: pill.bg, fontSize: "10px", fontWeight: "500", color: pill.color, width: "fit-content" }}>
                            {env.status === "building" && <span className="building-dot" style={{ width: "5px", height: "5px", borderRadius: "50%", background: "currentColor" }} />}
                            {pill.label}
                          </span>
                          <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "10px", color: "oklch(0.55 0.15 145)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {env.url ? `${env.url}.buildwithlocus.com` : "—"}
                          </span>
                          <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "10px", color: "#bbb", textAlign: "right" }}>{env.mins}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeUp>

      {/* ── Features ────────────────────────── */}
      <section style={{ padding: "80px 40px", maxWidth: "980px", margin: "0 auto", width: "100%" }}>
        <FadeUp style={{ textAlign: "center", marginBottom: "52px" }}>
          <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: "11px", fontWeight: "500", letterSpacing: "0.1em", color: "#aaa", textTransform: "uppercase", margin: "0 0 12px" }}>Why it works</p>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 36px)", fontWeight: "650", letterSpacing: "-0.04em", color: "#111", margin: 0 }}>
            Built for speed, designed to disappear.
          </h2>
        </FadeUp>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "40px" }}>
          {[
            { n: "01", title: "Instant comment", body: "The bot posts a building comment the second you open a PR — before the environment is even ready. You always know it's on the way." },
            { n: "02", title: "Isolated by default", body: "Each PR gets its own fully separate environment. No shared state, no collisions. Reviewers see exactly what's in the branch." },
            { n: "03", title: "Zero cleanup", body: "When the PR is merged or closed, the environment is destroyed automatically. No orphaned containers, no wasted credit." },
          ].map(({ n, title, body }, i) => (
            <FadeUp key={n} delay={i * 80}>
              <div style={{ paddingTop: "20px", borderTop: "2px solid oklch(0.72 0.19 145)" }}>
                <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "11px", color: "#bbb", letterSpacing: "0.06em", display: "block", marginBottom: "12px" }}>{n}</span>
                <h3 style={{ fontSize: "16px", fontWeight: "620", letterSpacing: "-0.025em", color: "#111", margin: "0 0 10px" }}>{title}</h3>
                <p style={{ fontSize: "13px", color: "#6b6b6b", margin: 0, lineHeight: "1.65" }}>{body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── Use cases ───────────────────────── */}
      <FadeUp style={{ background: "#fafaf8", borderTop: "1px solid #ebebeb", borderBottom: "1px solid #ebebeb" }}>
        <section style={{ padding: "80px 40px", maxWidth: "980px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: "11px", fontWeight: "500", letterSpacing: "0.1em", color: "#aaa", textTransform: "uppercase", margin: "0 0 12px" }}>Use cases</p>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 36px)", fontWeight: "650", letterSpacing: "-0.04em", color: "#111", margin: 0 }}>
              Works the way your team already works.
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            {[
              {
                who: "Solo developers",
                headline: "Ship with confidence.",
                body: "See your feature working in production conditions before asking for a review. Catch issues that only appear outside localhost.",
                items: ["No more 'works on my machine'", "Share a live link in the PR description", "Instant staging for any branch"],
              },
              {
                who: "Engineering teams",
                headline: "Review without blocking.",
                body: "Reviewers click the link and test directly. Product managers, designers, and QA can all verify without checking out code.",
                items: ["One-click testing for non-engineers", "Parallel review with isolated envs", "Automatic teardown keeps costs predictable"],
              },
            ].map(({ who, headline, body, items }) => (
              <div
                key={who}
                style={{
                  background: "#fff",
                  border: "1px solid #e8e8e8",
                  borderRadius: "10px",
                  padding: "28px 32px",
                }}
              >
                <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: "10px", fontWeight: "500", color: "oklch(0.52 0.15 145)", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 12px" }}>{who}</p>
                <h3 style={{ fontSize: "20px", fontWeight: "650", letterSpacing: "-0.035em", color: "#111", margin: "0 0 10px" }}>{headline}</h3>
                <p style={{ fontSize: "14px", color: "#666", margin: "0 0 20px", lineHeight: "1.6" }}>{body}</p>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                  {items.map(item => (
                    <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "#555" }}>
                      <span style={{ color: "oklch(0.65 0.2 145)", marginTop: "1px", flexShrink: 0, fontSize: "14px" }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </FadeUp>

      {/* ── How it works ────────────────────── */}
      <section style={{ padding: "80px 40px", maxWidth: "980px", margin: "0 auto", width: "100%" }}>
        <FadeUp style={{ textAlign: "center", marginBottom: "52px" }}>
          <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: "11px", fontWeight: "500", letterSpacing: "0.1em", color: "#aaa", textTransform: "uppercase", margin: "0 0 12px" }}>How it works</p>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 36px)", fontWeight: "650", letterSpacing: "-0.04em", color: "#111", margin: 0 }}>
            Up in three steps.
          </h2>
        </FadeUp>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "40px" }}>
          {[
            { n: "1", title: "Install the app", body: "Add Envoy Watch to your GitHub organization or repository. It takes under a minute and requires no code changes." },
            { n: "2", title: "Open a pull request", body: "The bot posts a building comment immediately. A live environment follows in 3–7 minutes, directly on the PR." },
            { n: "3", title: "Get your URL", body: "Click the link in the bot comment. Share it with teammates or use it for manual QA. Closed PRs clean up automatically." },
          ].map(({ n, title, body }, i) => (
            <FadeUp key={n} delay={i * 80}>
              <div>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "9px",
                    background: "linear-gradient(135deg, oklch(0.72 0.19 145), oklch(0.56 0.18 145))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "15px",
                    fontWeight: "700",
                    color: "#fff",
                    marginBottom: "16px",
                    boxShadow: "0 2px 6px oklch(0.56 0.18 145 / 0.25)",
                  }}
                >
                  {n}
                </div>
                <h3 style={{ fontSize: "15px", fontWeight: "620", letterSpacing: "-0.02em", color: "#111", margin: "0 0 8px" }}>{title}</h3>
                <p style={{ fontSize: "13px", color: "#6b6b6b", margin: 0, lineHeight: "1.65" }}>{body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ──────────────────────── */}
      <FadeUp style={{ padding: "0 40px 80px" }}>
        <section
          style={{
            maxWidth: "900px",
            marginInline: "auto",
            borderRadius: "14px",
            padding: "64px 48px",
            textAlign: "center",
            background: [
              "radial-gradient(ellipse 80% 120% at 50% 120%, oklch(0.93 0.08 145 / 0.45), transparent 65%)",
              "linear-gradient(180deg, #fff 0%, oklch(0.97 0.03 145) 100%)",
            ].join(", "),
            border: "1px solid oklch(0.9 0.06 145)",
          }}
        >
          <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: "680", letterSpacing: "-0.045em", color: "#0d0d0d", margin: "0 0 14px", lineHeight: "1.1" }}>
            Start in under a minute.
          </h2>
          <p style={{ fontSize: "15px", color: "#666", margin: "0 0 32px", maxWidth: "360px", marginInline: "auto", lineHeight: "1.6" }}>
            Install the GitHub App, open a PR, and watch the URL appear.
          </p>
          <a
            href={INSTALL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-scale"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "13px 28px",
              background: "linear-gradient(135deg, oklch(0.72 0.19 145), oklch(0.56 0.18 145))",
              borderRadius: "9px",
              color: "#fff",
              fontSize: "14px",
              fontWeight: "550",
              textDecoration: "none",
              letterSpacing: "-0.01em",
              boxShadow: "0 3px 12px oklch(0.56 0.18 145 / 0.35)",
            }}
          >
            Install on GitHub →
          </a>
          <div style={{ marginTop: "20px" }}>
            <Link href="/login" style={{ fontSize: "13px", color: "#888", textDecoration: "none" }}>
              Already installed? Sign in →
            </Link>
          </div>
        </section>
      </FadeUp>

      {/* ── Footer ──────────────────────────── */}
      <footer style={{ borderTop: "1px solid #ebebeb", padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: "12px", color: "#ccc", fontFamily: "var(--font-geist-mono)" }}>© 2025 Envoy Watch</span>
      </footer>
    </div>
  )
}
