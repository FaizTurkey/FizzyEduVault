import { motion } from 'framer-motion'
import { FileText, Download, Calendar, Building2, BookMarked } from 'lucide-react'
import { papers, type Paper } from '../data/papers'
import { SectionHeading } from './SearchSection'

export default function PapersSection() {
  return (
    <section id="papers" className="section-pad relative overflow-hidden">
      {/* soft background accent */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-secondary-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl -z-10" />

      <div className="container-x">
        <SectionHeading
          eyebrow="Library"
          title="Available Papers"
          subtitle="Browse our curated collection of previous year question papers. Download what you need — completely free."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {papers.map((paper, i) => (
            <PaperCard key={paper.id} paper={paper} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PaperCard({ paper, index }: { paper: Paper; index: number }) {
  return (
    <motion.article
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
            {paper.year}
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
