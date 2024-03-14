"use strict";

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
