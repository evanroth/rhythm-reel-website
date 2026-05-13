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
    let lastSeekPos = -1
    let styleFrame = 0

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
        // Deadband: skip seek if target is within ~half a frame of the last one
        const frameStep = 0.5 / (30 * duration)
        if (Math.abs(position - lastSeekPos) > frameStep) {
          if (!isSeeking) {
            doSeek(position)
          } else {
            pendingPosition = position
          }
        }
      }

      // Cheap GPU-only update every frame
      const scale = 1 + amp * 0.06
      wrap.style.transform = `scale(${scale})`

      // Expensive box-shadow / border updates throttled to every 3rd frame (~20Hz)
      if ((styleFrame++ & 3) === 0) {
        const glow = 6 + amp * 28
        const opacity = 0.12 + amp * 0.55
        wrap.style.boxShadow =
          `0 0 ${glow}px rgba(245,74,138,${opacity}), 0 0 ${glow * 0.5}px rgba(138,43,227,${opacity * 0.7})`
        wrap.style.borderColor = `rgba(245,74,138,${0.08 + amp * 0.45})`
      }

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
        transition: 'transform 0.05s ease-out',
        willChange: 'transform',
        ...style,
      }}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload="auto"
        disableRemotePlayback
        disablePictureInPicture
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
