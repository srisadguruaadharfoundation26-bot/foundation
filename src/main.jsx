import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import media from "./media.json";
import "./style.css";
import "./refinements.css";

const links = [
  ["index.html", "Home"],
  ["about.html", "About us"],
  ["services.html", "Our services"],
  ["gallery.html", "Gallery"],
  ["contact.html", "Contact us"],
];
const pages = {
  index: lazy(() => import("./pages/HomePage")),
  about: lazy(() => import("./pages/AboutPage")),
  services: lazy(() => import("./pages/ServicesPage")),
  gallery: lazy(() => import("./pages/GalleryPage")),
  contact: lazy(() => import("./pages/ContactPage")),
};
const requestedPage =
  location.pathname
    .split("/")
    .filter(Boolean)
    .at(-1)
    ?.replace(/\.html$/, "") || "index";
const pageName = Object.hasOwn(pages, requestedPage) ? requestedPage : "index";
const CurrentPage = pages[pageName];
const scrollBehavior = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";

function PageContent(props) {
  useEffect(() => {
    // Run after the lazy page commits, so cross-page donation/gallery anchors exist.
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: "instant", block: "start" });
  }, []);
  return <CurrentPage {...props} />;
}

function Brand() {
  function handleClick(e) {
    if (pageName === "index") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: scrollBehavior() });
      if (location.hash) {
        history.replaceState(null, "", "index.html");
      }
    }
  }
  return (
    <a className="brand" href="index.html" onClick={handleClick}>
      <img src="assets/logo.png" alt="Sri Sadguru logo" width="57" height="57" />
      <span>
        Sri Sadguru<small>AADHAR FOUNDATION</small>
      </span>
    </a>
  );
}

function NavigationLinks() {
  return links.map(([href, label]) => {
    const linkPage = href.replace(".html", "");
    const isCurrent = linkPage === pageName;
    return (
      <a
        href={href}
        key={href}
        aria-current={isCurrent ? "page" : undefined}
        onClick={(e) => {
          if (isCurrent) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: scrollBehavior() });
            if (location.hash) {
              history.replaceState(null, "", href);
            }
          }
        }}
      >
        {label}
      </a>
    );
  });
}

const foundationFilms = [
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

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalItem, setModalItem] = useState(null); // { type: 'image' | 'video', src, caption/title, poster }
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const dialog = useRef(null);
  const menuButton = useRef(null);
  const headerRef = useRef(null);
  const lastMediaTrigger = useRef(null);

  const photoIndex =
    modalItem && modalItem.type === "image"
      ? media.photos.findIndex((photo) => photo.src === modalItem.src)
      : -1;

  const videoIndex =
    modalItem && modalItem.type === "video"
      ? foundationFilms.findIndex((film) => film.src === modalItem.src)
      : -1;

  useEffect(() => {
    let frame;
    const handleScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 20);
        setShowScrollTop(y > 350);
        frame = undefined;
      });
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => { window.removeEventListener("scroll", handleScroll); cancelAnimationFrame(frame); };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: scrollBehavior() });
  };

  useEffect(() => {
    // If there is an explicit hash on load/hashchange, scroll to that section.
    const scrollToFragment = () => {
      let id;
      try {
        id = decodeURIComponent(location.hash.slice(1));
      } catch {
        return;
      }
      if (id) {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "instant", block: "start" });
        }
      }
    };
    // Initial scrolling happens in PageContent after its lazy page has mounted.
    window.addEventListener("hashchange", scrollToFragment);
    return () => {
      window.removeEventListener("hashchange", scrollToFragment);
    };
  }, []);

  // Global smooth scrolling for all in-page hash anchor links
  useEffect(() => {
    function handleAnchorClick(event) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest("a");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
      const href = link.getAttribute("href");
      if (!href) return;

      const url = new URL(href, location.href);
      const normalize = (path) => path.replace(/index\.html$/, "");
      if (url.origin !== location.origin || normalize(url.pathname) !== normalize(location.pathname) || url.search !== location.search) return;
      let targetId;
      try { targetId = decodeURIComponent(url.hash.slice(1)); } catch { return; }

      if (targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          event.preventDefault();
          targetElement.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
          history.pushState(null, "", `#${targetId}`);
          setMenuOpen(false);
        }
      }
    }
    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  // Close mobile navigation menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    function handleOutsideClick(event) {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [menuOpen]);

  function changePhoto(direction) {
    if (!modalItem || modalItem.type !== "image") return;
    const idx = media.photos.findIndex((photo) => photo.src === modalItem.src);
    if (idx < 0) return;
    const next =
      media.photos[
        (idx + direction + media.photos.length) % media.photos.length
      ];
    setModalItem({ type: "image", src: next.src, caption: next.caption });
  }

  function changeVideo(direction) {
    if (!modalItem || modalItem.type !== "video") return;
    const idx = foundationFilms.findIndex((film) => film.src === modalItem.src);
    if (idx < 0) return;
    const next =
      foundationFilms[
        (idx + direction + foundationFilms.length) % foundationFilms.length
      ];
    setModalItem({
      type: "video",
      src: next.src,
      title: next.title,
      poster: next.poster,
    });
  }

  useEffect(() => {
    if (!modalItem) return;
    const navigate = (event) => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        const dir = event.key === "ArrowRight" ? 1 : -1;
        if (modalItem.type === "image") changePhoto(dir);
        else if (modalItem.type === "video") changeVideo(dir);
      }
    };
    document.addEventListener("keydown", navigate);
    return () => document.removeEventListener("keydown", navigate);
  }, [modalItem]);

  useEffect(() => {
    function closeMenu(event) {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    }
    document.addEventListener("keydown", closeMenu);
    return () => document.removeEventListener("keydown", closeMenu);
  }, [menuOpen]);

  useEffect(() => {
    if (modalItem) {
      if (!dialog.current.open) dialog.current.showModal();
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [modalItem]);

  function openImage(nextImage) {
    lastMediaTrigger.current = document.activeElement;
    setModalItem({ type: "image", src: nextImage.src, caption: nextImage.caption });
  }

  function openVideo(nextVideo) {
    document.querySelectorAll("video").forEach((video) => video.pause());
    lastMediaTrigger.current = document.activeElement;
    setModalItem({
      type: "video",
      src: nextVideo.src,
      title: nextVideo.title,
      poster: nextVideo.poster,
    });
  }

  function closeModal() {
    dialog.current?.close();
    setModalItem(null);
    lastMediaTrigger.current?.focus();
  }

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="topbar">
        <span>A little care. A lasting difference.</span>
        <div style={{ display: "inline-flex", gap: "14px", alignItems: "center", flexWrap: "wrap" }}>
          <a href="mailto:srisadguruaadharfoundation26@gmail.com">srisadguruaadharfoundation26@gmail.com</a>
          <span aria-hidden="true">·</span>
          <a href="tel:+918147942784">Let’s talk: +91 81479 42784</a>
          <a href="tel:+919591251111">+91 95912 51111</a>
        </div>
      </div>
      <header ref={headerRef} className={scrolled ? "scrolled" : undefined}>
        <Brand />
        <button
          ref={menuButton}
          className="menu"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-controls="primary-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "×" : "☰"}
        </button>
        <nav
          id="primary-navigation"
          aria-label="Main navigation"
          className={menuOpen ? "open" : undefined}
          onClick={() => setMenuOpen(false)}
        >
          <NavigationLinks />
          <a
            href="index.html#for-healthcare"
            onClick={(e) => {
              if (pageName === "index") {
                e.preventDefault();
                document.getElementById("for-healthcare")?.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
                history.pushState(null, "", "#for-healthcare");
              }
            }}
          >
            For Healthcare
          </a>
          <a
            className="button green"
            href="index.html#donate"
            onClick={(e) => {
              if (pageName === "index") {
                e.preventDefault();
                document.getElementById("donate")?.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
                history.pushState(null, "", "#donate");
              }
            }}
          >
            Donate with love
          </a>
        </nav>
      </header>
      <Suspense fallback={<main id="main" className="section" role="status">Loading page…</main>}>
        <PageContent onOpenImage={openImage} onOpenVideo={openVideo} />
      </Suspense>
      {showScrollTop && (
        <button
          className="scroll-top-btn"
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll back to top"
        >
          ↑
        </button>
      )}
      <footer>
        <div className="footer-main">
          <Brand />
          <div>
            <p>
              A little compassion.
              <br />A world of difference.
            </p>
            <p style={{ marginTop: "10px" }}>
              <a
                href="mailto:srisadguruaadharfoundation26@gmail.com"
                style={{ color: "#93c5fd", textDecoration: "underline" }}
              >
                srisadguruaadharfoundation26@gmail.com
              </a>
            </p>
          </div>
          <div>
            <NavigationLinks />
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Sri Sadguru Aadhar Foundation
          </span>
          <a
            href="https://www.forhealthcare.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore FOR HEALTH CARE
          </a>
        </div>
      </footer>
      <dialog
        ref={dialog}
        id="lightbox"
        aria-label={modalItem?.title || modalItem?.caption || "Media viewer"}
        onCancel={closeModal}
        onClick={(event) => {
          if (event.target === dialog.current) {
            const rect = dialog.current.getBoundingClientRect();
            const clickedOutside =
              event.clientX < rect.left ||
              event.clientX > rect.right ||
              event.clientY < rect.top ||
              event.clientY > rect.bottom;
            if (clickedOutside) closeModal();
          }
        }}
      >
        <button className="close" aria-label="Close viewer" onClick={closeModal}>
          ×
        </button>
        {modalItem && modalItem.type === "image" && (
          <>
            <img src={modalItem.src} alt={modalItem.caption || "Foundation photo"} decoding="async" />
            <div className="lightbox-caption">
              {modalItem.caption && !/^Photo\s+\d+$/i.test(modalItem.caption) && (
                <p>{modalItem.caption}</p>
              )}
              {photoIndex >= 0 && (
                <div className="lightbox-navigation">
                  <button
                    type="button"
                    onClick={() => changePhoto(-1)}
                    aria-label="Previous photo"
                  >
                    ←
                  </button>
                  <span aria-live="polite">
                    {photoIndex + 1} / {media.photos.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => changePhoto(1)}
                    aria-label="Next photo"
                  >
                    →
                  </button>
                </div>
              )}
            </div>
          </>
        )}
        {modalItem && modalItem.type === "video" && (
          <div className="video-modal-wrap">
            <video
              controls
              autoPlay
              playsInline
              poster={modalItem.poster}
              key={modalItem.src}
            >
              <source src={modalItem.src} type="video/mp4" />
              Your browser does not support embedded video.
            </video>
            <div className="lightbox-caption">
              <p>{modalItem.title}</p>
              {videoIndex >= 0 && (
                <div className="lightbox-navigation">
                  <button
                    type="button"
                    onClick={() => changeVideo(-1)}
                    aria-label="Previous video"
                  >
                    ←
                  </button>
                  <span aria-live="polite">
                    {videoIndex + 1} / {foundationFilms.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => changeVideo(1)}
                    aria-label="Next video"
                  >
                    →
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
