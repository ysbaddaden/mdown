var Preview = new (Backbone.View.extend({
  el: document.getElementById("preview"),

  render: function () {
    if (this.model) {
      this.el.innerHTML = markdown.toHTML(this.model.get("contents") || "");
    } else {
      this.el.innerHTML = "";
    }
  },

  open: function (model) {
    this.model = model;
    this.model.bind("change:contents", this.render, this);
    this.render();
  },

  close: function () {
    if (this.model) {
      this.model.unbind("change:contents", this.render);
    }
    this.model = undefined;
    this.render();
  }
}));
