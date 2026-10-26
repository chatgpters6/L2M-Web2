'use client'

import { ArrowRight, Monitor, Smartphone } from 'lucide-react'
import { DemoViewport, PageTabs } from '@/components/l2m/demo-viewport'
import { Segmented } from '@/components/l2m/brand'
import { focusHeroInput, useFlagship } from '@/components/l2m/use-flagship'
import { EvidenceList } from '@/components/l2m/evidence'
import { useLang } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function FlagshipA({ inputId }: { inputId: string }) {
  const { t, lang } = useLang()
  const { view, setView, device, setDevice, activeHotspot, setActiveHotspot } = useFlagship(0)

  return (
    <section id="transformation-a" aria-labelledby="flagship-a-title" className="scroll-mt-4 bg-ink text-ivory">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-5 py-16 md:px-10 lg:py-24">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="flex flex-col gap-5 lg:col-span-8">
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-ivory/70">
              <span aria-hidden="true" className="h-px w-8 bg-lime" />
              {t.flagship.eyebrow}
            </p>
            <h2
              id="flagship-a-title"
              className={cn(
                'text-balance font-semibold',
                lang === 'zh' ? 'text-3xl leading-tight sm:text-5xl' : 'text-4xl leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-7xl',
              )}
            >
              {t.flagship.title}
            </h2>
          </div>
          <div className="flex flex-col gap-3 lg:col-span-4">
            <p className="text-ivory/60">{t.flagship.altTitle}</p>
            <p className="text-pretty leading-relaxed text-ivory/80">{t.flagship.lede}</p>
          </div>
        </div>

        <div className="flex flex-col gap-5 border-y border-ivory/15 py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <Segmented
              tone="dark"
              label={t.flagship.viewLabel}
              value={view}
              onChange={setView}
              options={[
                { value: 'after', label: t.flagship.after },
                { value: 'before', label: t.flagship.before },
              ]}
            />
            <Segmented
              tone="dark"
              label={t.flagship.deviceLabel}
              value={device}
              onChange={setDevice}
              options={[
                { value: 'desktop', label: t.flagship.desktop, icon: <Monitor className="size-4" aria-hidden="true" /> },
                { value: 'mobile', label: t.flagship.mobile, icon: <Smartphone className="size-4" aria-hidden="true" /> },
              ]}
            />
          </div>
          <PageTabs tone="dark" />
        </div>

        <div className="grid gap-10 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-8">
            <DemoViewport
              view={view}
              device={device}
              bodyHeight="h-[420px] md:h-[600px]"
              hotspots={{
                showHotspots: true,
                activeHotspot,
                onHotspot: setActiveHotspot,
                hotspotLabel: (i) => `${t.flagship.hotspotsAria} ${i + 1}: ${t.hotspots[i].title}`,
              }}
            />
            {view === 'before' && <p className="mt-3 text-sm text-ivory/70">{t.flagship.beforeHint}</p>}
          </div>

          <aside aria-labelledby="changes-a" className="flex flex-col gap-6 lg:col-span-4">
            <h3 id="changes-a" className="font-mono text-xs uppercase tracking-[0.2em] text-ivory/70">
              {t.flagship.changesHeading}
            </h3>
            <ol className="flex flex-col">
              {t.hotspots.map((hs, i) => {
                const active = activeHotspot === i
                return (
                  <li key={hs.tag} className="border-t border-ivory/15 last:border-b">
                    <button
                      type="button"
                      aria-expanded={active}
                      onClick={() => {
                        setActiveHotspot(i)
                        setView('after')
                      }}
                      className="flex min-h-14 w-full items-baseline gap-4 py-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
                    >
                      <span className={cn('font-mono text-sm', active ? 'text-lime' : 'text-ivory/50')}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="flex flex-1 flex-col gap-0.5">
                        <span className="font-mono text-[11px] uppercase tracking-wider text-ivory/60">{hs.tag}</span>
                        <span className={cn('text-lg font-medium', active ? 'text-ivory' : 'text-ivory/80')}>{hs.title}</span>
                      </span>
                    </button>
                    {active && (
                      <div className="flex flex-col gap-3 pb-5 pl-9 text-[15px] leading-relaxed">
                        <p className="text-ivory/65">
                          <span className="font-medium text-ivory/90">{t.flagship.beforeLabel}. </span>
                          {hs.before}
                        </p>
                        <p className="text-ivory/85">
                          <span className="font-medium text-ivory">{t.flagship.afterLabel}. </span>
                          {hs.after}
                        </p>
                        <p className="border-l-2 border-lime pl-3 text-ivory">
                          <span className="font-medium">{t.flagship.valueLabel}: </span>
                          {hs.value}
                        </p>
                        {i === 2 && <p className="font-mono text-[11px] uppercase tracking-wider text-lime">{t.flagship.inquiryDemo}</p>}
                      </div>
                    )}
                  </li>
                )
              })}
            </ol>
            <EvidenceList tone="dark" />
          </aside>
        </div>

        <div className="flex flex-col gap-4 border-t border-ivory/15 pt-8 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => focusHeroInput(inputId)}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-lime px-6 font-semibold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
          >
            {t.hero.ctaPrimary}
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            title={t.nav.navDemo}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-ivory/30 px-6 font-semibold text-ivory hover:bg-ivory/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ivory"
          >
            {t.flagship.explore}
          </a>
        </div>
      </div>
    </section>
  )
}
