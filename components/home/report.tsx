'use client'

import { useState } from 'react'
import { CircleHelp, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SectionIntro, useHomeCopy } from './home-state'

export function Report() {
  const { h } = useHomeCopy()
  const r = h.report
  const [active, setActive] = useState(0)
  const f = r.findings[active]

  return (
    <section id="report" aria-labelledby="report-title" className="scroll-mt-4 bg-ivory text-ink">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-5 py-16 md:px-10 lg:py-24">
        <SectionIntro id="report-title" eyebrow={r.eyebrow} title={r.title} lede={r.lede} />

        <article aria-label={`${r.windowTitle} — ${r.sample}`} className="overflow-hidden rounded-xl border border-ink/20 bg-ivory shadow-2xl shadow-ink/10">
          <header className="flex flex-col gap-2 border-b border-ink/15 bg-ink px-5 py-4 text-ivory sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-semibold">{r.windowTitle}</span>
              <span className="font-mono text-xs text-ivory/65">hartwell-demo.example</span>
            </div>
            <span className="w-fit rounded-sm border border-lime px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-lime">
              {r.sample}
            </span>
          </header>

          <div className="flex flex-col gap-3 border-b border-ink/10 bg-mist/50 px-5 py-4 text-sm md:flex-row md:items-center md:gap-8">
            <span className="font-mono text-[11px] uppercase tracking-wider text-ink/60">{r.scope}</span>
            <span>
              <span className="font-semibold">{r.scopeAnalyzed}: </span>
              {r.scopePages.join(' · ')}
            </span>
            <span className="text-ink/65">
              <span className="font-semibold">{r.scopeSkipped}: </span>
              {r.scopeSkippedPages.join(' · ')}
            </span>
          </div>

          <div className="grid lg:grid-cols-[340px_minmax(0,1fr)]">
            <div className="border-b border-ink/10 lg:border-r lg:border-b-0">
              <h3 className="px-5 pt-5 pb-2 font-mono text-[11px] uppercase tracking-wider text-ink/60">{r.findingsHeading}</h3>
              <ul aria-label={r.findingsLabel} className="flex flex-col pb-3">
                {r.findings.map((item, i) => (
                  <li key={item.title}>
                    <button
                      type="button"
                      aria-pressed={i === active}
                      onClick={() => setActive(i)}
                      className={cn(
                        'flex w-full items-start gap-3 border-l-2 px-5 py-3 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ink',
                        i === active ? 'border-ink bg-mist/70' : 'border-transparent hover:bg-mist/40',
                      )}
                    >
                      <span className="mt-0.5 w-20 shrink-0 font-mono text-[11px] uppercase tracking-wider text-ink/60">{item.tag}</span>
                      <span className="text-sm font-semibold leading-snug">{item.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div aria-live="polite" className="flex min-w-0 flex-col gap-6 p-5 md:p-8">
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-ink/60">{f.tag}</span>
                <h3 className="text-balance text-2xl font-semibold leading-tight">{f.title}</h3>
              </div>
              <dl className="grid gap-5 md:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <dt className="text-sm font-semibold">{r.observed}</dt>
                  <dd className="leading-relaxed text-ink/80">{f.observed}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-sm font-semibold">{r.evidence}</dt>
                  <dd className="break-all font-mono text-sm text-ink/80">{f.page}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-sm font-semibold">{r.why}</dt>
                  <dd className="leading-relaxed text-ink/80">{f.why}</dd>
                </div>
                <div className="flex flex-col gap-1 rounded-md bg-lime/30 p-4">
                  <dt className="text-sm font-semibold">{r.recommendation}</dt>
                  <dd className="leading-relaxed">{f.recommendation}</dd>
                </div>
              </dl>

              <div className="grid gap-6 border-t border-ink/10 pt-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <h4 className="text-sm font-semibold">{r.confirmHeading}</h4>
                  <ul className="flex flex-col gap-2 text-sm text-ink/80">
                    {r.confirm.map((c) => (
                      <li key={c} className="flex gap-2">
                        <CircleHelp className="mt-0.5 size-4 shrink-0 text-ink/60" aria-hidden="true" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-sm font-semibold">{r.unknownHeading}</h4>
                  <ul className="flex flex-col gap-2 text-sm text-ink/80">
                    {r.unknown.map((c) => (
                      <li key={c} className="flex gap-2">
                        <Minus className="mt-0.5 size-4 shrink-0 text-ink/60" aria-hidden="true" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <footer className="border-t border-ink/10 px-5 py-3 font-mono text-[11px] uppercase tracking-wider text-ink/60">{r.sampleNote}</footer>
        </article>
      </div>
    </section>
  )
}
