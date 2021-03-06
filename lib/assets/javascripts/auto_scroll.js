window.addEventListener("load", function () {
  var editor  = document.getElementById("editor");
  var preview = document.getElementById("preview");

  // Naive attempt at auto-scroll of preview. It just scrolls as much in the
  // preview than it does in the editor, with a percentage.
  editor.addEventListener("scroll", function (event) {
    var editor_h  = editor.scrollHeight  - editor.clientHeight;
    var preview_h = preview.scrollHeight - preview.clientHeight;
    preview.scrollTop = preview_h / editor_h * editor.scrollTop;
  }, false);
}, false);
