var Tree = Backbone.View.extend({
  el: document.getElementById("documents"),

  events: {
    "click .create": "createDocument"
  },

  push: function (item) {
    this.el.appendChild(item.render().el);
  },

  createDocument: function (event) {
    var model = new Document({ name: "Sans titre..." });
    Documents.add(model);
    model.treeItem.open();
    model.treeItem.rename();
  }
});

