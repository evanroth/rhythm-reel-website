import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy — RhythmReel',
  description: 'Privacy policy for the RhythmReel iOS app.',
}

export default function PrivacyPage() {
  return (
    <div style={{ background: '#0F081E', minHeight: '100vh' }}>
      <div className="max-w-2xl mx-auto px-6 py-20">

        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-12"
        >
          ← RhythmReel
        </Link>

        <h1 className="text-white font-black text-4xl tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-white/35 text-sm mb-12">Last updated: April 2026</p>

        <div className="prose prose-invert max-w-none space-y-8 text-white/65 leading-relaxed">

          <p>
            RhythmReel is an iPhone app developed by Evan Roth. This privacy policy explains
            how the app handles your data.
          </p>

          <Section title="1. Data we collect">
            <p>
              RhythmReel does not collect, store, transmit, or share any personal data.
              All processing happens entirely on your device.
            </p>
            <p>The app requests access to the following device features:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-white/80">Camera</strong> — Used to record video clips
                within the app. Video is processed locally on your device and is never uploaded
                or transmitted anywhere.
              </li>
              <li>
                <strong className="text-white/80">Microphone</strong> — Used to capture audio
                input that drives the video effect in real time. Audio is processed locally and
                is never recorded, stored, or transmitted.
              </li>
              <li>
                <strong className="text-white/80">Photo Library</strong> — Used to let you select
                existing videos and Live Photos from your camera roll. Selected media is processed
                locally and is never uploaded or transmitted.
              </li>
            </ul>
          </Section>

          <Section title="2. Data we do not collect">
            <p>We do not collect:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your name, email address, or any identifying information</li>
              <li>Location data</li>
              <li>Usage analytics</li>
              <li>Crash reports</li>
              <li>Any data linked to your identity</li>
            </ul>
          </Section>

          <Section title="3. Third parties">
            <p>
              RhythmReel does not use any third-party SDKs, analytics tools, advertising
              networks, or services that collect data. No data is shared with any third party.
            </p>
          </Section>

          <Section title="4. Children">
            <p>
              RhythmReel does not knowingly collect any data from anyone, including children.
              The app is rated 4+ on the App Store.
            </p>
          </Section>

          <Section title="5. Data retention">
            <p>
              As no data is collected or transmitted, there is no data to retain or delete.
              All media you create in the app remains entirely under your control on your own device.
            </p>
          </Section>

          <Section title="6. Your rights (GDPR)">
            <p>
              If you are located in the European Union or European Economic Area, you have rights
              under the General Data Protection Regulation (GDPR). Because RhythmReel collects no
              personal data, there is no data to access, correct, port, or delete. If you have any
              questions about your rights, please contact us.
            </p>
          </Section>

          <Section title="7. Changes to this policy">
            <p>
              If our data practices change, we will update this policy and revise the
              &lsquo;Last updated&rsquo; date above. Continued use of the app after changes are
              posted constitutes acceptance of the updated policy.
            </p>
          </Section>

          <Section title="8. Contact">
            <address className="not-italic">
              Evan Roth<br />
              Torstrasse 25<br />
              10119 Berlin<br />
              Germany<br />
              <a href="mailto:studio@evan-roth.com" className="text-pink-400 hover:text-pink-300">
                studio@evan-roth.com
              </a>
            </address>
          </Section>

        </div>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-white/05 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/30">
          <Link href="/impressum" className="hover:text-white/60 transition-colors">Impressum</Link>
          <Link href="/support" className="hover:text-white/60 transition-colors">Support</Link>
          <span>© {new Date().getFullYear()} Evan Roth</span>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-white font-semibold text-lg mb-3">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  )
}
