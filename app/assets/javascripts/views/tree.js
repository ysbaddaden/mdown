var Tree = Backbone.View.extend({
  el: document.getElementById("documents"),

  push: function (item) {
    this.el.appendChild(item);
  }
});
var tree = new Tree();

