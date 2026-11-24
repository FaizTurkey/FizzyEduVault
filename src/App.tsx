import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SearchSection from './components/SearchSection'
import PapersSection from './components/PapersSection'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { PWAInstallPrompt } from './components/PWAInstallPrompt'
import { useAuth } from './context/AuthContext'
import { LoginPage } from './components/LoginPage'
import { WhatsAppFloat } from './components/WhatsAppFloat'


export default function App() {
  const {user} = useAuth();
  if(!user){
    return (
      <>
      <LoginPage/>
      <PWAInstallPrompt/>
      </>
    )
  }
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
      <PWAInstallPrompt/>
      <WhatsAppFloat/>
    </div>
  )
}
