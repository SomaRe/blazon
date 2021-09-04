window.addEventListener('scroll', e => {
    var topPattern=document.querySelector('.top-pattern');
    var bottomPattern = document.querySelector('.bottom-pattern');
    topPattern.style.backgroundPosition = scrollY/10+"px";
    bottomPattern.style.backgroundPosition = scrollY/10+"px";
})

initGlightbox();

runistopeLayout();

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