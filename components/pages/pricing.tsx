'use client'

import { useState } from 'react'
import { AlertTriangle, ArrowRight, Check, Minus, Plus } from 'lucide-react'
import { Segmented } from '@/components/l2m/brand'
import { PageCta, PageHero, PageShell, SectionHead, usePagesCopy } from '@/components/site/page-shell'
import { cn } from '@/lib/utils'

/*
 * SAMPLE PRICE units for layout review only. These are NOT L2M prices and must be replaced
 * by verified pricing rules before any production use.
 */
const SAMPLE_BASE = [1200, 2400, 3800] as const
const SAMPLE_PER_LANGUAGE = [300, 600, 950] as const
const SAMPLE_LAUNCH = 400

export function PricingPage() {
  const { p } = usePagesCopy()
  return (
    <PageShell>
      <PageHero eyebrow={p.pr.eyebrow} title={p.pr.title} lede={p.pr.lede} status={p.pr.status} />
      <Product />
      <HowPriceIsSet />
      <Estimator />
      <Delivery />
      <ExclusionsAndFaq />
      <PageCta title={p.pr.ctaTitle} body={p.pr.ctaBody} secondary={{ label: p.pr.ctaSecondary, href: '/transformations' }} />
    </PageShell>
  )
}

function Product() {
  const { p } = usePagesCopy()
  return (
    <section aria-labelledby="product-title" className="border-b border-ink/10">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 md:px-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:py-20">
        <div className="flex flex-col gap-4">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink/60">{p.pr.productEyebrow}</p>
          <h2 id="product-title" className="text-[32px] font-semibold leading-[1.05] tracking-[-0.02em] sm:text-[48px]">
            {p.pr.productName}
          </h2>
          <p className="max-w-md text-pretty leading-relaxed text-ink/70">{p.pr.productLede}</p>
        </div>
        <dl className="grid gap-px overflow-hidden rounded-lg border border-ink/15 bg-ink/15 sm:grid-cols-2">
          {p.pr.groups.map(([title, items], i) => (
            <div key={title} className={cn('flex flex-col gap-3 bg-ivory p-5 sm:p-6', i === p.pr.groups.length - 1 && 'sm:col-span-2')}>
              <dt className="font-semibold">{title}</dt>
              {items.map((it) => (
                <dd key={it} className="flex items-start gap-2 text-[15px] leading-relaxed text-ink/75">
                  <Check className="mt-1 size-4 shrink-0 text-ink" aria-hidden="true" />
                  {it}
                </dd>
              ))}
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function HowPriceIsSet() {
  const { p } = usePagesCopy()
  return (
    <section aria-labelledby="how-price-title" className="border-b border-ink/10 bg-mist/40">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 py-14 md:px-10 lg:py-16">
        <h2 id="how-price-title" className="font-mono text-xs uppercase tracking-[0.18em] text-ink/60">
          {p.pr.howEyebrow}
        </h2>
        <ol className="flex flex-col gap-4 md:flex-row md:items-stretch md:gap-0">
          {p.pr.how.map(([title, body], i) => (
            <li key={title} className="flex flex-1 items-stretch gap-0">
              <div className={cn('flex flex-1 flex-col gap-2 rounded-lg p-5', i === 2 ? 'bg-ink text-ivory' : 'border border-ink/15 bg-ivory')}>
                <span className={cn('font-mono text-xs', i === 2 ? 'text-lime' : 'text-ink/55')}>{i + 1}</span>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className={cn('text-sm leading-relaxed', i === 2 ? 'text-ivory/75' : 'text-ink/70')}>{body}</p>
              </div>
              {i < 2 && (
                <span aria-hidden="true" className="hidden items-center px-3 text-ink/40 md:flex">
                  <ArrowRight className="size-5" />
                </span>
              )}
            </li>
          ))}
        </ol>
        <p className="flex items-start gap-2 text-[15px] font-medium">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {p.pr.howNote}
        </p>
      </div>
    </section>
  )
}

function Estimator() {
  const { p, lang } = usePagesCopy()
  const [band, setBand] = useState<'0' | '1' | '2'>('1')
  const [langs, setLangs] = useState(1)
  const [launch, setLaunch] = useState(false)
  const [complex, setComplex] = useState<string[]>([])

  const b = Number(band)
  const base = SAMPLE_BASE[b]
  const extraLangs = (langs - 1) * SAMPLE_PER_LANGUAGE[b]
  const launchCost = launch ? SAMPLE_LAUNCH : 0
  const total = base + extraLangs + launchCost
  const fmt = (n: number) => n.toLocaleString(lang === 'zh' ? 'zh-CN' : 'en-US')

  const toggleComplex = (item: string) => setComplex((c) => (c.includes(item) ? c.filter((x) => x !== item) : [...c, item]))

  return (
    <section aria-labelledby="estimator-title" className="border-b border-ink/10">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-5 py-14 md:px-10 lg:py-20">
        <SectionHead id="estimator-title" eyebrow={p.pr.estEyebrow} title={p.pr.estTitle} lede={p.pr.estLede} />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="flex flex-col gap-6 rounded-lg border border-ink/15 p-5 sm:p-6">
            <fieldset className="flex flex-col gap-2">
              <legend className="pb-2 font-semibold">{p.pr.estPages}</legend>
              <div className="max-w-full overflow-x-auto">
                <Segmented
                  label={p.pr.estPages}
                  value={band}
                  onChange={setBand}
                  options={p.pr.estPageBands.map((l, i) => ({ value: String(i) as '0' | '1' | '2', label: l }))}
                />
              </div>
            </fieldset>

            <div className="flex flex-col gap-2">
              <span id="langs-label" className="font-semibold">
                {p.pr.estLangs}
              </span>
              <div role="group" aria-labelledby="langs-label" className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setLangs((n) => Math.max(1, n - 1))}
                  disabled={langs <= 1}
                  aria-label={`${p.pr.estLangs} −1`}
                  className="flex size-11 items-center justify-center rounded-md border border-ink/25 disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-ink"
                >
                  <Minus className="size-4" aria-hidden="true" />
                </button>
                <output aria-live="polite" className="w-8 text-center font-mono text-lg font-semibold">
                  {langs}
                </output>
                <button
                  type="button"
                  onClick={() => setLangs((n) => Math.min(4, n + 1))}
                  disabled={langs >= 4}
                  aria-label={`${p.pr.estLangs} +1`}
                  className="flex size-11 items-center justify-center rounded-md border border-ink/25 disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-ink"
                >
                  <Plus className="size-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <label className="flex min-h-11 cursor-pointer items-start gap-3">
              <input type="checkbox" checked={launch} onChange={(e) => setLaunch(e.target.checked)} className="mt-1 size-5 accent-ink" />
              <span className="flex flex-col">
                <span className="font-semibold">{p.pr.estLaunch}</span>
                <span className="text-sm text-ink/60">{p.pr.estLaunchHint}</span>
              </span>
            </label>

            <fieldset className="flex flex-col gap-2">
              <legend className="pb-2 font-semibold">{p.pr.estComplex}</legend>
              <div className="flex flex-wrap gap-2">
                {p.pr.estComplexItems.map((item) => {
                  const on = complex.includes(item)
                  return (
                    <button
                      key={item}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggleComplex(item)}
                      className={cn(
                        'inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink',
                        on ? 'border-ink bg-ink text-ivory' : 'border-ink/25 hover:border-ink',
                      )}
                    >
                      {on ? <Check className="size-4" aria-hidden="true" /> : <Plus className="size-4" aria-hidden="true" />}
                      {item}
                    </button>
                  )
                })}
              </div>
            </fieldset>
          </div>

          <aside aria-label={p.pr.estTitle} className="relative flex flex-col overflow-hidden rounded-lg bg-ink text-ivory">
            <div className="flex items-center justify-between gap-3 border-b border-ivory/15 px-5 py-3">
              <span className="font-semibold">{p.pr.productName}</span>
              <span className="rounded-sm bg-lime px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-ink">{p.common.samplePrice}</span>
            </div>
            <dl className="flex flex-col px-5 py-2 text-sm">
              <Line label={`${p.pr.estBase} · ${p.pr.estPageBands[b]}`} value={fmt(base)} />
              {langs > 1 && <Line label={`${p.pr.estLangLine} × ${langs - 1}`} value={fmt(extraLangs)} />}
              {launch && <Line label={p.pr.estLaunchLine} value={fmt(launchCost)} />}
            </dl>
            {complex.length > 0 && (
              <div className="mx-5 mb-3 flex flex-col gap-2 rounded-md border border-dashed border-lime/60 p-3 text-sm">
                <p className="flex items-start gap-2 text-ivory/85">
                  <AlertTriangle className="mt-0.5 size-4 shrink-0 text-lime" aria-hidden="true" />
                  {p.pr.estFlagged}
                </p>
                <ul className="flex flex-col gap-1 pl-6 text-ivory/70">
                  {complex.map((c) => (
                    <li key={c} className="list-disc">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-auto flex items-end justify-between gap-4 border-t border-ivory/15 px-5 py-4">
              <span className="flex flex-col">
                <span className="font-semibold">{p.pr.estTotal}</span>
                <span className="text-xs text-ivory/55">{p.pr.estUnits}</span>
              </span>
              <span className="flex items-baseline gap-2" aria-live="polite">
                <span className="font-mono text-xs text-lime">{p.common.sample}</span>
                <span className="font-mono text-3xl font-semibold tabular-nums">{fmt(total)}</span>
              </span>
            </div>
            <p className="border-t border-ivory/15 bg-lime/10 px-5 py-3 text-xs leading-relaxed text-ivory/80">
              {p.pr.estDisclaimer} {p.pr.estHosting}
            </p>
          </aside>
        </div>
      </div>
    </section>
  )
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-ivory/10 py-3 last:border-b-0">
      <dt className="text-ivory/80">{label}</dt>
      <dd className="font-mono tabular-nums">{value}</dd>
    </div>
  )
}

function Delivery() {
  const { p } = usePagesCopy()
  return (
    <section aria-labelledby="delivery-title" className="border-b border-ink/10 bg-mist/40">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-5 py-14 md:px-10 lg:py-20">
        <SectionHead id="delivery-title" eyebrow={p.pr.deliveryEyebrow} title={p.pr.deliveryTitle} />
        <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr]">
          {p.pr.delivery.map((d) => {
            const base = d.tier === 'base'
            return (
              <article
                key={d.name}
                className={cn('flex flex-col gap-4 rounded-lg p-6', base ? 'bg-ink text-ivory lg:p-8' : 'border border-ink/15 bg-ivory', d.tier === 'later' && 'border-dashed')}
              >
                <span
                  className={cn(
                    'w-fit rounded-sm px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider',
                    base ? 'bg-lime text-ink' : 'border border-ink/30 text-ink/70',
                  )}
                >
                  {d.status}
                </span>
                <h3 className={cn('font-semibold', base ? 'text-2xl' : 'text-xl')}>{d.name}</h3>
                <p className={cn('leading-relaxed', base ? 'text-ivory/80' : 'text-ink/70')}>{d.body}</p>
                <ul className="mt-auto flex flex-col gap-2 pt-2 text-sm">
                  {d.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2">
                      <Check className={cn('size-4 shrink-0', base ? 'text-lime' : 'text-ink')} aria-hidden="true" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ExclusionsAndFaq() {
  const { p } = usePagesCopy()
  return (
    <section aria-labelledby="exclusions-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-14 md:px-10 lg:grid-cols-2 lg:gap-16 lg:py-20">
        <div className="flex flex-col gap-6">
          <SectionHead id="exclusions-title" eyebrow={p.pr.exEyebrow} title={p.pr.exTitle} />
          <ul className="flex flex-col">
            {p.pr.exclusions.map((e) => (
              <li key={e} className="flex items-start gap-3 border-t border-ink/15 py-3.5 text-[15px] leading-relaxed">
                <Minus className="mt-1 size-4 shrink-0" aria-hidden="true" />
                {e}
              </li>
            ))}
          </ul>
          <p className="text-sm leading-relaxed text-ink/60">{p.pr.exNote}</p>
        </div>
        <div className="flex flex-col gap-6">
          <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-ink/60">{p.pr.faqEyebrow}</h2>
          <div className="flex flex-col">
            {p.pr.faq.map(([q, a], i) => (
              <details key={q} open={i === 0} className="group border-t border-ink/15 last:border-b">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 font-semibold focus-visible:outline-2 focus-visible:outline-ink [&::-webkit-details-marker]:hidden">
                  {q}
                  <Plus className="size-4 shrink-0 motion-safe:transition-transform group-open:rotate-45" aria-hidden="true" />
                </summary>
                <p className="pb-5 leading-relaxed text-ink/70">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
