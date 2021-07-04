const popup = document.querySelector(".pop-up-wrapper");

const menuBtn = document.querySelector(".menu-btn");
const menuOpen = document.querySelector(".nav-mobile");
const mobileLinks = document.querySelectorAll(".nav-mobile ul li");
let Open = false;
menuBtn.addEventListener("click", () => {
  if (!Open) {
    Open = true;
    menuBtn.classList.add("open");
    menuOpen.classList.add("open");
    let delay = 0;
  } else {
    Open = false;
    menuBtn.classList.remove("open");
    menuOpen.classList.remove("open")
  }
});

mobileLinks.forEach( el => {
  el.addEventListener("click", () => {
    menuBtn.classList.remove("open");
    menuOpen.classList.remove("open");
  })
});


//smooth scrolling desktop
const links = document.querySelectorAll("nav ul li a");
for (var link of links) {
  link.addEventListener("click", clickHandler);
}

//smooth scrolling mobile
const mob_links = document.querySelectorAll(".nav-mobile ul li a");
for (var link of mob_links) {
  link.addEventListener("click", clickHandler);
}

function clickHandler(e) {
  e.preventDefault();
  const href = this.getAttribute("href");
  const offsetTop = document.querySelector(href).offsetTop;
  scroll({
    top: offsetTop - 100,
    behavior: "smooth",
  });
}
window.addEventListener("load", () => {

  document.querySelector(".fullpage-preloader").classList.add("vanish");

  setTimeout(() => {
  popup.style.display="flex";
  }, 3000);

  document.querySelector(".pop-up-wrapper span").addEventListener('click', () =>{
    popup.classList.add("vanish");
  });

  document.documentElement.style.setProperty(
    "--animation",
    "anim1 1s ease-in 1s forwards"
  );

  function initGlightbox() {
    const lightbox = GLightbox({
      selector: ".glightbox",
    });
  }

  function runistopeLayout() {
    var grid = document.querySelector(".gallery-container");
    var iso = new Isotope(grid, {
      // options...
      itemSelector: ".wrapper",
      percentPosition: true,
      masonry: {
        columnWidth: ".grid-sizer",
      },
    });
    imagesLoaded(grid).on("progress", function () {
      // layout Isotope after each image loads
      iso.layout();
    });
  }

  initGlightbox();
  runistopeLayout();
  AOS.init();
});
