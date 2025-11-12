import React from "react";
import Books from "../assets/Bookshelves Illustration.svg";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <section id="landing">
      <header className="hero">
        <div className="hero__glow" aria-hidden />
        <div className="hero__texture" aria-hidden />
        <div className="hero__container">
          <div className="hero__content">
            <p className="eyebrow">Welcome to Library</p>
            <h1>
              Ghana&apos;s most awarded online{" "}
              <span className="hero__highlight">library platform</span>
            </h1>
            <p className="hero__subtitle">
              Discover curated collections, trending recommendations, and
              timeless classics. Build a reading habit that sticks with
              immersive guidance and community insights.
            </p>
            <div className="hero__actions">
              <Link to="/books">
                <button className="btn btn--glow">Browse Books</button>
              </Link>
              <Link to="/books">
                <button className="btn btn--ghost">Explore Collections</button>
              </Link>
            </div>
            {/* <div className="hero__meta">
              <div className="hero__stat">

                <span className="hero__stat--label">Reliable services</span>
              </div>
              <div className="hero__stat">

                <span className="hero__stat--label">Weekly Updates</span>
              </div>
              <div className="hero__stat">

                <span className="hero__stat--label">Community ratings</span>
              </div>
            </div> */}
          </div>
          <figure className="hero__visual">
            <div className="hero__visual-card hero__visual-card--primary">
              <img src={Books} alt="Floating books" />
            </div>
            <div className="hero__visual-card hero__visual-card--secondary">
              <p>"This library keeps me inspired every week."</p>
              <span>- Ama, Product Designer</span>
            </div>
          </figure>
        </div>
      </header>
    </section>
  );
};

export default Landing;
