import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Impressum — RhythmReel',
  description: 'Legal notice / Impressum for RhythmReel pursuant to §5 DDG.',
}

export default function ImpressumPage() {
  return (
    <div style={{ background: '#0F081E', minHeight: '100vh' }}>
      <div className="max-w-2xl mx-auto px-6 py-20">

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-12"
        >
          ← RhythmReel
        </Link>

        <h1 className="text-white font-black text-4xl tracking-tight mb-8">Impressum</h1>

        {/* German version (required by law) */}
        <div
          className="p-6 rounded-2xl mb-8"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <h2 className="text-white font-semibold text-base mb-4 tracking-wide uppercase text-xs opacity-50">Deutsch</h2>
          <div className="text-white/65 leading-relaxed space-y-3 text-sm">
            <p className="text-white/50 text-xs">Angaben gemäß § 5 DDG:</p>
            <address className="not-italic">
              <strong className="text-white/80">Evan Roth</strong><br />
              Torstraße 25<br />
              10119 Berlin<br />
              Deutschland
            </address>
            <p>
              Kontakt: E-Mail:{' '}
              <a href="mailto:studio@evan-roth.com" className="text-pink-400 hover:text-pink-300">
                studio@evan-roth.com
              </a>
            </p>
            <p>Steuernummer: 31/498/0033</p>
            <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: DE319515848</p>
            <p>
              Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV:<br />
              Evan Roth, Torstraße 25, 10119 Berlin, Deutschland
            </p>
          </div>
        </div>

        {/* English version */}
        <div
          className="p-6 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <h2 className="text-white font-semibold text-base mb-4 tracking-wide uppercase text-xs opacity-50">English</h2>
          <div className="text-white/65 leading-relaxed space-y-3 text-sm">
            <p className="text-white/50 text-xs">Information pursuant to § 5 DDG (German Digital Services Act):</p>
            <address className="not-italic">
              <strong className="text-white/80">Evan Roth</strong><br />
              Torstrasse 25<br />
              10119 Berlin<br />
              Germany
            </address>
            <p>
              Contact: Email:{' '}
              <a href="mailto:studio@evan-roth.com" className="text-pink-400 hover:text-pink-300">
                studio@evan-roth.com
              </a>
            </p>
            <p>Tax number (Steuernummer): 31/498/0033</p>
            <p>VAT ID pursuant to § 27a German VAT Act: DE319515848</p>
            <p>
              Responsible for content pursuant to § 18 para. 2 MStV:<br />
              Evan Roth, Torstrasse 25, 10119 Berlin, Germany
            </p>
          </div>
        </div>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-white/05 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/30">
          <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
          <Link href="/support" className="hover:text-white/60 transition-colors">Support</Link>
          <span>© {new Date().getFullYear()} Evan Roth</span>
        </div>
      </div>
    </div>
  )
}
