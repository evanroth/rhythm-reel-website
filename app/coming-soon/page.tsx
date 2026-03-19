'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function ComingSoonPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        router.push('/')
        router.refresh()
      } else {
        setError('Incorrect password')
        setPassword('')
      }
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main
      style={{ backgroundColor: '#0F081E' }}
      className="min-h-screen flex flex-col items-center justify-center px-6"
    >
      <div className="flex flex-col items-center gap-8 w-full max-w-sm">
        {/* Wordmark */}
        <div className="relative w-64 h-16">
          <Image
            src="/logo/wordmark.png"
            alt="Rhythm Reel"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>

        {/* Tagline */}
        <p className="text-white/50 text-sm text-center tracking-widest uppercase">
          Coming Soon
        </p>

        {/* Password form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 mt-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="current-password"
            className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/30 border border-white/10 focus:outline-none focus:border-white/30 text-sm"
          />
          {error && (
            <p className="text-sm text-red-400 text-center">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading || password.length === 0}
            className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-opacity disabled:opacity-40"
            style={{
              background: 'linear-gradient(135deg, #F54A8A, #8A2BE3)',
            }}
          >
            {loading ? 'Unlocking…' : 'Unlock'}
          </button>
        </form>
      </div>
    </main>
  )
}
