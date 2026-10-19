import React, { useState, useEffect, useRef } from "react";
import media from "../media.json";

function FoundationVideo({ src, title, poster, onPlay }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="selected-film">
      <div className="video-wrap">
        <video
          controls
          playsInline
          preload="none"
          poster={poster}
          aria-label={title}
          onPlay={onPlay}
          onError={() => setFailed(true)}
        >
          <source src={src} type="video/mp4" onError={() => setFailed(true)} />
          Your browser does not support embedded video.
        </video>
        <div className="film-caption">
          <span>{title}</span>
        </div>
        {failed && (
          <p role="status" className="video-error">
            This browser could not play the video.
          </p>
        )}
      </div>
    </div>
  );
}

const films = [
  {
    src: "assets/foundation/foundation-film.mp4",
    poster: "assets/foundation/film-poster.jpg",
    title: "Foundation overview & care environment",
  },
  ...media.videos.map((film, index) => ({
    ...film,
    title: `Care moments & rehabilitation clip ${String(index + 1).padStart(2, "0")}`,
    poster: `assets/foundation/clip-poster-${index + 1}.jpg`,
  })),
];

function ContinuousVideoSlideshow({ onOpenVideo }) {
  const [active, setActive] = useState(0);
  const reelRef = useRef(null);

  // Keep active item scrolled into view horizontally in reel container ONLY (never scroll the main window)
  useEffect(() => {
    if (reelRef.current) {
      const activeEl = reelRef.current.children[active];
      if (activeEl) {
        const container = reelRef.current;
        const targetLeft =
          activeEl.offsetLeft - (container.clientWidth - activeEl.clientWidth) / 2;
        container.scrollTo({ left: targetLeft, behavior: "smooth" });
      }
    }
  }, [active]);

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + films.length) % films.length);
  };

  const handleNext = () => {
    setActive((prev) => (prev + 1) % films.length);
  };

  return (
    <div className="continuous-video-showcase">
      <div className="video-spotlight-head">
        <div>
          <span className="eyebrow">VIDEO SHOWCASE</span>
          <h3>Care in action</h3>
        </div>
        <div className="video-nav-controls">
          <button
            type="button"
            className="slideshow-ctrl-btn arrow-btn"
            onClick={handlePrev}
            aria-label="Previous video"
          >
            ←
          </button>
          <span className="video-counter" aria-live="polite">
            {active + 1} / {films.length}
          </span>
          <button
            type="button"
            className="slideshow-ctrl-btn arrow-btn"
            onClick={handleNext}
            aria-label="Next video"
          >
            →
          </button>
        </div>
      </div>

      <div className="video-player-spotlight">
        <FoundationVideo key={films[active].src} {...films[active]} />
        <div className="video-spotlight-info">
          <span className="video-badge">VIDEO {String(active + 1).padStart(2, "0")} OF {String(films.length).padStart(2, "0")}</span>
          <h3>{films[active].title}</h3>
          <p>
            Experience our compassionate senior living environment, daily rehabilitation routines,
            and the warm community our elders call home.
          </p>
          <div className="video-spotlight-actions">
            <button
              type="button"
              className="button green"
              onClick={() => onOpenVideo?.(films[active])}
            >
              Watch full resolution
            </button>
          </div>
        </div>
      </div>

      <div className="video-reel-label">
        <span>Continuous video reel · Click any clip to play</span>
      </div>
      <div className="video-reel-strip" ref={reelRef} role="tablist" aria-label="Select foundation video">
        {films.map((film, index) => (
          <button
            key={film.src}
            type="button"
            role="tab"
            aria-selected={active === index}
            className={`video-reel-item ${active === index ? "active" : ""}`}
            onClick={() => {
              setActive(index);
              setIsAutoPlaying(false);
            }}
          >
            <div className="video-reel-thumb">
              <img src={film.poster} alt="" width="160" height="100" loading="lazy" />
              <span className="video-reel-play-icon" aria-hidden="true">
                {active === index ? "▶" : "▷"}
              </span>
            </div>
            <span>Clip {String(index + 1).padStart(2, "0")}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function GallerySection({ onOpenImage, onOpenVideo, full = false }) {
  const [category, setCategory] = useState("all");
  const [viewMode, setViewMode] = useState("slideshow"); // 'slideshow' | 'grid'
  const [isPaused, setIsPaused] = useState(false);

  const selected = media.photos;

  const photos =
    category === "all"
      ? selected
      : selected.filter((photo) => photo.category === category);

  // Divide photos into 4 continuous rows for a full panoramic gallery wall
  const row1 = photos.filter((_, i) => i % 4 === 0);
  const row2 = photos.filter((_, i) => i % 4 === 1);
  const row3 = photos.filter((_, i) => i % 4 === 2);
  const row4 = photos.filter((_, i) => i % 4 === 3);

  const photoRows = [
    { key: "row-1", items: row1, trackClass: "continuous-track speed-1" },
    { key: "row-2", items: row2, trackClass: "continuous-track speed-2" },
    { key: "row-3", items: row3, trackClass: "continuous-track speed-3" },
    { key: "row-4", items: row4, trackClass: "continuous-track speed-4" },
  ].filter((row) => row.items.length > 0);

  return (
    <section className="section gallery real-gallery" id="foundation-gallery">
      <div className="section-head">
        <div>
          <span className="eyebrow">CARE IN FOCUS</span>
          <h2>
            A closer look at
            <br />
            <em>our care.</em>
          </h2>
        </div>
        <p>
          Continuous video &amp; image showcase from Sri Sadguru Aadhar Foundation.
        </p>
      </div>

      {/* 1. Continuous Looping Video Showcase */}
      <ContinuousVideoSlideshow onOpenVideo={onOpenVideo} />

      {/* 2. Photo Showcase Header & Controls */}
      <div className="photo-heading" id="foundation-photos">
        <div>
          <span className="eyebrow">PHOTO SLIDESHOW</span>
          <h3>Moments of comfort &amp; connection</h3>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <button
            type="button"
            className="slideshow-ctrl-btn"
            onClick={() => setIsPaused(!isPaused)}
            aria-label={isPaused ? "Play photo slideshow" : "Pause photo slideshow"}
          >
            {isPaused ? "▶ Resume motion" : "⏸ Pause motion"}
          </button>
          {!full && (
            <a className="text-link" href="gallery.html">
              View full gallery page ↗
            </a>
          )}
        </div>
      </div>

      {/* Filters on Gallery page */}
      {full && (
        <div className="slideshow-controls-bar">
          <div className="gallery-filters" role="group" aria-label="Filter foundation photos">
            {[
              ["all", "All photos"],
              ["spaces", "Our spaces"],
              ["community", "Community moments"],
            ].map(([key, label]) => (
              <button
                key={key}
                type="button"
                aria-pressed={category === key}
                onClick={() => setCategory(key)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Continuous Loop 4-Row Slideshow View */}
      {viewMode === "slideshow" ? (
        <div
          className={`continuous-slideshow-wrap ${isPaused ? "paused" : ""}`}
          aria-label="Continuous 4-row photo slideshow"
        >
          {photoRows.map((row) => (
            <div className="continuous-slider-container" key={row.key}>
              <div className={`continuous-track-wrap ${isPaused ? "paused" : ""}`}>
                <div className={row.trackClass}>
                  {row.items.map((photo, index) => (
                    <button
                      type="button"
                      className="continuous-photo-card"
                      key={`${row.key}-a-${photo.src}-${index}`}
                      onClick={() => onOpenImage({ src: photo.src, caption: photo.caption })}
                      aria-label={`View photo ${media.photos.indexOf(photo) + 1}`}
                    >
                      <img src={photo.src} width="320" height="220" loading="lazy" alt="" />
                    </button>
                  ))}
                </div>
                {/* Duplicated track for seamless infinite continuous loop */}
                <div className={row.trackClass} aria-hidden="true">
                  {row.items.map((photo, index) => (
                    <button
                      type="button"
                      tabIndex={-1}
                      className="continuous-photo-card"
                      key={`${row.key}-b-${photo.src}-${index}`}
                      onClick={() => onOpenImage({ src: photo.src, caption: photo.caption })}
                    >
                      <img src={photo.src} width="320" height="220" loading="lazy" alt="" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <p className="slideshow-hint">
            Tip: Hover over any photo to pause the continuous loop · Click to view in full resolution
          </p>
        </div>
      ) : (
        /* Grid View Alternative */
        <div className="foundation-photo-grid">
          {photos.map((photo) => (
            <button
              type="button"
              className="foundation-photo"
              key={photo.src}
              onClick={() => onOpenImage({ src: photo.src, caption: photo.caption })}
              aria-label={`View photo ${media.photos.indexOf(photo) + 1}`}
            >
              <div className="photo-frame">
                <img
                  src={photo.src}
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                  decoding="async"
                  alt=""
                />
              </div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

