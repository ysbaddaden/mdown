var RenameHelper = {
  rename: function () {
    this.span.parentNode.classList.add("renaming");
    this.span.contentEditable = true;
    this.span.addEventListener("keydown", this.renameCallback, false);
    this.span.addEventListener("blur", this.doRename, false);
    this.span.focus();
  },

  renameCallback: function (event) {
    switch (event.keyCode) {
    case 13: // Enter
      event.preventDefault();
      this.doRename();
      break;
    case 27: // Esc
      this.span.textContent = this.model.get("name");
      this.cancelRename();
      break;
    }
  },

  cancelRename: function () {
    this.span.parentNode.classList.remove("renaming");
    this.span.contentEditable = false;
    this.span.removeEventListener("keypress", this.renameCallback, false);
    this.span.removeEventListener("blur", this.doRename, false);
    this.span.blur();
  },

  doRename: function () {
    this.model.save({ name: this.span.textContent })
    this.cancelRename();
  }
};
