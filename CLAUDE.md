# Rhythm Reel Website — CLAUDE.md

> Brand colors, assets, and design philosophy are defined in the parent context:
> `Photo-Bounce/CLAUDE.md` (one level up — inherited automatically by Claude Code)

---

## Purpose

This is the marketing / landing page website for the **Rhythm Reel** brand and the **Photo Bounce** iOS app. Its goals are:

1. Explain what the app does quickly and visually
2. Drive App Store downloads
3. Look sharp enough to be shareable on social media

---

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Hosting**: Vercel (assumed)
- **No CMS** — static content is fine for v1

---

## Key Pages

| Route | Description |
|-------|-------------|
| `/` | Interactive hero — audio-reactive video grid, full-width waveform, App Store CTA |
| `/privacy` | Privacy policy (required for App Store + GDPR) |
| `/support` | Support / FAQ page (required for App Store Connect) |
| `/impressum` | German legal notice — required under §5 DDG (Evan is based in Berlin) |

---

## Page Structure — Home (`/`)

1. **Hero section** (interactive, client-rendered): 6 video cells flanking the centered "RHYTHM REEL" wordmark. All cells scrub their playhead in real time based on audio amplitude — exactly like the app. Full-width waveform canvas below. Mic toggle + Play Track button.
2. **How it works**: 3-step visual explainer (pick video → pick audio → record & share)
3. **Description block**: Short copy explaining the app
4. **Features section**: Scale pulse, EQ bars, multi-clip playlist, text overlay
5. **Final CTA**: App Store download button
6. **Footer**: Privacy · Impressum · Support + © notice

## Hero Architecture

- `components/useAudioEngine.ts` — Web Audio API hook: manages AudioContext, AnalyserNode, mic stream, music element source. Exposes `amplitude` (0–1 smoothed RMS), `frequencyData` (Uint8Array), `beatFlash` (boolean), and `source` ('idle'|'mic'|'music').
- `components/Waveform.tsx` — Canvas-drawn waveform. Active: mirrored frequency shape with gradient fill. Idle: gentle sine wave at 30% opacity.
- `components/VideoCell.tsx` — `<video>` element with `currentTime` scrubbed by amplitude. Falls back to animated gradient placeholder when no video file is present.
- `components/HeroSection.tsx` — Assembles the above. 3+logo+3 grid layout.

## Demo Videos

Place 6 short `.mp4` demo clips in `public/videos/` named `demo-1.mp4` through `demo-6.mp4`. The VideoCell component detects their presence automatically and falls back to gradient placeholders until they're added.

## Demo Music

`public/music/demo-track.mp3` — bundled demo track. Plays via the "Play Track" button in the hero.

---

## Design Constraints

- Mobile-first (most visitors will arrive from Instagram/TikTok links on their phone)
- Dark background (`#0F081E`) throughout — consistent with app aesthetic
- Primary CTA: hot pink → violet gradient (`#F54A8A` → `#8A2BE3`)
- Logo wordmark from app assets (see parent CLAUDE.md for path)
- No stock photos — use app screenshots or video captures only
- Keep it fast: optimize all images, use `next/image`

---

## App Store Link

Placeholder until live: `https://apps.apple.com/app/photo-bounce/idXXXXXXXXX`

---

## Out of Scope for v1

- Blog / content marketing
- User accounts or cloud sync
- Analytics beyond Vercel's built-in
- Localization
