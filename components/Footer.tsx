'use client'

import Link from 'next/link'
import { useState } from 'react'
import AboutModal from './AboutModal'

export default function Footer() {
  const [aboutOpen, setAboutOpen] = useState(false)

  return (
    <>
      <footer
        className="border-t py-10 px-6"
        style={{ borderColor: 'rgba(255,255,255,0.06)', background: '#0A0514' }}
      >
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Nav links */}
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/40">
            <Link href="/privacy" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
            <Link href="/impressum" className="hover:text-white/70 transition-colors">Impressum</Link>
            <Link href="/support" className="hover:text-white/70 transition-colors">Support</Link>
            <button
              onClick={() => setAboutOpen(true)}
              className="hover:text-white/70 transition-colors"
            >
              About the creator
            </button>
          </nav>

          {/* Copyright */}
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()} Evan Roth. All rights reserved.
          </p>

        </div>
      </footer>

      {aboutOpen && <AboutModal onClose={() => setAboutOpen(false)} />}
    </>
  )
}
