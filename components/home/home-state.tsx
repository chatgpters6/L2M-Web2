'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import type { View } from '@/components/l2m/demo-viewport'
import { homeCopy } from '@/lib/home-copy'
import { useLang } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export const HERO_INPUT_ID = 'home-url'
export const INVITE_INPUT_ID = 'invite-url'

type DemoState = { view: View; setView: (v: View) => void }
const DemoContext = createContext<DemoState | null>(null)

/** One Before / After selection shared by the hero proof and the Transformation workbench. */
export function HomeDemoProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<View>('after')
  return <DemoContext.Provider value={{ view, setView }}>{children}</DemoContext.Provider>
}

export function useHomeDemo() {
  const ctx = useContext(DemoContext)
  if (!ctx) throw new Error('useHomeDemo must be used inside HomeDemoProvider')
  return ctx
}

export function useHomeCopy() {
  const { lang, t } = useLang()
  return { h: homeCopy[lang], t, lang }
}

export function SectionIntro({
  eyebrow,
  title,
  lede,
  id,
  tone = 'light',
  align = 'split',
}: {
  eyebrow: string
  title: string
  lede?: string
  id: string
  tone?: 'light' | 'dark'
  align?: 'split' | 'stack'
}) {
  const { lang } = useLang()
  const dark = tone === 'dark'
  return (
    <div className={cn('flex flex-col gap-5', align === 'split' && 'lg:flex-row lg:items-end lg:justify-between lg:gap-16')}>
      <div className="flex max-w-3xl flex-col gap-4">
        <p className={cn('font-mono text-xs uppercase tracking-[0.18em]', dark ? 'text-lime' : 'text-ink/70')}>{eyebrow}</p>
        <h2
          id={id}
          className={cn(
            'text-balance font-semibold',
            lang === 'zh' ? 'text-3xl leading-tight sm:text-[42px]' : 'text-[34px] leading-[1.05] tracking-[-0.03em] sm:text-5xl',
          )}
        >
          {title}
        </h2>
      </div>
      {lede && (
        <p className={cn('max-w-md text-pretty leading-relaxed lg:pb-1', dark ? 'text-ivory/75' : 'text-ink/70')}>{lede}</p>
      )}
    </div>
  )
}
