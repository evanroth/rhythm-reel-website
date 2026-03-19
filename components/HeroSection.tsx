'use client'

import { useRef, useState, useEffect, useLayoutEffect } from 'react'
import Waveform from './Waveform'
import VideoCell from './VideoCell'
import { useAudioEngine } from './useAudioEngine'
import DebugPanel, { DEFAULT_SETTINGS, AudioSettings } from './DebugPanel'
import type { LiveDebugValues } from './useAudioEngine'

const VIDEO_SRCS = [
  '/videos/demo-1.mp4',
  '/videos/demo-2.mp4',
  '/videos/demo-3.mp4',
  '/videos/demo-4.mp4',
  '/videos/demo-5.mp4',
  '/videos/demo-6.mp4',
]

// Scattered layout: each video has a unique position (% from center), size, rotation, and scrub offset.
// Positions are relative to the hero container. Negative = left/up. Videos intentionally overlap the logo edges.
const VIDEO_LAYOUT = [
  // left column — outer
  { left: '2%',  top: '6%',  width: 200, aspect: 9/16, rotate: -7,  offset: -0.03 }, // top-left
  { left: '11%', top: '26%', width: 158, aspect: 9/16, rotate: 4,   offset:  0.04 }, // mid-left  (overlaps outer videos)
  { left: '4%',  top: '64%', width: 190, aspect: 9/16, rotate: -4,  offset: -0.02 }, // bot-left
  // right column — outer
  { right: '2%', top: '10%', width: 185, aspect: 9/16, rotate: 6,   offset:  0.03 }, // top-right
  { right: '11%', top: '28%', width: 155, aspect: 9/16, rotate: -4,  offset: -0.04 }, // mid-right (overlaps outer videos)
  { right: '3%', top: '62%', width: 195, aspect: 9/16, rotate: 4,   offset:  0.02 }, // bot-right
]

export default function HeroSection() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const amplitudeRef = useRef<number>(0)
  const settingsRef = useRef<AudioSettings>(DEFAULT_SETTINGS)
  const liveRef = useRef<LiveDebugValues>({ rawRms: 0, amplitude: 0 })
  const wordmarkRef = useRef<HTMLImageElement>(null)
  const heroAreaRef = useRef<HTMLDivElement>(null)

  const [settings, setSettings] = useState<AudioSettings>(DEFAULT_SETTINGS)
  const [debugVisible, setDebugVisible] = useState(false)
  const [waveformCenterPct, setWaveformCenterPct] = useState(42)

  // Keep settingsRef in sync so the audio tick reads latest values without re-renders
  useEffect(() => { settingsRef.current = settings }, [settings])

  // Toggle debug panel with 'S' key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 's' || e.key === 'S') setDebugVisible(v => !v)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Measure wordmark center relative to hero area so waveform aligns to it
  useLayoutEffect(() => {
    const update = () => {
      const img = wordmarkRef.current
      const hero = heroAreaRef.current
      if (!img || !hero) return
      const imgRect = img.getBoundingClientRect()
      const heroRect = hero.getBoundingClientRect()
      const centerY = imgRect.top + imgRect.height / 2 - heroRect.top
      setWaveformCenterPct((centerY / heroRect.height) * 100)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const [{ source, amplitude, frequencyData, isMusicPlaying, beatFlash }, { toggleMusic }] =
    useAudioEngine(audioRef, amplitudeRef, settingsRef, liveRef)

  const isActive = source !== 'idle'
  const logoScale = 1 + amplitude * 0.03

  return (
    <section
      className="relative flex flex-col overflow-hidden"
      style={{ background: '#0F081E', minHeight: '100svh' }}
    >
      <audio ref={audioRef} src="/music/demo-track.mp3" loop preload="auto" />

      {/* Ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 45%,
            rgba(138,43,227,${0.04 + amplitude * 0.14}) 0%, transparent 70%),
            radial-gradient(ellipse 50% 35% at 15% 75%,
            rgba(245,74,138,${0.03 + amplitude * 0.09}) 0%, transparent 60%),
            radial-gradient(ellipse 50% 35% at 85% 75%,
            rgba(255,45,85,${0.03 + amplitude * 0.09}) 0%, transparent 60%)`,
          transition: 'background 0.08s ease-out',
        }}
      />

      {/* ── Scattered video + logo area ── */}
      <div ref={heroAreaRef} className="relative flex-1 flex items-center justify-center" style={{ minHeight: '80svh' }}>

        {/* Waveform — behind everything, center aligned to wordmark */}
        <div className="absolute inset-x-0 pointer-events-none" style={{ top: `${waveformCenterPct - 15}%`, height: '30%', zIndex: 1 }}>
          <Waveform frequencyData={frequencyData} amplitude={amplitude} isActive={isActive} />
        </div>

        {/* Videos — z-index 2, above waveform */}
        {VIDEO_LAYOUT.map((layout, i) => {
          const { width, aspect, rotate, offset, ...pos } = layout
          const height = Math.round(width / aspect)
          return (
            <VideoCell
              key={i}
              src={VIDEO_SRCS[i]}
              amplitudeRef={amplitudeRef}
              offset={offset}
              beatFlash={beatFlash}
              index={i}
              style={{
                position: 'absolute',
                width: `${width}px`,
                height: `${height}px`,
                transform: `rotate(${rotate}deg)`,
                transformOrigin: 'center center',
                zIndex: 2,
                ...pos,
              }}
            />
          )
        })}

        {/* Logo — z-index 10, above videos and waveform */}
        <div
          className="relative flex flex-col items-center text-center pointer-events-none select-none"
          style={{
            zIndex: 10,
            transform: `scale(${logoScale})`,
            transition: 'transform 0.08s ease-out',
          }}
        >
          {/* Wordmark PNG — transparent background, RGBA */}
          <img
            ref={wordmarkRef}
            src="/logo/wordmark.png"
            alt="RhythmReel"
            style={{
              width: 'clamp(280px, 45vw, 680px)',
              height: 'auto',
              filter: `drop-shadow(0 0 ${8 + amplitude * 22}px rgba(245,74,138,${0.3 + amplitude * 0.45}))`,
              display: 'block',
            }}
          />

          <p
            className="text-white/40 font-light tracking-widest uppercase mt-4"
            style={{ fontSize: 'clamp(0.6rem, 1.4vw, 0.8rem)', letterSpacing: '0.3em' }}
          >
            Music makes it move.
          </p>

          {/* App Store CTA */}
          <a
            href="https://apps.apple.com/app/photo-bounce/idXXXXXXXXX"
            className="pointer-events-auto mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-medium transition-all duration-200 hover:brightness-110 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #FF2D55, #F54A8A, #8A2BE3)',
              boxShadow: '0 4px 24px rgba(245,74,138,0.35)',
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            Download on the App Store
          </a>

          {/* Audio control */}
          <button
            onClick={toggleMusic}
            className="pointer-events-auto mt-4 flex items-center gap-2.5 px-9 py-4 rounded-full font-medium text-base transition-all duration-200 active:scale-95 hover:brightness-110"
            style={{
              background: isMusicPlaying ? 'linear-gradient(135deg, #8A2BE3, #F54A8A)' : 'rgba(255,255,255,0.08)',
              border: isMusicPlaying ? '1px solid rgba(138,43,227,0.6)' : '1px solid rgba(255,255,255,0.14)',
              boxShadow: isMusicPlaying ? '0 0 24px rgba(138,43,227,0.45)' : 'none',
              color: 'white',
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              {isMusicPlaying ? <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /> : <path d="M8 5v14l11-7z" />}
            </svg>
            {isMusicPlaying ? 'Pause' : 'Tap to Play'}
          </button>
        </div>

      </div>

      {/* Beat flash overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: beatFlash
            ? 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(245,74,138,0.07) 0%, transparent 70%)'
            : 'transparent',
          transition: 'background 0.1s ease-out',
          zIndex: 0,
        }}
      />

      <DebugPanel
        settings={settings}
        onChange={setSettings}
        liveRef={liveRef}
        visible={debugVisible}
      />
    </section>
  )
}
