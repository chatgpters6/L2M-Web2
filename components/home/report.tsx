'use client'

import { useState, type ReactNode } from 'react'
import { CircleHelp, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DEMO_COMPANY, DEMO_LEGACY_PRODUCTS, DEMO_PRODUCT } from '@/lib/demo-facts'
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
              <span className="font-mono text-xs text-ivory/65">{DEMO_COMPANY.domain}</span>
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
              <figure className="flex flex-col gap-2">
                <div className="overflow-hidden rounded-md border border-ink/20 bg-legacy-bg">
                  <div className="flex items-center gap-2 border-b border-ink/15 bg-ink/[0.06] px-3 py-1.5">
                    <span className="min-w-0 truncate font-mono text-[11px] text-ink/70">{f.page}</span>
                  </div>
                  <EvidenceSnippet index={active} />
                </div>
                <figcaption className="font-mono text-[11px] uppercase tracking-wider text-ink/55">{r.snippetLabel}</figcaption>
              </figure>
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

/** The flagged region is outlined; everything else on the legacy page is dimmed. */
function Flag({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('relative rounded-sm outline-2 outline-offset-2 outline-ink outline-dashed', className)}>{children}</div>
}

function EvidenceSnippet({ index }: { index: number }) {
  const legacy = 'font-[Verdana,Arial,sans-serif] text-[12px] leading-snug text-ink'
  if (index === 0) {
    return (
      <div className={cn('flex gap-4 p-4', legacy)}>
        <Flag className="w-36 shrink-0 bg-legacy-bg">
          <div className="bg-legacy-bar px-2 py-1 font-bold text-ivory">Products</div>
          <ul className="flex flex-col gap-0.5 px-2 py-1.5">
            {DEMO_LEGACY_PRODUCTS.slice(0, 7).map((p) => (
              <li key={p} className="text-legacy-link underline">{p}</li>
            ))}
            <li className="text-ink/50">…</li>
          </ul>
        </Flag>
        <div aria-hidden="true" className="flex flex-1 flex-col gap-2 opacity-40">
          <div className="h-3 w-2/3 bg-legacy-line" />
          <div className="h-2 w-full bg-legacy-line" />
          <div className="h-2 w-5/6 bg-legacy-line" />
          <div className="h-16 w-full border border-legacy-line" />
        </div>
      </div>
    )
  }
  if (index === 1) {
    return (
      <div className={cn('flex flex-col gap-3 p-4', legacy)}>
        <div aria-hidden="true" className="flex flex-col gap-1.5 opacity-40">
          <div className="h-3 w-1/3 bg-legacy-line" />
          <div className="h-2 w-3/4 bg-legacy-line" />
        </div>
        <Flag className="w-fit px-2 py-1">
          <span className="text-legacy-link underline">
            Download {DEMO_PRODUCT.datasheet.file}
          </span>{' '}
          <span className="text-ink/60">({DEMO_PRODUCT.datasheet.size})</span>
        </Flag>
        <p className="text-ink/50">No specifications shown on this page.</p>
      </div>
    )
  }
  if (index === 2) {
    return (
      <div className={cn('flex flex-col gap-3 p-4', legacy)}>
        <div aria-hidden="true" className="h-10 w-full opacity-40 border border-legacy-line" />
        <Flag className="bg-legacy-bg px-3 py-2 text-[11px]">
          Tel: +00 000 0000 000 &nbsp;|&nbsp; Fax: +00 000 0000 001 &nbsp;|&nbsp;{' '}
          <span className="text-legacy-link underline">info@{DEMO_COMPANY.domain}</span>
          <br />
          {`© ${DEMO_COMPANY.legacyCopyright} ${DEMO_COMPANY.legalName}`}
        </Flag>
      </div>
    )
  }
  return (
    <div className={cn('flex flex-col items-center gap-2 p-4', legacy)}>
      <Flag className="flex h-28 w-24 flex-col overflow-hidden rounded-md border-4 border-ink bg-legacy-bg">
        <div className="h-2 w-[180%] shrink-0 bg-legacy-bar" />
        <div aria-hidden="true" className="flex w-[180%] flex-col gap-1 p-1">
          <div className="h-1 w-full bg-legacy-line" />
          <div className="h-1 w-full bg-legacy-line" />
          <div className="h-1 w-3/4 bg-legacy-line" />
        </div>
      </Flag>
      <p className="text-[11px] text-ink/70">Best viewed at 1024×768</p>
    </div>
  )
}
