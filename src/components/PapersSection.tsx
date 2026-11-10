import { motion } from 'framer-motion'
import { FileText, Download, Calendar, Building2, BookMarked } from 'lucide-react'
import { papers, type Paper } from '../data/papers'
import { SectionHeading } from './SearchSection'

type AcademicYear = 1 | 2 | 3 | 4

const yearTitles: Record<AcademicYear, string> = {
  1: '1st Year',
  2: '2nd Year',
  3: '3rd Year',
  4: '4th Year',
}

export default function PapersSection({
  selectedYear,
  onClearYear,
}: {
  selectedYear: AcademicYear | null
  onClearYear: () => void
}) {
  const visiblePapers = selectedYear
    ? papers.filter((paper) => paper.academicYear === selectedYear)
    : papers

  return (
    <section id="papers" className="section-pad relative overflow-hidden">
      {/* soft background accent */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-secondary-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl -z-10" />

      <div className="container-x">
        <SectionHeading
          eyebrow={selectedYear ? yearTitles[selectedYear] : 'Library'}
          title={selectedYear ? `${yearTitles[selectedYear]} Papers` : 'Available Papers'}
          subtitle={selectedYear
            ? `Browse the papers currently grouped under ${yearTitles[selectedYear]}. Use the button below to see the full library.`
            : 'Browse our collection of question papers. Choose an academic year above or explore the full library.'}
        />

        {selectedYear !== null && (
          <div className="mb-7 flex flex-wrap items-center justify-center gap-3">
            <span className="rounded-full bg-primary-500/10 px-3 py-1.5 text-sm font-medium text-primary-700 dark:text-primary-300">
              Showing {yearTitles[selectedYear]}
            </span>
            <button type="button" onClick={onClearYear} className="btn-ghost !px-4 !py-2 text-sm">
              Show all papers
            </button>
          </div>
        )}

        {visiblePapers.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visiblePapers.map((paper, i) => (
              <PaperCard key={paper.id} paper={paper} index={i} />
            ))}
          </div>
        ) : (
          <div className="glass-card mx-auto max-w-xl rounded-2xl p-8 text-center">
            <BookMarked className="mx-auto mb-3 h-9 w-9 text-primary-500" />
            <h3 className="font-display text-xl font-bold">More papers coming soon</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              There are no papers grouped under {yearTitles[selectedYear!]} yet. Add the relevant papers in src/data/papers.ts when they are available.
            </p>
            <button type="button" onClick={onClearYear} className="btn-primary mt-5 !py-2.5 text-sm">
              Browse all papers
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

function PaperCard({ paper, index }: { paper: Paper; index: number }) {
  return (
    <motion.article
      id={`paper-${paper.id}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      whileHover={{ y: -6 }}
      className="group relative glass-card rounded-2xl p-6 overflow-hidden hover:shadow-2xl hover:shadow-primary-500/10 transition-shadow"
    >
      {/* gradient sheen on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 via-secondary-500/0 to-accent-400/0 group-hover:from-primary-500/5 group-hover:via-secondary-500/5 group-hover:to-accent-400/5 transition-all duration-500" />

      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <span className="grid place-items-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-lg shadow-primary-500/30 group-hover:scale-110 group-hover:rotate-3 transition-transform">
            <FileText className="w-7 h-7" />
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-accent-400/15 text-accent-600 dark:text-accent-400">
            <Calendar className="w-3 h-3" />
            {paper.year} Paper
          </span>
        </div>

        <h3 className="font-display font-bold text-xl mb-1 group-hover:gradient-text transition-all">
          {paper.subject}
        </h3>

        <div className="space-y-1.5 mb-5 text-sm text-slate-600 dark:text-slate-300">
          <p className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-primary-500 shrink-0" />
            {paper.university}
          </p>
          <p className="flex items-center gap-2">
            <BookMarked className="w-4 h-4 text-secondary-500 shrink-0" />
            {paper.course}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {paper.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md text-xs font-medium bg-slate-500/10 text-slate-600 dark:text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={paper.pdfUrl}
          download={`${paper.subject}.pdf`}
          onClick={(e) => paper.pdfUrl === '#' && e.preventDefault()}
          className="btn-primary w-full text-sm py-2.5"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </a>
      </div>
    </motion.article>
  )
}
