import "./luxury-button.css";

function LuxuryButton ({
    children,
    variant = "primary",
    onClick,
    type = "button",
    disabled = false,
}){
    return (
        <button 
            className={`luxury-button ${variant}`}
            onClick={onClick}
            type={type}
            disabled={disabled}
            >
            {children}
        </button>
    );
}

export default LuxuryButton;