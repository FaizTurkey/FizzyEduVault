import { motion } from 'framer-motion'
import { ArrowDownRight, BookOpen, Code2, Layers3, GraduationCap } from 'lucide-react'
import { papers } from '../data/papers'
import { SectionHeading } from './SearchSection'

type AcademicYear = 1 | 2 | 3 | 4

const years: {
  year: AcademicYear
  title: string
  semesters: string
  description: string
  Icon: typeof BookOpen
  tone: string
}[] = [
  {
    year: 1,
    title: '1st Year',
    semesters: 'Semester 1 & 2',
    description: 'Build your fundamentals with first-year papers.',
    Icon: BookOpen,
    tone: 'from-primary-500/15 to-secondary-500/15 text-primary-600 dark:text-primary-300',
  },
  {
    year: 2,
    title: '2nd Year',
    semesters: 'Semester 3 & 4',
    description: 'Practice core engineering and CSE subjects.',
    Icon: Code2,
    tone: 'from-secondary-500/15 to-primary-500/15 text-secondary-700 dark:text-secondary-300',
  },
  {
    year: 3,
    title: '3rd Year',
    semesters: 'Semester 5 & 6',
    description: 'Prepare with advanced and specialization subjects.',
    Icon: Layers3,
    tone: 'from-accent-400/20 to-primary-500/10 text-accent-700 dark:text-accent-300',
  },
  {
    year: 4,
    title: '4th Year',
    semesters: 'Semester 7 & 8',
    description: 'Final-year papers will appear here as they are added.',
    Icon: GraduationCap,
    tone: 'from-primary-500/10 to-accent-400/20 text-primary-700 dark:text-primary-300',
  },
]

export default function YearSection({
  selectedYear,
  onSelectYear,
}: {
  selectedYear: AcademicYear | null
  onSelectYear: (year: AcademicYear) => void
}) {
  return (
    <section id="years" className="section-pad relative overflow-hidden">
      <div className="pointer-events-none absolute -left-24 top-24 h-64 w-64 rounded-full bg-primary-500/10 blur-3xl"  />
      <div className="pointer-events-none absolute -right-24 bottom-8 h-64 w-64 rounded-full bg-secondary-500/10 blur-3xl" />

      <div className="container-x relative">
        <SectionHeading
          eyebrow="Browse by academic year"
          title="Your year. Your subjects. Your papers."
          subtitle="Choose your B.Tech year to see the question papers available for that stage of your journey."
        />

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {years.map(({ year, title, semesters, description, Icon, tone }, index) => {
            const count = papers.filter((paper) => paper.academicYear === year).length
            const active = selectedYear === year

            return (
              <motion.button
                key={year}
                type="button"
                data-aos="fade-up"
                data-aos-delay={String(index * 70)}
                onClick={() => onSelectYear(year)}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.985 }}
                className={`group relative flex h-full min-h-60 flex-col overflow-hidden rounded-2xl border p-6 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                  active
                    ? 'border-primary-500 bg-primary-500/[0.07] shadow-xl shadow-primary-500/10 ring-1 ring-primary-500/30'
                    : 'border-slate-200/80 bg-white/80 shadow-sm hover:border-primary-300 hover:shadow-xl hover:shadow-primary-500/10 dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-primary-400/50'
                }`}
              >
                <div className={`mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${tone} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </div>

                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display text-xl font-bold tracking-tight">{title}</h3>
                    <p className="mt-1 text-sm font-medium text-primary-600 dark:text-primary-300">{semesters}</p>
                  </div>
                  <ArrowDownRight className="mt-1 h-5 w-5 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:translate-y-1 group-hover:text-primary-500" />
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>

                <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-white/10 dark:text-slate-300">
                    {count} {count === 1 ? 'paper' : 'papers'}
                  </span>
                  <span className="text-sm font-semibold text-primary-600 dark:text-primary-300">
                    {active ? 'Selected' : 'Explore year'}
                  </span>
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
