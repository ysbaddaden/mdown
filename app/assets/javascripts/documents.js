// MODEL
var Document = Backbone.Model.extend({
  initialize: function (attributes, collection) {
    this.treeItem = new TreeItem({
      model: this,
      collection: collection
    }).render();
    
    this.bind("change:name", function (model, value) {
      model.treeItem.render();
    });
    
    this.bind("change:selected", function (model, value) {
      if (value) {
        model.preview().render();
        model.bind("change:contents", model.preview().render, model.preview());
      } else {
        model.unbind("change:contents");
      }
    });
  },

  preview: function () {
    if (!this._preview) {
      this._preview = new Preview({ model: this });
    }
    return this._preview;
  }
});

// COLLECTION
var Documents = Backbone.Collection.extend({
  model: Document,
  url: "/documents.json"
});

// VIEWS
var Preview = Backbone.View.extend({
  el: document.getElementById("preview"),

  render: function (document) {
    this.el.innerHTML = markdown.toHTML(this.model.get("contents") || "");
  },
});

var Editor = Backbone.View.extend({
  el: document.getElementById("editor"),

  events: {
    "keyup": "update"
  },

  render: function (document) {
    this.el.value = this.model.get("contents") || "";
  },

  update: function (event) {
    this.model.set({ "contents": this.el.value });
  }
});
var editor = new Editor();

var Tree = Backbone.View.extend({
  el: document.getElementById("documents"),

  push: function (item) {
    this.el.appendChild(item);
  }
});
var tree = new Tree();

var TreeItem = Backbone.View.extend({
  tagName: "dd",

  events: {
    "click": "open"
  },

  initialize: function () {
    this.model.bind("change:selected", function (model, value) {
      if (value) {
        this.el.className = "selected";
      } else {
        this.el.className = "";
      }
    }, this);
  },

  render: function () {
    this.el.innerHTML = this.model.get("name");
    if (!this.el.parentNode) {
      tree.push(this.el);
    }
    return this;
  },

  open: function (event) {
    if (this.model.get("selected")) {
      return;
    }
    if (editor.model) {
      editor.model.set({ "selected": false });
    }
    this.model.set({ "selected": true });
    editor.model = this.model;
    editor.render();
  }
});

