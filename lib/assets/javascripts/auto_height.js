window.addEventListener("load", function () {
  var main    = document.getElementById("main");
  var header  = document.getElementById("header");
  var sidebar = document.getElementById("sidebar");
  var editor  = document.getElementById("editor");
  var preview = document.getElementById("preview");
  
  function autoHeight() {
    var height = main.clientHeight - header.clientHeight - 21;
    [ sidebar, editor, preview ].forEach(function (el) {
      el.style.height = height + "px";
    });
  }
  autoHeight();
  window.addEventListener("resize", autoHeight, false);
}, false);
