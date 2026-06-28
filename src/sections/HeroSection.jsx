import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import './HeroSection.css'

const FloatingHeart = ({ style, delay }) => {
  return (
    <motion.div
      className="floating-heart"
      style={style}
      animate={{ 
        y: [-15, 15, -15],
        x: [-8, 8, -8],
        scale: [0.92, 1.08, 0.92],
        opacity: [0.3, 0.75, 0.3] 
      }}
      transition={{ 
        duration: 4.5 + Math.random() * 2.5, 
        repeat: Infinity, 
        delay: delay,
        ease: 'easeInOut' 
      }}
    >
      ♥
    </motion.div>
  )
}

const heartPool = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  delay: i * 0.2,
  style: {
    left: `${(i * 11.5) % 100}%`,
    top: `${(i * 13.7) % 85 + 8}%`,
    fontSize: `${0.5 + ((i * 0.25) % 1.1)}rem`,
    color: i % 3 === 0 ? 'var(--rose)' : i % 3 === 1 ? 'var(--blush)' : '#ffccd5',
    position: 'absolute',
    filter: i % 4 === 0 ? 'blur(1px)' : 'none',
  }
}))

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 35, stiffness: 80, mass: 0.6 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  const bgParallaxX = useTransform(smoothX, [-600, 600], [-15, 15])
  const bgParallaxY = useTransform(smoothY, [-400, 400], [-15, 15])
  const contentParallaxX = useTransform(smoothX, [-600, 600], [-6, 6])
  const contentParallaxY = useTransform(smoothY, [-400, 400], [-6, 6])
  const collageParallaxX = useTransform(smoothX, [-600, 600], [10, -10])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    
    const handleMouseMove = (e) => {
      if (window.innerWidth < 768) return // Block computation overhead on mobile
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      mouseX.set(e.clientX - centerX)
      mouseY.set(e.clientY - centerY)
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
      <motion.div 
        className="hero__parallax-bg-wrapper"
        style={!isMobile ? { x: bgParallaxX, y: bgParallaxY } : {}}
      >
        <div className="hero__sparkle-overlay" />
        <div className="hero__hearts" aria-hidden="true">
          {heartPool.map(h => <FloatingHeart key={h.id} style={h.style} delay={h.delay} />)}
        </div>
      </motion.div>

      <div className="hero__vignette" />

      <motion.div 
        className="hero__content"
        style={!isMobile ? { x: contentParallaxX, y: contentParallaxY } : {}}
      >
        <motion.div
          className="hero__eyebrow-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          <span className="hero__eyebrow-line"></span>
          <p className="hero__eyebrow">with all my heart</p>
          <span className="hero__eyebrow-line"></span>
        </motion.div>

        <div className="hero__title-mask">
          <motion.h1
            className="hero__title"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.5, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Happy Birthday
          </motion.h1>
        </div>

        <div className="hero__name-mask">
          <motion.h2
            className="hero__name"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            My Love
          </motion.h2>
        </div>

        <div className="hero__heart-pulse-box">
          <svg className="hero__heart-svg-trail" viewBox="0 0 100 100" aria-hidden="true">
            <motion.path 
              d="M 50,30 C 60,10 90,15 90,45 C 90,70 50,90 50,90 C 50,90 10,70 10,45 C 10,15 40,10 50,30 Z"
              fill="none"
              stroke="var(--rose)"
              strokeWidth="1.5"
              initial={{ strokeDasharray: '300', strokeDashoffset: '300' }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ delay: 1.2, duration: 1.5, ease: 'easeInOut' }}
            />
          </svg>
          <motion.div
            className="hero__heart-icon"
            animate={{ scale: [1, 1.2, 1.05, 1.18, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            ♥
          </motion.div>
        </div>

        <motion.p
          className="hero__subtitle"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.85, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          Every moment with you is a beautiful reminder of why I fell in love with you. You are my entire world.
        </motion.p>

        <motion.a
          href="#gallery"
          className="hero__cta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>Our Journey ↓</span>
          <div className="hero__cta-glow" />
        </motion.a>
      </motion.div>

      <motion.div
        className="hero__collage"
        style={!isMobile ? { x: collageParallaxX } : {}}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1, ease: 'easeOut' }}
      >
        <CollageStrip isMobile={isMobile} />
      </motion.div>
    </section>
  )
}

function CollageStrip({ isMobile }) {
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
          whileHover={!isMobile ? { 
            y: -20, 
            scale: 1.06, 
            zIndex: 10,
            boxShadow: '0 15px 30px rgba(0,0,0,0.5), 0 0 15px rgba(230, 92, 123, 0.25)'
          } : {}}
          whileTap={isMobile ? {
            scale: 1.12,
            y: -10,
            zIndex: 12
          } : {}}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          <div className="collage-strip__glass-glint" />
          <img src={src} alt={`Memory ${i + 1}`} loading="eager" draggable={false} />
        </motion.div>
      ))}
    </div>
  )
}