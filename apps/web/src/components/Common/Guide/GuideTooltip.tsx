import { motion } from 'framer-motion';
import arrowIcon from '@/assets/top_arrow.svg';

interface GuideTooltipProps {
    message?: string;
}

const GuideTooltip = ({ message = "다음으로 넘어가려면 직접 해보세요" }: GuideTooltipProps) => {
    return (
        <div className="flex flex-col items-center gap-1">
            <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="text-black"
            >
                <img src={arrowIcon} alt="" aria-hidden="true" />
            </motion.div>

            {/* 텍스트 영역 */}
            <span className="text-[19px] font-bold text-black tracking-tight">
                {message}
            </span>
        </div>
    );
}

export default GuideTooltip
