'use client'

import { SectionIntro, useHomeCopy } from './home-state'

export function Proof() {
  const { h } = useHomeCopy()
  const p = h.proof
  return (
    <section id="proof" aria-labelledby="proof-title" className="scroll-mt-4 bg-mist text-ink">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-5 py-16 md:px-10 lg:py-24">
        <SectionIntro id="proof-title" eyebrow={p.eyebrow} title={p.title} lede={p.lede} />

        <ul className="grid gap-px overflow-hidden rounded-xl border border-ink/15 bg-ink/15 md:grid-cols-3">
          {p.pillars.map((pillar) => (
            <li key={pillar.name} className="flex flex-col gap-6 bg-ivory p-6 md:p-8">
              <h3 className="text-balance text-2xl font-semibold leading-tight">{pillar.name}</h3>
              <p className="text-pretty text-base leading-relaxed">{pillar.promise}</p>
              <p className="text-pretty text-sm leading-relaxed text-ink/70">{pillar.detail}</p>
              <span className="mt-auto inline-flex w-fit items-center gap-2 rounded-sm border border-dashed border-ink/40 px-2 py-1 font-mono text-[11px] uppercase tracking-wide text-ink/75">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-ink/40" />
                {pillar.status}
              </span>
            </li>
          ))}
        </ul>

        <div className="grid gap-4 text-sm leading-relaxed md:grid-cols-2">
          <p className="border-l-2 border-ink pl-4">{p.noLogos}</p>
          <p className="border-l-2 border-ink pl-4">{p.buildVsDelivery}</p>
        </div>

        <details className="group rounded-xl border border-ink/15 bg-ivory">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 px-5 py-3 font-mono text-[11px] uppercase tracking-wider text-ink/70">
            {p.reviewNotes}
            <span aria-hidden="true" className="transition-transform group-open:rotate-45">+</span>
          </summary>
          <table className="w-full border-t border-ink/10 text-left text-sm">
            <caption className="sr-only">{p.title}</caption>
            <thead className="hidden bg-ink/[0.04] md:table-header-group">
              <tr>
                {[p.colEvidence, p.colCheck, p.colStatus].map((c) => (
                  <th key={c} scope="col" className="px-5 py-3 font-mono text-[11px] font-medium uppercase tracking-wider text-ink/60">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {p.rows.map((row) => (
                <tr key={row.evidence} className="flex flex-col gap-1 border-t border-ink/10 px-5 py-4 first:border-t-0 md:table-row md:p-0 md:first:border-t">
                  <th scope="row" className="font-semibold md:w-1/4 md:px-5 md:py-4">
                    {row.evidence}
                  </th>
                  <td className="leading-relaxed text-ink/75 md:px-5 md:py-4">{row.check}</td>
                  <td className="md:w-1/4 md:px-5 md:py-4">
                    <span className="inline-flex rounded-sm border border-ink/25 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide text-ink/75">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      </div>
    </section>
  )
}
