var Editor = Backbone.View.extend({
  el: document.getElementById("editor"),

  events: {
    "keyup": "update"
  },

  initialize: function () {
    this.el.disabled = true;
  },

  render: function () {
    if (this.model) {
      this.el.disabled = false;
      this.el.value = this.model.get("contents") || "";
    } else {
      this.el.disabled = true;
      this.el.value = "";
    }
  },

  update: function (event) {
    this.model.set({ "contents": this.el.value });
  },

  open: function (document) {
    if (this.model) {
      this.close();
    }
    this.model = document;
    this.model.set({ "selected": true });
    this.render();
  },

  close: function (event) {
    if (this.model) {
      this.model.set({ "selected": false });
    }
    this.model = undefined;
    this.render();
  }
});

