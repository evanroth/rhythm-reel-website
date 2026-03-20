'use client'

export default function TopNav() {
  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="fixed top-5 right-5 z-50 flex items-center gap-4">
      <button
        onClick={scrollToHowItWorks}
        className="text-white/60 hover:text-white text-sm font-medium transition-colors"
      >
        How it Works
      </button>

      <a
        href="https://apps.apple.com/app/photo-bounce/idXXXXXXXXX"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-medium transition-all duration-200 hover:brightness-110 active:scale-95"
        style={{
          background: 'linear-gradient(135deg, #FF2D55, #F54A8A, #8A2BE3)',
          boxShadow: '0 4px 16px rgba(245,74,138,0.35)',
        }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
        Download app
      </a>
    </div>
  )
}
