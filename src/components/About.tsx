import { motion } from 'framer-motion'
import { Linkedin, User } from 'lucide-react'
import { LINKEDIN_URL } from '../config/site'
import { SectionHeading } from './SearchSection'

export default function About() {
  return (
    <section id="about" className="section-pad relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl -z-10" />

      <div className="container-x">
        <SectionHeading eyebrow="About Me" title="The Person Behind FizzyEduVault" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Profile image placeholder */}
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 blur-xl opacity-60 animate-pulse" />
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full p-1.5 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-400">
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 grid place-items-center">
                {/* Replace this placeholder with your own image later */}
                <User className="w-20 h-20 text-slate-400" />
              </div>
            </div>
            <motion.span
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -bottom-1 -right-1 grid place-items-center w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-lg border-4 border-white dark:border-slate-950"
            >
              <Linkedin className="w-5 h-5" />
            </motion.span>
          </div>

          <h3 className="font-display font-bold text-3xl mb-3">Faiz</h3>

          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto">
            Passionate about helping students access quality educational resources and previous
            year papers through technology.
          </p>

          {/* LinkedIn button */}
          <motion.a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-2.5 mt-8 px-7 py-3.5 rounded-xl font-semibold text-white
                       bg-gradient-to-r from-[#0A66C2] to-[#0077B5] shadow-lg shadow-[#0A66C2]/30
                       hover:shadow-xl hover:shadow-[#0A66C2]/50 transition-all duration-300"
          >
            <motion.span
              animate={{ rotate: [0, -8, 8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <Linkedin className="w-5 h-5" />
            </motion.span>
            <span>Connect on LinkedIn</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
