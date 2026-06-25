import { motion } from 'framer-motion'
import { Search, FileStack, Sparkles, BookOpen, Download, GraduationCap } from 'lucide-react'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16">
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 -left-20 w-72 h-72 bg-primary-500/30 dark:bg-primary-500/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-40 right-0 w-96 h-96 bg-secondary-500/30 dark:bg-secondary-500/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-accent-400/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container-x px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 text-accent-500" />
              <span className="text-slate-700 dark:text-slate-200">Trusted by 10,000+ students</span>
            </motion.div>

            <motion.h1 variants={item} className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-balance">
              Your Ultimate{' '}
              <span className="gradient-text animate-gradient">Previous Year Question Paper</span>{' '}
              Library
            </motion.h1>

            <motion.p variants={item} className="mt-6 text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
              Access, search, and download previous year papers for multiple universities and
              courses—all in one place.
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap gap-4">
              <button onClick={() => go('papers')} className="btn-primary">
                <FileStack className="w-5 h-5" />
                Browse Papers
              </button>
              <button onClick={() => go('search')} className="btn-ghost">
                <Search className="w-5 h-5" />
                Search Now
              </button>
            </motion.div>

            <motion.div variants={item} className="mt-10 flex items-center gap-8 text-sm">
              <Stat value="6+" label="Universities" />
              <span className="w-px h-8 bg-slate-300 dark:bg-slate-700" />
              <Stat value="500+" label="Papers" />
              <span className="w-px h-8 bg-slate-300 dark:bg-slate-700" />
              <Stat value="100%" label="Free" />
            </motion.div>
          </motion.div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <HeroIllustration />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display font-bold text-2xl gradient-text">{value}</div>
      <div className="text-slate-500 dark:text-slate-400">{label}</div>
    </div>
  )
}

function HeroIllustration() {
  return (
    <div className="relative w-full aspect-square max-w-lg mx-auto">
      {/* Glow ring */}
      <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-primary-500/20 via-secondary-500/20 to-accent-400/20 blur-2xl" />

      {/* Main glass card */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative glass-card rounded-3xl p-8 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-primary-500" />
            <span className="font-display font-semibold">Question Papers</span>
          </div>
          <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-medium">2024</span>
        </div>

        <div className="space-y-3">
          {[
            { name: 'Data Structures', icon: BookOpen, color: 'from-primary-500 to-secondary-500' },
            { name: 'Operating System', icon: BookOpen, color: 'from-secondary-500 to-accent-500' },
            { name: 'DBMS', icon: BookOpen, color: 'from-accent-500 to-primary-500' },
          ].map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.15 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/40 dark:bg-slate-800/40 hover:scale-[1.02] transition-transform"
            >
              <span className={`grid place-items-center w-10 h-10 rounded-lg bg-gradient-to-br ${p.color} text-white`}>
                <p.icon className="w-5 h-5" />
              </span>
              <span className="flex-1 font-medium text-sm">{p.name}</span>
              <Download className="w-4 h-4 text-slate-400" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Floating badge */}
      <motion.div
        animate={{ y: [0, 16, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -bottom-4 -left-4 glass-card rounded-2xl px-5 py-3 shadow-xl"
      >
        <div className="flex items-center gap-2">
          <span className="grid place-items-center w-9 h-9 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 text-white">
            <Download className="w-4 h-4" />
          </span>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Downloads</div>
            <div className="font-bold text-sm">12,480+</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
