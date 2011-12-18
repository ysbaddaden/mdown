//= require "vendor/zepto-0.8"
//= require "vendor/underscore-1.2.3"
//= require "vendor/backbone-0.5.3"
//= require "vendor/markdown-0.3.1"
//= require "lib/auto_height"
//= require "documents"

var docs = new Documents();
docs.fetch();

//(function () {
//  var ed = document.getElementById("editor");
//  var pr = document.getElementById("preview");
//  
//  // (stupid) attempt at trying to keep both editor and preview in scroll sync:
//  ed.addEventListener("scroll", function (event) {
//    pr.scrollTop = ed.scrollTop;
//  }, false);
//}());
