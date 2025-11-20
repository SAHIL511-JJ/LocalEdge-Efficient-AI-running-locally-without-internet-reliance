import Link from "next/link";

const stats = [
  { label: "Latency", value: "120ms" },
  { label: "Models", value: "12+" },
  { label: "Sessions / day", value: "8k" },
];

const features = [
  {
    title: "Real-time dialogue",
    description:
      "Precision streaming responses with contextual memory for every conversation.",
  },
  {
    title: "Team-ready",
    description:
      "Spaces, shared workspaces, and curated prompts to keep teams in flow.",
  },
  {
    title: "Enterprise guardrails",
    description:
      "Granular permissions, audit-ready logging, and role-based access.",
  },
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary-50 via-white to-white">
      <div className="pointer-events-none absolute -top-32 right-0 h-[420px] w-[420px] rounded-full bg-primary-500/15 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-[-10%] h-[320px] w-[480px] rounded-full bg-primary-100 blur-[140px]" />

      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-16 px-6 py-16 lg:py-24">
        <header className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary-500/80">
                Aurora Studio
              </p>
              <h1 className="text-4xl font-semibold leading-tight text-slate-900 md:text-5xl lg:text-6xl">
                Design premium AI conversations with clarity and intention.
              </h1>
              <p className="text-base text-slate-600 md:text-lg">
                A glassmorphic workspace for high-velocity teams. Craft
                intelligent client experiences, review responses, and deploy new
                automations from one refined surface.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/chat"
                className="inline-flex items-center justify-center rounded-2xl bg-primary-500 px-6 py-3 text-sm font-medium text-white shadow-glass transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                Launch Console
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200/80 px-6 py-3 text-sm font-medium text-slate-700 backdrop-blur-md transition hover:border-slate-300 hover:bg-white/70"
              >
                Create Workspace
              </Link>
            </div>

            <dl className="grid gap-6 border-t border-white/60 pt-6 text-sm text-slate-500 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dd className="text-2xl font-semibold text-slate-900">
                    {stat.value}
                  </dd>
                  <dt className="mt-1 uppercase tracking-widest text-xs">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>

          <div className="glass-card border border-white/50 bg-white/70 shadow-glass backdrop-blur-2xl">
            <div className="flex items-center justify-between rounded-2xl border border-white/60 bg-white/70 px-5 py-4 text-sm text-slate-600">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                  Live preview
                </p>
                <p className="mt-1 font-semibold text-slate-900">
                  DeepSeek x Ollama
                </p>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-600">
                Online
              </span>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-white/60 bg-white/60 p-4">
                <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                  Response quality
                </p>
                <div className="mt-3 h-2 rounded-full bg-slate-200">
                  <div className="h-full w-4/5 rounded-full bg-primary-500" />
                </div>
              </div>

              <div className="rounded-2xl border border-white/60 bg-white/70 p-4">
                <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                  Conversation health
                </p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li className="flex items-center justify-between">
                    <span>Context retention</span>
                    <span className="font-semibold text-slate-900">94%</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Latency</span>
                    <span className="font-semibold text-slate-900">Low</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Hand-offs</span>
                    <span className="font-semibold text-slate-900">Seamless</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-white/60 bg-white/70 p-6 shadow-glass backdrop-blur-2xl transition hover:-translate-y-1 hover:shadow-xl"
            >
              <p className="text-xs uppercase tracking-[0.35em] text-primary-500">
                Feature
              </p>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                {feature.description}
              </p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
