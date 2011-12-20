var Preview = Backbone.View.extend({
  el: document.getElementById("preview"),

  render: function () {
    this.el.innerHTML = markdown.toHTML(this.model.get("contents") || "");
  },

  close: function () {
    this.model = undefined;
    this.el.innerHTML = "";
  }
});

