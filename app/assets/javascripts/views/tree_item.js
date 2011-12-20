var TreeItem = Backbone.View.extend({
  tagName: "dd",

  templates: {
    "render": '<span class="name"><%- name %></span> <span class="icon destroy">⊗</span>',
    "confirmDestroy": 'Are you sure you want to destroy "<%- name %>" ?'
  },

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
    this.el.innerHTML = _.template(this.templates.render, { name: this.model.get("name") });
    this.span = this.el.getElementsByTagName("span").item(0);
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
    
    this.span.addEventListener("blur", this.doRename.bind(this), false);
    this.span.addEventListener("keydown", function (event) {
      switch (event.keyCode) {
      case 13: this.doRename();     break; // Enter
      case 27: this.cancelRename(); break; // Esc
      }
    }.bind(this), false);
    
    this.span.focus();
  },

  doRename: function () {
    this.cancelRename();
    this.model.set({ name: this.span.innerText || this.span.textContent });
  },

  cancelRename: function () {
    this.el.classList.remove("renaming");
    this.span.contentEditable = false;
  },

  destroy: function (event) {
    if (confirm(_.template(this.templates.confirmDestroy, { name: this.model.get("name") }))) {
      this.model.destroy();
    }
  }
});
