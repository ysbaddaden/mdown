//= require "models/document"
//= require "collections/documents"
//= include "views/preview"
//= require "views/editor"
//= require "views/tree"
//= require "views/tree_item"

var tree   = new Tree();
var editor = new Editor();

document.body.addEventListener('keydown', function (event) {
  if (event.ctrlKey && event.keyCode === 83) { // Ctrl+s
    event.preventDefault();
    editor.model.save();
//  } else if (event.ctrlKey && event.keyCode === 87) { // Ctrl+w isn't catchable
//    editor.close();
  }
}, false);

