var Tree = Backbone.View.extend({
  el: document.getElementById("documents"),

  events: {
    "click .create": "createDocument"
  },

  push: function (item) {
    this.el.appendChild(item.el);
  },

  createDocument: function (event) {
    var model = new Document();
    this.push(model.treeItem);
    model.treeItem.open();
    model.treeItem.rename();
  }
});

var tree = new Tree();

