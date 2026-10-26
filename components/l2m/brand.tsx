'use client'

import { useLang, type Lang } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function Logo({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  return (
    <span className="flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className={cn(
          'flex h-7 items-center rounded-sm px-1.5 font-mono text-xs font-bold tracking-tight',
          tone === 'dark' ? 'bg-lime text-ink' : 'bg-ink text-lime',
        )}
      >
        L2M
      </span>
      <span className={cn('text-[15px] font-semibold tracking-tight', tone === 'dark' ? 'text-ivory' : 'text-ink')}>
        Legacy2Modern
      </span>
    </span>
  )
}

export function LangToggle({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const { lang, setLang } = useLang()
  const options: { value: Lang; label: string }[] = [
    { value: 'en', label: 'EN' },
    { value: 'zh', label: '中文' },
  ]
  return (
    <div
      role="group"
      aria-label="Language / 语言"
      className={cn(
        'flex items-center rounded-full border p-0.5 text-xs font-medium',
        tone === 'dark' ? 'border-ivory/25' : 'border-ink/20',
      )}
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={lang === o.value}
          onClick={() => setLang(o.value)}
          className={cn(
            'min-h-8 min-w-10 rounded-full px-2.5 focus-visible:outline-2 focus-visible:outline-offset-1',
            lang === o.value
              ? tone === 'dark'
                ? 'bg-ivory text-ink'
                : 'bg-ink text-ivory'
              : tone === 'dark'
                ? 'text-ivory/75 hover:text-ivory'
                : 'text-ink/70 hover:text-ink',
            tone === 'dark' ? 'focus-visible:outline-ivory' : 'focus-visible:outline-ink',
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

export function DemoBadge({ className, tone = 'light' }: { className?: string; tone?: 'light' | 'dark' }) {
  const { t } = useLang()
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-sm border px-1.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider',
        tone === 'dark' ? 'border-lime/60 text-lime' : 'border-ink/40 bg-ivory text-ink',
        className,
      )}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {t.flagship.placeholder}
    </span>
  )
}

export function Segmented<T extends string>({
  label,
  value,
  onChange,
  options,
  tone = 'light',
  size = 'md',
}: {
  label: string
  value: T
  onChange: (v: T) => void
  options: { value: T; label: string; icon?: React.ReactNode }[]
  tone?: 'light' | 'dark'
  size?: 'md' | 'lg'
}) {
  const dark = tone === 'dark'
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn('inline-flex items-center rounded-full border p-1', dark ? 'border-ivory/20 bg-ivory/5' : 'border-ink/15 bg-ivory')}
      onKeyDown={(e) => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
        e.preventDefault()
        const i = options.findIndex((o) => o.value === value)
        const next = options[(i + (e.key === 'ArrowRight' ? 1 : options.length - 1)) % options.length]
        onChange(next.value)
        const btn = e.currentTarget.querySelector<HTMLButtonElement>(`[data-value="${next.value}"]`)
        btn?.focus()
      }}
    >
      {options.map((o) => {
        const active = o.value === value
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            data-value={o.value}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(o.value)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full font-medium motion-safe:transition-colors focus-visible:outline-2 focus-visible:outline-offset-2',
              size === 'lg' ? 'min-h-11 px-5 text-[15px]' : 'min-h-9 px-3.5 text-sm',
              active
                ? dark
                  ? 'bg-lime text-ink'
                  : 'bg-ink text-ivory'
                : dark
                  ? 'text-ivory/75 hover:text-ivory'
                  : 'text-ink/70 hover:text-ink',
              dark ? 'focus-visible:outline-lime' : 'focus-visible:outline-ink',
            )}
          >
            {o.icon}
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
