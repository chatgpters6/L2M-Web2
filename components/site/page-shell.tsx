'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { ArrowRight, Info } from 'lucide-react'
import { ProtoBar } from '@/components/home/proto-bar'
import { SiteFooter } from '@/components/home/invitation'
import { HOME_INPUT_ID, SiteHeader } from '@/components/l2m/site-header'
import { useLang } from '@/lib/i18n'
import { pagesCopy } from '@/lib/pages-copy'
import { cn } from '@/lib/utils'

export function usePagesCopy() {
  const { lang, t } = useLang()
  return { p: pagesCopy[lang], lang, t }
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <ProtoBar />
      <SiteHeader tone="dark" />
      <main className="bg-ivory text-ink">{children}</main>
      <SiteFooter />
    </>
  )
}

export function PageHero({ eyebrow, title, lede, status, children }: { eyebrow: string; title: string; lede: string; status?: string; children?: ReactNode }) {
  const { lang } = useLang()
  return (
    <section aria-labelledby="page-title" className="bg-ink text-ivory">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 pt-12 pb-16 md:px-10 lg:pt-20 lg:pb-24">
        <div className="flex max-w-4xl flex-col gap-5">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-lime">{eyebrow}</p>
          <h1
            id="page-title"
            className={cn(
              'text-balance font-semibold',
              lang === 'zh' ? 'text-[32px] leading-[1.25] sm:text-5xl sm:leading-[1.2]' : 'text-[38px] leading-[1.04] tracking-[-0.03em] sm:text-[64px]',
            )}
          >
            {title}
          </h1>
          <p className="max-w-2xl text-pretty text-base leading-relaxed text-ivory/75 sm:text-lg">{lede}</p>
        </div>
        {status && (
          <p className="flex max-w-3xl items-start gap-2.5 rounded-md border border-lime/40 px-4 py-3 text-sm leading-relaxed text-ivory/85">
            <Info className="mt-0.5 size-4 shrink-0 text-lime" aria-hidden="true" />
            {status}
          </p>
        )}
        {children}
      </div>
    </section>
  )
}

export function SectionHead({ id, eyebrow, title, lede, className }: { id: string; eyebrow: string; title: string; lede?: string; className?: string }) {
  const { lang } = useLang()
  return (
    <div className={cn('flex max-w-3xl flex-col gap-3', className)}>
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink/60">{eyebrow}</p>
      <h2
        id={id}
        className={cn(
          'text-balance font-semibold',
          lang === 'zh' ? 'text-2xl leading-snug sm:text-[34px] sm:leading-tight' : 'text-[28px] leading-[1.1] tracking-[-0.02em] sm:text-[40px]',
        )}
      >
        {title}
      </h2>
      {lede && <p className="text-pretty leading-relaxed text-ink/70">{lede}</p>}
    </div>
  )
}

export function PageCta({ title, body, secondary }: { title: string; body: string; secondary: { label: string; href: string } }) {
  const { p } = usePagesCopy()
  return (
    <section aria-labelledby="page-cta" className="bg-ink text-ivory">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 py-16 md:px-10 lg:flex-row lg:items-end lg:justify-between lg:py-24">
        <div className="flex max-w-2xl flex-col gap-3">
          <h2 id="page-cta" className="text-balance text-3xl font-semibold leading-tight sm:text-[44px]">
            {title}
          </h2>
          <p className="leading-relaxed text-ivory/70">{body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href={`/#${HOME_INPUT_ID}`}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-lime px-6 font-semibold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
          >
            {p.common.analyze}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href={secondary.href}
            className="inline-flex min-h-12 items-center justify-center rounded-md border border-ivory/30 px-6 font-semibold hover:border-ivory focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
          >
            {secondary.label}
          </Link>
        </div>
      </div>
    </section>
  )
}
