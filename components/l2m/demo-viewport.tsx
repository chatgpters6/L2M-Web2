'use client'

import type { ReactNode } from 'react'
import { Lock } from 'lucide-react'
import { FitWidth } from './fit-width'
import { AfterDesktop, AfterMobile, BeforeDesktop, type HotspotProps } from './demo-sites'
import { DemoBadge } from './brand'
import { useLang } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export type View = 'before' | 'after'
export type Device = 'desktop' | 'mobile'

export function DemoViewport({
  view,
  device,
  hotspots,
  chromeSlot,
  footerSlot,
  className,
  bodyHeight = 'h-[560px]',
}: {
  view: View
  device: Device
  hotspots?: HotspotProps
  chromeSlot?: ReactNode
  footerSlot?: ReactNode
  className?: string
  bodyHeight?: string
}) {
  const { t } = useLang()
  const h: HotspotProps = { ...hotspots, showHotspots: view === 'after' && hotspots?.showHotspots }
  const address = view === 'after' ? 'hartwell-demo.example' : 'www.hartwell-demo.example/index.html'
  const label = `${view === 'after' ? t.flagship.after : t.flagship.before} — ${t.flagship.placeholder}`

  if (device === 'mobile') {
    return (
      <figure aria-label={label} className={cn('flex flex-col items-center gap-3', className)}>
        <div className="relative w-full max-w-[340px] rounded-[2.75rem] border-[10px] border-ink bg-ink shadow-2xl shadow-ink/25">
          <div className="flex items-center justify-between rounded-t-[2rem] bg-site-bg px-6 pt-2.5 pb-1 font-mono text-[10px] text-site-ink">
            <span>9:41</span>
            <span aria-hidden="true" className="h-5 w-20 rounded-full bg-ink" />
            <span>5G</span>
          </div>
          <div className="flex items-center gap-1.5 bg-site-soft px-3 py-1.5 font-mono text-[10px] text-site-ink/70">
            <Lock className="size-2.5" aria-hidden="true" />
            <span className="truncate">{address}</span>
          </div>
          <div className={cn('overflow-y-auto overscroll-contain rounded-b-[2rem] bg-site-bg', 'h-[560px]')} tabIndex={0} aria-label={label}>
            {view === 'after' ? (
              <FitWidth designWidth={375}>
                <AfterMobile {...h} />
              </FitWidth>
            ) : (
              <div className="flex flex-col">
                <FitWidth designWidth={1000}>
                  <BeforeDesktop />
                </FitWidth>
                <p className="m-3 rounded-md bg-site-soft p-3 text-xs leading-relaxed text-site-ink">{t.flagship.legacyMobileNote}</p>
              </div>
            )}
          </div>
          <DemoBadge className="absolute top-14 -left-3" />
        </div>
        {footerSlot}
      </figure>
    )
  }

  return (
    <figure aria-label={label} className={cn('flex flex-col overflow-hidden rounded-xl border border-ink/15 bg-site-bg shadow-2xl shadow-ink/20', className)}>
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
        <DemoBadge className="hidden sm:inline-flex" />
        {chromeSlot}
      </div>
      <div className={cn('overflow-y-auto overscroll-contain', bodyHeight)} tabIndex={0} aria-label={label}>
        {view === 'after' ? (
          <FitWidth designWidth={1280}>
            <div className="p-0">
              <AfterDesktop {...h} />
            </div>
          </FitWidth>
        ) : (
          <FitWidth designWidth={1000}>
            <BeforeDesktop />
          </FitWidth>
        )}
      </div>
      {footerSlot}
    </figure>
  )
}

export function PageTabs({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const { t } = useLang()
  const dark = tone === 'dark'
  const pages = [
    { key: 'home', label: t.flagship.pages.home, available: true },
    { key: 'product', label: t.flagship.pages.product, available: false },
    { key: 'contact', label: t.flagship.pages.contact, available: false },
  ]
  return (
    <div className="flex flex-col gap-1.5">
      <div role="tablist" aria-label={t.flagship.pagesLabel} className="flex items-center gap-1">
        {pages.map((p) => (
          <button
            key={p.key}
            type="button"
            role="tab"
            aria-selected={p.available}
            aria-disabled={!p.available}
            disabled={!p.available}
            title={p.available ? undefined : t.flagship.pageLocked}
            className={cn(
              'inline-flex min-h-9 items-center gap-1.5 rounded-md px-3 text-sm font-medium focus-visible:outline-2',
              p.available
                ? dark
                  ? 'bg-ivory/10 text-ivory'
                  : 'bg-ink/[0.07] text-ink'
                : dark
                  ? 'cursor-not-allowed text-ivory/45'
                  : 'cursor-not-allowed text-ink/45',
            )}
          >
            {!p.available && <Lock className="size-3" aria-hidden="true" />}
            {p.label}
          </button>
        ))}
      </div>
      <p className={cn('text-xs', dark ? 'text-ivory/60' : 'text-ink/60')}>{t.flagship.pageLocked}</p>
    </div>
  )
}
