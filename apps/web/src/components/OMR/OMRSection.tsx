import { type ReactNode } from 'react';

interface OMRSectionProps {
    title: string;
    children: ReactNode;
    className?: string;
    headerClassName?: string;
}

const OMRSection = ({ title, children, className = '', headerClassName = '' }: OMRSectionProps) => (
    <div className={`inline-flex flex-col border-[1.5px] border-omr-border ${className}`}>
        <div className={`flex items-center justify-center h-10 border-b-[1.5px] border-omr-border font-semibold text-omr-num ${headerClassName}`}>
            {title}
        </div>
        {children}
    </div>
);

export default OMRSection;
