const menuButton = document.querySelector("[data-menu-button]");
const menu = document.querySelector("[data-menu]");
const header = document.querySelector("[data-header]");
const revealItems = document.querySelectorAll(".reveal");
const localPage = window.location.pathname.split("/").pop() || "index.html";
let activeScrollAnimation = 0;

function closeMenu() {
  if (menu && menuButton) {
    menu.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  }
}

function getScrollTargetTop(target) {
  const headerHeight = header ? header.getBoundingClientRect().height : 0;
  return window.scrollY + target.getBoundingClientRect().top - headerHeight - 18;
}

function animateScrollTo(targetTop, onComplete) {
  activeScrollAnimation += 1;
  const animationId = activeScrollAnimation;
  const startTop = window.scrollY;
  const distance = targetTop - startTop;
  const duration = Math.min(2200, Math.max(1400, Math.abs(distance) * 1.15));
  const startTime = performance.now();

  function step(now) {
    if (animationId !== activeScrollAnimation) {
      return;
    }

    const progress = Math.min((now - startTime) / duration, 1);
    const eased =
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    window.scrollTo(0, startTop + distance * eased);

    if (progress < 1) {
      requestAnimationFrame(step);
      return;
    }

    window.scrollTo(0, targetTop);

    if (typeof onComplete === "function") {
      onComplete();
    }
  }

  requestAnimationFrame(step);
}

function scrollToHash(hash, updateHistory = true) {
  if (!hash || hash === "#") {
    return;
  }

  const target = document.querySelector(hash);

  if (!target) {
    return;
  }

  animateScrollTo(getScrollTargetTop(target), () => {
    if (updateHistory) {
      history.replaceState(null, "", hash);
    }
  });
}

function smoothGo(event, page, hash) {
  if (event) {
    event.preventDefault();
  }

  closeMenu();

  if (page === localPage) {
    scrollToHash(hash);
    return false;
  }

  sessionStorage.setItem("smooth-scroll-target", hash);
  sessionStorage.setItem("smooth-scroll-page", page);
  window.location.href = page;
  return false;
}

window.smoothGo = smoothGo;

if (menuButton && menu) {
  menuButton.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  menu.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      closeMenu();
    }
  });
}

if (header) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      header.classList.toggle("has-shadow", !entry.isIntersecting);
    },
    { threshold: 0 }
  );

  const sentinel = document.createElement("div");
  sentinel.setAttribute("aria-hidden", "true");
  document.body.prepend(sentinel);
  observer.observe(sentinel);
}

if (revealItems.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

document.addEventListener("click", (event) => {
  const link = event.target.closest("a");

  if (!(link instanceof HTMLAnchorElement)) {
    return;
  }

  const href = link.getAttribute("href");

  if (!href || !href.includes("#") || link.target === "_blank" || link.hasAttribute("download")) {
    return;
  }

  const targetUrl = new URL(href, window.location.href);

  if (targetUrl.origin !== window.location.origin) {
    return;
  }

  const targetPage = targetUrl.pathname.split("/").pop() || "index.html";

  if (targetPage === localPage) {
    event.preventDefault();
    closeMenu();
    scrollToHash(targetUrl.hash);
    return;
  }

  sessionStorage.setItem("smooth-scroll-target", targetUrl.hash);
  sessionStorage.setItem("smooth-scroll-page", targetPage);
  event.preventDefault();
  closeMenu();
  targetUrl.hash = "";
  window.location.href = targetUrl.href;
}, true);

window.addEventListener("load", () => {
  const storedTarget = sessionStorage.getItem("smooth-scroll-target");
  const storedPage = sessionStorage.getItem("smooth-scroll-page");

  if (storedTarget && storedPage === localPage) {
    sessionStorage.removeItem("smooth-scroll-target");
    sessionStorage.removeItem("smooth-scroll-page");
    history.replaceState(null, "", window.location.pathname);
    window.scrollTo({ top: 0, behavior: "auto" });
    requestAnimationFrame(() => scrollToHash(storedTarget));
  }
});
