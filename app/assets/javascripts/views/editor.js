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

document.body.addEventListener('keydown', function (event) {
  if (event.ctrlKey && event.keyCode === 83) {
    event.preventDefault();
    editor.model.save();
  }
}, false);

