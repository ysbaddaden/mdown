var TreeItem = Backbone.View.extend({
  tagName: "dd",

  events: {
    "click": "open",
    "dblclick": "rename",
    "click .destroy": "destroy"
  },

  initialize: function () {
    this.model.bind("change:selected", function (model, value) {
      var method = (value) ? "add" : "remove";
      this.el.classList[method]("selected");
    }, this);
  },

  render: function () {
    this.el.innerHTML = '<span class="name">' + this.model.escape("name") + '</span> ' +
      '<span class="icon destroy">⊗</span>';
    this.span = this.el.getElementsByTagName("span").item(0);
    
    if (!this.el.parentNode) {
      tree.push(this);
    }
    return this;
  },

  open: function (event) {
    if (this.model.get("selected")) {
      return;
    }
    editor.open(this.model);
  },

  rename: function (event) {
    this.el.classList.add("renaming");
    this.span.contentEditable = true;
    
    this.span.addEventListener("blur", this.cancelRename.bind(this), false);
    this.span.addEventListener("keydown", function (event) {
      switch (event.keyCode) {
      case 13: // Enter
        this.cancelRename();
        this.model.save({ name: this.span.innerText || this.span.textContent });
        break;
      case 27: // ESC
        this.cancelRename();
        break;
      }
    }.bind(this), false);
    
    this.span.focus();
  },

  cancelRename: function () {
    this.el.classList.remove("renaming");
    this.span.contentEditable = false;
  },

  destroy: function (event) {
    if (confirm('Are you sure you want to destroy "' + this.model.escape("name") + '" ?')) {
      this.model.destroy();
      this.remove();
    }
  }
});
