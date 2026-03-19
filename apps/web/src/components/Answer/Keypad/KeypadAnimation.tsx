import { AnimatePresence, motion } from 'framer-motion';

interface KeypadAnimationProps {
    show: boolean;
    children: React.ReactNode;
}

const KeypadAnimation = ({ show, children }: KeypadAnimationProps) => (
    <AnimatePresence>
        {show && (
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: 256 }}
                exit={{ width: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                style={{ overflow: 'hidden' }}
                className='ml-3'
            >
                {children}
            </motion.div>
        )}
    </AnimatePresence>
);

export default KeypadAnimation;
