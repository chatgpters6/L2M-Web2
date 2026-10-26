'use client'

import { useState, type ReactNode } from 'react'
import { ArrowDown, Check, Lock, Monitor, Smartphone } from 'lucide-react'
import { DemoBadge, Segmented } from '@/components/l2m/brand'
import { FitWidth } from '@/components/l2m/fit-width'
import { AfterDesktop, AfterMobile, BeforeDesktop, type HotspotProps } from '@/components/l2m/demo-sites'
import { AfterProductDesktop, AfterProductMobile, BeforeProduct } from '@/components/l2m/demo-product-pages'
import { PageCta, PageHero, PageShell, SectionHead, usePagesCopy } from '@/components/site/page-shell'
import { DEMO_COMPANY } from '@/lib/demo-facts'
import type { EvidenceField } from '@/lib/pages-copy'
import { cn } from '@/lib/utils'

type CaseView = 'before' | 'after' | 'split'
type CasePage = 'home' | 'product'
type Device = 'desktop' | 'mobile'
const STAGE_ID = 'flagship-stage'

export function TransformationsPage() {
  const { p } = usePagesCopy()
  const [view, setView] = useState<CaseView>('after')
  const [page, setPage] = useState<CasePage>('home')
  const [device, setDevice] = useState<Device>('desktop')
  const [active, setActive] = useState<number | null>(0)

  const showChange = (i: number) => {
    setPage('home')
    setView('after')
    setActive(i)
    document.getElementById(STAGE_ID)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <PageShell>
      <PageHero eyebrow={p.tr.eyebrow} title={p.tr.title} lede={p.tr.lede} status={p.tr.status} />
      <Stage view={view} setView={setView} page={page} setPage={setPage} device={device} setDevice={setDevice} active={active} setActive={setActive} />
      <Changes onShow={showChange} active={active} />
      <Evidence />
      <Library />
      <PageCta title={p.tr.ctaTitle} body={p.tr.ctaBody} secondary={{ label: p.tr.ctaSecondary, href: '/how-it-works' }} />
    </PageShell>
  )
}

function Stage({
  view,
  setView,
  page,
  setPage,
  device,
  setDevice,
  active,
  setActive,
}: {
  view: CaseView
  setView: (v: CaseView) => void
  page: CasePage
  setPage: (v: CasePage) => void
  device: Device
  setDevice: (v: Device) => void
  active: number | null
  setActive: (i: number) => void
}) {
  const { p, t } = usePagesCopy()
  const hotspots: HotspotProps = {
    showHotspots: page === 'home',
    activeHotspot: active,
    onHotspot: setActive,
    hotspotLabel: (i) => `${t.flagship.hotspotsAria} ${i + 1}: ${t.hotspots[i].title}`,
  }

  return (
    <section id={STAGE_ID} aria-labelledby="stage-title" className="scroll-mt-4 border-b border-ink/10">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 py-14 md:px-10 lg:py-20">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-2">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink/60">{p.tr.stageEyebrow}</p>
            <h2 id="stage-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {DEMO_COMPANY.name}
            </h2>
            <p className="text-sm text-ink/65">{p.tr.stageMeta}</p>
          </div>
          <DemoBadge label={p.common.fictional} className="w-fit" />
        </div>

        <div className="flex flex-col gap-3 rounded-lg border border-ink/15 bg-mist/40 p-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
          <Control label={p.tr.view}>
            <Segmented
              label={p.tr.view}
              value={view}
              onChange={setView}
              options={[
                { value: 'before', label: t.flagship.before },
                { value: 'after', label: t.flagship.after },
                { value: 'split', label: p.tr.split },
              ]}
            />
          </Control>
          <Control label={p.tr.page}>
            <Segmented
              label={p.tr.page}
              value={page}
              onChange={setPage}
              options={[
                { value: 'home', label: p.tr.pages.home },
                { value: 'product', label: p.tr.pages.product },
              ]}
            />
          </Control>
          <Control label={p.tr.device}>
            <Segmented
              label={p.tr.device}
              value={device}
              onChange={setDevice}
              options={[
                { value: 'desktop', label: t.flagship.desktop, icon: <Monitor className="size-4" aria-hidden="true" /> },
                { value: 'mobile', label: t.flagship.mobile, icon: <Smartphone className="size-4" aria-hidden="true" /> },
              ]}
            />
          </Control>
        </div>

        {page === 'product' && (
          <p className="text-sm leading-relaxed text-ink/70">{view === 'before' ? p.tr.productBefore : view === 'after' ? p.tr.productAfter : `${p.tr.productBefore} ${p.tr.productAfter}`}</p>
        )}

        {view === 'split' ? (
          <div className={cn('grid gap-6', device === 'desktop' ? 'lg:grid-cols-2' : 'sm:grid-cols-2 sm:justify-items-center')}>
            <CaseFrame view="before" page={page} device={device} hotspots={hotspots} compact label={t.flagship.before} />
            <CaseFrame view="after" page={page} device={device} hotspots={hotspots} compact label={t.flagship.after} />
          </div>
        ) : (
          <CaseFrame view={view} page={page} device={device} hotspots={hotspots} />
        )}

        {view === 'before' && page === 'home' && <p className="text-sm text-ink/65">{t.flagship.beforeHint}</p>}
      </div>
    </section>
  )
}

function Control({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
      <span className="font-mono text-[11px] uppercase tracking-wider text-ink/60">{label}</span>
      <div className="max-w-full overflow-x-auto">{children}</div>
    </div>
  )
}

function CaseFrame({
  view,
  page,
  device,
  hotspots,
  compact,
  label,
}: {
  view: 'before' | 'after'
  page: CasePage
  device: Device
  hotspots: HotspotProps
  compact?: boolean
  label?: string
}) {
  const { t, p } = usePagesCopy()
  const h: HotspotProps = { ...hotspots, showHotspots: view === 'after' && hotspots.showHotspots }
  const path = page === 'home' ? '' : '/products/ball-valves'
  const address = view === 'after' ? `${DEMO_COMPANY.domain}${path}` : `${DEMO_COMPANY.legacyHost}/${page === 'home' ? 'index' : 'product_list'}.html`
  const name = `${view === 'after' ? t.flagship.after : t.flagship.before} · ${page === 'home' ? p.tr.pages.home : p.tr.pages.product} — ${p.common.fictional}`

  const legacy = <FitWidth designWidth={1000}>{page === 'home' ? <BeforeDesktop /> : <BeforeProduct />}</FitWidth>

  const tag = label && (
    <span
      className={cn(
        'w-fit rounded-sm px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider',
        view === 'after' ? 'bg-lime text-ink' : 'bg-ink text-ivory',
      )}
    >
      {label}
    </span>
  )

  if (device === 'mobile') {
    return (
      <figure aria-label={name} className="flex w-full flex-col items-center gap-3">
        {tag}
        <div className="w-full max-w-[340px] rounded-[2.75rem] border-[10px] border-ink bg-ink shadow-2xl shadow-ink/25">
          <div className="flex items-center gap-1.5 rounded-t-[2rem] bg-site-soft px-4 pt-3 pb-1.5 font-mono text-[10px] text-site-ink/70">
            <Lock className="size-2.5" aria-hidden="true" />
            <span className="truncate">{address}</span>
          </div>
          <div className="h-[560px] overflow-y-auto overscroll-contain rounded-b-[2rem] bg-site-bg" tabIndex={0} aria-label={name}>
            {view === 'after' ? (
              <FitWidth designWidth={375}>{page === 'home' ? <AfterMobile {...h} /> : <AfterProductMobile />}</FitWidth>
            ) : (
              <div className="flex flex-col">
                {legacy}
                <p className="m-3 rounded-md bg-site-soft p-3 text-xs leading-relaxed text-site-ink">{t.flagship.legacyMobileNote}</p>
              </div>
            )}
          </div>
        </div>
      </figure>
    )
  }

  return (
    <figure aria-label={name} className="flex min-w-0 flex-col gap-3">
      {tag}
      <div className="flex flex-col overflow-hidden rounded-xl border border-ink/15 bg-site-bg shadow-2xl shadow-ink/15">
        <div className="flex items-center gap-3 border-b border-ink/10 bg-mist/70 px-4 py-2.5">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="size-3 rounded-full bg-ink/20" />
            <span className="size-3 rounded-full bg-ink/20" />
            <span className="size-3 rounded-full bg-ink/20" />
          </div>
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md bg-ivory px-3 py-1.5 font-mono text-xs text-ink/70">
            <Lock className="size-3 shrink-0" aria-hidden="true" />
            <span className="truncate">{address}</span>
          </div>
        </div>
        <div className={cn('overflow-y-auto overscroll-contain', compact ? 'h-[360px] md:h-[440px]' : 'h-[420px] md:h-[640px]')} tabIndex={0} aria-label={name}>
          {view === 'after' ? (
            <FitWidth designWidth={1280}>{page === 'home' ? <AfterDesktop {...h} /> : <AfterProductDesktop />}</FitWidth>
          ) : (
            legacy
          )}
        </div>
      </div>
    </figure>
  )
}

function Changes({ onShow, active }: { onShow: (i: number) => void; active: number | null }) {
  const { p, t } = usePagesCopy()
  return (
    <section aria-labelledby="changes-title" className="border-b border-ink/10">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-5 py-14 md:px-10 lg:py-20">
        <SectionHead id="changes-title" eyebrow={p.tr.changesEyebrow} title={p.tr.changesTitle} />
        <ol className="grid gap-px overflow-hidden rounded-lg border border-ink/15 bg-ink/15 lg:grid-cols-3">
          {t.hotspots.map((hs, i) => (
            <li key={hs.tag} className={cn('flex flex-col gap-5 bg-ivory p-6 lg:p-8', active === i && 'bg-lime/15')}>
              <div className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-full bg-ink font-mono text-sm font-bold text-lime">{i + 1}</span>
                <span className="font-mono text-xs uppercase tracking-wider text-ink/60">{hs.tag}</span>
              </div>
              <h3 className="text-xl font-semibold leading-snug">{hs.title}</h3>
              <dl className="flex flex-col gap-4 text-[15px] leading-relaxed">
                <div className="flex flex-col gap-1">
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-ink/55">{t.flagship.beforeLabel}</dt>
                  <dd className="text-ink/70">{hs.before}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-ink/55">{t.flagship.afterLabel}</dt>
                  <dd>{hs.after}</dd>
                </div>
                <div className="flex flex-col gap-1 border-l-2 border-lime pl-3">
                  <dt className="font-semibold">{t.flagship.valueLabel}</dt>
                  <dd>{hs.value}</dd>
                </div>
              </dl>
              <button
                type="button"
                onClick={() => onShow(i)}
                className="mt-auto inline-flex min-h-11 w-fit items-center gap-2 rounded-md border border-ink/25 px-4 text-sm font-semibold hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                {p.tr.showOnPage}
                <ArrowDown className="size-4 rotate-180" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function StatusChip({ status }: { status: EvidenceField['status'] }) {
  const { p } = usePagesCopy()
  return (
    <span
      className={cn(
        'inline-flex w-fit items-center gap-1.5 rounded-sm border px-1.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider',
        status === 'unverified' ? 'border-ink bg-ink text-ivory' : status === 'pending' ? 'border-ink/50 text-ink' : 'border-ink/25 text-ink/65',
      )}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {p.tr.statusLabel[status]}
    </span>
  )
}

function Evidence() {
  const { p } = usePagesCopy()
  return (
    <section aria-labelledby="evidence-title" className="border-b border-ink/10 bg-mist/40">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-5 py-14 md:px-10 lg:py-20">
        <SectionHead id="evidence-title" eyebrow={p.tr.evidenceEyebrow} title={p.tr.evidenceTitle} lede={p.tr.evidenceLede} />
        <div className="overflow-hidden rounded-lg border border-ink/15 bg-ivory">
          <div className="hidden grid-cols-[200px_1fr_1fr] gap-6 border-b border-ink/15 bg-ink px-6 py-3 font-mono text-[11px] uppercase tracking-wider text-ivory/75 md:grid">
            <span>{p.tr.colField}</span>
            <span>{p.tr.colReal}</span>
            <span>{p.tr.colDemo}</span>
          </div>
          <dl>
            {p.tr.evidence.map((e) => (
              <div key={e.field} className="grid gap-3 border-b border-ink/10 px-5 py-5 last:border-b-0 md:grid-cols-[200px_1fr_1fr] md:gap-6 md:px-6">
                <dt className="font-semibold">{e.field}</dt>
                <dd className="flex flex-col gap-1 text-[15px] leading-relaxed text-ink/75">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-ink/50 md:hidden">{p.tr.colReal}</span>
                  {e.realCase}
                </dd>
                <dd className="flex flex-col gap-2 text-[15px] leading-relaxed">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-ink/50 md:hidden">{p.tr.colDemo}</span>
                  <StatusChip status={e.status} />
                  <span className="text-ink/80">{e.demo}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

function Library() {
  const { p } = usePagesCopy()
  return (
    <section aria-labelledby="library-title">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-5 py-14 md:px-10 lg:py-20">
        <SectionHead id="library-title" eyebrow={p.tr.libraryEyebrow} title={p.tr.libraryTitle} lede={p.tr.libraryLede} />
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr_1fr]">
          <article className="flex flex-col overflow-hidden rounded-lg border border-ink/15 bg-ivory">
            <div aria-hidden="true" className="h-48 overflow-hidden border-b border-ink/10 bg-site-bg">
              <FitWidth designWidth={1280}>
                <AfterDesktop />
              </FitWidth>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <DemoBadge label={p.common.fictional} className="w-fit" />
              <h3 className="text-lg font-semibold">{DEMO_COMPANY.name}</h3>
              <p className="text-sm text-ink/65">{p.tr.flagshipCard}</p>
              <a
                href={`#${STAGE_ID}`}
                className="mt-auto inline-flex min-h-11 w-fit items-center text-sm font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-ink"
              >
                {p.tr.open}
              </a>
            </div>
          </article>
          {[0, 1].map((i) => (
            <article key={i} className="flex flex-col rounded-lg border border-dashed border-ink/30">
              <div className="flex h-48 items-center justify-center border-b border-dashed border-ink/20">
                <Lock className="size-6 text-ink/35" aria-hidden="true" />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <span className="w-fit rounded-sm border border-ink/30 px-1.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-ink/60">
                  {p.tr.reservedStatus}
                </span>
                <h3 className="text-lg font-semibold text-ink/80">{p.tr.reservedTitle}</h3>
                <p className="text-sm leading-relaxed text-ink/60">{p.tr.reservedBody}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="flex flex-col gap-4 rounded-lg bg-ink p-6 text-ivory md:p-8">
          <h3 className="font-semibold">{p.tr.criteriaTitle}</h3>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {p.tr.criteria.map((c) => (
              <li key={c} className="flex items-start gap-2.5 text-sm leading-relaxed text-ivory/85">
                <Check className="mt-0.5 size-4 shrink-0 text-lime" aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
