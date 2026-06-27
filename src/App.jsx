import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './index.css'
import EntryPage from './sections/EntryPage'
import HeroSection from './sections/HeroSection'
import GallerySection from './sections/GallerySection'
import LoveLetterSection from './sections/LoveLetterSection'
import OutroSection from './sections/OutroSection'

function App() {
  const [hasEntered, setHasEntered] = useState(false)

  return (
    <div className="app">
      {/* The entry gate handles its own inner door animations first */}
      <EntryPage onEnter={() => setHasEntered(true)} />

      {/* The main website is revealed seamlessly once hasEntered triggers */}
      <AnimatePresence>
        {hasEntered && (
          <motion.main
            className="main-site-content"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          >
            <HeroSection />
            <GallerySection />
            <LoveLetterSection />
            <OutroSection />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App