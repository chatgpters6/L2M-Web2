'use client'

import type { ReactNode } from 'react'
import { Check, Circle, Lock } from 'lucide-react'
import { SectionIntro, useHomeCopy } from './home-state'

export function DeliveryPath() {
  const { h } = useHomeCopy()
  const p = h.path

  const snippets: ReactNode[] = [
    <div key="a" className="flex flex-col gap-2">
      <div className="truncate rounded-md border border-ivory/20 bg-ivory/5 px-3 py-2 font-mono text-xs text-ivory/80">https://your-company.com</div>
      <div className="flex items-center gap-2 text-xs text-ivory/70">
        <Lock className="size-3" aria-hidden="true" />
        {p.snippetAnalyze}
      </div>
    </div>,
    <ul key="p" className="flex flex-col gap-1.5 text-xs">
      {p.snippetPlan.map((s, i) => (
        <li key={s} className="flex items-center justify-between gap-2 border-b border-ivory/10 pb-1.5 text-ivory/80">
          <span>{s}</span>
          {i === 2 && <span className="font-mono text-lime">{p.snippetPrice}</span>}
        </li>
      ))}
    </ul>,
    <ul key="u" className="flex flex-col gap-1.5 text-xs">
      {p.snippetGates.map((g, i) => (
        <li key={g} className="flex items-center gap-2 text-ivory/80">
          {i < 1 ? <Check className="size-3.5 text-lime" aria-hidden="true" /> : <Circle className="size-3.5 text-ivory/40" aria-hidden="true" />}
          {g}
          {i >= 1 && <span className="ml-auto font-mono text-[10px] uppercase text-ivory/50">{p.snippetPending}</span>}
        </li>
      ))}
    </ul>,
    <ol key="d" className="flex items-center gap-1.5 text-xs">
      {p.snippetDeliver.map((s, i) => (
        <li key={s} className="flex items-center gap-1.5">
          <span className="rounded-full border border-ivory/25 px-2.5 py-1 text-ivory/85">{s}</span>
          {i < 2 && (
            <span aria-hidden="true" className="text-ivory/40">
              →
            </span>
          )}
        </li>
      ))}
    </ol>,
  ]

  return (
    <section id="url-to-delivery" aria-labelledby="path-title" className="scroll-mt-4 bg-ink text-ivory">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-5 py-16 md:px-10 lg:py-24">
        <SectionIntro id="path-title" tone="dark" eyebrow={p.eyebrow} title={p.title} lede={p.lede} />

        <ol className="grid gap-px overflow-hidden rounded-xl border border-ivory/15 bg-ivory/15 md:grid-cols-2 xl:grid-cols-4">
          {p.stages.map((s, i) => (
            <li key={s.name} className="flex flex-col gap-5 bg-ink p-6">
              <div className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-full bg-lime font-mono text-sm font-bold text-ink">{i + 1}</span>
                <h3 className="text-xl font-semibold">{s.name}</h3>
              </div>
              <p className="leading-relaxed text-ivory/80">{s.summary}</p>
              <div className="relative rounded-lg border border-ivory/15 bg-ivory/[0.04] p-4 pt-7">
                <span className="absolute top-2 right-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-ivory/45">{p.demo}</span>
                {snippets[i]}
              </div>
              <ul className="mt-auto flex flex-col gap-2 text-sm text-ivory/70">
                {s.points.map((pt) => (
                  <li key={pt} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-lime" aria-hidden="true" />
                    {pt}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <p className="text-sm text-ivory/65">{p.noCall}</p>
      </div>
    </section>
  )
}
