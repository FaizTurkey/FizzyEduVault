import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SearchSection from './components/SearchSection'
import PapersSection from './components/PapersSection'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <SearchSection />
        <PapersSection />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
