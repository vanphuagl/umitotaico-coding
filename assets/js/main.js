"use strict";

/* ---------------------- add event on multiple element --------------------- */

const addEventOnElements = function (elements, eventType, callback) {
  if (elements) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].addEventListener(eventType, callback);
    }
  }
};

/* --------------------------- resize mobile 100vh -------------------------- */

const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty(
    "--app-height",
    `${document.documentElement.clientHeight}px`
  );
};
window.addEventListener("resize", appHeight);
appHeight();

/* ------------------------ scroll fadeout main photo ----------------------- */

const bgOverlay = document.getElementById("bgOverlay");
const layout = document.getElementById("layout");

["scroll", "resize", "pageshow", "load"].forEach((evt) => {
  window.addEventListener(evt, () => {
    let cal = layout.offsetHeight + 900;
    let value = 0.3 + window.scrollY / cal;

    value > 0.8
      ? (bgOverlay.style.opacity = 0.8)
      : (bgOverlay.style.opacity = value);
  });
});

/* ----------------------------------- top ---------------------------------- */

const swiper1 = new Swiper(".is-bgSwiper", {
  effect: "fade",
  speed: 2500,
  autoplay: {
    delay: 6000,
  },
});

const reservation = document.getElementById("reservation");

["scroll", "resize", "pageshow", "load"].forEach((evt) => {
  window.addEventListener(evt, () => {
    document.documentElement.scrollTop + 850 >
    document.getElementById("layout").offsetTop
      ? reservation.classList.add("--active")
      : reservation.classList.remove("--active");
  });
});

/* ------------------------------- scroll fade ------------------------------ */

const jsFade = document.querySelectorAll(".js-fade");

["scroll", "resize", "pageshow", "load"].forEach((evt) => {
  window.addEventListener(evt, () => {
    let scrollTop = document.documentElement.scrollTop;
    let bottom = scrollTop + window.innerHeight;

    jsFade.forEach((items) => {
      if (bottom > items.offsetTop + 150) {
        items.classList.add("inview");
      } else {
        items.classList.remove("inview");
      }
    });
  });
});

/* ----------------------------- menu show/hide ----------------------------- */

const [menuToggler, menuLinks, menu] = [
  document.querySelectorAll("[data-menu-toggler]"),
  document.querySelectorAll("[data-menu-link]"),
  document.querySelector("[data-menu]"),
];

const toggleMenu = () => {
  menu.classList.toggle("--active");
  reservation.classList.toggle("--menu-active");
  document.body.classList.toggle("--disable-scroll");
};

addEventOnElements(menuToggler, "click", toggleMenu);

const closeMenu = () => {
  menu.classList.remove("--active");
  document.body.classList.remove("--disable-scroll");
};

addEventOnElements(menuLinks, "click", closeMenu);
