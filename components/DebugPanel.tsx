'use client'

import { useEffect, useRef, useState } from 'react'

export interface AudioSettings {
  rmsBoost: number        // multiply raw RMS before normalization (1–20)
  lowPass: number         // low-pass factor: higher = snappier (0.05–1.0)
  outputPower: number     // amplitude^power — compress (<1) or expand (>1) range (0.3–3.0)
  analyserSmoothing: number // AnalyserNode.smoothingTimeConstant (0–0.95)
}

export const DEFAULT_SETTINGS: AudioSettings = {
  rmsBoost: 2.5,
  lowPass: 0.45,
  outputPower: 2.0,
  analyserSmoothing: 0.10,
}

interface LiveValues {
  rawRms: number
  amplitude: number
}

interface DebugPanelProps {
  settings: AudioSettings
  onChange: (s: AudioSettings) => void
  liveRef: React.RefObject<LiveValues>
  visible: boolean
}

function Slider({
  label, value, min, max, step, onChange, format,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
  format?: (v: number) => string
}) {
  const fmt = format ?? ((v: number) => v.toFixed(2))
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-baseline">
        <span className="text-white/60 text-xs">{label}</span>
        <span className="text-white font-mono text-sm font-bold">{fmt(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #F54A8A ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.15) 0%)`,
          outline: 'none',
        }}
      />
      <div className="flex justify-between text-white/25 text-xs">
        <span>{fmt(min)}</span><span>{fmt(max)}</span>
      </div>
    </div>
  )
}

function Bar({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between">
        <span className="text-white/50 text-xs">{label}</span>
        <span className="font-mono text-xs" style={{ color }}>{value.toFixed(4)}</span>
      </div>
      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full transition-none"
          style={{ width: `${Math.min(value * 100, 100)}%`, background: color }}
        />
      </div>
    </div>
  )
}

export default function DebugPanel({ settings, onChange, liveRef, visible }: DebugPanelProps) {
  const [live, setLive] = useState<LiveValues>({ rawRms: 0, amplitude: 0 })
  const rafRef = useRef<number | null>(null)

  // Poll the live ref at ~20fps for display
  useEffect(() => {
    const tick = () => {
      if (liveRef.current) setLive({ ...liveRef.current })
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [liveRef])

  if (!visible) return null

  const set = (key: keyof AudioSettings) => (v: number) => onChange({ ...settings, [key]: v })

  return (
    <div
      className="fixed top-4 right-4 z-50 w-72 rounded-2xl p-4 flex flex-col gap-4"
      style={{
        background: 'rgba(10,5,20,0.92)',
        border: '1px solid rgba(245,74,138,0.25)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <div className="flex items-center justify-between">
        <span
          className="text-xs font-bold tracking-widest uppercase"
          style={{ color: '#F54A8A' }}
        >
          Debug — press S to hide
        </span>
      </div>

      {/* Live meters */}
      <div className="flex flex-col gap-2 p-3 rounded-xl bg-white/[0.03]">
        <p className="text-white/30 text-xs uppercase tracking-widest mb-1">Live</p>
        <Bar value={live.rawRms} label="Raw RMS (pre-boost)" color="#8A2BE3" />
        <Bar value={Math.min(live.rawRms * settings.rmsBoost, 1)} label="Boosted RMS (clipped to 1)" color="#F54A8A" />
        <Bar value={live.amplitude} label="Amplitude → videos" color="#FF2D55" />
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-4">
        <Slider
          label="RMS Boost  (× raw RMS before norm)"
          value={settings.rmsBoost}
          min={1} max={30} step={0.5}
          onChange={set('rmsBoost')}
          format={v => `×${v.toFixed(1)}`}
        />
        <Slider
          label="Low-pass  (higher = snappier)"
          value={settings.lowPass}
          min={0.05} max={1.0} step={0.05}
          onChange={set('lowPass')}
        />
        <Slider
          label="Output Power  (amp^n curve)"
          value={settings.outputPower}
          min={0.3} max={3.0} step={0.1}
          onChange={set('outputPower')}
        />
        <Slider
          label="Analyser Smoothing  (lower = rawer)"
          value={settings.analyserSmoothing}
          min={0} max={0.95} step={0.05}
          onChange={set('analyserSmoothing')}
        />
      </div>

      <button
        onClick={() => onChange(DEFAULT_SETTINGS)}
        className="text-xs text-white/30 hover:text-white/60 transition-colors text-center"
      >
        Reset to defaults
      </button>
    </div>
  )
}
