import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RhythmReel — Music makes it move.',
  description:
    'Your videos, dancing to the beat. No editing. No keyframes. Post-ready in under a minute.',
  openGraph: {
    title: 'RhythmReel — Music makes it move.',
    description: 'Your videos, dancing to the beat.',
    siteName: 'RhythmReel',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: '#0F081E' }}>{children}</body>
    </html>
  )
}
