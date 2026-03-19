'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { AudioSettings, DEFAULT_SETTINGS } from './DebugPanel'

export type AudioSource = 'idle' | 'music'

export interface AudioState {
  source: AudioSource
  amplitude: number
  frequencyData: Uint8Array | null
  isMusicPlaying: boolean
  beatFlash: boolean
}

export interface AudioControls {
  toggleMusic: () => void
}

export interface LiveDebugValues {
  rawRms: number
  amplitude: number
}

export function useAudioEngine(
  audioRef: React.RefObject<HTMLAudioElement | null>,
  amplitudeRef?: React.MutableRefObject<number>,
  settingsRef?: React.MutableRefObject<AudioSettings>,
  liveRef?: React.MutableRefObject<LiveDebugValues>,
): [AudioState, AudioControls] {
  const ctxRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const musicSourceRef = useRef<MediaElementAudioSourceNode | null>(null)
  const rafRef = useRef<number | null>(null)
  const prevAmplitudeRef = useRef(0)
  const beatRef = useRef({ rolling: 0, flashTimer: 0 })

  const [source, setSource] = useState<AudioSource>('idle')
  const [amplitude, setAmplitude] = useState(0)
  const [frequencyData, setFrequencyData] = useState<Uint8Array | null>(null)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [beatFlash, setBeatFlash] = useState(false)

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    }
    if (ctxRef.current.state === 'suspended') ctxRef.current.resume()
    return ctxRef.current
  }, [])

  const stopRaf = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [])

  const startAnalysisLoop = useCallback(() => {
    stopRaf()
    const analyser = analyserRef.current
    if (!analyser) return

    const bufLen = analyser.frequencyBinCount
    const timeData = new Uint8Array(bufLen)
    const freqData = new Uint8Array(bufLen)

    const tick = () => {
      const s = settingsRef?.current ?? DEFAULT_SETTINGS

      analyser.smoothingTimeConstant = s.analyserSmoothing
      analyser.getByteTimeDomainData(timeData)
      analyser.getByteFrequencyData(freqData)

      // RMS from time-domain
      let sum = 0
      for (let i = 0; i < timeData.length; i++) {
        const v = (timeData[i] - 128) / 128
        sum += v * v
      }
      const rawRms = Math.sqrt(sum / timeData.length)

      // Simple: boost → clamp → power curve → low-pass smooth
      const boosted = Math.min(rawRms * s.rmsBoost, 1.0)
      const powered = Math.pow(boosted, s.outputPower)
      const smoothed = powered * s.lowPass + prevAmplitudeRef.current * (1 - s.lowPass)
      prevAmplitudeRef.current = smoothed

      if (amplitudeRef) amplitudeRef.current = smoothed
      if (liveRef) { liveRef.current.rawRms = rawRms; liveRef.current.amplitude = smoothed }

      // Beat detection
      let bassSum = 0
      for (let i = 1; i <= 4; i++) bassSum += freqData[i]
      const bass = bassSum / (4 * 255)
      const beat = beatRef.current
      beat.rolling = beat.rolling * 0.95 + bass * 0.05
      if (bass > beat.rolling * 1.5 && bass > 0.1) {
        setBeatFlash(true)
        clearTimeout(beat.flashTimer)
        beat.flashTimer = window.setTimeout(() => setBeatFlash(false), 120)
      }

      setAmplitude(smoothed)
      setFrequencyData(new Uint8Array(freqData))
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [stopRaf, amplitudeRef, settingsRef, liveRef])

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    const s = settingsRef?.current ?? DEFAULT_SETTINGS
    const ctx = getCtx()

    if (!analyserRef.current) {
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 2048
      analyser.smoothingTimeConstant = s.analyserSmoothing
      analyser.connect(ctx.destination)
      analyserRef.current = analyser
    }

    if (isMusicPlaying) {
      audio.pause()
      setIsMusicPlaying(false)
      setSource('idle')
      stopRaf()
      setAmplitude(0)
      prevAmplitudeRef.current = 0
      if (amplitudeRef) amplitudeRef.current = 0
      return
    }

    if (!musicSourceRef.current) {
      musicSourceRef.current = ctx.createMediaElementSource(audio)
      musicSourceRef.current.connect(analyserRef.current)
    }

    audio.play()
    setIsMusicPlaying(true)
    setSource('music')
    startAnalysisLoop()
  }, [isMusicPlaying, audioRef, getCtx, stopRaf, startAnalysisLoop, amplitudeRef, settingsRef])

  useEffect(() => {
    return () => {
      stopRaf()
      ctxRef.current?.close()
    }
  }, [stopRaf])

  return [
    { source, amplitude, frequencyData, isMusicPlaying, beatFlash },
    { toggleMusic },
  ]
}
