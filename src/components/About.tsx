import Section from './Section'

const pillars = [
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
        />
      </svg>
    ),
    title: 'Full-Stack Engineering',
    body: 'React, TypeScript, Next.js on the frontend; Python, Django, FastAPI on the backend. End-to-end ownership from database schema to production deployment.',
    accent: 'var(--primary)',
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
        />
      </svg>
    ),
    title: 'HSE & Compliance Systems',
    body: 'IOSH-certified professional who builds safety-critical tools — incident management, compliance reporting, risk assessment dashboards — that keep teams and regulators aligned.',
    accent: '#22c55e',
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
        />
      </svg>
    ),
    title: 'Data Automation & Analytics',
    body: 'Automated reporting pipelines that cut manual effort by 80%+. Power BI dashboards, real-time KPI tracking, and workflow automation for enterprise and SME clients.',
    accent: 'var(--accent)',
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z"
        />
      </svg>
    ),
    title: 'DevOps & Cloud',
    body: 'Docker, CI/CD pipelines, AWS infrastructure and GitHub Actions. Built to ship reliably — from commit to production with minimal friction.',
    accent: '#a78bfa',
  },
]

export default function About() {
  return (
    <Section id="about">
      {/* Expertise pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {pillars.map(p => (
          <div
            key={p.title}
            className="group relative p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1"
            style={{
              background: 'var(--card-bg)',
              borderColor: 'var(--border)',
            }}
          >
            <div
              className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4"
              style={{ background: `${p.accent}18`, color: p.accent }}
              aria-hidden="true"
            >
              {p.icon}
            </div>
            <h3
              className="text-base font-bold mb-2"
              style={{ color: 'var(--text)', fontFamily: 'inherit' }}
            >
              {p.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
              {p.body}
            </p>
            {/* subtle left accent line on hover */}
            <span
              className="absolute left-0 top-6 bottom-6 w-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: p.accent }}
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
    </Section>
  )
}
