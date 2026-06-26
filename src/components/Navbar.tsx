import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Moon, Sun, GraduationCap } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import { useActiveSection } from '../hooks/useActiveSection'
import { SITE } from '../config/site'

const NAV_ITEMS = [
  { label: 'Home', id: 'home' },
  { label: 'Search Papers', id: 'search' },
  { label: 'Available Papers', id: 'papers' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
]

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(NAV_ITEMS.map((n) => n.id))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  setTimeout(() => {
    setOpen(false)
  }, 1000)
}

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass shadow-lg shadow-slate-900/5' : 'bg-transparent'
      }`}
    >
      <nav className="container-x px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <button onClick={() => go('home')} className="flex items-center gap-2 group">
            <span className="grid place-items-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 shadow-lg shadow-primary-500/30 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-6 h-6 text-white" />
            </span>
            <span className="font-display font-bold text-lg sm:text-xl tracking-tight">
              {SITE.name}
            </span>
          </button>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => go(item.id)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    active === item.id
                      ? 'text-primary-600 dark:text-primary-300'
                      : 'text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-300'
                  }`}
                >
                  {item.label}
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="grid place-items-center w-10 h-10 rounded-lg glass hover:scale-110 transition-transform"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-accent-400" /> : <Moon className="w-5 h-5 text-primary-600" />}
            </button>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
              className="md:hidden grid place-items-center w-10 h-10 rounded-lg glass"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden glass border-t border-white/10 absolute top-full left-0 w-full z-50 shadow-2xl"
          >
            <ul className="px-4 py-4 space-y-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => go(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                      active === item.id
                        ? 'bg-primary-500/10 text-primary-600 dark:text-primary-300'
                        : 'hover:bg-slate-500/10'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
