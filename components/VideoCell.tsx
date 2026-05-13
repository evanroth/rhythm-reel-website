'use client'

import { useRef, useEffect } from 'react'

// Pixel-sampled screen insets within the 1359×2736 iPhone frame PNG
const SCREEN = { top: '3.3%', left: '6.6%', right: '6.6%', bottom: '3.5%' }

interface VideoCellProps {
  src: string
  amplitudeRef: React.MutableRefObject<number>
  offset?: number
  beatFlash: boolean
  index: number
  style?: React.CSSProperties
  className?: string
}

export default function VideoCell({
  src,
  amplitudeRef,
  offset = 0,
  beatFlash,
  index,
  style,
  className,
}: VideoCellProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const video = videoRef.current
    const wrap = wrapRef.current
    if (!video || !wrap) return

    let duration = 0
    let isSeeking = false
    let pendingPosition: number | null = null
    let lastSeekPos = -1

    const doSeek = (position: number) => {
      isSeeking = true
      lastSeekPos = position
      video.currentTime = position * duration
      video.pause()
    }

    const onSeeked = () => {
      isSeeking = false
      if (pendingPosition !== null) {
        const pos = pendingPosition
        pendingPosition = null
        doSeek(pos)
      }
    }

    video.addEventListener('seeked', onSeeked)

    const onMeta = () => {
      duration = video.duration
      video.pause()
    }

    video.addEventListener('loadedmetadata', onMeta)

    if (video.readyState >= 1 && video.duration > 0) {
      duration = video.duration
      video.pause()
    } else {
      video.load()
    }

    const tick = () => {
      const amp = amplitudeRef.current

      if (duration > 0) {
        const position = Math.max(0, Math.min(1, amp + offset))
        const frameStep = 0.5 / (30 * duration)
        if (Math.abs(position - lastSeekPos) > frameStep) {
          if (!isSeeking) {
            doSeek(position)
          } else {
            pendingPosition = position
          }
        }
      }

      // scale + drop-shadow on the wrapper — drop-shadow traces the phone silhouette
      const scale = 1 + amp * 0.06
      const glow = 6 + amp * 28
      const opacity = 0.12 + amp * 0.55
      wrap.style.transform = `scale(${scale})`
      wrap.style.filter = `drop-shadow(0 0 ${glow}px rgba(245,74,138,${opacity}))`

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      video.removeEventListener('loadedmetadata', onMeta)
      video.removeEventListener('seeked', onSeeked)
    }
  }, [src, amplitudeRef, offset, index])

  return (
    <div
      ref={wrapRef}
      className={`relative ${className ?? ''}`}
      style={{
        transition: 'transform 0.05s ease-out',
        willChange: 'transform, filter',
        ...style,
      }}
    >
      {/* Video sits within the phone's transparent screen area */}
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload="auto"
        disableRemotePlayback
        disablePictureInPicture
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
          display: 'block',
          zIndex: 1,
        }}
      />

      {/* Beat flash — shows through the transparent screen area */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: beatFlash
            ? 'radial-gradient(circle, rgba(245,74,138,0.3) 0%, transparent 70%)'
            : 'transparent',
          transition: 'background 0.1s ease-out',
          zIndex: 2,
        }}
      />

      {/* iPhone frame PNG — transparent screen reveals video below.
          Sits on top of everything; pointer-events disabled so the hero
          scale-pulse and interactions still work. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/iphone-frame.png"
        alt=""
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'fill',
          pointerEvents: 'none',
          zIndex: 3,
        }}
      />
    </div>
  )
}
