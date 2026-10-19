import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import GalleryPage from "./pages/GalleryPage";
import ContactPage from "./pages/ContactPage";
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
  index: HomePage,
  about: AboutPage,
  services: ServicesPage,
  gallery: GalleryPage,
  contact: ContactPage,
};
const requestedPage =
  location.pathname
    .split("/")
    .filter(Boolean)
    .at(-1)
    ?.replace(/\.html$/, "") || "index";
const pageName = Object.hasOwn(pages, requestedPage) ? requestedPage : "index";
const CurrentPage = pages[pageName] || HomePage;

function Brand() {
  function handleClick(e) {
    if (pageName === "index") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (location.hash) {
        history.replaceState(null, "", "index.html");
      }
    }
  }
  return (
    <a className="brand" href="index.html" onClick={handleClick}>
      <img src="assets/logo.png" alt="Sri Sadguru logo" />
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
            window.scrollTo({ top: 0, behavior: "smooth" });
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
    const handleScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      setScrolled(y > 20);
      setShowScrollTop(y > 350);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };
    if (location.hash) {
      requestAnimationFrame(scrollToFragment);
    }
    window.addEventListener("hashchange", scrollToFragment);
    return () => {
      window.removeEventListener("hashchange", scrollToFragment);
    };
  }, []);

  // Global smooth scrolling for all in-page hash anchor links
  useEffect(() => {
    function handleAnchorClick(event) {
      const link = event.target.closest("a");
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href) return;

      let targetId = null;
      if (href.startsWith("#") && href.length > 1) {
        targetId = href.slice(1);
      } else if (pageName === "index" && href.includes("#")) {
        const hashIdx = href.indexOf("#");
        const candidate = href.slice(hashIdx + 1);
        if (candidate && document.getElementById(candidate)) {
          targetId = candidate;
        }
      }

      if (targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          event.preventDefault();
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
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
                document.getElementById("for-healthcare")?.scrollIntoView({ behavior: "smooth", block: "start" });
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
                document.getElementById("donate")?.scrollIntoView({ behavior: "smooth", block: "start" });
                history.pushState(null, "", "#donate");
              }
            }}
          >
            Donate with love
          </a>
        </nav>
      </header>
      <CurrentPage onOpenImage={openImage} onOpenVideo={openVideo} />
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
            <img src={modalItem.src} alt="" />
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
