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
        <img src="assets/care-brochure.png" alt="Foundation care brochure" />
        <img
          src="assets/services-brochure.png"
          alt="Foundation service brochure"
        />
      </section>
    </main>
  );
}
