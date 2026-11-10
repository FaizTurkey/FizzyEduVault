import { useEffect, useState } from 'react'
import AOS from 'aos'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import YearSection from './components/YearSection'
import SearchSection from './components/SearchSection'
import PapersSection from './components/PapersSection'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

type AcademicYear = 1 | 2 | 3 | 4

export default function App() {
  const [selectedYear, setSelectedYear] = useState<AcademicYear | null>(null)

  useEffect(() => {
    AOS.init({
      duration: 650,
      easing: 'ease-out-cubic',
      once: true,
      offset: 70,
      disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    })
  }, [])

  const selectYear = (year: AcademicYear) => {
    setSelectedYear(year)
    window.setTimeout(() => {
      document.getElementById('papers')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden ">
      <Navbar />
      <main>
        <Hero />
        <YearSection selectedYear={selectedYear} onSelectYear={selectYear} />
        <SearchSection />
        <PapersSection selectedYear={selectedYear} onClearYear={() => setSelectedYear(null)} />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
