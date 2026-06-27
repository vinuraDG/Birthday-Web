import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import './HeroSection.css'

// Upgraded Floating Heart with unique drifting vectors and staggered pulses
const FloatingHeart = ({ style, delay }) => {
  return (
    <motion.div
      className="floating-heart"
      style={style}
      animate={{ 
        y: [-20, 20, -20],
        x: [-10, 10, -10],
        scale: [0.9, 1.1, 0.9],
        opacity: [0.3, 0.8, 0.3] 
      }}
      transition={{ 
        duration: 4 + Math.random() * 3, 
        repeat: Infinity, 
        delay: delay,
        ease: 'easeInOut' 
      }}
    >
      ♥
    </motion.div>
  )
}

// Statically defined variant metrics for deep visual layers
const heartPool = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  delay: i * 0.15,
  style: {
    left: `${(i * 7.7) % 100}%`,
    top: `${(i * 11.3) % 90 + 5}%`,
    fontSize: `${0.5 + ((i * 0.35) % 1.5)}rem`,
    color: i % 4 === 0 ? 'var(--rose)' : i % 4 === 1 ? 'var(--blush)' : i % 4 === 2 ? 'var(--gold)' : '#ffccd5',
    position: 'absolute',
    filter: i % 5 === 0 ? 'blur(1px)' : 'none', // Simulated depth-of-field
  }
}))

export default function HeroSection() {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)

  // Motion coordinates for premium interactive parallax depth
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth out coordinate tracking
  const springConfig = { damping: 30, stiffness: 90, mass: 0.5 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  // Map values onto discrete layer velocities
  const bgParallaxX = useTransform(smoothX, [-600, 600], [-25, 25])
  const bgParallaxY = useTransform(smoothY, [-400, 400], [-25, 25])
  const contentParallaxX = useTransform(smoothX, [-600, 600], [-8, 8])
  const contentParallaxY = useTransform(smoothY, [-400, 400], [-8, 8])
  const collageParallaxX = useTransform(smoothX, [-600, 600], [15, -15])

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    const handleMouseMove = (e) => {
      // Calculate offset from layout midpoint
      const { clientX, clientY } = e
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      mouseX.set(clientX - centerX)
      mouseY.set(clientY - centerY)
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [mouseX, mouseY])

  return (
    <section className="hero">
      
      {/* Parallax Background Canvas */}
      <motion.div 
        className="hero__parallax-bg-wrapper"
        style={{ x: bgParallaxX, y: bgParallaxY }}
      >
        <div className="hero__sparkle-overlay" />
        <div className="hero__hearts" aria-hidden="true">
          {heartPool.map(h => <FloatingHeart key={h.id} style={h.style} delay={h.delay} />)}
        </div>
      </motion.div>

      <div className="hero__vignette" />

      {/* Main Interactive Typography Block */}
      <motion.div 
        className="hero__content"
        style={{ x: contentParallaxX, y: contentParallaxY }}
      >
        <motion.div
          className="hero__eyebrow-container"
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          animate={{ opacity: 0.8, letterSpacing: windowWidth > 768 ? '0.35em' : '0.2em' }}
          transition={{ delay: 0.2, duration: 1.5, ease: 'easeOut' }}
        >
          <span className="hero__eyebrow-line"></span>
          <p className="hero__eyebrow">with all my heart</p>
          <span className="hero__eyebrow-line"></span>
        </motion.div>

        {/* Elegant layered mask split-text animation */}
        <div className="hero__title-mask">
          <motion.h1
            className="hero__title"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.6, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            Happy Birthday
          </motion.h1>
        </div>

        <div className="hero__name-mask">
          <motion.h2
            className="hero__name"
            initial={{ y: '100%', rotate: 2 }}
            animate={{ y: 0, rotate: 0 }}
            transition={{ delay: 1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            My Love
          </motion.h2>
        </div>

        {/* Dual Cinematic Heartbeat Indicator */}
        <div className="hero__heart-pulse-box">
          <svg className="hero__heart-svg-trail" viewBox="0 0 100 100" aria-hidden="true">
            <motion.path 
              d="M 50,30 C 60,10 90,15 90,45 C 90,70 50,90 50,90 C 50,90 10,70 10,45 C 10,15 40,10 50,30 Z"
              fill="none"
              stroke="var(--rose)"
              strokeWidth="1.5"
              initial={{ strokeDasharray: '300', strokeDashoffset: '300' }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ delay: 1.4, duration: 2, ease: 'easeInOut' }}
            />
          </svg>
          <motion.div
            className="hero__heart-icon"
            animate={{ 
              scale: [1, 1.25, 1.05, 1.2, 1],
              textShadow: [
                '0 0 15px rgba(230, 92, 123, 0.6)',
                '0 0 35px rgba(230, 92, 123, 1)',
                '0 0 20px rgba(230, 92, 123, 0.7)'
              ]
            }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            ♥
          </motion.div>
        </div>

        <motion.p
          className="hero__subtitle"
          initial={{ opacity: 0, filter: 'blur(4px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ delay: 1.6, duration: 1.2 }}
        >
          Every moment with you is a beautiful reminder of why I fell in love with you. You are my entire world.
        </motion.p>

        <motion.a
          href="#gallery"
          className="hero__cta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(230, 92, 123, 0.4)' }}
          whileTap={{ scale: 0.98 }}
        >
          <span>Our Journey ↓</span>
          <div className="hero__cta-glow" />
        </motion.a>
      </motion.div>

      {/* Layered Foreground Collage Strip */}
      <motion.div
        className="hero__collage"
        style={{ x: collageParallaxX }}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.4, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <CollageStrip />
      </motion.div>

    </section>
  )
}

function CollageStrip() {
  const photos = [
    new URL('../assets/photos/IMG_7114.jpg', import.meta.url).href,
    new URL('../assets/photos/IMG_7121.jpg', import.meta.url).href,
    new URL('../assets/photos/IMG_4685.jpg', import.meta.url).href,
    new URL('../assets/photos/IMG_7562.jpg', import.meta.url).href,
    new URL('../assets/photos/IMG_8075.jpg', import.meta.url).href,
  ]

  return (
    <div className="collage-strip">
      {photos.map((src, i) => (
        <motion.div 
          key={i} 
          className={`collage-strip__item collage-strip__item--${i}`}
          whileHover={{ 
            y: -25, 
            scale: 1.08, 
            zIndex: 10,
            boxShadow: '0 20px 40px rgba(0,0,0,0.6), 0 0 20px rgba(230, 92, 123, 0.3)'
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        >
          <div className="collage-strip__glass-glint" />
          <img src={src} alt={`Memory ${i + 1}`} loading="eager" draggable={false} />
        </motion.div>
      ))}
    </div>
  )
}