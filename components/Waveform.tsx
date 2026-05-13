'use client'

import { useRef, useEffect } from 'react'

interface WaveformProps {
  frequencyDataRef: React.MutableRefObject<Uint8Array | null>
  amplitudeRef: React.MutableRefObject<number>
  isActiveRef: React.MutableRefObject<boolean>
}

export default function Waveform({ frequencyDataRef, amplitudeRef, isActiveRef }: WaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const phaseRef = useRef(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let cachedStrokeGradient: CanvasGradient | null = null
    let cachedFillGradient: CanvasGradient | null = null
    let cachedW = 0

    const ensureGradients = (W: number) => {
      if (W === cachedW && cachedStrokeGradient && cachedFillGradient) return
      cachedW = W
      cachedStrokeGradient = ctx.createLinearGradient(0, 0, W, 0)
      cachedStrokeGradient.addColorStop(0, '#FF2D55')
      cachedStrokeGradient.addColorStop(0.45, '#F54A8A')
      cachedStrokeGradient.addColorStop(1, '#8A2BE3')
      cachedFillGradient = ctx.createLinearGradient(0, 0, W, 0)
      cachedFillGradient.addColorStop(0, '#FF2D5520')
      cachedFillGradient.addColorStop(0.5, '#F54A8A18')
      cachedFillGradient.addColorStop(1, '#8A2BE320')
    }

    const draw = () => {
      const dpr = window.devicePixelRatio || 1
      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      if (canvas.width !== W * dpr || canvas.height !== H * dpr) {
        canvas.width = W * dpr
        canvas.height = H * dpr
        ctx.scale(dpr, dpr)
        cachedW = 0 // force gradient rebuild
      }

      ensureGradients(W)

      ctx.clearRect(0, 0, W, H)
      ctx.lineWidth = 2
      ctx.strokeStyle = cachedStrokeGradient!
      const isActive = isActiveRef.current
      ctx.shadowBlur = isActive ? 12 : 4
      ctx.shadowColor = '#F54A8A'

      const frequencyData = frequencyDataRef.current
      const amplitude = amplitudeRef.current

      if (isActive && frequencyData && frequencyData.length > 0) {
        const barCount = Math.min(frequencyData.length, 128)
        const step = W / barCount
        const midY = H / 2

        ctx.beginPath()
        for (let i = 0; i < barCount; i++) {
          const v = (frequencyData[i] / 255) * amplitude * 1.4
          const y = midY - (v * H * 0.45)
          const x = i * step
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        for (let i = barCount - 1; i >= 0; i--) {
          const v = (frequencyData[i] / 255) * amplitude * 1.4
          const y = midY + (v * H * 0.45)
          const x = i * step
          ctx.lineTo(x, y)
        }
        ctx.closePath()
        ctx.fillStyle = cachedFillGradient!
        ctx.fill()

        ctx.beginPath()
        for (let i = 0; i < barCount; i++) {
          const v = (frequencyData[i] / 255) * amplitude * 1.4
          const y = midY - (v * H * 0.45)
          const x = i * step
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()

        ctx.beginPath()
        for (let i = 0; i < barCount; i++) {
          const v = (frequencyData[i] / 255) * amplitude * 1.4
          const y = midY + (v * H * 0.45)
          const x = i * step
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()

      } else {
        phaseRef.current += 0.015
        const phase = phaseRef.current
        const midY = H / 2
        const idleAmp = 6

        ctx.beginPath()
        for (let x = 0; x <= W; x += 2) {
          const y = midY + Math.sin((x / W) * Math.PI * 6 + phase) * idleAmp
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.globalAlpha = 0.3
        ctx.stroke()
        ctx.globalAlpha = 1
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [frequencyDataRef, amplitudeRef, isActiveRef])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: 'block' }}
    />
  )
}
