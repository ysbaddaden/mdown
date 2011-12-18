var Preview = Backbone.View.extend({
  el: document.getElementById("preview"),

  render: function (document) {
    this.el.innerHTML = markdown.toHTML(this.model.get("contents") || "");
  },
});

