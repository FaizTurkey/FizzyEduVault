import { motion } from 'framer-motion'
import { Search, FileStack} from 'lucide-react'

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
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-8 pb-16">
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
            

            <motion.h1 variants={item} className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-balance">
              Your Ultimate{' '}
              <span className="gradient-text animate-gradient">Previous Year CT's & External Question Paper</span>{' '}
              Library
            </motion.h1>

            <motion.p variants={item} className="mt-6 text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
              Access, search, and download previous year CT's papers for
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

// function Stat({ value, label }: { value: string; label: string }) {
//   return (
//     <div>
//       <div className="font-display font-bold text-2xl gradient-text">{value}</div>
//       <div className="text-slate-500 dark:text-slate-400">{label}</div>
//     </div>
//   )
// }

function HeroIllustration() {
  return (
    <div className="relative w-full aspect-square max-w-lg mx-auto">
      {/* Glow ring */}
      <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-primary-500/20 via-secondary-500/20 to-accent-400/20 blur-2xl" />
    </div>
  )
}
