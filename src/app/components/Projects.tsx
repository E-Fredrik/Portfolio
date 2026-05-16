import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Browser chrome component                                          */
/* ------------------------------------------------------------------ */
function BrowserFrame({
  url,
  children,
}: {
  url: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-[520px]" style={{ border: "1px solid #333333" }}>
      <div
        className="flex items-center gap-2 px-5 py-3"
        style={{ borderBottom: "1px solid #333333" }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-[6px] h-[6px] rounded-full"
            style={{ border: "1px solid #333333" }}
          />
        ))}
        <span
          className="text-[#A1A1A6] ml-4"
          style={{ fontSize: "10px", fontFamily: "monospace" }}
        >
          {url}
        </span>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stat row component                                                */
/* ------------------------------------------------------------------ */
function StatRow({ stats }: { stats: { l: string; v: string }[] }) {
  return (
    <div
      className="grid gap-0 mt-6"
      style={{
        gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
        borderTop: "1px solid #333333",
        paddingTop: "16px",
      }}
    >
      {stats.map((m) => (
        <div key={m.l} className="pr-4">
          <p
            className="text-[#A1A1A6]"
            style={{
              fontSize: "8px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            {m.l}
          </p>
          <p
            className="text-white mt-1"
            style={{ fontSize: "18px", fontWeight: 700, letterSpacing: "-0.03em" }}
          >
            {m.v}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */
export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // 1 intro + 7 projects = 8 panels
  const totalPanels = 8;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return; // Skip horizontal scroll on mobile

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const scrollDistance = ((totalPanels - 1) / totalPanels) * 100;

      gsap.to(track, {
        xPercent: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${totalPanels * 100}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  // Mobile: vertical stacked layout
  if (isMobile) {
    return (
      <section
        ref={sectionRef}
        className="py-24 px-6"
        style={{ background: "#000000", fontFamily: "Inter, sans-serif" }}
      >
        {/* INTRO */}
        <div className="mb-16 max-w-[560px]">
          <p
            className="text-[#A1A1A6]"
            style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase" }}
          >
            003 / Architecture Showcase
          </p>
          <h2
            className="text-white mt-4"
            style={{
              fontSize: "clamp(32px, 8vw, 64px)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            Systems I&apos;ve
            <br />
            Shipped.
          </h2>
          <p className="text-[#A1A1A6] mt-6" style={{ fontSize: "13px", lineHeight: 1.7 }}>
            Production-grade architectures handling real traffic, real
            payments, and real edge cases.
          </p>
        </div>

        {/* ============================================================ */}
        {/*  01 — NAVI                                                   */}
        {/* ============================================================ */}
        <div className="mb-16 pt-8" style={{ borderTop: "1px solid #333333" }}>
          <div className="w-full grid grid-cols-1 gap-8">
            <div className="p-8 lg:p-10 flex flex-col justify-between" style={{ borderLeft: "1px solid #333333" }}>
              <div>
                <p className="text-[#A1A1A6]" style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase" }}>Case Study 01</p>
                <h3 className="text-white mt-4" style={{ fontSize: "36px", fontWeight: 700, letterSpacing: "-0.03em" }}>Navi</h3>
                <p className="text-[#A1A1A6] mt-2" style={{ fontSize: "13px", lineHeight: 1.7 }}>
                  Event check-in SaaS with token-based consumption pricing.
                  Multi-tenant data isolation via RLS policies. Real-time
                  WebSocket attendance feeds.
                </p>
              </div>
              <div className="mt-8 p-5" style={{ border: "1px solid #333333" }}>
                <p className="text-[#A1A1A6] mb-3" style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" }}>Architecture — MVC</p>
                <pre className="text-[#A1A1A6]" style={{ fontSize: "11px", fontFamily: "monospace", lineHeight: 1.9 }}>
{`src/
├─ controllers/
│  ├─ EventController.ts
│  ├─ TokenController.ts
│  └─ WebhookController.ts
├─ models/
│  ├─ Event.prisma
│  └─ Token.prisma
├─ services/
│  ├─ BillingService.ts
│  └─ RealtimeService.ts
└─ views/
   ├─ Dashboard.tsx
   └─ CheckIn.tsx`}
                </pre>
              </div>
            </div>
            <div className="flex items-center justify-center p-8 lg:p-12">
              <BrowserFrame url="navi.app/dashboard">
                <div className="flex justify-between items-baseline">
                  <p className="text-white" style={{ fontSize: "14px", fontWeight: 600 }}>Token Consumption</p>
                  <span className="text-[#A1A1A6]" style={{ fontSize: "10px", fontFamily: "monospace" }}>LIVE</span>
                </div>
                <div className="grid grid-cols-3 gap-0 mt-5">
                  {[
                    { label: "Tokens Burned", val: "12,847", sub: "+340 today" },
                    { label: "Active Events", val: "24", sub: "3 regions" },
                    { label: "Check-ins/hr", val: "1,204", sub: "P99: 89ms" },
                  ].map((s) => (
                    <div key={s.label} className="p-4" style={{ border: "1px solid #333333" }}>
                      <p className="text-[#A1A1A6]" style={{ fontSize: "8px", letterSpacing: "0.15em", textTransform: "uppercase" }}>{s.label}</p>
                      <p className="text-white mt-2" style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "-0.03em" }}>{s.val}</p>
                      <p className="text-[#A1A1A6] mt-1" style={{ fontSize: "9px", fontFamily: "monospace" }}>{s.sub}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-[#A1A1A6]" style={{ fontSize: "9px", fontFamily: "monospace" }}>quota.usage</span>
                    <span className="text-[#A1A1A6]" style={{ fontSize: "9px", fontFamily: "monospace" }}>64.2%</span>
                  </div>
                  <div className="w-full h-[2px]" style={{ background: "#333333" }}>
                    <div className="h-[2px]" style={{ width: "64.2%", background: "#A70947" }} />
                  </div>
                </div>
              </BrowserFrame>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/*  02 — COLOR RUN                                              */}
        {/* ============================================================ */}
        <div className="mb-16 pt-8" style={{ borderTop: "1px solid #333333" }}>
          <div className="w-full grid grid-cols-1 gap-8">
            <div className="flex items-center justify-center p-8 lg:p-12">
              <BrowserFrame url="colorrun.ciputra.ac.id/queue">
                <p className="text-white" style={{ fontSize: "14px", fontWeight: 600 }}>Ticketing Queue</p>
                <div className="mt-5 space-y-[2px]">
                  {[
                    { id: "TKT-0012", status: "Processing", active: true },
                    { id: "TKT-0013", status: "Validating", active: false },
                    { id: "TKT-0014", status: "In Queue", active: false },
                    { id: "TKT-0015", status: "In Queue", active: false },
                    { id: "TKT-0016", status: "In Queue", active: false },
                  ].map((t) => (
                    <div key={t.id} className="flex items-center justify-between px-4 py-3" style={{ border: `1px solid ${t.active ? "#A70947" : "#333333"}` }}>
                      <span className="text-white" style={{ fontSize: "11px", fontFamily: "monospace" }}>{t.id}</span>
                      <span style={{ fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: t.active ? "#A70947" : "#A1A1A6" }}>{t.status}</span>
                    </div>
                  ))}
                </div>
                <StatRow stats={[{ l: "Concurrent Users", v: "2,400" }, { l: "Throughput", v: "340 req/s" }, { l: "Error Rate", v: "0.02%" }]} />
              </BrowserFrame>
            </div>
            <div className="p-8 lg:p-10 flex flex-col justify-between" style={{ borderLeft: "1px solid #333333" }}>
              <div>
                <p className="text-[#A1A1A6]" style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase" }}>Case Study 02</p>
                <h3 className="text-white mt-4" style={{ fontSize: "36px", fontWeight: 700, letterSpacing: "-0.03em" }}>Color Run<br />2026</h3>
                <p className="text-[#A1A1A6] mt-3" style={{ fontSize: "13px", lineHeight: 1.7 }}>
                  Ciputra University's flagship event portal. Queue-based
                  registration handling 5,000+ concurrent users with Redis
                  pub/sub and optimistic locking to prevent overselling.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {["NEXT.JS", "REDIS", "BULL MQ", "POSTGRESQL"].map((t) => (
                  <span key={t} className="px-4 py-2 text-[#A1A1A6]" style={{ border: "1px solid #333333", fontSize: "9px", letterSpacing: "0.15em" }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/*  03 — VAULT (Internal Auth System)                           */}
        {/* ============================================================ */}
        <div className="mb-16 pt-8" style={{ borderTop: "1px solid #333333" }}>
          <div className="w-full grid grid-cols-1 gap-8">
            <div className="p-8 lg:p-10 flex flex-col justify-between" style={{ borderLeft: "1px solid #333333" }}>
              <div>
                <p className="text-[#A1A1A6]" style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase" }}>Case Study 03</p>
                <h3 className="text-white mt-4" style={{ fontSize: "36px", fontWeight: 700, letterSpacing: "-0.03em" }}>Vault</h3>
                <p className="text-[#A1A1A6] mt-2" style={{ fontSize: "13px", lineHeight: 1.7 }}>
                  Custom OAuth 2.0 identity provider with PKCE flow, refresh token rotation,
                  and RBAC policies. Handles 40k+ monthly active sessions across 6 client applications
                  with sub-100ms token introspection.
                </p>
              </div>
              <div className="mt-8 p-5" style={{ border: "1px solid #333333" }}>
                <p className="text-[#A1A1A6] mb-3" style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" }}>Auth Flow — PKCE</p>
                <pre className="text-[#A1A1A6]" style={{ fontSize: "11px", fontFamily: "monospace", lineHeight: 1.9 }}>
{`Client ──▶ /authorize?
           code_challenge=SHA256(v)
           response_type=code
       ◀── 302 redirect + auth_code

Client ──▶ /token
           code_verifier=v
           grant_type=authorization_code
       ◀── { access_token, refresh_token }

Client ──▶ /introspect
       ◀── { active: true, scope, exp }`}
                </pre>
              </div>
            </div>
            <div className="flex items-center justify-center p-8 lg:p-12">
              <BrowserFrame url="vault.internal/admin/sessions">
                <p className="text-white" style={{ fontSize: "14px", fontWeight: 600 }}>Session Monitor</p>
                <div className="grid grid-cols-3 gap-0 mt-5">
                  {[
                    { label: "Active Sessions", val: "3,847", sub: "6 clients" },
                    { label: "Token Rotations", val: "12.4k", sub: "/24hr" },
                    { label: "Introspect P99", val: "47ms", sub: "Redis-backed" },
                  ].map((s) => (
                    <div key={s.label} className="p-4" style={{ border: "1px solid #333333" }}>
                      <p className="text-[#A1A1A6]" style={{ fontSize: "8px", letterSpacing: "0.15em", textTransform: "uppercase" }}>{s.label}</p>
                      <p className="text-white mt-2" style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "-0.03em" }}>{s.val}</p>
                      <p className="text-[#A1A1A6] mt-1" style={{ fontSize: "9px", fontFamily: "monospace" }}>{s.sub}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 space-y-[2px]">
                  {[
                    { scope: "admin:write", client: "dashboard-web", exp: "2026-04-18T23:59" },
                    { scope: "events:read", client: "navi-mobile", exp: "2026-04-19T06:00" },
                    { scope: "users:manage", client: "crm-internal", exp: "2026-04-18T18:30" },
                  ].map((s) => (
                    <div key={s.client} className="flex items-center justify-between px-4 py-3" style={{ border: "1px solid #333333" }}>
                      <span className="text-white" style={{ fontSize: "11px", fontFamily: "monospace" }}>{s.scope}</span>
                      <span className="text-[#A1A1A6]" style={{ fontSize: "9px", fontFamily: "monospace" }}>{s.client}</span>
                    </div>
                  ))}
                </div>
              </BrowserFrame>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/*  04 — PULSE (Real-time Analytics Pipeline)                   */}
        {/* ============================================================ */}
        <div className="mb-16 pt-8" style={{ borderTop: "1px solid #333333" }}>
          <div className="w-full grid grid-cols-1 gap-8">
            <div className="flex items-center justify-center p-8 lg:p-12">
              <BrowserFrame url="pulse.internal/stream">
                <p className="text-white" style={{ fontSize: "14px", fontWeight: 600 }}>Event Stream</p>
                <p className="text-[#A1A1A6] mt-1" style={{ fontSize: "11px", fontFamily: "monospace" }}>kafka.consumer.group: pulse-ingest-v2</p>
                <div className="mt-5 space-y-[2px]">
                  {[
                    { topic: "page.viewed", partition: "P3", offset: "48,201,337", lag: "12" },
                    { topic: "button.clicked", partition: "P1", offset: "12,847,102", lag: "3" },
                    { topic: "form.submitted", partition: "P2", offset: "2,104,889", lag: "0" },
                    { topic: "error.thrown", partition: "P0", offset: "341,002", lag: "87" },
                  ].map((e) => (
                    <div key={e.topic} className="grid grid-cols-4 px-4 py-3" style={{ border: "1px solid #333333" }}>
                      <span className="text-white" style={{ fontSize: "11px", fontFamily: "monospace" }}>{e.topic}</span>
                      <span className="text-[#A1A1A6]" style={{ fontSize: "10px", fontFamily: "monospace" }}>{e.partition}</span>
                      <span className="text-[#A1A1A6]" style={{ fontSize: "10px", fontFamily: "monospace" }}>{e.offset}</span>
                      <span style={{ fontSize: "10px", fontFamily: "monospace", color: parseInt(e.lag) > 50 ? "#A70947" : "#A1A1A6" }}>lag: {e.lag}</span>
                    </div>
                  ))}
                </div>
                <StatRow stats={[{ l: "Events / sec", v: "8,400" }, { l: "Avg Latency", v: "23ms" }, { l: "Uptime", v: "99.97%" }]} />
              </BrowserFrame>
            </div>
            <div className="p-8 lg:p-10 flex flex-col justify-between" style={{ borderLeft: "1px solid #333333" }}>
              <div>
                <p className="text-[#A1A1A6]" style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase" }}>Case Study 04</p>
                <h3 className="text-white mt-4" style={{ fontSize: "36px", fontWeight: 700, letterSpacing: "-0.03em" }}>Pulse</h3>
                <p className="text-[#A1A1A6] mt-3" style={{ fontSize: "13px", lineHeight: 1.7 }}>
                  Real-time analytics pipeline ingesting 8,400 events/sec from
                  client SDKs. Kafka consumers partition data into ClickHouse
                  for sub-second OLAP queries. Custom session stitching
                  algorithm with 99.2% attribution accuracy.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {["KAFKA", "CLICKHOUSE", "NEXT.JS", "WEBSOCKET"].map((t) => (
                  <span key={t} className="px-4 py-2 text-[#A1A1A6]" style={{ border: "1px solid #333333", fontSize: "9px", letterSpacing: "0.15em" }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/*  05 — FORGE (CI/CD Platform)                                 */}
        {/* ============================================================ */}
        <div className="mb-16 pt-8" style={{ borderTop: "1px solid #333333" }}>
          <div className="w-full grid grid-cols-1 gap-8">
            <div className="p-8 lg:p-10 flex flex-col justify-between" style={{ borderLeft: "1px solid #333333" }}>
              <div>
                <p className="text-[#A1A1A6]" style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase" }}>Case Study 05</p>
                <h3 className="text-white mt-4" style={{ fontSize: "36px", fontWeight: 700, letterSpacing: "-0.03em" }}>Forge</h3>
                <p className="text-[#A1A1A6] mt-2" style={{ fontSize: "13px", lineHeight: 1.7 }}>
                  Internal CI/CD orchestration platform. DAG-based pipeline
                  execution with parallel stage scheduling, artifact caching
                  via S3-compatible storage, and Slack/Discord webhook
                  notifications on failure states.
                </p>
              </div>
              <div className="mt-8 p-5" style={{ border: "1px solid #333333" }}>
                <p className="text-[#A1A1A6] mb-3" style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" }}>Pipeline — DAG</p>
                <pre className="text-[#A1A1A6]" style={{ fontSize: "11px", fontFamily: "monospace", lineHeight: 1.9 }}>
{`[lint] ──┬──▶ [test:unit]
         │        │
         │        ▼
         ├──▶ [test:e2e] ──▶ [build]
         │                      │
         └──▶ [security:scan]   ▼
                           [deploy:staging]
                                │
                                ▼
                         [deploy:production]`}
                </pre>
              </div>
            </div>
            <div className="flex items-center justify-center p-8 lg:p-12">
              <BrowserFrame url="forge.internal/pipelines/main">
                <p className="text-white" style={{ fontSize: "14px", fontWeight: 600 }}>Pipeline #1,847</p>
                <p className="text-[#A1A1A6] mt-1" style={{ fontSize: "10px", fontFamily: "monospace" }}>branch: main • commit: a3f8c21</p>
                <div className="mt-5 space-y-[2px]">
                  {[
                    { stage: "lint", duration: "12s", status: "Passed" },
                    { stage: "test:unit", duration: "1m 34s", status: "Passed" },
                    { stage: "test:e2e", duration: "4m 12s", status: "Passed" },
                    { stage: "build", duration: "2m 08s", status: "Passed" },
                    { stage: "deploy:staging", duration: "47s", status: "Running" },
                    { stage: "deploy:production", duration: "—", status: "Queued" },
                  ].map((s) => (
                    <div key={s.stage} className="flex items-center justify-between px-4 py-3" style={{ border: `1px solid ${s.status === "Running" ? "#A70947" : "#333333"}` }}>
                      <span className="text-white" style={{ fontSize: "11px", fontFamily: "monospace" }}>{s.stage}</span>
                      <div className="flex gap-6">
                        <span className="text-[#A1A1A6]" style={{ fontSize: "10px", fontFamily: "monospace" }}>{s.duration}</span>
                        <span style={{ fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: s.status === "Running" ? "#A70947" : s.status === "Queued" ? "#333333" : "#A1A1A6" }}>{s.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </BrowserFrame>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/*  06 — RELAY (Webhook Gateway)                                */}
        {/* ============================================================ */}
        <div className="mb-16 pt-8" style={{ borderTop: "1px solid #333333" }}>
          <div className="w-full grid grid-cols-1 gap-8">
            <div className="flex items-center justify-center p-8 lg:p-12">
              <BrowserFrame url="relay.internal/endpoints">
                <p className="text-white" style={{ fontSize: "14px", fontWeight: 600 }}>Webhook Endpoints</p>
                <div className="mt-5 space-y-[2px]">
                  {[
                    { endpoint: "/hooks/stripe", method: "POST", success: "99.8%", last: "2s ago" },
                    { endpoint: "/hooks/github", method: "POST", success: "100%", last: "14s ago" },
                    { endpoint: "/hooks/sendgrid", method: "POST", success: "99.6%", last: "1m ago" },
                    { endpoint: "/hooks/slack", method: "POST", success: "100%", last: "34s ago" },
                    { endpoint: "/hooks/custom/crm", method: "POST", success: "98.2%", last: "8s ago" },
                  ].map((e) => (
                    <div key={e.endpoint} className="grid grid-cols-4 px-4 py-3 items-center" style={{ border: "1px solid #333333" }}>
                      <span className="text-white col-span-1" style={{ fontSize: "11px", fontFamily: "monospace" }}>{e.endpoint}</span>
                      <span className="text-[#A1A1A6]" style={{ fontSize: "9px", fontFamily: "monospace" }}>{e.method}</span>
                      <span className="text-[#A1A1A6]" style={{ fontSize: "10px", fontFamily: "monospace" }}>{e.success}</span>
                      <span className="text-[#A1A1A6] text-right" style={{ fontSize: "9px", fontFamily: "monospace" }}>{e.last}</span>
                    </div>
                  ))}
                </div>
                <StatRow stats={[{ l: "Daily Volume", v: "142k" }, { l: "Retry Queue", v: "23" }, { l: "Avg Latency", v: "180ms" }]} />
              </BrowserFrame>
            </div>
            <div className="p-8 lg:p-10 flex flex-col justify-between" style={{ borderLeft: "1px solid #333333" }}>
              <div>
                <p className="text-[#A1A1A6]" style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase" }}>Case Study 06</p>
                <h3 className="text-white mt-4" style={{ fontSize: "36px", fontWeight: 700, letterSpacing: "-0.03em" }}>Relay</h3>
                <p className="text-[#A1A1A6] mt-3" style={{ fontSize: "13px", lineHeight: 1.7 }}>
                  Centralized webhook ingestion gateway. Signature verification
                  (HMAC-SHA256), exponential backoff retry with dead-letter queues,
                  and fan-out routing to internal consumers. Processes 142k
                  webhooks daily with idempotency guarantees via composite keys.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {["NODE.JS", "BULL MQ", "REDIS", "POSTGRESQL"].map((t) => (
                  <span key={t} className="px-4 py-2 text-[#A1A1A6]" style={{ border: "1px solid #333333", fontSize: "9px", letterSpacing: "0.15em" }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/*  07 — ATLAS (Internal Design System)                         */}
        {/* ============================================================ */}
        <div className="mb-16 pt-8" style={{ borderTop: "1px solid #333333" }}>
          <div className="w-full grid grid-cols-1 gap-8">
            <div className="p-8 lg:p-10 flex flex-col justify-between" style={{ borderLeft: "1px solid #333333" }}>
              <div>
                <p className="text-[#A1A1A6]" style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase" }}>Case Study 07</p>
                <h3 className="text-white mt-4" style={{ fontSize: "36px", fontWeight: 700, letterSpacing: "-0.03em" }}>Atlas</h3>
                <p className="text-[#A1A1A6] mt-2" style={{ fontSize: "13px", lineHeight: 1.7 }}>
                  Monorepo-hosted design system powering 4 production apps.
                  Compound component architecture with composable slots,
                  CSS-variable-driven theming, and automated visual regression
                  testing via Chromatic. Published to private npm registry
                  with semantic versioning.
                </p>
              </div>
              <div className="mt-8 p-5" style={{ border: "1px solid #333333" }}>
                <p className="text-[#A1A1A6] mb-3" style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" }}>Package — Exports</p>
                <pre className="text-[#A1A1A6]" style={{ fontSize: "11px", fontFamily: "monospace", lineHeight: 1.9 }}>
{`@org/atlas-ui
├─ primitives/
│  ├─ Button (12 variants)
│  ├─ Input  (text, search, otp)
│  └─ Dialog (modal, drawer, alert)
├─ compositions/
│  ├─ DataTable
│  ├─ CommandPalette
│  └─ NavigationMenu
├─ tokens/
│  ├─ colors.css (light + dark)
│  └─ spacing.css (4px grid)
└─ package.json  v3.12.0`}
                </pre>
              </div>
            </div>
            <div className="flex items-center justify-center p-8 lg:p-12">
              <BrowserFrame url="atlas.internal/components">
                <p className="text-white" style={{ fontSize: "14px", fontWeight: 600 }}>Component Registry</p>
                <p className="text-[#A1A1A6] mt-1" style={{ fontSize: "10px", fontFamily: "monospace" }}>v3.12.0 • 47 components • 4 consumers</p>
                <div className="mt-5 space-y-[2px]">
                  {[
                    { name: "Button", variants: 12, tests: 48, coverage: "100%" },
                    { name: "DataTable", variants: 4, tests: 32, coverage: "96%" },
                    { name: "Dialog", variants: 3, tests: 24, coverage: "100%" },
                    { name: "CommandPalette", variants: 2, tests: 18, coverage: "94%" },
                    { name: "NavigationMenu", variants: 6, tests: 22, coverage: "98%" },
                  ].map((c) => (
                    <div key={c.name} className="grid grid-cols-4 px-4 py-3 items-center" style={{ border: "1px solid #333333" }}>
                      <span className="text-white" style={{ fontSize: "11px", fontFamily: "monospace" }}>{c.name}</span>
                      <span className="text-[#A1A1A6]" style={{ fontSize: "10px", fontFamily: "monospace" }}>{c.variants} var</span>
                      <span className="text-[#A1A1A6]" style={{ fontSize: "10px", fontFamily: "monospace" }}>{c.tests} tests</span>
                      <span className="text-[#A1A1A6] text-right" style={{ fontSize: "10px", fontFamily: "monospace" }}>{c.coverage}</span>
                    </div>
                  ))}
                </div>
                <StatRow stats={[{ l: "Bundle Size", v: "18kb" }, { l: "Tree-Shakeable", v: "Yes" }, { l: "Visual Tests", v: "312" }]} />
              </BrowserFrame>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Desktop: horizontal scroll layout
  return (
    <section
      ref={sectionRef}
      className="h-screen overflow-hidden"
      style={{ background: "#000000", fontFamily: "Inter, sans-serif" }}
    >
      <div
        ref={trackRef}
        className="h-full flex"
        style={{ width: `${totalPanels * 100}vw` }}
      >
        {/* INTRO PANEL */}
        <div className="w-screen h-full flex items-end px-16 pb-24 shrink-0">
          <div className="max-w-[560px]">
            <p className="text-[#A1A1A6]" style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase" }}>003 / Architecture Showcase</p>
            <h2 className="text-white mt-4" style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1 }}>Systems I&apos;ve<br />Shipped.</h2>
            <p className="text-[#A1A1A6] mt-6" style={{ fontSize: "13px", lineHeight: 1.7 }}>Production-grade architectures handling real traffic, real payments, and real edge cases. Scroll horizontally.</p>
            <div className="mt-8 flex items-center gap-3">
              <div className="w-12 h-px" style={{ background: "#333333" }} />
              <span className="text-[#A1A1A6]" style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" }}>Drag / Scroll →</span>
            </div>
          </div>
        </div>

        {/* 01 — NAVI */}
        <div className="w-screen h-full flex items-center shrink-0 px-16">
          <div className="w-full grid grid-cols-[400px_1fr] gap-0 max-w-[1200px]">
            <div className="p-10 flex flex-col justify-between" style={{ borderLeft: "1px solid #333333" }}>
              <div>
                <p className="text-[#A1A1A6]" style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase" }}>Case Study 01</p>
                <h3 className="text-white mt-4" style={{ fontSize: "36px", fontWeight: 700, letterSpacing: "-0.03em" }}>Navi</h3>
                <p className="text-[#A1A1A6] mt-2" style={{ fontSize: "13px", lineHeight: 1.7 }}>Event check-in SaaS with token-based consumption pricing. Multi-tenant data isolation via RLS policies. Real-time WebSocket attendance feeds.</p>
              </div>
              <div className="mt-8 p-5" style={{ border: "1px solid #333333" }}>
                <p className="text-[#A1A1A6] mb-3" style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" }}>Architecture — MVC</p>
                <pre className="text-[#A1A1A6]" style={{ fontSize: "11px", fontFamily: "monospace", lineHeight: 1.9 }}>{`src/\n├─ controllers/\n│  ├─ EventController.ts\n│  ├─ TokenController.ts\n│  └─ WebhookController.ts\n├─ models/\n│  ├─ Event.prisma\n│  └─ Token.prisma\n├─ services/\n│  ├─ BillingService.ts\n│  └─ RealtimeService.ts\n└─ views/\n   ├─ Dashboard.tsx\n   └─ CheckIn.tsx`}</pre>
              </div>
            </div>
            <div className="flex items-center justify-center p-12">
              <BrowserFrame url="navi.app/dashboard">
                <div className="flex justify-between items-baseline">
                  <p className="text-white" style={{ fontSize: "14px", fontWeight: 600 }}>Token Consumption</p>
                  <span className="text-[#A1A1A6]" style={{ fontSize: "10px", fontFamily: "monospace" }}>LIVE</span>
                </div>
                <div className="grid grid-cols-3 gap-0 mt-5">
                  {[{ label: "Tokens Burned", val: "12,847", sub: "+340 today" }, { label: "Active Events", val: "24", sub: "3 regions" }, { label: "Check-ins/hr", val: "1,204", sub: "P99: 89ms" }].map((s) => (
                    <div key={s.label} className="p-4" style={{ border: "1px solid #333333" }}>
                      <p className="text-[#A1A1A6]" style={{ fontSize: "8px", letterSpacing: "0.15em", textTransform: "uppercase" }}>{s.label}</p>
                      <p className="text-white mt-2" style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "-0.03em" }}>{s.val}</p>
                      <p className="text-[#A1A1A6] mt-1" style={{ fontSize: "9px", fontFamily: "monospace" }}>{s.sub}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-[#A1A1A6]" style={{ fontSize: "9px", fontFamily: "monospace" }}>quota.usage</span>
                    <span className="text-[#A1A1A6]" style={{ fontSize: "9px", fontFamily: "monospace" }}>64.2%</span>
                  </div>
                  <div className="w-full h-[2px]" style={{ background: "#333333" }}>
                    <div className="h-[2px]" style={{ width: "64.2%", background: "#A70947" }} />
                  </div>
                </div>
              </BrowserFrame>
            </div>
          </div>
        </div>

        {/* 02 — COLOR RUN */}
        <div className="w-screen h-full flex items-center shrink-0 px-16">
          <div className="w-full grid grid-cols-[1fr_400px] gap-0 max-w-[1200px]">
            <div className="flex items-center justify-center p-12">
              <BrowserFrame url="colorrun.ciputra.ac.id/queue">
                <p className="text-white" style={{ fontSize: "14px", fontWeight: 600 }}>Ticketing Queue</p>
                <div className="mt-5 space-y-[2px]">
                  {[{ id: "TKT-0012", status: "Processing", active: true }, { id: "TKT-0013", status: "Validating", active: false }, { id: "TKT-0014", status: "In Queue", active: false }, { id: "TKT-0015", status: "In Queue", active: false }, { id: "TKT-0016", status: "In Queue", active: false }].map((t) => (
                    <div key={t.id} className="flex items-center justify-between px-4 py-3" style={{ border: `1px solid ${t.active ? "#A70947" : "#333333"}` }}>
                      <span className="text-white" style={{ fontSize: "11px", fontFamily: "monospace" }}>{t.id}</span>
                      <span style={{ fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: t.active ? "#A70947" : "#A1A1A6" }}>{t.status}</span>
                    </div>
                  ))}
                </div>
                <StatRow stats={[{ l: "Concurrent Users", v: "2,400" }, { l: "Throughput", v: "340 req/s" }, { l: "Error Rate", v: "0.02%" }]} />
              </BrowserFrame>
            </div>
            <div className="p-10 flex flex-col justify-between" style={{ borderLeft: "1px solid #333333" }}>
              <div>
                <p className="text-[#A1A1A6]" style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase" }}>Case Study 02</p>
                <h3 className="text-white mt-4" style={{ fontSize: "36px", fontWeight: 700, letterSpacing: "-0.03em" }}>Color Run<br />2026</h3>
                <p className="text-[#A1A1A6] mt-3" style={{ fontSize: "13px", lineHeight: 1.7 }}>Ciputra University&apos;s flagship event portal. Queue-based registration handling 5,000+ concurrent users with Redis pub/sub and optimistic locking to prevent overselling.</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {["NEXT.JS", "REDIS", "BULL MQ", "POSTGRESQL"].map((t) => (
                  <span key={t} className="px-4 py-2 text-[#A1A1A6]" style={{ border: "1px solid #333333", fontSize: "9px", letterSpacing: "0.15em" }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 03 — VAULT */}
        <div className="w-screen h-full flex items-center shrink-0 px-16">
          <div className="w-full grid grid-cols-[400px_1fr] gap-0 max-w-[1200px]">
            <div className="p-10 flex flex-col justify-between" style={{ borderLeft: "1px solid #333333" }}>
              <div>
                <p className="text-[#A1A1A6]" style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase" }}>Case Study 03</p>
                <h3 className="text-white mt-4" style={{ fontSize: "36px", fontWeight: 700, letterSpacing: "-0.03em" }}>Vault</h3>
                <p className="text-[#A1A1A6] mt-2" style={{ fontSize: "13px", lineHeight: 1.7 }}>Custom OAuth 2.0 identity provider with PKCE flow, refresh token rotation, and RBAC policies. Handles 40k+ monthly active sessions across 6 client applications with sub-100ms token introspection.</p>
              </div>
              <div className="mt-8 p-5" style={{ border: "1px solid #333333" }}>
                <p className="text-[#A1A1A6] mb-3" style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" }}>Auth Flow — PKCE</p>
                <pre className="text-[#A1A1A6]" style={{ fontSize: "11px", fontFamily: "monospace", lineHeight: 1.9 }}>{`Client ──▶ /authorize?\n           code_challenge=SHA256(v)\n           response_type=code\n       ◀── 302 redirect + auth_code\n\nClient ──▶ /token\n           code_verifier=v\n           grant_type=authorization_code\n       ◀── { access_token, refresh_token }\n\nClient ──▶ /introspect\n       ◀── { active: true, scope, exp }`}</pre>
              </div>
            </div>
            <div className="flex items-center justify-center p-12">
              <BrowserFrame url="vault.internal/admin/sessions">
                <p className="text-white" style={{ fontSize: "14px", fontWeight: 600 }}>Session Monitor</p>
                <div className="grid grid-cols-3 gap-0 mt-5">
                  {[{ label: "Active Sessions", val: "3,847", sub: "6 clients" }, { label: "Token Rotations", val: "12.4k", sub: "/24hr" }, { label: "Introspect P99", val: "47ms", sub: "Redis-backed" }].map((s) => (
                    <div key={s.label} className="p-4" style={{ border: "1px solid #333333" }}>
                      <p className="text-[#A1A1A6]" style={{ fontSize: "8px", letterSpacing: "0.15em", textTransform: "uppercase" }}>{s.label}</p>
                      <p className="text-white mt-2" style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "-0.03em" }}>{s.val}</p>
                      <p className="text-[#A1A1A6] mt-1" style={{ fontSize: "9px", fontFamily: "monospace" }}>{s.sub}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 space-y-[2px]">
                  {[{ scope: "admin:write", client: "dashboard-web" }, { scope: "events:read", client: "navi-mobile" }, { scope: "users:manage", client: "crm-internal" }].map((s) => (
                    <div key={s.client} className="flex items-center justify-between px-4 py-3" style={{ border: "1px solid #333333" }}>
                      <span className="text-white" style={{ fontSize: "11px", fontFamily: "monospace" }}>{s.scope}</span>
                      <span className="text-[#A1A1A6]" style={{ fontSize: "9px", fontFamily: "monospace" }}>{s.client}</span>
                    </div>
                  ))}
                </div>
              </BrowserFrame>
            </div>
          </div>
        </div>

        {/* 04 — PULSE */}
        <div className="w-screen h-full flex items-center shrink-0 px-16">
          <div className="w-full grid grid-cols-[1fr_400px] gap-0 max-w-[1200px]">
            <div className="flex items-center justify-center p-12">
              <BrowserFrame url="pulse.internal/stream">
                <p className="text-white" style={{ fontSize: "14px", fontWeight: 600 }}>Event Stream</p>
                <p className="text-[#A1A1A6] mt-1" style={{ fontSize: "11px", fontFamily: "monospace" }}>kafka.consumer.group: pulse-ingest-v2</p>
                <div className="mt-5 space-y-[2px]">
                  {[{ topic: "page.viewed", partition: "P3", offset: "48,201,337", lag: "12" }, { topic: "button.clicked", partition: "P1", offset: "12,847,102", lag: "3" }, { topic: "form.submitted", partition: "P2", offset: "2,104,889", lag: "0" }, { topic: "error.thrown", partition: "P0", offset: "341,002", lag: "87" }].map((e) => (
                    <div key={e.topic} className="grid grid-cols-4 px-4 py-3" style={{ border: "1px solid #333333" }}>
                      <span className="text-white" style={{ fontSize: "11px", fontFamily: "monospace" }}>{e.topic}</span>
                      <span className="text-[#A1A1A6]" style={{ fontSize: "10px", fontFamily: "monospace" }}>{e.partition}</span>
                      <span className="text-[#A1A1A6]" style={{ fontSize: "10px", fontFamily: "monospace" }}>{e.offset}</span>
                      <span style={{ fontSize: "10px", fontFamily: "monospace", color: parseInt(e.lag) > 50 ? "#A70947" : "#A1A1A6" }}>lag: {e.lag}</span>
                    </div>
                  ))}
                </div>
                <StatRow stats={[{ l: "Events / sec", v: "8,400" }, { l: "Avg Latency", v: "23ms" }, { l: "Uptime", v: "99.97%" }]} />
              </BrowserFrame>
            </div>
            <div className="p-10 flex flex-col justify-between" style={{ borderLeft: "1px solid #333333" }}>
              <div>
                <p className="text-[#A1A1A6]" style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase" }}>Case Study 04</p>
                <h3 className="text-white mt-4" style={{ fontSize: "36px", fontWeight: 700, letterSpacing: "-0.03em" }}>Pulse</h3>
                <p className="text-[#A1A1A6] mt-3" style={{ fontSize: "13px", lineHeight: 1.7 }}>Real-time analytics pipeline ingesting 8,400 events/sec from client SDKs. Kafka consumers partition data into ClickHouse for sub-second OLAP queries.</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {["KAFKA", "CLICKHOUSE", "NEXT.JS", "WEBSOCKET"].map((t) => (
                  <span key={t} className="px-4 py-2 text-[#A1A1A6]" style={{ border: "1px solid #333333", fontSize: "9px", letterSpacing: "0.15em" }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 05 — FORGE */}
        <div className="w-screen h-full flex items-center shrink-0 px-16">
          <div className="w-full grid grid-cols-[400px_1fr] gap-0 max-w-[1200px]">
            <div className="p-10 flex flex-col justify-between" style={{ borderLeft: "1px solid #333333" }}>
              <div>
                <p className="text-[#A1A1A6]" style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase" }}>Case Study 05</p>
                <h3 className="text-white mt-4" style={{ fontSize: "36px", fontWeight: 700, letterSpacing: "-0.03em" }}>Forge</h3>
                <p className="text-[#A1A1A6] mt-2" style={{ fontSize: "13px", lineHeight: 1.7 }}>Internal CI/CD orchestration platform. DAG-based pipeline execution with parallel stage scheduling and artifact caching.</p>
              </div>
              <div className="mt-8 p-5" style={{ border: "1px solid #333333" }}>
                <p className="text-[#A1A1A6] mb-3" style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" }}>Pipeline — DAG</p>
                <pre className="text-[#A1A1A6]" style={{ fontSize: "11px", fontFamily: "monospace", lineHeight: 1.9 }}>{`[lint] ──┬──▶ [test:unit]\n         │        │\n         │        ▼\n         ├──▶ [test:e2e] ──▶ [build]\n         │                      │\n         └──▶ [security:scan]   ▼\n                           [deploy:staging]\n                                │\n                                ▼\n                         [deploy:production]`}</pre>
              </div>
            </div>
            <div className="flex items-center justify-center p-12">
              <BrowserFrame url="forge.internal/pipelines/main">
                <p className="text-white" style={{ fontSize: "14px", fontWeight: 600 }}>Pipeline #1,847</p>
                <p className="text-[#A1A1A6] mt-1" style={{ fontSize: "10px", fontFamily: "monospace" }}>branch: main • commit: a3f8c21</p>
                <div className="mt-5 space-y-[2px]">
                  {[{ stage: "lint", duration: "12s", status: "Passed" }, { stage: "test:unit", duration: "1m 34s", status: "Passed" }, { stage: "test:e2e", duration: "4m 12s", status: "Passed" }, { stage: "build", duration: "2m 08s", status: "Passed" }, { stage: "deploy:staging", duration: "47s", status: "Running" }, { stage: "deploy:production", duration: "—", status: "Queued" }].map((s) => (
                    <div key={s.stage} className="flex items-center justify-between px-4 py-3" style={{ border: `1px solid ${s.status === "Running" ? "#A70947" : "#333333"}` }}>
                      <span className="text-white" style={{ fontSize: "11px", fontFamily: "monospace" }}>{s.stage}</span>
                      <div className="flex gap-6">
                        <span className="text-[#A1A1A6]" style={{ fontSize: "10px", fontFamily: "monospace" }}>{s.duration}</span>
                        <span style={{ fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: s.status === "Running" ? "#A70947" : s.status === "Queued" ? "#333333" : "#A1A1A6" }}>{s.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </BrowserFrame>
            </div>
          </div>
        </div>

        {/* 06 — RELAY */}
        <div className="w-screen h-full flex items-center shrink-0 px-16">
          <div className="w-full grid grid-cols-[1fr_400px] gap-0 max-w-[1200px]">
            <div className="flex items-center justify-center p-12">
              <BrowserFrame url="relay.internal/endpoints">
                <p className="text-white" style={{ fontSize: "14px", fontWeight: 600 }}>Webhook Endpoints</p>
                <div className="mt-5 space-y-[2px]">
                  {[{ endpoint: "/hooks/stripe", method: "POST", success: "99.8%", last: "2s ago" }, { endpoint: "/hooks/github", method: "POST", success: "100%", last: "14s ago" }, { endpoint: "/hooks/sendgrid", method: "POST", success: "99.6%", last: "1m ago" }, { endpoint: "/hooks/slack", method: "POST", success: "100%", last: "34s ago" }, { endpoint: "/hooks/custom/crm", method: "POST", success: "98.2%", last: "8s ago" }].map((e) => (
                    <div key={e.endpoint} className="grid grid-cols-4 px-4 py-3 items-center" style={{ border: "1px solid #333333" }}>
                      <span className="text-white col-span-1" style={{ fontSize: "11px", fontFamily: "monospace" }}>{e.endpoint}</span>
                      <span className="text-[#A1A1A6]" style={{ fontSize: "9px", fontFamily: "monospace" }}>{e.method}</span>
                      <span className="text-[#A1A1A6]" style={{ fontSize: "10px", fontFamily: "monospace" }}>{e.success}</span>
                      <span className="text-[#A1A1A6] text-right" style={{ fontSize: "9px", fontFamily: "monospace" }}>{e.last}</span>
                    </div>
                  ))}
                </div>
                <StatRow stats={[{ l: "Daily Volume", v: "142k" }, { l: "Retry Queue", v: "23" }, { l: "Avg Latency", v: "180ms" }]} />
              </BrowserFrame>
            </div>
            <div className="p-10 flex flex-col justify-between" style={{ borderLeft: "1px solid #333333" }}>
              <div>
                <p className="text-[#A1A1A6]" style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase" }}>Case Study 06</p>
                <h3 className="text-white mt-4" style={{ fontSize: "36px", fontWeight: 700, letterSpacing: "-0.03em" }}>Relay</h3>
                <p className="text-[#A1A1A6] mt-3" style={{ fontSize: "13px", lineHeight: 1.7 }}>Centralized webhook ingestion gateway with signature verification, exponential backoff retry, and fan-out routing.</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {["NODE.JS", "BULL MQ", "REDIS", "POSTGRESQL"].map((t) => (
                  <span key={t} className="px-4 py-2 text-[#A1A1A6]" style={{ border: "1px solid #333333", fontSize: "9px", letterSpacing: "0.15em" }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 07 — ATLAS */}
        <div className="w-screen h-full flex items-center shrink-0 px-16">
          <div className="w-full grid grid-cols-[400px_1fr] gap-0 max-w-[1200px]">
            <div className="p-10 flex flex-col justify-between" style={{ borderLeft: "1px solid #333333" }}>
              <div>
                <p className="text-[#A1A1A6]" style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase" }}>Case Study 07</p>
                <h3 className="text-white mt-4" style={{ fontSize: "36px", fontWeight: 700, letterSpacing: "-0.03em" }}>Atlas</h3>
                <p className="text-[#A1A1A6] mt-2" style={{ fontSize: "13px", lineHeight: 1.7 }}>Monorepo-hosted design system powering 4 production apps. Compound component architecture with composable slots and CSS-variable theming.</p>
              </div>
              <div className="mt-8 p-5" style={{ border: "1px solid #333333" }}>
                <p className="text-[#A1A1A6] mb-3" style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" }}>Package — Exports</p>
                <pre className="text-[#A1A1A6]" style={{ fontSize: "11px", fontFamily: "monospace", lineHeight: 1.9 }}>{`@org/atlas-ui\n├─ primitives/\n│  ├─ Button (12 variants)\n│  ├─ Input  (text, search, otp)\n│  └─ Dialog (modal, drawer, alert)\n├─ compositions/\n│  ├─ DataTable\n│  ├─ CommandPalette\n│  └─ NavigationMenu\n├─ tokens/\n│  ├─ colors.css (light + dark)\n│  └─ spacing.css (4px grid)\n└─ package.json  v3.12.0`}</pre>
              </div>
            </div>
            <div className="flex items-center justify-center p-12">
              <BrowserFrame url="atlas.internal/components">
                <p className="text-white" style={{ fontSize: "14px", fontWeight: 600 }}>Component Registry</p>
                <p className="text-[#A1A1A6] mt-1" style={{ fontSize: "10px", fontFamily: "monospace" }}>v3.12.0 • 47 components • 4 consumers</p>
                <div className="mt-5 space-y-[2px]">
                  {[{ name: "Button", variants: 12, tests: 48, coverage: "100%" }, { name: "DataTable", variants: 4, tests: 32, coverage: "96%" }, { name: "Dialog", variants: 3, tests: 24, coverage: "100%" }, { name: "CommandPalette", variants: 2, tests: 18, coverage: "94%" }, { name: "NavigationMenu", variants: 6, tests: 22, coverage: "98%" }].map((c) => (
                    <div key={c.name} className="grid grid-cols-4 px-4 py-3 items-center" style={{ border: "1px solid #333333" }}>
                      <span className="text-white" style={{ fontSize: "11px", fontFamily: "monospace" }}>{c.name}</span>
                      <span className="text-[#A1A1A6]" style={{ fontSize: "10px", fontFamily: "monospace" }}>{c.variants} var</span>
                      <span className="text-[#A1A1A6]" style={{ fontSize: "10px", fontFamily: "monospace" }}>{c.tests} tests</span>
                      <span className="text-[#A1A1A6] text-right" style={{ fontSize: "10px", fontFamily: "monospace" }}>{c.coverage}</span>
                    </div>
                  ))}
                </div>
                <StatRow stats={[{ l: "Bundle Size", v: "18kb" }, { l: "Tree-Shakeable", v: "Yes" }, { l: "Visual Tests", v: "312" }]} />
              </BrowserFrame>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
