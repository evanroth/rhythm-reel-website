'use client'

import { useRef, useEffect } from 'react'

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

    // ── Seek machinery (mirrors iOS VideoScrubber isSeeking/pendingAmplitude) ──
    const doSeek = (position: number) => {
      isSeeking = true
      video.currentTime = position * duration
      video.pause() // keep video from advancing on its own
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

    // ── Metadata ──
    const onMeta = () => {
      duration = video.duration
      video.pause()
      console.log(`[VideoCell ${index}] loaded — duration: ${video.duration.toFixed(2)}s`)
    }

    video.addEventListener('loadedmetadata', onMeta)

    if (video.readyState >= 1 && video.duration > 0) {
      duration = video.duration
      video.pause()
      console.log(`[VideoCell ${index}] already loaded — duration: ${video.duration.toFixed(2)}s`)
    } else {
      video.load()
    }

    // ── RAF loop: visual effects every frame, seeks throttled via seeked event ──
    const tick = () => {
      const amp = amplitudeRef.current

      if (duration > 0) {
        const position = Math.max(0, Math.min(1, amp + offset))
        if (!isSeeking) {
          doSeek(position)
        } else {
          pendingPosition = position // newest amplitude always wins
        }
      }

      // Visual effects written directly to DOM — no React re-render cost
      const scale = 1 + amp * 0.06
      const glow = 6 + amp * 28
      const opacity = 0.12 + amp * 0.55
      wrap.style.transform = `scale(${scale})`
      wrap.style.boxShadow =
        `0 0 ${glow}px rgba(245,74,138,${opacity}), 0 0 ${glow * 0.5}px rgba(138,43,227,${opacity * 0.7})`
      wrap.style.borderColor = `rgba(245,74,138,${0.08 + amp * 0.45})`

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
      className={`relative overflow-hidden rounded-2xl ${className ?? ''}`}
      style={{
        border: '1px solid rgba(245,74,138,0.08)',
        transition: 'transform 0.05s ease-out, box-shadow 0.05s ease-out, border-color 0.05s ease-out',
        ...style,
      }}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover block"
      />

      {/* Beat flash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: beatFlash
            ? 'radial-gradient(circle, rgba(245,74,138,0.3) 0%, transparent 70%)'
            : 'transparent',
          transition: 'background 0.1s ease-out',
        }}
      />
    </div>
  )
}
