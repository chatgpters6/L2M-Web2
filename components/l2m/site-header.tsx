'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ChevronLeft, Menu, X } from 'lucide-react'
import { Logo, LangToggle } from './brand'
import { focusHeroInput } from './use-flagship'
import { useLang } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function ReviewBar({ direction }: { direction: 'A' | 'B' }) {
  const { t } = useLang()
  return (
    <div className="bg-ink text-ivory">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-2 font-mono text-[11px] uppercase tracking-wider md:px-10">
        <Link
          href="/review/stage-1"
          className="inline-flex min-h-8 items-center gap-1 hover:text-lime focus-visible:outline-2 focus-visible:outline-lime"
        >
          <ChevronLeft className="size-3.5" aria-hidden="true" />
          {t.review.back}
        </Link>
        <span className="truncate text-ivory/70">Stage 1 · Direction {direction} · Prototype — not production</span>
      </div>
    </div>
  )
}

/** `anchors` maps the three nav items to in-page sections; without it the links are inert placeholders. */
export function SiteHeader({
  tone = 'light',
  inputId,
  anchors,
}: {
  tone?: 'light' | 'dark'
  inputId: string
  anchors?: [string, string, string]
}) {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const dark = tone === 'dark'
  const labels = [t.nav.transformations, t.nav.howItWorks, t.nav.pricing]
  const links = labels.map((label, i) => ({ label, href: anchors?.[i] }))
  const menuId = `${inputId}-menu`

  const linkCls = cn('underline-offset-4 hover:underline focus-visible:outline-2', dark ? 'text-ivory/80' : 'text-ink/80')

  return (
    <header className={cn('relative', dark ? 'bg-ink text-ivory' : 'border-b border-ink/10 bg-ivory text-ink')}>
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-4 md:px-10">
        <Logo tone={tone} />
        <nav aria-label={t.nav.navLabel} className="hidden items-center gap-8 text-sm font-medium lg:flex">
          {links.map((l) =>
            l.href ? (
              <a key={l.label} href={l.href} className={linkCls}>
                {l.label}
              </a>
            ) : (
              <a key={l.label} href="#" title={t.nav.navDemo} onClick={(e) => e.preventDefault()} className={linkCls}>
                {l.label}
              </a>
            ),
          )}
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
          {anchors && (
            <button
              type="button"
              aria-expanded={open}
              aria-controls={menuId}
              onClick={() => setOpen((o) => !o)}
              className={cn(
                'inline-flex size-11 items-center justify-center rounded-md border lg:hidden focus-visible:outline-2',
                dark ? 'border-ivory/25 focus-visible:outline-lime' : 'border-ink/20 focus-visible:outline-ink',
              )}
            >
              {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            </button>
          )}
        </div>
      </div>
      {anchors && open && (
        <nav
          id={menuId}
          aria-label={t.nav.navLabel}
          className={cn('flex flex-col border-t px-5 pb-4 lg:hidden', dark ? 'border-ivory/15' : 'border-ink/10')}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className={cn('flex min-h-12 items-center border-b text-base font-medium', dark ? 'border-ivory/10' : 'border-ink/10')}
            >
              {l.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setOpen(false)
              focusHeroInput(inputId)
            }}
            className={cn(
              'mt-4 inline-flex min-h-12 items-center justify-center rounded-md font-semibold',
              dark ? 'bg-lime text-ink' : 'bg-ink text-ivory',
            )}
          >
            {t.nav.analyze}
          </button>
        </nav>
      )}
    </header>
  )
}
