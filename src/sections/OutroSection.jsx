import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './OutroSection.css'

const confettiColors = ['#C8516B', '#F4C6D0', '#D9A94E', '#FFF8F0']

function ConfettiPiece({ id }) {
  const left = Math.random() * 100
  const size = 6 + Math.random() * 8
  const color = confettiColors[Math.floor(Math.random() * confettiColors.length)]
  const duration = 4 + Math.random() * 4
  const delay = Math.random() * 5
  const isCircle = Math.random() > 0.5
  const rotateStart = Math.random() * 360

  return (
    <motion.div
      className="confetti-piece"
      style={{
        left: `${left}%`,
        width: size,
        height: size * (isCircle ? 1 : 1.6),
        background: color,
        borderRadius: isCircle ? '50%' : '2px',
      }}
      initial={{ y: -40, opacity: 0, rotate: rotateStart }}
      animate={{
        y: '110vh',
        opacity: [0, 1, 1, 0.8, 0],
        rotate: rotateStart + 360,
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  )
}

export default function OutroSection() {
  const [confetti, setConfetti] = useState([])

  useEffect(() => {
    setConfetti(Array.from({ length: 45 }, (_, i) => i))
  }, [])

  return (
    <section className="outro">
      <div className="outro__confetti" aria-hidden>
        {confetti.map(id => <ConfettiPiece key={id} id={id} />)}
      </div>

      <div className="outro__content">
        <motion.div
          className="outro__heart"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{
            opacity: { duration: 0.6 },
            scale: { duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 },
          }}
        >
          ♥
        </motion.div>

        <motion.h2
          className="outro__title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          Happy Birthday
        </motion.h2>

        <motion.h3
          className="outro__name"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, delay: 0.4 }}
        >
          My Love
        </motion.h3>

        <motion.p
          className="outro__message"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          Here's to celebrating you today — and to every day after, for as long as we get to write this story together.
        </motion.p>

        <motion.p
          className="outro__signature"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, delay: 1 }}
        >
          With all my heart, always.
        </motion.p>
      </div>
    </section>
  )
}