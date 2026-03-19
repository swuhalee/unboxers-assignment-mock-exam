interface CardProps {
    children: React.ReactNode;
    className?: string;
}

const Card = ({ children, className }: CardProps) => {
    return (
        <div className={`inline-flex bg-omr-card-bg py-4 px-6 rounded-4xl shadow-card ${className ?? ''}`}>
            {children}
        </div>
    );
};

Card.displayName = 'Card';

export default Card;
