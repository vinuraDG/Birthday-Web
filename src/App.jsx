import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './index.css'
import EntryPage from './sections/EntryPage'
import HeroSection from './sections/HeroSection'
import GallerySection from './sections/GallerySection'
import LoveLetterSection from './sections/LoveLetterSection'
import OutroSection from './sections/OutroSection'

// Import audio files directly as modules
import introTrackFile from './assets/intro_romantic.mp3'
import mainTrackFile from './assets/main_romantic.mp3'

function App() {
  const [hasEntered, setHasEntered] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  // Keep audio references empty initially
  const introAudioRef = useRef(null)
  const mainAudioRef = useRef(null)

  const startMusicOrchestration = () => {
    // 1. Initialize the audio objects EXACTLY here so the browser links it directly to the user's click
    if (!introAudioRef.current) {
      introAudioRef.current = new Audio(introTrackFile)
      introAudioRef.current.loop = true
    }
    if (!mainAudioRef.current) {
      mainAudioRef.current = new Audio(mainTrackFile)
      mainAudioRef.current.loop = true
    }

    const intro = introAudioRef.current
    const main = mainAudioRef.current

    // 2. Set the state to reveal the main content layout
    setHasEntered(true)

    // 3. Play the intro music immediately
    intro.volume = 0.5
    intro.play()
      .then(() => console.log("Intro music playing successfully!"))
      .catch((err) => console.error("Intro playback failed:", err))

    // 4. Start main music quietly and handle the cross-fade transition
    main.volume = 0
    main.play()
      .then(() => {
        // Smoothly fade out intro and fade in main over 1.5 seconds
        let fadeInterval = setInterval(() => {
          if (intro.volume > 0.05) {
            intro.volume -= 0.05
            if (main.volume < 0.45) {
              main.volume += 0.05
            }
          } else {
            clearInterval(fadeInterval)
            intro.pause()
            main.volume = 0.5 // Lock main song to a comfortable level
          }
        }, 100)
      })
      .catch((err) => console.error("Main playback failed:", err))
  }

  // Audio utility toggle control
  const toggleMute = () => {
    const mainTrack = mainAudioRef.current
    const introTrack = introAudioRef.current
    
    if (mainTrack || introTrack) {
      const nextMuteState = !isMuted
      setIsMuted(nextMuteState)
      
      if (mainTrack) mainTrack.muted = nextMuteState
      if (introTrack) introTrack.muted = nextMuteState
    }
  }

  return (
    <div className="app">
      {/* The entry gate receives the new orchestrated startup player method */}
      <EntryPage onEnter={startMusicOrchestration} />

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

            {/* Mute Controller utility button overlayed on the main content layouts */}
            <button 
              onClick={toggleMute} 
              className="music-toggle-btn"
              style={{
                position: 'fixed',
                bottom: '24px',
                right: '24px',
                zIndex: 9999,
                background: 'var(--dark, #2D1420)',
                color: 'var(--cream, #FDF6F0)',
                border: '1px solid var(--rose, #C8516B)',
                padding: '10px 16px',
                borderRadius: '30px',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
              }}
            >
              {isMuted ? '🔇 Unmute Music' : '🔊 Mute Music'}
            </button>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App