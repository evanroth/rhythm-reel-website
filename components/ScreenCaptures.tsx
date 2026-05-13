'use client'

import { useRef } from 'react'
import Image from 'next/image'

const TRAILERS = [
  { src: '/trailers/trailer-1.mp4' },
  { src: '/trailers/trailer-2.mp4' },
]

// Pixel-sampled screen insets within the 1359×2736 iPhone frame PNG
const SCREEN = {
  top:    '3.3%',
  left:   '6.6%',
  right:  '6.6%',
  bottom: '3.5%',
}

export default function ScreenCaptures() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const handlePlay = (playingIndex: number) => {
    window.dispatchEvent(new CustomEvent('rr-trailer-play'))
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

        <div className="flex gap-6 justify-center">
          {TRAILERS.map(({ src }, i) => (
            // Outer wrapper constrains the phone width
            <div key={src} style={{ width: 'clamp(140px, 28vw, 260px)' }}>
              {/* Phone mockup container — matches PNG aspect ratio */}
              <div className="relative" style={{ aspectRatio: '1359 / 2736' }}>

                {/* Video sits behind the phone frame, aligned to the transparent screen area */}
                <video
                  ref={el => { videoRefs.current[i] = el }}
                  src={src}
                  controls
                  playsInline
                  preload="metadata"
                  onPlay={() => handlePlay(i)}
                  style={{
                    position: 'absolute',
                    top: SCREEN.top,
                    left: SCREEN.left,
                    right: SCREEN.right,
                    bottom: SCREEN.bottom,
                    width: `calc(100% - ${SCREEN.left} - ${SCREEN.right})`,
                    height: `calc(100% - ${SCREEN.top} - ${SCREEN.bottom})`,
                    objectFit: 'cover',
                    background: '#000',
                    zIndex: 1,
                  }}
                />

                {/* iPhone frame PNG — transparent screen lets the video show through */}
                <Image
                  src="/iphone-frame.png"
                  alt="iPhone frame"
                  fill
                  style={{ objectFit: 'fill', pointerEvents: 'none', zIndex: 2 }}
                  priority
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
