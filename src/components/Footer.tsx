import { GraduationCap, Linkedin, Github, Twitter, Mail, ArrowUp } from 'lucide-react'
import { SITE, LINKEDIN_URL } from '../config/site'

const QUICK_LINKS = [
  { label: 'Home', id: 'home' },
  { label: 'Search Papers', id: 'search' },
  { label: 'Available Papers', id: 'papers' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
]

export default function Footer() {
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative border-t border-white/10 glass">
      <div className="container-x px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <button onClick={() => go('home')} className="flex items-center gap-2 mb-4">
              <span className="grid place-items-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 shadow-lg shadow-primary-500/30">
                <GraduationCap className="w-6 h-6 text-white" />
              </span>
              <span className="font-display font-bold text-lg">{SITE.name}</span>
            </button>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed max-w-xs">
              {SITE.tagline}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {QUICK_LINKS.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => go(l.id)}
                    className="text-sm text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display font-semibold mb-4">Connect</h4>
            <div className="flex items-center gap-3">
              <SocialIcon href={LINKEDIN_URL} label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </SocialIcon>
              <SocialIcon href="https://github.com/FaizTurkey" label="GitHub">
                <Github className="w-5 h-5" />
              </SocialIcon>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">{SITE.copyright}</p>
        </div>
      </div>
    </footer>
  )
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid place-items-center w-10 h-10 rounded-xl glass hover:bg-gradient-to-br hover:from-primary-500 hover:to-secondary-500 hover:text-white hover:scale-110 hover:-translate-y-0.5 transition-all duration-300"
    >
      {children}
    </a>
  )
}
