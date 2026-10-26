'use client'

import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { Logo, LangToggle } from './brand'
import { focusHeroInput } from './use-flagship'
import { useLang } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function ReviewBar({ direction }: { direction: 'A' | 'B' }) {
  const { t } = useLang()
  return (
    <div className="bg-ink text-ivory">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-2 font-mono text-[11px] uppercase tracking-wider md:px-10">
        <Link href="/" className="inline-flex min-h-8 items-center gap-1 hover:text-lime focus-visible:outline-2 focus-visible:outline-lime">
          <ChevronLeft className="size-3.5" aria-hidden="true" />
          {t.review.back}
        </Link>
        <span className="truncate text-ivory/70">
          Stage 1 · Direction {direction} · Prototype — not production
        </span>
      </div>
    </div>
  )
}

export function SiteHeader({ tone = 'light', inputId }: { tone?: 'light' | 'dark'; inputId: string }) {
  const { t } = useLang()
  const dark = tone === 'dark'
  const links = [t.nav.transformations, t.nav.howItWorks, t.nav.pricing]
  return (
    <header className={cn(dark ? 'bg-ink text-ivory' : 'border-b border-ink/10 bg-ivory text-ink')}>
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-4 md:px-10">
        <Logo tone={tone} />
        <nav aria-label={t.nav.navLabel} className="hidden items-center gap-8 text-sm font-medium lg:flex">
          {links.map((l) => (
            <a
              key={l}
              href="#"
              title={t.nav.navDemo}
              onClick={(e) => e.preventDefault()}
              className={cn('underline-offset-4 hover:underline focus-visible:outline-2', dark ? 'text-ivory/80' : 'text-ink/80')}
            >
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LangToggle tone={tone} />
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            title={t.nav.navDemo}
            className={cn('hidden text-sm font-medium md:inline', dark ? 'text-ivory/80' : 'text-ink/80')}
          >
            {t.nav.signIn}
          </a>
          <button
            type="button"
            onClick={() => focusHeroInput(inputId)}
            className={cn(
              'hidden min-h-10 items-center rounded-md px-4 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:inline-flex',
              dark ? 'bg-lime text-ink focus-visible:outline-lime' : 'bg-ink text-ivory focus-visible:outline-ink',
            )}
          >
            {t.nav.analyze}
          </button>
        </div>
      </div>
    </header>
  )
}
