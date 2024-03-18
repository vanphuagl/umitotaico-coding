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

  // height menu
  const windowHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );

  document.getElementById("cMenu").style.height = windowHeight + "px";
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
    document.documentElement.scrollTop + 1000 >
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
      if (bottom > window.scrollY + items.getBoundingClientRect().y) {
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

/* ------------------------------ resize window ----------------------------- */

["resize", "pageshow", "load"].forEach((evt) => {
  window.addEventListener(evt, () => {
    if (window.innerWidth > 1023) {
      menu.classList.remove("--active");
      document.body.classList.remove("--disable-scroll");
    }
  });
});

/* ----------------------------- swiper parallax ---------------------------- */

const componentSwiper = new Swiper(".js-swiper", {
  speed: 1000,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  loop: true,
  parallax: true,
  pagination: {
    el: ".c-swiper_pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".c-swiper_button_next",
    prevEl: ".c-swiper_button_prev",
  },
  breakpoints: {
    0: {
      allowTouchMove: true,
    },
    1024: {
      allowTouchMove: false,
    },
  },
});

// handle label service swiper (componentSwiper[7])
let index = 0;
const dataMenuService = document.querySelectorAll(".service_menu li");
dataMenuService.forEach((item) =>
  item.addEventListener("click", handleInitSwiper)
);

function handleInitSwiper(event) {
  let menu = event.target.getAttribute("data-menu-service");
  index = [...dataMenuService].findIndex(
    (item) => item.getAttribute("data-menu-service") === menu
  );
  componentSwiper[7].slideTo(index + 1);
  // console.log("index", index, event.target);
}

componentSwiper[7].on("slideChange", (sw) => {
  for (let i = 0; i < dataMenuService.length; i++) {
    dataMenuService[i].classList.remove("active");
  }
  dataMenuService[sw.realIndex].classList.add("active");
});

/* -------------------------------- accordion ------------------------------- */

let accordion = document.getElementsByClassName("js-accordion");
let panel = document.getElementsByClassName("js-panel");

for (let i = 0; i < accordion.length; i++) {
  accordion[i].addEventListener("click", function () {
    this.classList.toggle("active");
    if (panel[i].style.maxHeight) {
      panel[i].style.maxHeight = null;
    } else {
      panel[i].style.maxHeight = panel[i].scrollHeight + "px";
    }
  });
}

/* --------------------------- toggle aria-hidden --------------------------- */

const toggleHidden = (id) => {
  let attr = document.getElementById(id).attributes;

  if (attr["aria-hidden"].value == "true") {
    document.getElementById(id).setAttribute("aria-hidden", "false");
  } else {
    document.getElementById(id).setAttribute("aria-hidden", "true");
  }
};

/* ---------------------------------- popup --------------------------------- */

const [popupToggler, popup] = [
  document.querySelectorAll("[data-service-toggler]"),
  document.querySelector("[data-service-popup]"),
];

const togglePopup = () => {
  popup.classList.toggle("--active");
  document.body.classList.toggle("--disable-scroll");
};

addEventOnElements(popupToggler, "click", togglePopup);
