import React from "react";
import GallerySection from "../components/GallerySection";
export default function GalleryPage({ onOpenImage, onOpenVideo }) {
  return (
    <main id="main">
      <section className="page-intro">
        <span className="eyebrow">OUR GALLERY</span>
        <h1>
          A picture of
          <br />
          <em>compassion.</em>
        </h1>
        <p>
          Explore care imagery and brochures shared on the foundation’s
          existing website.
        </p>
      </section>
      <GallerySection onOpenImage={onOpenImage} onOpenVideo={onOpenVideo} full />
      <section className="section brochure">
        <img src="assets/care-brochure.png" width="595" height="842" alt="Foundation care brochure" loading="lazy" decoding="async" />
        <img
          src="assets/services-brochure.png"
          width="595"
          height="842"
          alt="Foundation service brochure"
          loading="lazy"
          decoding="async"
        />
      </section>
    </main>
  );
}
