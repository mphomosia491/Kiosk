import "./hero-section.css";

function HeroSection() {
    return (
        <section className="hero">
            <div className="hero-content">

                <span className="hero-label">
                    PREMIUM COLLECTION
                </span>

                <h1>
                    Discover Your 
                    Signature Fragrance
                </h1>

                <p>
                    Explore an exclusive collection of luxury fragrances
                    crafted by the world's most prestigious perfume houses.
                </p>

                 <button className="hero-button">
                    Shop Collection
                    <span>→</span>
                </button>

                <div className="hero-brands">

                    <span>DIOR</span>

                    <span>CHANEL</span>

                    <span>YSL</span>

                    <span>VERSACE</span>

                    <span>ARMANI</span>

                </div>

            </div>

            <div className="hero-image">

                <img
                    src="/hero-bottle.png"
                    alt="Luxury Fragrance"
                />

            </div>

        </section>
    );
}

export default HeroSection;