import { motion } from 'framer-motion'

interface PageFadeInProps {
  children: React.ReactNode
}

export default function PageFadeIn({ children }: PageFadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  )
}
