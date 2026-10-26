'use client'

import { ArrowRight, Download, Menu, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

/*
 * Fictional DEMO PLACEHOLDER company ("Hartwell Fluid Systems").
 * Hand-built mock to illustrate the Before / After format only — not a real customer and not L2M output.
 */

export type HotspotProps = {
  showHotspots?: boolean
  activeHotspot?: number | null
  onHotspot?: (index: number) => void
  hotspotLabel?: (index: number) => string
}

function Pin({ index, showHotspots, activeHotspot, onHotspot, hotspotLabel, className }: HotspotProps & { index: number; className?: string }) {
  if (!showHotspots) return null
  const active = activeHotspot === index
  return (
    <button
      type="button"
      onClick={() => onHotspot?.(index)}
      aria-pressed={active}
      aria-label={hotspotLabel?.(index) ?? `Change ${index + 1}`}
      className={cn(
        'absolute z-10 flex size-9 items-center justify-center rounded-full border-2 font-mono text-sm font-bold shadow-md focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ink motion-safe:transition-transform',
        active ? 'scale-110 border-ink bg-lime text-ink' : 'border-ivory bg-ink text-lime hover:scale-105',
        className,
      )}
    >
      {index + 1}
      {active && (
        <span aria-hidden="true" className="absolute inset-0 rounded-full ring-4 ring-lime/50 motion-safe:animate-pulse" />
      )}
    </button>
  )
}

function Highlight({ index, activeHotspot, showHotspots }: HotspotProps & { index: number }) {
  if (!showHotspots || activeHotspot !== index) return null
  return <span aria-hidden="true" className="pointer-events-none absolute -inset-2 rounded-xl border-2 border-dashed border-ink/70" />
}

const APPLICATIONS = ['Water treatment', 'Chemical processing', 'Food & beverage', 'HVAC & building']
const SPECS: [string, string][] = [
  ['Size range', 'DN15 – DN100'],
  ['Pressure rating', 'PN40'],
  ['Body material', '316 stainless steel'],
  ['Connection', 'Flanged / threaded'],
]

/* ---------------- AFTER — desktop (1280px design width) ---------------- */

export function AfterDesktop(h: HotspotProps) {
  return (
    <div className="bg-site-bg font-sans text-site-ink" aria-hidden={false}>
      <header className="flex items-center justify-between border-b border-site-line px-12 py-5">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-md bg-site-brand text-sm font-bold text-site-bg">H</span>
          <span className="text-lg font-semibold tracking-tight">Hartwell <span className="font-normal text-site-ink/60">Fluid Systems</span></span>
        </div>
        <nav className="flex items-center gap-8 text-[15px] text-site-ink/80">
          <span>Products</span>
          <span>Applications</span>
          <span>Resources</span>
          <span>Company</span>
          <Search className="size-4" aria-hidden="true" />
          <span className="rounded-md bg-site-brand px-4 py-2 font-medium text-site-bg">Request a quote</span>
        </nav>
      </header>

      <section className="grid grid-cols-2 items-center gap-12 px-12 py-14">
        <div className="flex flex-col gap-6">
          <p className="text-sm font-medium uppercase tracking-widest text-site-brand">Industrial valves since 1998</p>
          <h3 className="text-balance text-[52px] font-semibold leading-[1.05] tracking-tight">Flow control for demanding process lines.</h3>
          <p className="max-w-md text-lg leading-relaxed text-site-ink/70">
            Stainless ball, butterfly and check valves for water, chemical and food processing — specified, quoted and shipped by one team.
          </p>
          <div className="flex gap-3">
            <span className="flex items-center gap-2 rounded-md bg-site-brand px-5 py-3 font-medium text-site-bg">
              Find a valve by application <ArrowRight className="size-4" aria-hidden="true" />
            </span>
            <span className="rounded-md border border-site-line px-5 py-3 font-medium">Download catalog</span>
          </div>
        </div>
        <div className="flex items-center justify-center rounded-2xl bg-site-soft p-6">
          <img src="/demo/valve.png" alt="Stainless steel ball valve (demo product image)" className="h-80 w-auto object-contain" />
        </div>
      </section>

      <section className="relative mx-12 rounded-2xl bg-site-soft px-10 py-8">
        <Highlight index={0} {...h} />
        <Pin index={0} {...h} className="-top-4 -left-4" />
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-site-brand">Start with your application</p>
            <h4 className="text-2xl font-semibold tracking-tight">What are you moving through the line?</h4>
          </div>
          <span className="text-sm text-site-ink/60">4 applications · 38 product families</span>
        </div>
        <div className="mt-6 grid grid-cols-4 gap-3">
          {APPLICATIONS.map((a, i) => (
            <span
              key={a}
              className={cn(
                'flex items-center justify-between rounded-lg border px-4 py-4 font-medium',
                i === 1 ? 'border-site-brand bg-site-bg text-site-brand' : 'border-site-line bg-site-bg',
              )}
            >
              {a} <ArrowRight className="size-4 opacity-60" aria-hidden="true" />
            </span>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-5 gap-8 px-12 py-12">
        <div className="relative col-span-3 flex gap-8 rounded-2xl border border-site-line p-8">
          <Highlight index={1} {...h} />
          <Pin index={1} {...h} className="-top-4 -left-4" />
          <img src="/demo/valve.png" alt="" className="size-40 rounded-xl bg-site-soft object-contain p-3" />
          <div className="flex flex-1 flex-col gap-4">
            <div>
              <p className="text-sm text-site-ink/60">Chemical processing · Ball valves</p>
              <h4 className="text-2xl font-semibold tracking-tight">Series H-200 Ball Valve</h4>
            </div>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-[15px]">
              {SPECS.map(([k, v]) => (
                <div key={k} className="flex flex-col border-t border-site-line pt-2">
                  <dt className="text-site-ink/60">{k}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            <span className="flex items-center gap-2 text-sm font-medium text-site-brand">
              <Download className="size-4" aria-hidden="true" /> Full datasheet (PDF)
            </span>
          </div>
        </div>
        <div className="relative col-span-2 flex flex-col gap-4 rounded-2xl bg-site-ink p-8 text-site-bg">
          <Highlight index={2} {...h} />
          <Pin index={2} {...h} className="-top-4 -right-4" />
          <h4 className="text-xl font-semibold">Ask about this valve</h4>
          <span className="w-fit rounded-full bg-site-bg/10 px-3 py-1 text-sm">Series H-200 · DN50 · Flanged</span>
          <div className="flex flex-col gap-2 text-sm">
            <span className="rounded-md border border-site-bg/20 px-3 py-2.5 text-site-bg/60">Your name</span>
            <span className="rounded-md border border-site-bg/20 px-3 py-2.5 text-site-bg/60">Company email</span>
            <span className="rounded-md border border-site-bg/20 px-3 py-2.5 text-site-bg/60">Quantity & delivery location</span>
          </div>
          <span className="mt-auto rounded-md bg-site-bg py-3 text-center font-medium text-site-ink">Send inquiry</span>
        </div>
      </section>
    </div>
  )
}

/* ---------------- AFTER — mobile (375px design width) ---------------- */

export function AfterMobile(h: HotspotProps) {
  return (
    <div className="relative bg-site-bg pb-20 font-sans text-site-ink">
      <header className="flex items-center justify-between border-b border-site-line px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-md bg-site-brand text-xs font-bold text-site-bg">H</span>
          <span className="font-semibold tracking-tight">Hartwell</span>
        </div>
        <Menu className="size-5" aria-hidden="true" />
      </header>
      <section className="flex flex-col gap-4 px-5 pt-6 pb-5">
        <p className="text-xs font-medium uppercase tracking-widest text-site-brand">Industrial valves since 1998</p>
        <h3 className="text-[30px] font-semibold leading-[1.1] tracking-tight">Flow control for demanding process lines.</h3>
        <p className="leading-relaxed text-site-ink/70">Stainless valves for water, chemical and food processing.</p>
        <img src="/demo/valve.png" alt="Stainless steel ball valve (demo product image)" className="h-44 w-full rounded-xl bg-site-soft object-contain p-3" />
      </section>
      <section className="relative mx-5 flex flex-col gap-3 rounded-xl bg-site-soft p-4">
        <Highlight index={0} {...h} />
        <Pin index={0} {...h} className="-top-3 -right-2" />
        <p className="font-semibold">Start with your application</p>
        <div className="flex flex-col gap-2">
          {APPLICATIONS.map((a, i) => (
            <span
              key={a}
              className={cn(
                'flex items-center justify-between rounded-lg border bg-site-bg px-3.5 py-3 text-[15px] font-medium',
                i === 1 ? 'border-site-brand text-site-brand' : 'border-site-line',
              )}
            >
              {a} <ArrowRight className="size-4 opacity-60" aria-hidden="true" />
            </span>
          ))}
        </div>
      </section>
      <section className="relative m-5 flex flex-col gap-3 rounded-xl border border-site-line p-4">
        <Highlight index={1} {...h} />
        <Pin index={1} {...h} className="-top-3 -right-2" />
        <p className="text-sm text-site-ink/60">Ball valves</p>
        <h4 className="text-xl font-semibold tracking-tight">Series H-200</h4>
        <dl className="flex flex-col text-[15px]">
          {SPECS.slice(0, 3).map(([k, v]) => (
            <div key={k} className="flex justify-between border-t border-site-line py-2">
              <dt className="text-site-ink/60">{k}</dt>
              <dd className="font-medium">{v}</dd>
            </div>
          ))}
        </dl>
      </section>
      <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 border-t border-site-line bg-site-bg px-4 py-3">
        <div className="relative flex flex-1 items-center justify-between rounded-lg bg-site-ink px-4 py-3 text-site-bg">
          <Highlight index={2} {...h} />
          <Pin index={2} {...h} className="-top-5 -right-1" />
          <span className="text-sm font-medium">Ask about H-200 · DN50</span>
          <ArrowRight className="size-4" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}

/* ---------------- BEFORE — legacy desktop (1000px, non-responsive) ---------------- */

const LEGACY_PRODUCTS = [
  'HW-BV-101', 'HW-BV-102', 'HW-BV-115F', 'HW-BV-200', 'HW-BV-200S', 'HW-BF-301', 'HW-BF-305', 'HW-CV-410',
  'HW-CV-412', 'HW-GV-520', 'HW-GV-525', 'HW-SV-601', 'HW-ACC-01', 'HW-ACC-02',
]

export function BeforeDesktop() {
  return (
    <div className="bg-legacy-bg font-sans text-[12px] leading-snug text-[#222]">
      <div className="mx-auto w-[1000px] border-x border-legacy-line bg-site-bg">
        <div className="flex items-end justify-between border-b-4 border-legacy-bar bg-gradient-to-b from-[#f4f4f4] to-[#d8d8d8] px-4 py-3">
          <div>
            <p className="text-[22px] font-bold tracking-wide text-legacy-bar">HARTWELL FLUID SYSTEMS CO., LTD.</p>
            <p className="text-[11px] italic text-[#555]">Professional Manufacturer of Valves · Quality First · Customer Supreme</p>
          </div>
          <p className="text-[11px] text-[#555]">中文 | English | Add to Favorites</p>
        </div>
        <nav className="flex bg-legacy-bar text-[12px] font-bold text-site-bg">
          {['HOME', 'ABOUT US', 'PRODUCTS', 'NEWS', 'DOWNLOAD', 'CONTACT US'].map((n) => (
            <span key={n} className="border-r border-[#5a7fc0] px-5 py-2">{n}</span>
          ))}
        </nav>
        <div className="flex h-[150px] items-center gap-4 border-b border-legacy-line bg-[#cfd8e6] px-6">
          <img src="/demo/valve.png" alt="" className="h-28 w-auto border border-legacy-line bg-site-bg opacity-90 grayscale-[40%]" />
          <p className="text-[20px] font-bold text-legacy-bar">Welcome to Our Company Website!!</p>
        </div>
        <div className="flex">
          <aside className="w-[200px] shrink-0 border-r border-legacy-line bg-[#f2f2f2]">
            <p className="bg-legacy-bar px-2 py-1 font-bold text-site-bg">Product Category</p>
            <ul>
              {LEGACY_PRODUCTS.map((p) => (
                <li key={p} className="border-b border-dotted border-legacy-line px-2 py-1 text-legacy-link underline">» {p}</li>
              ))}
            </ul>
          </aside>
          <main className="flex flex-1 flex-col gap-3 p-4">
            <p className="border-b border-legacy-line pb-1 text-[14px] font-bold text-legacy-bar">Company Profile</p>
            <p>
              Hartwell Fluid Systems Co., Ltd. was founded in 1998 and is a professional manufacturer of industrial valves integrating R&D,
              production and sales. Our products are widely used in water treatment, chemical, petroleum, food, HVAC and other industries.
              We have advanced production equipment and perfect testing means. We adhere to the principle of quality first and customer
              supreme, and sincerely welcome friends from all over the world to visit and negotiate business. <span className="text-legacy-link underline">[More...]</span>
            </p>
            <p className="border-b border-legacy-line pb-1 text-[14px] font-bold text-legacy-bar">Latest News</p>
            <ul className="list-inside list-disc text-legacy-link underline">
              <li>Our company attended the exhibition (2016-05-12)</li>
              <li>New product catalog download (2015-11-03)</li>
              <li>Notice of holiday arrangement (2015-01-20)</li>
            </ul>
            <p className="border-b border-legacy-line pb-1 text-[14px] font-bold text-legacy-bar">Download</p>
            <p className="text-legacy-link underline">HW-BV-200 Specification.pdf (2.3MB)</p>
          </main>
        </div>
        <footer className="border-t-4 border-legacy-bar bg-[#ddd] px-4 py-3 text-center text-[11px] text-[#444]">
          Tel: +00-000-0000000 &nbsp; Fax: +00-000-0000001 &nbsp; E-mail: info@example.com
          <br />Copyright © 2009-2016 Hartwell Fluid Systems Co., Ltd. All Rights Reserved. Best viewed at 1024×768
        </footer>
      </div>
    </div>
  )
}
