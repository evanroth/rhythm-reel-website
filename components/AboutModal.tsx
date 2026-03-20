'use client'

import { useEffect } from 'react'

interface Props {
  onClose: () => void
}

export default function AboutModal({ onClose }: Props) {
  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-lg rounded-t-3xl px-8 py-10"
        style={{ background: '#1A1030', border: '1px solid rgba(255,255,255,0.08)', borderBottom: 'none' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-6 text-white/40 hover:text-white/80 transition-colors text-2xl leading-none"
          aria-label="Close"
        >
          ×
        </button>

        {/* Content */}
        <h2 className="text-white font-black text-2xl tracking-tight mb-1">Evan Roth</h2>
        <p className="text-white/40 text-xs uppercase tracking-widest mb-5">Berlin, Germany</p>

        <p className="text-white/65 text-sm leading-relaxed mb-6">
          Evan Roth is a Berlin-based multimedia artist and developer whose work spans software,
          digital installations, and tools that sit at the intersection of technology and culture.
          A graduate of Parsons School of Design and co-founder of the Graffiti Research Lab,
          he builds apps and creative projects that explore how code can make everyday media
          more expressive — including RhythmReel.
        </p>

        <div className="flex flex-col gap-3">
          <a
            href="https://evan-roth.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
            style={{ color: '#F54A8A' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 shrink-0">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            evan-roth.com
          </a>

          <a
            href="https://www.youtube.com/@evan-roth-com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
            style={{ color: '#F54A8A' }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
              <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 0 0 .5 6.19C0 8.04 0 12 0 12s0 3.96.5 5.81a3.02 3.02 0 0 0 2.12 2.14C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14C24 15.96 24 12 24 12s0-3.96-.5-5.81zM9.75 15.52V8.48L15.5 12l-5.75 3.52z" />
            </svg>
            YouTube
          </a>
        </div>
      </div>
    </>
  )
}
