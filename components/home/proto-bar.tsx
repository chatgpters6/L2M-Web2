'use client'

import Link from 'next/link'
import { useHomeCopy } from './home-state'

export function ProtoBar() {
  const { h } = useHomeCopy()
  return (
    <div className="border-b border-ivory/10 bg-ink text-ivory">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-2 font-mono text-[11px] uppercase tracking-wider md:px-10">
        <span className="truncate text-ivory/70">{h.proto}</span>
        <Link href="/review/stage-1" className="hidden shrink-0 hover:text-lime focus-visible:outline-2 focus-visible:outline-lime sm:inline">
          {h.reviewLink}
        </Link>
      </div>
    </div>
  )
}
