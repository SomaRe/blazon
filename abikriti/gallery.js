window.addEventListener("load", () => {
    // AOS Initialization
    AOS.init();
  });

const preloader = document.querySelector(".preloader");
var lastClicked = "";

var Fabric = {
  className: "fabric",
  loc: "abikriti/assets/images/gallery/fabric-",
  locCountArr: [[2, ".jpg"]],
};

var Artistic = {
  className: "artistic",
  loc: "abikriti/assets/images/gallery/artistic-",
  locCountArr: [[20, ".jpg"]],
};

var Trinket = {
  className: "trinket",
  loc: "abikriti/assets/images/gallery/trinket-",
  locCountArr: [
    [13, ".jpg"]
  ],
};
var CuratedFrames = {
  className: "curatedFrames",
  loc: "abikriti/assets/images/gallery/curatedFrames-",
  locCountArr: [[7, ".jpg"]],
};

var HandPainted = {
  classNme: "infoGraphics",
  loc: "abikriti/assets/images/gallery/handpainted-",
  locCountArr: [
    [8, ".jpg"]
  ],
};

var Gifts = {
  className: "gifts",
  loc: "abikriti/assets/images/gallery/gifts-",
  locCountArr: [
    [40, ".jpg"],
  ],
};

var Jewelry = {
  className: "jewelry",
  loc: "abikriti/assets/images/gallery/jewelry-",
  locCountArr: [[6, ".jpg"]],
};

var Handicrafts = {
    className: "handicrafts",
    loc: "abikriti/assets/images/gallery/handicrafts-",
    locCountArr: [[7, ".jpg"]],
  };

var Packaging = {
    className: "packaging",
    loc: "abikriti/assets/images/gallery/packaging-",
    locCountArr: [[13, ".jpg"]],
  };

document.getElementById("fabric").addEventListener("click", (e) => {
  createHtml(e.target.id, Fabric);
});

document.getElementById("artistic").addEventListener("click", (e) => {
  createHtml(e.target.id, Artistic);
});

document
  .getElementById("trinket")
  .addEventListener("click", (e) => {
    createHtml(e.target.id, Trinket);
  });

document
  .getElementById("curatedframes")
  .addEventListener("click", (e) => {
    createHtml(e.target.id, CuratedFrames);
  });

document.getElementById("handpainted").addEventListener("click", (e) => {
  createHtml(e.target.id, HandPainted);
});

document.getElementById("gifts").addEventListener("click", (e) => {
  createHtml(e.target.id, Gifts);
});

document.getElementById("jewelry").addEventListener("click", (e) => {
  createHtml(e.target.id, Jewelry);
});

document.getElementById("handicrafts").addEventListener("click", (e) => {
    createHtml(e.target.id, Handicrafts);
  });

document.getElementById("packaging").addEventListener("click", (e) => {
    createHtml(e.target.id, Packaging);
  });

function createHtml(id, obj) {
  if (lastClicked != id) {
    lastClicked = id;
    activeFilterItem();

    preloader.style.display = "flex";
    preloader.classList.remove("vanish");

    document.getElementById("gallery").style.display = "none";
    document.getElementById("gallery").innerHTML = "";

    var gridSizer = document.createElement("Div");
    gridSizer.classList.add("grid-sizer");
    document.getElementById("gallery").appendChild(gridSizer);

    for (let j = 0; j < obj.locCountArr.length; j++) {
      for (let i = 1; i < obj.locCountArr[j][0] + 1; i++) {
        var imgBox = document.createElement("Div");
        imgBox.classList.add("wrapper", obj.className);
        document.getElementById("gallery").appendChild(imgBox);

        var link = document.createElement("a");
        link.classList.add("glightbox");
        link.loc = obj.loc + i + obj.locCountArr[j][1];
        imgBox.appendChild(link);

        var imgTag = document.createElement("img");
        imgTag.src = obj.loc + i + obj.locCountArr[j][1];
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
}

function activeFilterItem() {
  filters = document.getElementsByClassName("filter-item");
  for (let i = 0; i < filters.length; i++) {
    if (filters[i].id == lastClicked) {
      filters[i].style.backgroundColor = "white";
      filters[i].style.color = "#0e1111";
    } else {
      filters[i].style.backgroundColor = "#0e1111";
      filters[i].style.color = "white";
    }
  }
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
