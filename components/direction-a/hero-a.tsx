'use client'

import { ArrowDownRight } from 'lucide-react'
import { UrlAnalyzer } from '@/components/l2m/url-analyzer'
import { DemoViewport } from '@/components/l2m/demo-viewport'
import { useLang } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function HeroA({ inputId }: { inputId: string }) {
  const { t, lang } = useLang()
  return (
    <section aria-labelledby="hero-a-title" className="mx-auto max-w-[1440px] px-5 pt-10 pb-16 md:px-10 lg:pt-16 lg:pb-24">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="flex min-w-0 flex-col gap-8 lg:col-span-6 lg:pt-6">
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-ink/70">
            <span aria-hidden="true" className="h-px w-8 bg-ink/40" />
            {t.hero.brandLine}
          </p>
          <h1
            id="hero-a-title"
            className={cn(
              'text-balance font-semibold text-ink',
              lang === 'zh'
                ? 'text-[38px] leading-[1.2] tracking-tight sm:text-5xl lg:text-[60px] lg:leading-[1.15]'
                : 'text-[40px] leading-[1.04] tracking-[-0.03em] sm:text-6xl lg:text-[76px] lg:leading-[0.98]',
            )}
          >
            {t.hero.headline}
          </h1>
          <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">{t.hero.subtitle}</p>

          <div className="flex max-w-xl flex-col gap-4">
            <UrlAnalyzer inputId={inputId} size="lg" />
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <a
                href="#transformation-a"
                className="inline-flex min-h-11 items-center gap-2 font-semibold text-ink underline decoration-ink/30 decoration-2 underline-offset-[6px] hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
              >
                {t.hero.ctaSecondary}
                <ArrowDownRight className="size-4" aria-hidden="true" />
              </a>
              <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                {t.hero.boundary.map((b) => (
                  <li key={b} className="flex items-center gap-1.5">
                    <span aria-hidden="true" className="size-1 rounded-full bg-ink/50" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-3 lg:col-span-6">
          <div className="rounded-2xl bg-mist p-3 sm:p-6 lg:p-8">
            <DemoViewport view="after" device="desktop" bodyHeight="h-[300px] sm:h-[420px] lg:h-[560px]" />
          </div>
          <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <span className="font-mono text-xs uppercase tracking-wider text-ink">Fig. 1</span>
            <span>{t.flagship.figCaption}</span>
            <span className="font-mono text-xs uppercase tracking-wider text-ink">· {t.flagship.placeholder}</span>
          </p>
        </div>
      </div>
    </section>
  )
}
