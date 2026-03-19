'use client'

import { useRef, useEffect } from 'react'

interface WaveformProps {
  frequencyData: Uint8Array | null
  amplitude: number
  isActive: boolean
}

export default function Waveform({ frequencyData, amplitude, isActive }: WaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // Keep a stable "idle" phase reference
  const phaseRef = useRef(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const draw = () => {
      const dpr = window.devicePixelRatio || 1
      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      if (canvas.width !== W * dpr || canvas.height !== H * dpr) {
        canvas.width = W * dpr
        canvas.height = H * dpr
        ctx.scale(dpr, dpr)
      }

      ctx.clearRect(0, 0, W, H)

      const gradient = ctx.createLinearGradient(0, 0, W, 0)
      gradient.addColorStop(0, '#FF2D55')
      gradient.addColorStop(0.45, '#F54A8A')
      gradient.addColorStop(1, '#8A2BE3')

      ctx.lineWidth = 2
      ctx.strokeStyle = gradient
      ctx.shadowBlur = isActive ? 12 : 4
      ctx.shadowColor = '#F54A8A'

      ctx.beginPath()

      if (isActive && frequencyData && frequencyData.length > 0) {
        // Draw frequency bars as a waveform shape
        const barCount = Math.min(frequencyData.length, 128)
        const step = W / barCount

        for (let i = 0; i < barCount; i++) {
          const v = (frequencyData[i] / 255) * amplitude * 1.4
          const y = H / 2 - (v * H * 0.45)
          const x = i * step

          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }

        // Mirror bottom
        for (let i = barCount - 1; i >= 0; i--) {
          const v = (frequencyData[i] / 255) * amplitude * 1.4
          const y = H / 2 + (v * H * 0.45)
          const x = i * step
          ctx.lineTo(x, y)
        }
        ctx.closePath()

        // Fill with subtle gradient
        const fillGrad = ctx.createLinearGradient(0, 0, W, 0)
        fillGrad.addColorStop(0, '#FF2D5520')
        fillGrad.addColorStop(0.5, '#F54A8A18')
        fillGrad.addColorStop(1, '#8A2BE320')
        ctx.fillStyle = fillGrad
        ctx.fill()

        // Stroke the outline
        ctx.beginPath()
        const midY = H / 2
        for (let i = 0; i < barCount; i++) {
          const v = (frequencyData[i] / 255) * amplitude * 1.4
          const y = midY - (v * H * 0.45)
          const x = i * step
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()

        // Mirror line
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
        // Idle: gentle sine wave
        phaseRef.current += 0.015
        const phase = phaseRef.current
        const midY = H / 2
        const idleAmp = 6

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
  }, [frequencyData, amplitude, isActive])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: 'block' }}
    />
  )
}
