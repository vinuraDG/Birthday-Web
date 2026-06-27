import { useState } from 'react'
import { motion } from 'framer-motion'
import './EntryPage.css'

export default function EntryPage({ onEnter }) {
  const [isOpening, setIsOpening] = useState(false)
  const [shouldRender, setShouldRender] = useState(true)

  const handleOpen = () => {
    setIsOpening(true)
    
    // 1. Let the main web content mount halfway through the swing
    setTimeout(() => {
      onEnter()
    }, 600)

    // 2. Completely remove the door overlays from DOM after the swing finishes
    setTimeout(() => {
      setShouldRender(false)
    }, 1500)
  }

  if (!shouldRender) return null

  return (
    <div className={`gate-wrapper ${isOpening ? 'is-open' : ''}`}>
      
      {/* Left Door Panel */}
      <motion.div 
        className="gate-door gate-door--left"
        initial={{ x: 0 }}
        animate={isOpening ? { x: '-100%', rotateY: -45, opacity: 0 } : {}}
        transition={{ duration: 1.4, ease: [0.77, 0, 0.175, 1] }}
      >
        <div className="gate-door__inner">
          <div className="gate-door__pattern" />
        </div>
      </motion.div>

      {/* Right Door Panel */}
      <motion.div 
        className="gate-door gate-door--right"
        initial={{ x: 0 }}
        animate={isOpening ? { x: '100%', rotateY: 45, opacity: 0 } : {}}
        transition={{ duration: 1.4, ease: [0.77, 0, 0.175, 1] }}
      >
        <div className="gate-door__inner">
          <div className="gate-door__pattern" />
        </div>
      </motion.div>

      {/* Floating Center Lock & Interface */}
      <div className="gate-interface">
        <motion.div 
          className="gate-lock-container"
          animate={isOpening ? { scale: 0, opacity: 0, filter: 'blur(10px)' } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeIn' }}
        >
          <div className="gate-lock__glow" />
          
          <motion.div 
            className="gate-lock__content"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpen}
          >
            <div className="gate-lock__v-line" />
            <div className="gate-lock__monogram">♥</div>
            <div className="gate-lock__label">Enter Our World</div>
            <div className="gate-lock__v-line" />
          </motion.div>
        </motion.div>

        <motion.div 
          className="gate-intro-text"
          animate={isOpening ? { y: -30, opacity: 0 } : { y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="gate-heading">A Private Invitation</h2>
          <p className="gate-subheading">Click the seal to reveal our memories</p>
        </motion.div>
      </div>
    </div>
  )
}