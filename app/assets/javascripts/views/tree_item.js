var TreeItem = Backbone.View.extend({
  tagName: "dd",

  events: {
    "click": "open",
    "dblclick": "rename",
    "click .destroy": "destroyDocument"
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
    this.el.innerHTML += '<span class="icon destroy">⊗</span>';
    if (!this.el.parentNode) {
      tree.push(this);
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
  },

  rename: function (event) {
    this.el.classList.add("renaming");
    this.el.contentEditable = true;
    
    this.el.addEventListener("keydown", function (event) {
      switch (event.keyCode) {
      case 13: // Enter
        this.el.classList.remove("renaming");
        this.el.contentEditable = false;
        this.model.save({ name: this.el.innerText || this.el.textContent });
        break;
      case 27: // ESC
        this.el.classList.remove("renaming");
        this.el.contentEditable = false;
        break;
      }
    }.bind(this), false);
    
    this.el.focus();
  },

  destroyDocument: function (event) {
    this.model.destroy();
    this.remove();
  }
});
