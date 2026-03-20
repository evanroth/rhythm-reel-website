import HeroSection from '@/components/HeroSection'
import Footer from '@/components/Footer'
import TopNav from '@/components/TopNav'

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Pick a video',
    desc: 'Import any video or live photo from your phone, or record a short clip in the app. Short videos (2–3 seconds) of single gestures tend to work well.',
  },
  {
    step: '02',
    title: 'Play music',
    desc: 'Use your phone\'s mic to catch ambient sound or import any audio file directly. The audio scrubs your video in real time. Loud sounds move the playhead all the way to the end of the video, and soft sounds only move the playhead slightly.',
  },
  {
    step: '03',
    title: 'Record & Share',
    desc: 'Tap "Record to export". A video of your RhythmReel is saved to your photos for easy sharing with friends via message or on social media.',
  },
]

const FEATURES = [
  {
    icon: '〰',
    title: 'Waveform overlay',
    desc: 'Select from multiple real-time frequency visualizations that get baked right into the exported video.',
  },
  {
    icon: '⚙',
    title: 'Settings',
    desc: 'Advanced settings allow control over audio reactivity and visual elements on screen.',
  },
  {
    icon: '▤',
    title: 'Multi-clip playlist',
    desc: 'Select multiple clips to play them sequentially in a looping cycle.',
  },
  {
    icon: 'T',
    title: 'Text overlay',
    desc: 'Type, move, resize, and stylise text that moves to the audio and gets composited into the export.',
  },
]

export default function HomePage() {
  return (
    <main style={{ background: '#0F081E' }}>

      <TopNav />

      {/* Hero — interactive audio-reactive demo */}
      <HeroSection />

      {/* How it works */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-center font-black tracking-tight mb-16"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              background: 'linear-gradient(135deg, #FF2D55, #F54A8A, #8A2BE3)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            How it works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map(({ step, title, desc }) => (
              <div
                key={step}
                className="flex flex-col gap-3 p-6 rounded-2xl"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <span
                  className="text-xs font-black tracking-widest"
                  style={{
                    background: 'linear-gradient(135deg, #F54A8A, #8A2BE3)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {step}
                </span>
                <h3 className="text-white font-semibold text-lg">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Description block */}
      <section
        className="py-20 px-6"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <p
            className="font-light leading-relaxed"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'rgba(255,255,255,0.55)' }}
          >
            RhythmReel is an iPhone app I made that makes your videos and live photos move to music.
            Pick a clip. Play a song. The audio controls everything — when the beat drops, your video
            jumps forward. When it quiets, it eases back. The result is a playful, music-reactive video
            you can make and share with friends and post to social media in seconds.
          </p>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-center font-black tracking-tight mb-16"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              color: 'rgba(255,255,255,0.9)',
            }}
          >
            Audio amplitude mapped to video playback{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #F54A8A, #8A2BE3)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              for the children.
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FEATURES.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="flex gap-4 p-6 rounded-2xl transition-all duration-300 hover:brightness-110"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0"
                  style={{ background: 'linear-gradient(135deg, #FF2D5522, #8A2BE322)', border: '1px solid rgba(245,74,138,0.2)' }}
                >
                  {icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 text-center">
        <h2
          className="font-black tracking-tight mb-4"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            background: 'linear-gradient(135deg, #FF2D55 0%, #F54A8A 45%, #8A2BE3 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          RhythmReel: Music makes it move
        </h2>
        <p className="text-white/40 mb-8 text-lg font-light">Free on the App Store. iPhone only.</p>
        <a
          href="https://apps.apple.com/app/photo-bounce/idXXXXXXXXX"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold text-base transition-all duration-200 hover:brightness-110 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #FF2D55, #F54A8A, #8A2BE3)',
            boxShadow: '0 8px 32px rgba(245,74,138,0.4)',
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
          Download on the App Store
        </a>
      </section>

      <Footer />
    </main>
  )
}
