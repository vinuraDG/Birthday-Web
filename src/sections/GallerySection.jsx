import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import './GallerySection.css'

const photoFiles = [
  '1782575182800_0c362404-78ee-48ea-8580-6c7cf84ea833.jpg',
  '1782575182803_1bcce4d9-5978-4973-98d2-ab8f27e84486.jpg',
  '1782575182803_01e364e9-0512-470f-9802-4c2b5852eef2.jpg',
  '1782575182804_624e1ef0-f755-4e74-b188-7f876e7903b7.jpg',
  '1782575182804_5964ec70-c693-4ec5-8108-e52cc2b103d5.jpg',
  '1782575182805_79816e1a-e48d-46d8-8b28-090377f5e449.jpg',
  '1782575182805_17884811-8202-4dca-87fa-2f620bbafacb.JPG',
  '1782575182806_IMG_0177.jpg',
  '1782575182806_IMG_0178.jpg',
  '1782575182807_IMG_0179.jpg',
  '1782575182807_IMG_0219.jpg',
  '1782575182807_IMG_0227.jpg',
  '1782575182807_IMG_0228.jpg',
  '1782575182807_IMG_0233.jpg',
  '1782575182808_IMG_0335.jpg',
  '1782575182808_IMG_0337.jpg',
  '1782575182808_IMG_0339.jpg',
  '1782575182808_IMG_0499.jpg',
  '1782575182808_IMG_0503.jpg',
  '1782575182809_IMG_0588.jpg',
  'IMG_3529.jpg',
  'IMG_4663.jpg',
  'IMG_4685.jpg',
  'IMG_6051.jpg',
  'IMG_7106.jpg',
  'IMG_7109.jpg',
  'IMG_7112.jpg',
  'IMG_7114.jpg',
  'IMG_7121.jpg',
  'IMG_7298.jpg',
  'IMG_7562.jpg',
  'IMG_8075.jpg',
  'IMG_9410.JPG'
]

const totalPhotos = photoFiles.length

const photos = photoFiles.map((file, i) => {
  // 1. Shift the mathematical starting point to the top cleft instead of the bottom point
  const t = (i / totalPhotos) * 2 * Math.PI + Math.PI; 
  
  // 2. Refined parametric heart equations
  const x = 16 * Math.pow(Math.sin(t), 3)
  const y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t)
  
  // 3. Perfect aspect mapping scale
  const left = 50 + x * 2.35
  const top = 48 - y * 2.15 

  const tilts = [-4, 3, -2, 5, -3, 2, -5, 4, -1, 3]
  const tilt = tilts[i % tilts.length]

  // 4. FIX: Symmetrical Stacking Flow
  // This shifts the highest z-index to the top lobes, cascading down sequentially 
  // on both sides so they overlap beautifully down to the bottom point.
  const distanceFromTop = Math.abs(i - Math.floor(totalPhotos / 2))
  const baseZIndex = Math.floor(totalPhotos - distanceFromTop)

  return {
    id: i,
    src: new URL(`../assets/photos/${file}`, import.meta.url).href,
    style: {
      left: `${left}%`,
      top: `${top}%`,
      '--rot': `${tilt}deg`,
      zIndex: baseZIndex 
    },
    tilt
  }
})

function FloatingHearts() {
  const items = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    char: ['♥', '♡', '❤', '♥'][i % 4],
    left: `${5 + (i * 6.8) % 90}%`,
    delay: `${(i * 0.45) % 7}s`,
    duration: `${9 + (i * 0.7) % 6}s`,
    size: `${0.6 + (i * 0.08) % 0.65}rem`,
  }))
  return (
    <div className="gallery__hearts-bg" aria-hidden="true">
      {items.map(h => (
        <span key={h.id} className="gallery__fheart" style={{
          left: h.left, animationDelay: h.delay,
          animationDuration: h.duration, fontSize: h.size,
        }}>{h.char}</span>
      ))}
    </div>
  )
}

export default function GallerySection() {
  const containerRef = useRef(null)
  
  const glowX = useMotionValue(0)
  const glowY = useMotionValue(0)
  const springX = useSpring(glowX, { stiffness: 120, damping: 25 })
  const springY = useSpring(glowY, { stiffness: 120, damping: 25 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      glowX.set(e.clientX - rect.left)
      glowY.set(e.clientY - rect.top)
    }

    container.addEventListener('mousemove', handleMouseMove)
    return () => container.removeEventListener('mousemove', handleMouseMove)
  }, [glowX, glowY])

  return (
    <section className="gallery" id="gallery" ref={containerRef}>
      <FloatingHearts />
      <div className="gallery__ambient-aurora" />

      <motion.div 
        className="gallery__cursor-glow" 
        style={{ left: springX, top: springY }}
      />

      <motion.div
        className="gallery__header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="gallery__eyebrow-wrapper">
          <span className="gallery__eyebrow-dot"></span>
          <p className="gallery__eyebrow">our story in pictures</p>
          <span className="gallery__eyebrow-dot"></span>
        </div>
        <h2 className="gallery__title">Memories We've Made</h2>
      </motion.div>

      <div className="gallery__heart-container">
        <svg className="gallery__heart-blueprint-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <motion.path
            d="M 50,29 C 59,10 88,14 88,43 C 88,67 50,88 50,88 C 50,88 12,67 12,43 C 12,14 41,10 50,29 Z"
            fill="none"
            stroke="rgba(230, 92, 123, 0.18)"
            strokeWidth="0.5"
            strokeDasharray="4 3"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.2, ease: 'easeInOut' }}
          />
        </svg>

        <div className="gallery__heart-glow" />
        
        {photos.map((photo, i) => (
          <motion.div
            key={photo.id}
            className="gallery__card"
            style={photo.style}
            initial={{ opacity: 0, scale: 0.3, rotate: photo.tilt - 15 }}
            whileInView={{ opacity: 1, scale: 1, rotate: photo.tilt }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.85,
              delay: i * 0.035,
              ease: [0.34, 1.6, 0.64, 1]
            }}
            whileHover={{ 
              scale: 1.85, 
              rotate: 0,
              zIndex: 999, 
              transition: { duration: 0.25, ease: 'easeOut' }
            }}
          >
            <div className="gallery__card-inner">
              <div className="gallery__card-glare" />
              <div className="gallery__photo-frame">
                <img
                  src={photo.src}
                  alt={`Memory ${i + 1}`}
                  loading="lazy"
                  draggable={false}
                />
              </div>
              <div className="gallery__card-footer">
                <span className="gallery__card-index">{String(i + 1).padStart(2, '0')}</span>
                <span className="gallery__card-heart">♥</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        className="gallery__hint"
        initial={{ opacity: 0, letterSpacing: '0.1em' }}
        whileInView={{ opacity: 0.5, letterSpacing: '0.3em' }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 1.2 }}
      >
        every frame, a feeling
      </motion.p>
    </section>
  )
}