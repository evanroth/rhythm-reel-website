import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Support — RhythmReel',
  description: 'Get help with RhythmReel. FAQ and contact information.',
}

const FAQ = [
  {
    q: 'The video isn\'t reacting to music. What\'s wrong?',
    a: 'Make sure your iPhone\'s microphone permission is enabled for RhythmReel. Go to Settings > Privacy & Security > Microphone and ensure RhythmReel is toggled on. Then try playing music loudly near your device.',
  },
  {
    q: 'Can I use music from Spotify or Apple Music?',
    a: 'Yes — set RhythmReel to use the microphone, then play music from any app. RhythmReel listens to the audio around you, so any music source works.',
  },
  {
    q: 'How do I save my video?',
    a: 'Tap the record button while your video is reacting to music. When you stop recording, a share sheet will appear automatically. Tap \'Save to Photos\' or share directly to Instagram, TikTok, or any app.',
  },
  {
    q: 'The app asked for camera/microphone/photo access and I said no. How do I fix it?',
    a: 'Go to Settings > RhythmReel and enable the permissions you\'d like to grant.',
  },
  {
    q: 'My video isn\'t in my camera roll. What happened?',
    a: 'After recording, use the share sheet that appears to save your video to Photos. The video is not automatically saved — you need to tap \'Save to Photos.\'',
  },
]

export default function SupportPage() {
  return (
    <div style={{ background: '#0F081E', minHeight: '100vh' }}>
      <div className="max-w-2xl mx-auto px-6 py-20">

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-12"
        >
          ← RhythmReel
        </Link>

        <h1 className="text-white font-black text-4xl tracking-tight mb-2">Support</h1>
        <p className="text-white/40 mb-12">Need help with RhythmReel? We&apos;re here.</p>

        {/* FAQ */}
        <h2 className="text-white font-semibold text-xl mb-6">Frequently asked questions</h2>
        <div className="space-y-4">
          {FAQ.map(({ q, a }) => (
            <div
              key={q}
              className="p-6 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <h3 className="text-white font-medium mb-3 text-sm leading-snug">{q}</h3>
              <p className="text-white/55 text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div
          className="mt-10 p-6 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255,45,85,0.08), rgba(138,43,227,0.08))',
            border: '1px solid rgba(245,74,138,0.2)',
          }}
        >
          <h2 className="text-white font-semibold text-lg mb-2">Still stuck?</h2>
          <p className="text-white/55 text-sm mb-4">
            Email us and we&apos;ll get back to you as soon as possible.
          </p>
          <a
            href="mailto:studio@evan-roth.com"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-medium transition-all hover:brightness-110"
            style={{ background: 'linear-gradient(135deg, #F54A8A, #8A2BE3)' }}
          >
            studio@evan-roth.com
          </a>
        </div>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-white/05 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/30">
          <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
          <Link href="/impressum" className="hover:text-white/60 transition-colors">Impressum</Link>
          <span>© {new Date().getFullYear()} Evan Roth</span>
        </div>
      </div>
    </div>
  )
}
