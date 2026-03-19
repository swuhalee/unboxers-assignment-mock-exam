import { memo, type ReactNode } from 'react';

interface StaticButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

// Keypad에서 handleDelete(useCallback)로 전달될 때 리렌더 방지
const StaticButton = memo(({ children, className = '', onClick }: StaticButtonProps) => (
    <button
        type="button"
        onClick={onClick}
        className={`flex items-center justify-center px-2 py-4 rounded-xl bg-button-bg shadow-button ${className}`}
    >
        {children}
    </button>
));

export default StaticButton;
