import { motion } from 'framer-motion'
import './LoveLetterSection.css'

const paragraphs = [
  "My Love,",
  "From the very first moment, I knew something in my life had quietly shifted — like a door I didn't know existed had opened, and you were standing right there on the other side of it.",
  "Every laugh we've shared, every quiet evening, every silly little memory tucked away in a photo — they've all become pieces of something bigger. A story that's ours, and ours alone.",
  "You make ordinary days feel like something worth remembering. And on a day that celebrates you, I just want you to know how deeply, completely loved you are.",
  "Here's to many more memories, many more laughs, and many more years of writing this story together.",
  "Happy Birthday, my love. — Yours, always."
]

export default function LoveLetterSection() {
  return (
    <section className="letter">
      <div className="letter__bg-heart">♥</div>

      <motion.div
        className="letter__card"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9 }}
      >
        <p className="letter__eyebrow">— a little something for you —</p>

        <div className="letter__body">
          {paragraphs.map((text, i) => (
            <motion.p
              key={i}
              className={i === 0 ? 'letter__greeting' : i === paragraphs.length - 1 ? 'letter__signoff' : 'letter__paragraph'}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
            >
              {text}
            </motion.p>
          ))}
        </div>

        <motion.div
          className="letter__seal"
          initial={{ opacity: 0, scale: 0.6, rotate: -15 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: paragraphs.length * 0.15 }}
        >
          ♥
        </motion.div>
      </motion.div>
    </section>
  )
}