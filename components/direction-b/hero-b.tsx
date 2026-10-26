'use client'

import { ArrowDown } from 'lucide-react'
import { UrlAnalyzer } from '@/components/l2m/url-analyzer'
import { DemoViewport } from '@/components/l2m/demo-viewport'
import { Segmented } from '@/components/l2m/brand'
import { useFlagship } from '@/components/l2m/use-flagship'
import { useLang } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function HeroB({ inputId }: { inputId: string }) {
  const { t, lang } = useLang()
  const { view, setView, device, activeHotspot, setActiveHotspot } = useFlagship(null)
  const active = activeHotspot !== null ? t.hotspots[activeHotspot] : null

  const toggle = (
    <Segmented
      label={t.flagship.viewLabel}
      value={view}
      onChange={(v) => {
        setView(v)
        if (v === 'before') setActiveHotspot(null)
      }}
      size="lg"
      options={[
        { value: 'before', label: t.flagship.before },
        { value: 'after', label: t.flagship.after },
      ]}
    />
  )

  return (
    <section aria-labelledby="hero-b-title" className="relative bg-ink text-ivory">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-6 px-5 pt-10 pb-10 text-center md:px-10 lg:pt-14">
        <p className="rounded-full border border-ivory/20 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-ivory/75">
          {t.hero.brandLine}
        </p>
        <h1
          id="hero-b-title"
          className={cn(
            'max-w-4xl text-balance font-semibold',
            lang === 'zh' ? 'text-[34px] leading-tight sm:text-5xl lg:text-[56px]' : 'text-[38px] leading-[1.04] tracking-[-0.03em] sm:text-5xl lg:text-[64px]',
          )}
        >
          {t.hero.headline}
        </h1>
        <p className="max-w-2xl text-pretty leading-relaxed text-ivory/75 lg:text-lg">{t.hero.subtitle}</p>
        <UrlAnalyzer tone="dark" inputId={inputId} className="w-full max-w-2xl text-left" size="lg" />
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
          <a
            href="#transformation-b"
            className="inline-flex min-h-11 items-center gap-2 font-semibold text-ivory underline decoration-lime decoration-2 underline-offset-[6px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
          >
            {t.hero.ctaSecondary}
            <ArrowDown className="size-4" aria-hidden="true" />
          </a>
          <p className="text-sm text-ivory/65">{t.hero.boundary.join(' · ')}</p>
        </div>
      </div>

      <div className="relative">
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-ivory" />
        <div className="relative mx-auto flex max-w-[1240px] flex-col items-center gap-4 px-5 md:px-10">
          <div className="flex flex-col items-center gap-2">
            {toggle}
            <p className="text-xs text-ivory/60">{t.b.heroToggleHint}</p>
          </div>
          <DemoViewport
            view={view}
            device={device}
            className="w-full"
            bodyHeight="h-[520px]"
            hotspots={{
              showHotspots: true,
              activeHotspot,
              onHotspot: (i) => setActiveHotspot(activeHotspot === i ? null : i),
              hotspotLabel: (i) => `${t.flagship.hotspotsAria} ${i + 1}: ${t.hotspots[i].title}`,
            }}
            footerSlot={
              <div
                aria-live="polite"
                className={cn(
                  'flex min-h-16 items-center gap-3 px-4 py-3 text-left text-sm',
                  device === 'mobile' ? 'w-full max-w-[340px] rounded-lg bg-ivory text-ink shadow-md' : 'border-t border-ink/10 bg-ivory text-ink',
                )}
              >
                {view === 'before' ? (
                  <p className="text-ink/75">{t.flagship.beforeHint}</p>
                ) : active ? (
                  <>
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-lime font-mono text-xs font-bold text-ink">
                      {activeHotspot! + 1}
                    </span>
                    <p className="leading-snug">
                      <span className="font-semibold">{active.tag} — </span>
                      {active.after}{' '}
                      <span className="text-ink/65">{active.value}</span>
                    </p>
                  </>
                ) : (
                  <div className="flex w-full flex-wrap items-center gap-2">
                    <span className="text-ink/70">{t.b.pinsHint}:</span>
                    {t.hotspots.map((hs, i) => (
                      <button
                        key={hs.tag}
                        type="button"
                        onClick={() => setActiveHotspot(i)}
                        className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-ink/20 px-3 font-medium hover:border-ink focus-visible:outline-2 focus-visible:outline-ink"
                      >
                        <span className="font-mono text-xs">{i + 1}</span> {hs.tag}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            }
          />
        </div>
      </div>
    </section>
  )
}
