import { type ReactNode } from 'react';

type ActiveButtonVariant = 'dark' | 'blue';

interface ActiveButtonProps {
    children: ReactNode;
    isActive: boolean;
    variant?: ActiveButtonVariant;
    className?: string;
    onClick?: () => void;
}

const ACTIVE_GRADIENT: Record<ActiveButtonVariant, string> = {
    dark: 'bg-gradient-to-r from-text-sub via-text-sub to-gradient-dark-end',
    blue: 'bg-gradient-to-r from-omr-num to-omr-border',
};

const ActiveButton = ({ children, isActive, variant = 'dark', className = '', onClick }: ActiveButtonProps) => (
    <button
        type="button"
        onClick={onClick}
        disabled={!isActive}
        className={`flex items-center justify-center px-2 py-4 rounded-xl shadow-button transition-colors ${
            isActive ? `${ACTIVE_GRADIENT[variant]} text-button-text-active` : 'bg-button-bg text-button-text-inactive'
        } ${className}`}
    >
        {children}
    </button>
);

export default ActiveButton;
