import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Logo } from '@/components/l2m/brand'
import { PreviewFrame } from '@/components/review/preview-frame'

const DIRECTIONS = [
  {
    key: 'A',
    href: '/a',
    name: 'Editorial Product',
    summary:
      'Assertive editorial type on Warm Ivory, the After site presented as a framed “plate”. The flagship moves to Deep Ink with margin-note annotations beside the comparison.',
  },
  {
    key: 'B',
    href: '/b',
    name: 'Interactive Product',
    summary:
      'A large browser with a Before / After switch sits directly under a compact headline and URL input. The flagship is a tool-like workbench with a change rail.',
  },
]

const COMPARISON: [string, string, string][] = [
  ['Brand character', 'Composed, editorial, premium. Typography carries the brand; product is shown as an exhibited piece.', 'Confident, product-led, hands-on. The interface itself is the brand statement.'],
  ['First-10-second value clarity', 'Relies on reading the headline; the After plate supports but does not show the change.', 'Before / After is visible and switchable in the first viewport — value is shown before reading.'],
  ['Visual impact', 'High through scale and whitespace; quieter hero, dramatic dark flagship.', 'High through the large live browser; headline is smaller to make room.'],
  ['CTA visibility', 'URL input + Ink button prominent in left column above the fold at 1440 and 390.', 'URL input centered on Ink with Lime button — strongest contrast; sits above the browser.'],
  ['Risk', 'Could read as an agency/studio site if the plate is not clearly a transformation.', 'Hero and flagship both show the demo — some repetition; depends heavily on a strong real case.'],
]

const PLACEHOLDERS = [
  'Hartwell Fluid Systems — fictional sample company (both Before and After sites are hand-built mocks).',
  'Valve product photo — AI-generated demo image, not a real product.',
  'Product specs, model numbers, contact details — fictional and non-functional.',
  'Product and Contact page tabs — locked until authorized source pages exist.',
  'Sign-up / analysis continuation — simulated UI state only.',
  'Navigation links (Transformations, How It Works, Pricing, Sign In) — visual placeholders.',
]

const MISSING = [
  'One authorized real company with same-site Before and After pages (desktop + mobile), with snapshot dates.',
  'Authorization record, generated-vs-manual edit scope, and functional verification for that case.',
  'Final L2M logo / wordmark (a typographic placeholder is used).',
  'A second case from a professional-services company, per the brief.',
]

const NOTES = [
  'Breakpoints: layouts reflow (not scaled) at 1440, 768, 390 and 360. Mobile puts headline and URL input first, demo second; flagship defaults to the Mobile device view on small screens.',
  'Keyboard: all toggles are radio groups with arrow-key support; hotspots and change items are buttons with visible focus rings; demo viewports are scrollable regions reachable by Tab.',
  'Touch: interactive targets are at least 44px except in-frame hotspot pins (36px, scaled with the page); the change list provides a full-size alternative.',
  'Reduced motion: smooth scrolling, pin pulse and transitions are disabled under prefers-reduced-motion.',
  'URL states: empty, invalid format, unavailable (localhost / IP / .local), recognized, and continue (URL retained). Try “abc”, “localhost:3000” or “example.com”.',
  'Known issues: in-frame pins are small at 360px; the legacy Before page on mobile is intentionally unreadable (it is non-responsive) and is explained in a note.',
]

export default function ReviewHub() {
  return (
    <main className="mx-auto flex max-w-[1440px] flex-col gap-16 px-5 py-10 md:px-10">
      <header className="flex flex-col gap-6 border-b border-ink/15 pb-10">
        <Logo />
        <div className="flex flex-col gap-3">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/70">Stage 1 · Design review · Not production</p>
          <h1 className="max-w-4xl text-balance text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Two directions for the Hero and Flagship Transformation.
          </h1>
          <p className="max-w-3xl leading-relaxed text-muted-foreground">
            Same copy, same DEMO placeholder case, two visual directions. No winner has been selected and no other screens have been built.
            Open each direction full-size, or review the live 1440px and 390px previews below.
          </p>
        </div>
      </header>

      {DIRECTIONS.map((d) => (
        <section key={d.key} aria-labelledby={`dir-${d.key}`} className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="flex max-w-2xl flex-col gap-2">
              <h2 id={`dir-${d.key}`} className="text-2xl font-semibold tracking-tight">
                Direction {d.key} — {d.name}
              </h2>
              <p className="leading-relaxed text-muted-foreground">{d.summary}</p>
            </div>
            <Link
              href={d.href}
              className="inline-flex min-h-11 w-fit items-center gap-2 rounded-md bg-ink px-5 font-semibold text-ivory focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              Open Direction {d.key}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid items-start gap-6 lg:grid-cols-[1fr_300px]">
            <PreviewFrame src={d.href} width={1440} height={1800} title={`Direction ${d.key} desktop`} />
            <div className="mx-auto w-full max-w-[300px]">
              <PreviewFrame src={d.href} width={390} height={1700} title={`Direction ${d.key} mobile`} />
            </div>
          </div>
        </section>
      ))}

      <section aria-labelledby="compare" className="flex flex-col gap-4">
        <h2 id="compare" className="text-2xl font-semibold tracking-tight">Comparison</h2>
        <div className="overflow-x-auto rounded-lg border border-ink/15">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-mist">
              <tr>
                <th scope="col" className="p-3 font-semibold">Criterion</th>
                <th scope="col" className="p-3 font-semibold">A — Editorial</th>
                <th scope="col" className="p-3 font-semibold">B — Interactive</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map(([k, a, b]) => (
                <tr key={k} className="border-t border-ink/10 align-top">
                  <th scope="row" className="p-3 font-medium">{k}</th>
                  <td className="p-3 leading-relaxed text-ink/80">{a}</td>
                  <td className="p-3 leading-relaxed text-ink/80">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground">
          G1 (10-second comprehension) has not been tested with real target customers and is not marked as passed.
        </p>
      </section>

      <div className="grid gap-10 md:grid-cols-2">
        <ListSection title="Demo placeholders used" items={PLACEHOLDERS} />
        <ListSection title="Missing real assets" items={MISSING} />
      </div>
      <ListSection title="Responsive, keyboard, touch & reduced motion" items={NOTES} />
    </main>
  )
}

function ListSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <ul className="flex flex-col">
        {items.map((i) => (
          <li key={i} className="border-t border-ink/10 py-2.5 leading-relaxed text-ink/80">{i}</li>
        ))}
      </ul>
    </section>
  )
}
