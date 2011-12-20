window.addEventListener("load", function () {
  var header    = document.getElementById("header");
  var sidebar   = document.getElementById("sidebar");
  var documents = document.getElementById("documents");
  var editor    = document.getElementById("editor");
  var preview   = document.getElementById("preview");
  
  function autoHeight() {
    [ sidebar, editor, preview ].forEach(function (el) {
      el.style.height = (window.innerHeight - header.offsetHeight - 12) + "px";
    });
  }
  autoHeight();
  window.addEventListener("resize", autoHeight, false);
}, false);
