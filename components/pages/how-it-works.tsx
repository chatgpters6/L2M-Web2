'use client'

import { useEffect, useState } from 'react'
import { Check, CircleDashed, FileCode2, Lock, X } from 'lucide-react'
import { DemoBadge } from '@/components/l2m/brand'
import { FitWidth } from '@/components/l2m/fit-width'
import { AfterDesktop } from '@/components/l2m/demo-sites'
import { PageCta, PageHero, PageShell, SectionHead, usePagesCopy } from '@/components/site/page-shell'
import { DEMO_COMPANY, DEMO_PRODUCT } from '@/lib/demo-facts'
import type { Phase } from '@/lib/pages-copy'
import { cn } from '@/lib/utils'

const phaseId = (key: Phase['key']) => `phase-${key}`

export function HowItWorksPage() {
  const { p } = usePagesCopy()
  const phases = p.hw.phases
  const [current, setCurrent] = useState<Phase['key']>('analyze')

  useEffect(() => {
    const els = phases.map((ph) => document.getElementById(phaseId(ph.key))).filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible) setCurrent(visible.target.id.replace('phase-', '') as Phase['key'])
      },
      { rootMargin: '-35% 0px -55% 0px' },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [phases])

  return (
    <PageShell>
      <PageHero eyebrow={p.hw.eyebrow} title={p.hw.title} lede={p.hw.lede} />

      <nav aria-label={p.hw.railLabel} className="sticky top-0 z-20 border-b border-ink/15 bg-ivory/95 backdrop-blur">
        <ol className="mx-auto flex max-w-[1440px] items-stretch px-2 md:px-8">
          {phases.map((ph, i) => {
            const active = current === ph.key
            return (
              <li key={ph.key} className="flex flex-1">
                <a
                  href={`#${phaseId(ph.key)}`}
                  aria-current={active ? 'step' : undefined}
                  className={cn(
                    'flex min-h-14 flex-1 items-center justify-center gap-2 border-b-2 px-1 text-sm font-semibold focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ink sm:justify-start sm:px-3',
                    active ? 'border-ink text-ink' : 'border-transparent text-ink/55 hover:text-ink',
                  )}
                >
                  <span className={cn('hidden size-6 items-center justify-center rounded-full font-mono text-xs sm:flex', active ? 'bg-lime text-ink' : 'bg-ink/10')}>
                    {i + 1}
                  </span>
                  {ph.name}
                </a>
              </li>
            )
          })}
        </ol>
      </nav>

      {phases.map((ph, i) => (
        <PhaseSection key={ph.key} phase={ph} index={i} />
      ))}

      <Boundaries />
      <PageCta title={p.hw.ctaTitle} body={p.hw.ctaBody} secondary={{ label: p.hw.ctaSecondary, href: '/pricing' }} />
    </PageShell>
  )
}

function PhaseSection({ phase, index }: { phase: Phase; index: number }) {
  const { p, lang } = usePagesCopy()
  const rows: [string, string[]][] = [
    [p.common.youDo, phase.you],
    [p.common.l2mDoes, phase.l2m],
  ]
  return (
    <section id={phaseId(phase.key)} aria-labelledby={`${phaseId(phase.key)}-title`} className={cn('scroll-mt-14 border-b border-ink/10', index % 2 === 1 && 'bg-mist/40')}>
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 md:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16 lg:py-20">
        <div className="flex flex-col gap-6">
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-ink/60">
            <span className="flex size-7 items-center justify-center rounded-full bg-ink font-bold text-lime">{index + 1}</span>
            {phase.name}
          </p>
          <h2
            id={`${phaseId(phase.key)}-title`}
            className={cn('text-balance font-semibold', lang === 'zh' ? 'text-2xl leading-snug sm:text-[34px]' : 'text-[28px] leading-[1.1] tracking-[-0.02em] sm:text-[40px]')}
          >
            {phase.title}
          </h2>
          <p className="max-w-xl text-pretty leading-relaxed text-ink/75">{phase.summary}</p>

          <dl className="grid gap-5 border-t border-ink/15 pt-6 sm:grid-cols-2">
            {rows.map(([label, items]) => (
              <div key={label} className="flex flex-col gap-2">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-ink/55">{label}</dt>
                {items.map((it) => (
                  <dd key={it} className="flex items-start gap-2 text-[15px] leading-relaxed">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-ink/50" />
                    {it}
                  </dd>
                ))}
              </div>
            ))}
          </dl>

          <div className="flex flex-col gap-1 border-t border-ink/15 pt-5">
            <span className="font-mono text-[11px] uppercase tracking-wider text-ink/55">{p.common.youGet}</span>
            <p className="text-[15px] font-medium leading-relaxed">{phase.get}</p>
          </div>

          <p className="flex items-start gap-3 rounded-md bg-ink px-4 py-3.5 text-[15px] leading-relaxed text-ivory">
            <span className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-lime">{p.common.decision}</span>
            <span>{phase.decision}</span>
          </p>
        </div>

        <div className="min-w-0">
          <Artifact phase={phase.key} />
        </div>
      </div>
    </section>
  )
}

function ArtifactCard({ title, children }: { title: string; children: React.ReactNode }) {
  const { p } = usePagesCopy()
  return (
    <figure className="relative flex flex-col overflow-hidden rounded-xl border border-ink/15 bg-ivory shadow-xl shadow-ink/10">
      <figcaption className="flex items-center justify-between gap-3 border-b border-ink/10 bg-ink px-5 py-3 text-ivory">
        <span className="font-semibold">{title}</span>
        <DemoBadge tone="dark" label={p.common.demo} />
      </figcaption>
      <div className="flex flex-col gap-5 p-5 sm:p-6">{children}</div>
    </figure>
  )
}

function Artifact({ phase }: { phase: Phase['key'] }) {
  const { p, t, lang } = usePagesCopy()
  const a = p.hw.artifact

  if (phase === 'analyze') {
    return (
      <ArtifactCard title={a.analyze.title}>
        <div className="flex flex-col gap-2 rounded-md border border-ink/15 px-4 py-3">
          <span className="font-mono text-[11px] uppercase tracking-wider text-ink/55">{a.analyze.input}</span>
          <span className="truncate font-mono text-sm">https://{DEMO_COMPANY.legacyHost}</span>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-lime/40 px-2.5 py-1 font-medium">
            <Check className="size-3.5" aria-hidden="true" /> {a.analyze.account}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/[0.07] px-2.5 py-1 font-medium">
            <Lock className="size-3.5" aria-hidden="true" /> {a.analyze.scope}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="pb-2 font-mono text-[11px] uppercase tracking-wider text-ink/55">{a.analyze.findings}</span>
          <ol className="flex flex-col">
            {t.hotspots.map((hs, i) => (
              <li key={hs.tag} className="flex gap-3 border-t border-ink/10 py-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-ink font-mono text-xs font-bold text-lime">{i + 1}</span>
                <span className="flex flex-col gap-0.5">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-ink/55">{hs.tag}</span>
                  <span className="text-sm leading-relaxed">{hs.before}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </ArtifactCard>
    )
  }

  if (phase === 'plan') {
    return (
      <ArtifactCard title={a.plan.title}>
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[11px] uppercase tracking-wider text-ink/55">{a.plan.included}</span>
          <ul className="grid gap-2 sm:grid-cols-2">
            {a.plan.includedItems.map((it) => (
              <li key={it} className="flex items-center gap-2 rounded-md border border-ink/15 px-3 py-2.5 text-sm">
                <Check className="size-4 shrink-0" aria-hidden="true" /> {it}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[11px] uppercase tracking-wider text-ink/55">{a.plan.flagged}</span>
          <ul className="flex flex-col gap-2">
            {a.plan.flaggedItems.map((it) => (
              <li key={it} className="flex items-center gap-2 rounded-md border border-dashed border-ink/35 px-3 py-2.5 text-sm text-ink/75">
                <X className="size-4 shrink-0" aria-hidden="true" /> {it}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-end justify-between gap-4 border-t-2 border-ink pt-4">
          <div className="flex flex-col">
            <span className="font-semibold">{a.plan.total}</span>
            <span className="text-xs text-ink/60">{a.plan.totalNote}</span>
          </div>
          <span aria-hidden="true" className="font-mono text-2xl font-semibold tracking-widest text-ink/35">
            — — —
          </span>
        </div>
        <span aria-disabled="true" className="inline-flex min-h-11 cursor-not-allowed items-center justify-center rounded-md bg-ink/15 font-semibold text-ink/60">
          {a.plan.pay}
        </span>
      </ArtifactCard>
    )
  }

  if (phase === 'upgrade') {
    const facts: [string, string, boolean][] = [
      [a.upgrade.company, DEMO_COMPANY.name, true],
      [a.upgrade.founded, String(DEMO_COMPANY.founded), true],
      ...DEMO_PRODUCT.specs.slice(0, 2).map((s) => [s.label[lang], s.value[lang], false] as [string, string, boolean]),
    ]
    return (
      <ArtifactCard title={a.upgrade.title}>
        <div aria-hidden="true" className="h-44 overflow-hidden rounded-md border border-ink/15 bg-site-bg">
          <FitWidth designWidth={1280}>
            <AfterDesktop />
          </FitWidth>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[11px] uppercase tracking-wider text-ink/55">{a.upgrade.quality}</span>
          <ul className="flex flex-wrap gap-2">
            {a.upgrade.qualityItems.map((q) => (
              <li key={q} className="inline-flex items-center gap-1.5 rounded-full bg-lime/40 px-2.5 py-1 text-xs font-medium">
                <Check className="size-3.5" aria-hidden="true" /> {q}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col">
          <span className="pb-2 font-mono text-[11px] uppercase tracking-wider text-ink/55">{a.upgrade.facts}</span>
          <dl className="flex flex-col">
            {facts.map(([k, v, ok]) => (
              <div key={k} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-0.5 border-t border-ink/10 py-2.5 text-sm">
                <dt className="text-ink/60">{k}</dt>
                <dd className={cn('row-span-2 inline-flex items-center gap-1 text-xs font-medium', ok ? 'text-ink' : 'text-ink/60')}>
                  {ok ? <Check className="size-3.5" aria-hidden="true" /> : <CircleDashed className="size-3.5" aria-hidden="true" />}
                  {ok ? a.upgrade.confirmed : a.upgrade.toConfirm}
                </dd>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </ArtifactCard>
    )
  }

  return (
    <ArtifactCard title={a.deliver.title}>
      <ul className="flex flex-col rounded-md bg-ink p-4 font-mono text-[13px] text-ivory/85">
        {a.deliver.files.map((f) => (
          <li key={f} className="flex items-center gap-2 py-1">
            <FileCode2 className="size-4 shrink-0 text-lime" aria-hidden="true" />
            <span className="min-w-0">{f}</span>
          </li>
        ))}
      </ul>
      <dl className="flex flex-col">
        {a.deliver.options.map(([k, v], i) => (
          <div key={k} className="flex items-center justify-between gap-4 border-t border-ink/10 py-3 text-sm">
            <dt className={cn(i === 0 && 'font-semibold')}>{k}</dt>
            <dd className={cn('rounded-sm px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider', i === 0 ? 'bg-lime text-ink' : 'border border-ink/25 text-ink/70')}>{v}</dd>
          </div>
        ))}
      </dl>
    </ArtifactCard>
  )
}

function Boundaries() {
  const { p } = usePagesCopy()
  return (
    <section aria-labelledby="boundaries-title">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-5 py-14 md:px-10 lg:py-20">
        <SectionHead id="boundaries-title" eyebrow={p.hw.boundaryEyebrow} title={p.hw.boundaryTitle} />
        <ul className="grid gap-px overflow-hidden rounded-lg border border-ink/15 bg-ink/15 sm:grid-cols-2 lg:grid-cols-4">
          {p.hw.boundaries.map(([title, body]) => (
            <li key={title} className="flex flex-col gap-3 bg-ivory p-6">
              <X className="size-5" aria-hidden="true" />
              <h3 className="font-semibold leading-snug">{title}</h3>
              <p className="text-sm leading-relaxed text-ink/65">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
