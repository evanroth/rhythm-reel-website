import HeroSection from '@/components/HeroSection'
import Footer from '@/components/Footer'

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Pick a video',
    desc: 'Any clip or Live Photo from your camera roll. Even a 2-second Loop.',
  },
  {
    step: '02',
    title: 'Play music',
    desc: 'Use the mic to catch ambient sound or import any audio file directly.',
  },
  {
    step: '03',
    title: 'Record & share',
    desc: 'Tap record. The audio scrubs your video in real time. Export and post.',
  },
]

const FEATURES = [
  {
    icon: '〰',
    title: 'Waveform overlay',
    desc: 'Real-time frequency visualiser baked right into the frame.',
  },
  {
    icon: '✦',
    title: 'Scale pulse',
    desc: 'The video gently scales with each beat — addictive to watch.',
  },
  {
    icon: '▤',
    title: 'Multi-clip playlist',
    desc: 'Line up clips and cycle them manually, on beat, or on a timer.',
  },
  {
    icon: 'T',
    title: 'Text overlay',
    desc: 'Drag, resize, and stylise text that gets composited into the export.',
  },
]

export default function HomePage() {
  return (
    <main style={{ background: '#0F081E' }}>

      {/* Hero — interactive audio-reactive demo */}
      <HeroSection />

      {/* How it works */}
      <section className="py-24 px-6">
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
            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', color: 'rgba(255,255,255,0.7)' }}
          >
            RhythmReel makes your videos move to music.
          </p>
          <p
            className="mt-5 font-light leading-relaxed"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'rgba(255,255,255,0.45)' }}
          >
            Pick a clip. Play a song. The audio controls everything — when the beat drops,
            your video jumps forward. When it quiets, it eases back. The result is a hypnotic,
            music-reactive video you can record and post to Instagram or TikTok in under a minute.
          </p>
          <p
            className="mt-5 font-light"
            style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)', color: 'rgba(255,255,255,0.3)' }}
          >
            No timelines. No keyframes. Just music and motion.
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
            Everything you need.{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #F54A8A, #8A2BE3)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Nothing you don&apos;t.
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

      <Footer />
    </main>
  )
}
