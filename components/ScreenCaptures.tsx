'use client'

import { useRef } from 'react'

const TRAILERS = [
  { src: '/trailers/trailer-1.mp4' },
  { src: '/trailers/trailer-2.mp4' },
]

export default function ScreenCaptures() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const handlePlay = (playingIndex: number) => {
    // Pause the hero music
    window.dispatchEvent(new CustomEvent('rr-trailer-play'))
    // Pause the other trailer if it's playing
    videoRefs.current.forEach((v, i) => {
      if (v && i !== playingIndex && !v.paused) v.pause()
    })
  }

  return (
    <section
      className="py-24 px-6"
      style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-black tracking-tight mb-12"
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            color: 'rgba(255,255,255,0.9)',
          }}
        >
          Screen Captures
        </h2>

        <div className="flex gap-4 sm:gap-6 justify-center">
          {TRAILERS.map(({ src }, i) => (
            <div
              key={src}
              className="flex-1"
              style={{ maxWidth: 320 }}
            >
              <video
                ref={el => { videoRefs.current[i] = el }}
                src={src}
                controls
                playsInline
                preload="metadata"
                onPlay={() => handlePlay(i)}
                className="w-full rounded-2xl"
                style={{
                  aspectRatio: '498 / 1080',
                  background: '#000',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
