'use client'

import { ArrowRight, Monitor, Smartphone } from 'lucide-react'
import { DemoViewport, PageTabs } from '@/components/l2m/demo-viewport'
import { Segmented } from '@/components/l2m/brand'
import { EvidenceList } from '@/components/l2m/evidence'
import { focusHeroInput, useFlagship } from '@/components/l2m/use-flagship'
import { useLang } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function FlagshipB({ inputId }: { inputId: string }) {
  const { t, lang } = useLang()
  const { view, setView, device, setDevice, activeHotspot, setActiveHotspot } = useFlagship(0)

  return (
    <section id="transformation-b" aria-labelledby="flagship-b-title" className="scroll-mt-4 bg-ivory">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 py-16 md:px-10 lg:py-24">
        <div className="flex flex-col gap-3 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink/70">{t.b.workbenchEyebrow}</p>
          <h2
            id="flagship-b-title"
            className={cn(
              'mx-auto max-w-4xl text-balance font-semibold text-ink',
              lang === 'zh' ? 'text-3xl leading-tight sm:text-[44px]' : 'text-4xl leading-[1.05] tracking-[-0.03em] sm:text-[52px]',
            )}
          >
            {t.flagship.title}
          </h2>
          <p className="text-muted-foreground">{t.flagship.altTitle}</p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-ink/15 bg-mist">
          <div className="flex flex-col gap-4 border-b border-ink/10 bg-ivory/60 p-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <Segmented
                label={t.flagship.viewLabel}
                value={view}
                onChange={setView}
                options={[
                  { value: 'before', label: t.flagship.before },
                  { value: 'after', label: t.flagship.after },
                ]}
              />
              <Segmented
                label={t.flagship.deviceLabel}
                value={device}
                onChange={setDevice}
                options={[
                  { value: 'desktop', label: t.flagship.desktop, icon: <Monitor className="size-4" aria-hidden="true" /> },
                  { value: 'mobile', label: t.flagship.mobile, icon: <Smartphone className="size-4" aria-hidden="true" /> },
                ]}
              />
            </div>
            <PageTabs />
          </div>

          <div className="grid lg:grid-cols-[1fr_380px]">
            <div className="min-w-0 p-4 md:p-8">
              <DemoViewport
                view={view}
                device={device}
                bodyHeight="h-[420px] md:h-[580px]"
                hotspots={{
                  showHotspots: true,
                  activeHotspot,
                  onHotspot: setActiveHotspot,
                  hotspotLabel: (i) => `${t.flagship.hotspotsAria} ${i + 1}: ${t.hotspots[i].title}`,
                }}
              />
            </div>

            <aside aria-labelledby="changes-b" className="flex flex-col gap-4 border-t border-ink/10 bg-ivory p-5 lg:border-t-0 lg:border-l">
              <h3 id="changes-b" className="text-sm font-semibold text-ink">
                {t.flagship.changesHeading}
              </h3>
              <ul className="flex flex-col gap-2">
                {t.hotspots.map((hs, i) => {
                  const active = activeHotspot === i
                  return (
                    <li key={hs.tag}>
                      <button
                        type="button"
                        aria-pressed={active}
                        onClick={() => {
                          setActiveHotspot(i)
                          setView('after')
                        }}
                        className={cn(
                          'flex w-full flex-col gap-2 rounded-lg border p-3.5 text-left motion-safe:transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink',
                          active ? 'border-ink bg-ivory shadow-sm' : 'border-ink/10 hover:border-ink/40',
                        )}
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className={cn(
                              'flex size-6 items-center justify-center rounded-full font-mono text-xs font-bold',
                              active ? 'bg-lime text-ink' : 'bg-ink text-lime',
                            )}
                          >
                            {i + 1}
                          </span>
                          <span className="font-mono text-[11px] uppercase tracking-wider text-ink/65">{hs.tag}</span>
                        </span>
                        <span className="font-semibold text-ink">{hs.title}</span>
                        {active && (
                          <span className="grid grid-cols-2 gap-2 text-[13px] leading-relaxed">
                            <span className="rounded-md bg-mist/70 p-2.5 text-ink/75">
                              <span className="block font-mono text-[10px] uppercase tracking-wider text-ink/60">{t.flagship.beforeLabel}</span>
                              {hs.before}
                            </span>
                            <span className="rounded-md bg-lime/35 p-2.5 text-ink">
                              <span className="block font-mono text-[10px] uppercase tracking-wider text-ink/70">{t.flagship.afterLabel}</span>
                              {hs.after}
                            </span>
                            <span className="col-span-2 text-ink">
                              <span className="font-semibold">{t.flagship.valueLabel}: </span>
                              {hs.value}
                            </span>
                            {i === 2 && (
                              <span className="col-span-2 font-mono text-[11px] uppercase tracking-wider text-ink/70">{t.flagship.inquiryDemo}</span>
                            )}
                          </span>
                        )}
                      </button>
                    </li>
                  )
                })}
              </ul>
              <EvidenceList className="mt-auto" />
            </aside>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => focusHeroInput(inputId)}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-ink px-6 font-semibold text-ivory focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            {t.hero.ctaPrimary}
            <span className="flex size-6 items-center justify-center rounded-full bg-lime text-ink" aria-hidden="true">
              <ArrowRight className="size-3.5" />
            </span>
          </button>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            title={t.nav.navDemo}
            className="inline-flex min-h-12 items-center justify-center rounded-md border border-ink/25 px-6 font-semibold text-ink hover:bg-mist/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            {t.flagship.explore}
          </a>
        </div>
      </div>
    </section>
  )
}
