import "./section-heading.css";

function SectionHeading ({ label, title, subtitle }) {
    return (
        <section className="section-heading">
            {label && (
                <span className="section-label">
                    {label}
                </span>
            )}

            <h2>{title}</h2>

            {subtitle && (
                <p>{subtitle}</p>
            )}

            <div className="section-divider"></div>
        </section>
    );
}

export default SectionHeading;