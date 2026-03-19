import { motion } from 'framer-motion'

export default function ScanOverlay() {
  return (
    <div className="absolute inset-0 z-10 overflow-hidden rounded-4xl">
      <motion.div
        className="absolute top-0 bottom-0 w-50 bg-white"
        style={{ filter: 'blur(30px)' }}
        animate={{ left: ['0%', '100%', '0%'] }}
        transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
      />
    </div>
  )
}
