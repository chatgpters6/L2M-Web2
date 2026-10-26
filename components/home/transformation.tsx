'use client'

import { useState } from 'react'
import { ArrowRight, Monitor, Smartphone } from 'lucide-react'
import { DemoViewport, PageTabs } from '@/components/l2m/demo-viewport'
import { Segmented } from '@/components/l2m/brand'
import { focusHeroInput, useFlagship } from '@/components/l2m/use-flagship'
import { cn } from '@/lib/utils'
import { HERO_INPUT_ID, SectionIntro, useHomeCopy, useHomeDemo } from './home-state'

export function Transformation() {
  const { h, t } = useHomeCopy()
  const { view, setView } = useHomeDemo()
  const { device, setDevice } = useFlagship(0)
  const [active, setActive] = useState(0)

  return (
    <section id="transformation" aria-labelledby="transformation-title" className="scroll-mt-4 bg-ivory text-ink">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-5 py-16 md:px-10 lg:py-24">
        <SectionIntro id="transformation-title" eyebrow={t.flagship.eyebrow} title={t.flagship.title} lede={t.flagship.lede} />

        <div className="flex flex-col gap-4 border-y border-ink/15 py-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-2">
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
            <p className="text-xs text-ink/60">{h.transformation.synced}</p>
          </div>
          <PageTabs />
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
          <div className="min-w-0">
            <DemoViewport
              view={view}
              device={device}
              bodyHeight="h-[440px] md:h-[620px]"
              badgeLabel={t.flagship.fictional}
              hotspots={{
                showHotspots: true,
                activeHotspot: active,
                onHotspot: setActive,
                hotspotLabel: (i) => `${t.flagship.hotspotsAria} ${i + 1}: ${t.hotspots[i].title}`,
              }}
            />
          </div>

          <aside aria-labelledby="notes-title" className="flex flex-col gap-6">
            <h3 id="notes-title" className="text-lg font-semibold leading-snug">
              {h.transformation.notesHeading}
            </h3>
            <ol className="flex flex-col">
              {t.hotspots.map((hs, i) => {
                const isActive = active === i
                return (
                  <li key={hs.tag} className="border-t border-ink/15">
                    <button
                      type="button"
                      aria-expanded={isActive}
                      onClick={() => {
                        setActive(i)
                        setView('after')
                      }}
                      className="flex w-full items-start gap-4 py-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                    >
                      <span
                        className={cn(
                          'flex size-8 shrink-0 items-center justify-center rounded-full font-mono text-sm font-bold',
                          isActive ? 'bg-lime text-ink' : 'bg-ink text-lime',
                        )}
                      >
                        {i + 1}
                      </span>
                      <span className="flex flex-col gap-1">
                        <span className="font-mono text-[11px] uppercase tracking-wider text-ink/60">{hs.tag}</span>
                        <span className="font-semibold leading-snug">{hs.title}</span>
                      </span>
                    </button>
                    {isActive && (
                      <dl className="flex flex-col gap-3 pb-5 pl-12 text-sm leading-relaxed">
                        <div>
                          <dt className="font-mono text-[10px] uppercase tracking-wider text-ink/55">{t.flagship.beforeLabel}</dt>
                          <dd className="text-ink/70">{hs.before}</dd>
                        </div>
                        <div>
                          <dt className="font-mono text-[10px] uppercase tracking-wider text-ink/55">{t.flagship.afterLabel}</dt>
                          <dd>{hs.after}</dd>
                        </div>
                        <div className="rounded-md bg-lime/30 px-3 py-2">
                          <dt className="font-semibold">{t.flagship.valueLabel}</dt>
                          <dd>{hs.value}</dd>
                        </div>
                        {i === 2 && <dd className="font-mono text-[11px] uppercase tracking-wider text-ink/60">{t.flagship.inquiryDemo}</dd>}
                      </dl>
                    )}
                  </li>
                )
              })}
            </ol>
          </aside>
        </div>

        <div className="flex flex-col gap-6 border-t border-ink/15 pt-6 lg:flex-row lg:items-start lg:justify-between">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-2 text-[13px] sm:grid-cols-2 lg:grid-cols-5">
            {t.flagship.evidence.map(([k, v]) => (
              <div key={k} className="flex flex-col">
                <dt className="font-mono text-[10px] uppercase tracking-wider text-ink/55">{k}</dt>
                <dd className="text-ink/80">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => focusHeroInput(HERO_INPUT_ID)}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-ink px-5 font-semibold text-ivory focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              {t.hero.ctaPrimary}
              <ArrowRight className="size-4 text-lime" aria-hidden="true" />
            </button>
            <span className="flex flex-col">
              <span
                aria-disabled="true"
                className="inline-flex min-h-12 cursor-not-allowed items-center justify-center rounded-md border border-ink/25 px-5 font-semibold text-ink/55"
              >
                {t.flagship.explore}
              </span>
            </span>
          </div>
        </div>
        <p className="-mt-6 text-right text-xs text-ink/55">{h.transformation.exploreNote}</p>
      </div>
    </section>
  )
}
