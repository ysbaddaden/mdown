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

