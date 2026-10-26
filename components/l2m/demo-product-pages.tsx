'use client'

import { ArrowRight, ChevronRight, Download, Menu, Search } from 'lucide-react'
import { DEMO_COMPANY, DEMO_LEGACY_PRODUCTS, DEMO_PRODUCT, demoApplication, demoInquiryChip } from '@/lib/demo-facts'

/*
 * Product-page pair for the fictional DEMO company. Facts come only from lib/demo-facts.ts.
 * The sample site itself is published in English, like the homepage pair in demo-sites.tsx.
 */

const P = DEMO_PRODUCT
const APP = demoApplication()
const SPECS: [string, string][] = P.specs.map((s) => [s.label.en, s.value.en])

/* BEFORE — legacy product listing (1000px, non-responsive) */
export function BeforeProduct() {
  return (
    <div className="bg-legacy-bg font-sans text-[12px] leading-snug text-[#222]">
      <div className="mx-auto w-[1000px] border-x border-legacy-line bg-site-bg">
        <div className="flex items-end justify-between border-b-4 border-legacy-bar bg-gradient-to-b from-[#f4f4f4] to-[#d8d8d8] px-4 py-3">
          <p className="text-[22px] font-bold uppercase tracking-wide text-legacy-bar">{DEMO_COMPANY.legalName}</p>
          <p className="text-[11px] text-[#555]">中文 | English | Add to Favorites</p>
        </div>
        <nav className="flex bg-legacy-bar text-[12px] font-bold text-site-bg">
          {['HOME', 'ABOUT US', 'PRODUCTS', 'NEWS', 'DOWNLOAD', 'CONTACT US'].map((n) => (
            <span key={n} className={n === 'PRODUCTS' ? 'border-r border-[#5a7fc0] bg-[#1d3f7a] px-5 py-2' : 'border-r border-[#5a7fc0] px-5 py-2'}>
              {n}
            </span>
          ))}
        </nav>
        <p className="border-b border-legacy-line bg-[#f2f2f2] px-4 py-1.5 text-[11px] text-[#555]">Current Position: Home &gt;&gt; Products &gt;&gt; Product List</p>
        <div className="flex">
          <aside className="w-[200px] shrink-0 border-r border-legacy-line bg-[#f2f2f2]">
            <p className="bg-legacy-bar px-2 py-1 font-bold text-site-bg">Product Category</p>
            <ul>
              {DEMO_LEGACY_PRODUCTS.map((p) => (
                <li key={p} className="border-b border-dotted border-legacy-line px-2 py-1 text-legacy-link underline">
                  » {p}
                </li>
              ))}
            </ul>
          </aside>
          <main className="flex flex-1 flex-col gap-3 p-4">
            <p className="border-b border-legacy-line pb-1 text-[14px] font-bold text-legacy-bar">Product List</p>
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-[#dfe6f1]">
                  <th className="border border-legacy-line px-2 py-1">Model No.</th>
                  <th className="border border-legacy-line px-2 py-1">Picture</th>
                  <th className="border border-legacy-line px-2 py-1">Download</th>
                </tr>
              </thead>
              <tbody>
                {DEMO_LEGACY_PRODUCTS.map((p, i) => (
                  <tr key={p}>
                    <td className="border border-legacy-line px-2 py-1.5 text-legacy-link underline">{p}</td>
                    <td className="border border-legacy-line px-2 py-1.5">
                      {i === 0 ? <img src={P.image} alt="" className="h-12 w-auto grayscale-[40%]" /> : <span className="text-[#888]">No Picture</span>}
                    </td>
                    <td className="border border-legacy-line px-2 py-1.5 text-legacy-link underline">{i === 0 ? `${P.datasheet.file} (${P.datasheet.size})` : 'Catalog.pdf'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-[11px] text-[#555]">For more information please contact us by Tel or Fax. Page 1/1</p>
          </main>
        </div>
        <footer className="border-t-4 border-legacy-bar bg-[#ddd] px-4 py-3 text-center text-[11px] text-[#444]">
          Copyright © {DEMO_COMPANY.legacyCopyright} {DEMO_COMPANY.legalName} All Rights Reserved. Best viewed at 1024×768
        </footer>
      </div>
    </div>
  )
}

/* AFTER — product detail page, desktop (1280px design width) */
export function AfterProductDesktop() {
  return (
    <div className="bg-site-bg font-sans text-site-ink">
      <header className="flex items-center justify-between border-b border-site-line px-12 py-5">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-md bg-site-brand text-sm font-bold text-site-bg">H</span>
          <span className="text-lg font-semibold tracking-tight">
            Hartwell <span className="font-normal text-site-ink/60">Fluid Systems</span>
          </span>
        </div>
        <nav className="flex items-center gap-8 text-[15px] text-site-ink/80">
          <span className="font-medium text-site-ink">Products</span>
          <span>Applications</span>
          <span>Resources</span>
          <span>Company</span>
          <Search className="size-4" aria-hidden="true" />
          <span className="rounded-md bg-site-brand px-4 py-2 font-medium text-site-bg">Request a quote</span>
        </nav>
      </header>
      <p className="flex items-center gap-1.5 px-12 pt-6 text-sm text-site-ink/60">
        Applications <ChevronRight className="size-3.5" aria-hidden="true" /> {APP.name.en} <ChevronRight className="size-3.5" aria-hidden="true" />
        <span className="text-site-ink">{P.category.en}</span>
      </p>
      <section className="grid grid-cols-12 gap-10 px-12 py-8">
        <div className="col-span-5 flex items-center justify-center rounded-2xl bg-site-soft p-8">
          <img src={P.image} alt={P.imageAlt.en} className="h-80 w-auto object-contain" />
        </div>
        <div className="col-span-7 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium uppercase tracking-widest text-site-brand">{P.category.en}</p>
            <h3 className="text-[40px] font-semibold leading-[1.05] tracking-tight">{P.name.en}</h3>
            <p className="max-w-xl text-lg leading-relaxed text-site-ink/70">{P.summary.en}</p>
          </div>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-3 text-[15px]">
            {SPECS.map(([k, v]) => (
              <div key={k} className="flex flex-col border-t border-site-line pt-2">
                <dt className="text-site-ink/60">{k}</dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 rounded-md bg-site-brand px-5 py-3 font-medium text-site-bg">
              Ask about this valve <ArrowRight className="size-4" aria-hidden="true" />
            </span>
            <span className="flex items-center gap-2 rounded-md border border-site-line px-5 py-3 font-medium">
              <Download className="size-4" aria-hidden="true" /> Datasheet (PDF, {P.datasheet.size})
            </span>
          </div>
          <span className="w-fit rounded-full bg-site-soft px-3 py-1 text-sm text-site-ink/70">Inquiry includes: {demoInquiryChip('en')}</span>
        </div>
      </section>
    </div>
  )
}

/* AFTER — product detail page, mobile (375px design width) */
export function AfterProductMobile() {
  return (
    <div className="relative bg-site-bg pb-20 font-sans text-site-ink">
      <header className="flex items-center justify-between border-b border-site-line px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-md bg-site-brand text-xs font-bold text-site-bg">H</span>
          <span className="font-semibold tracking-tight">{DEMO_COMPANY.shortName}</span>
        </div>
        <Menu className="size-5" aria-hidden="true" />
      </header>
      <section className="flex flex-col gap-4 px-5 pt-5">
        <p className="text-xs text-site-ink/60">
          {APP.name.en} › {P.category.en}
        </p>
        <img src={P.image} alt={P.imageAlt.en} className="h-48 w-full rounded-xl bg-site-soft object-contain p-4" />
        <h3 className="text-[28px] font-semibold leading-[1.1] tracking-tight">{P.name.en}</h3>
        <p className="text-[15px] leading-relaxed text-site-ink/70">{P.summary.en}</p>
        <dl className="flex flex-col text-[15px]">
          {SPECS.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 border-t border-site-line py-2.5">
              <dt className="text-site-ink/60">{k}</dt>
              <dd className="text-right font-medium">{v}</dd>
            </div>
          ))}
        </dl>
        <span className="flex items-center justify-center gap-2 rounded-lg border border-site-line py-3 text-sm font-medium">
          <Download className="size-4" aria-hidden="true" /> Datasheet (PDF, {P.datasheet.size})
        </span>
      </section>
      <div className="absolute inset-x-0 bottom-0 border-t border-site-line bg-site-bg px-4 py-3">
        <div className="flex items-center justify-between rounded-lg bg-site-ink px-4 py-3 text-site-bg">
          <span className="text-sm font-medium">Ask about {demoInquiryChip('en')}</span>
          <ArrowRight className="size-4" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}
