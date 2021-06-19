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



//smooth scrolling
const links = document.querySelectorAll("nav ul li a");
for (const link of links) {
  link.addEventListener("click", clickHandler);
}
function clickHandler(e) {
  e.preventDefault();
  const href = this.getAttribute("href");
  const offsetTop = document.querySelector(href).offsetTop;
  scroll({
    top: offsetTop - 20,
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

  //gallery
  const preloader = document.querySelector(".preloader");

  var Images = {
    className: "works",
    href: "blazon/assets/images/works/",
    hrefCountArr: [[44, ".jpg"]],
    src: "blazon/assets/images/works/",
    srcCountArr: [[44, ".jpg"]],
  };

  document.getElementById("load-more").addEventListener("click", () => {
    createHtml(Images);
    document.getElementById("load-more").innerHTML = "";
  });

  function createHtml(obj) {
    preloader.style.display = "flex";
    preloader.classList.remove("vanish");

    document.getElementById("gallery").style.display = "none";
    document.getElementById("gallery").innerHTML = "";

    var gridSizer = document.createElement("Div");
    gridSizer.classList.add("grid-sizer");
    document.getElementById("gallery").appendChild(gridSizer);

    for (let j = 0; j < obj.srcCountArr.length; j++) {
      for (let i = 1; i < obj.srcCountArr[j][0] + 1; i++) {
        var imgBox = document.createElement("Div");
        imgBox.classList.add("wrapper", obj.className);
        document.getElementById("gallery").appendChild(imgBox);

        var link = document.createElement("a");
        link.classList.add("glightbox");
        link.href = obj.href + i + obj.hrefCountArr[j][1];
        imgBox.appendChild(link);

        var imgTag = document.createElement("img");
        imgTag.src = obj.src + i + obj.srcCountArr[j][1];
        link.appendChild(imgTag);
      }
    }
    initGlightbox();

    Promise.all(
      Array.from(document.images).map((img) => {
        if (img.complete) return Promise.resolve(img.naturalHeight !== 0);
        return new Promise((resolve) => {
          img.addEventListener("load", () => resolve(true));
          img.addEventListener("error", () => resolve(false));
        });
      })
    ).then((results) => {
      if (results.every((res) => res)) {
        document.getElementById("gallery").style.display = "block";
        preloader.classList.add("vanish");
        runistopeLayout();
        console.log("all images loaded successfully");
      } else console.log("some images failed to load, all finished loading");
    });
  }

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
