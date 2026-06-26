import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, FileText, Filter } from 'lucide-react'
import { papers } from '../data/papers'

export default function SearchSection() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<'all' | 'subject' | 'university' | 'course' | 'year'>('all')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return papers.filter((p) => {
      const hay = filter === 'all'
        ? `${p.subject} ${p.university} ${p.course} ${p.year} ${p.tags.join(' ')}`.toLowerCase()
        : String(p[filter]).toLowerCase()
      return hay.includes(q)
    })
  }, [query, filter])

  const filters: { key: typeof filter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'subject', label: 'Subject' },
    { key: 'university', label: 'University' },
    { key: 'course', label: 'Course' },
    { key: 'year', label: 'Year' },
  ]

  return (
    <section id="search" className="section-pad relative">
      <div className="container-x">
        <SectionHeading
          eyebrow="Smart Search"
          title="Find Your Paper in Seconds"
          subtitle="Type a subject, university, course, or year — results appear instantly as you type."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search papers... e.g. Data Structures, AKTU, 2024"
              className="w-full pl-14 pr-14 py-4 sm:py-5 rounded-2xl glass-card text-base sm:text-lg
                         focus:outline-none focus:ring-2 focus:ring-primary-500/50
                         placeholder:text-slate-400 transition-all"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-5 top-1/2 -translate-y-1/2 grid place-items-center w-8 h-8 rounded-full bg-slate-500/10 hover:bg-slate-500/20 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter chips */}
          <div className="flex flex-wrap items-center gap-2 mt-4 justify-center">
            <span className="inline-flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 mr-1">
              <Filter className="w-4 h-4" /> Filter:
            </span>
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  filter === f.key
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md shadow-primary-500/30'
                    : 'glass hover:scale-105'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Results */}
          <div className="mt-6 min-h-[120px]">
            <AnimatePresence mode="popLayout">
              {!query && (
                <motion.p
                  key="hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-slate-500 dark:text-slate-400 py-8"
                >
                  Start typing to see matching papers...
                </motion.p>
              )}

              {query && results.length === 0 && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-10"
                >
                  <motion.div
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="inline-grid place-items-center w-16 h-16 rounded-2xl glass mb-4"
                  >
                    <FileText className="w-8 h-8 text-slate-400" />
                  </motion.div>
                  <p className="font-semibold text-lg">No papers found</p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                    Try a different keyword or filter.
                  </p>
                </motion.div>
              )}

              {results.length > 0 && (
                <motion.ul layout className="space-y-2">
                  <AnimatePresence>
                    {results.map((p) => (
                      <motion.li
                        key={p.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-3 p-3 sm:p-4 rounded-xl glass-card hover:scale-[1.01] transition-transform cursor-pointer"
                        onClick={()=>{
                          const paperElement = document.getElementById(`paper-${p.id}`);
                          if (paperElement) {
                            paperElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          }
                        }}
                      >
                        <span className="grid place-items-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 text-white shrink-0">
                          <FileText className="w-5 h-5" />
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold truncate">{p.subject}</div>
                          <div className="text-sm text-slate-500 dark:text-slate-400 truncate">
                            {p.university} · {p.course} · {p.year}
                          </div>
                        </div>
                        <a
                          href={p.pdfUrl}
                          onClick={(e)=>{
                            e.stopPropagation();
                            if(p.pdfUrl === '#') e.preventDefault();
                          }}
                          // onClick={(e) => p.pdfUrl === '#' && e.preventDefault()}
                          className="text-sm font-medium text-primary-600 dark:text-primary-300 hover:underline shrink-0"
                        >
                          View
                         
                        </a>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: string
  subtitle?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-2xl mx-auto mb-12"
    >
      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary-500/10 text-primary-600 dark:text-primary-300 mb-4">
        {eyebrow}
      </span>
      <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed">{subtitle}</p>
      )}
    </motion.div>
  )
}
