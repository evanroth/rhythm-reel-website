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
        <h2 className="text-white font-black text-2xl tracking-tight mb-5">Evan Roth</h2>

        <p className="text-white/65 text-sm leading-relaxed mb-3">
          Hi, my name is Evan Roth, I&apos;m a visual artist living in Berlin. I work in a range of mediums
          from photography, painting, video, textiles and software — you can see the art I make at{' '}
          <a href="https://evan-roth.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white/90 transition-colors" style={{ color: '#F54A8A' }}>evan-roth.com</a>.
        </p>

        <p className="text-white/65 text-sm leading-relaxed mb-3">
          I&apos;m also a life long music lover, and have been spending more and more of my after hours
          time learning to DJ, making mix tapes, modifying DJ gear and making music related software
          which I post to my YouTube channel{' '}
          <a href="https://www.youtube.com/@evan-roth-com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white/90 transition-colors" style={{ color: '#F54A8A' }}>Beats and Bobbins</a>.
        </p>

        <p className="text-white/65 text-sm leading-relaxed mb-6">
          You can also follow me on Instagram at{' '}
          <a href="https://www.instagram.com/evanroth_/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white/90 transition-colors" style={{ color: '#F54A8A' }}>@evanroth_</a>.
        </p>
      </div>
    </>
  )
}
