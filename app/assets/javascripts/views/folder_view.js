var FolderView = Backbone.View.extend({
  tagName: "dl",
  className: "visible",

  template: '<dt>' +
      '<span class="name"><%- name %></span> ' +
      '<span class="icon destroy">×</span>' +
      '<span class="icon create">+</span>' +
    '</dt>',
  confirmTemplate: 'Are you sure you want to permanently delete "<%- name %>"?',

  events: {
//    "click dt":          "toggleFolderVisibility",
    "dblclick dt":       "rename",
    "click dt .destroy": "destroyFolder",
    "click dt .create":  "createDocument"
  },

  initialize: function () {
    _.bindAll(this, 'renameCallback', 'doRename');
  },

  render: function () {
    if (!this.el.parentNode) {
      this.el.innerHTML = _.template(this.template, { name: this.model.get("name") });
      this.span = this.el.querySelector("span.name");
      document.getElementById("sidebar").appendChild(this.el);
    } else {
      this.span.textContent = this.model.escape("name");
    }
    
    this.el.addEventListener("dragover", function (e) {
      if (e.preventDefault) {
        e.preventDefault();
      }
      this.el.classList.add("dragover");
      e.dataTransfer.dropEffect = "copy";
    }.bind(this), false);
    
    this.el.addEventListener("dragenter", function (e) {
      this.el.classList.add("dragover");
      return false;
    }.bind(this), false);
    
    this.el.addEventListener("dragleave", function (e) {
      this.el.classList.remove("dragover");
    }.bind(this), false);
    
    this.el.addEventListener("drop", function (e) {
      if (e.stopPropagation) {
        e.stopPropagation();
      }
      this.el.classList.remove("dragover");
      
      var el = document.querySelector("[data-cid=" + e.dataTransfer.getData('Text') + "]");
      el.removeAttribute("data-cid");
      el.view.remove();
      el.view.model.save({ folder_id: this.model.id });
      this.addDocItem(el.view);
    }.bind(this), false);
    
    return this;
  },

  addDocItem: function (docItem) {
    this.el.appendChild(docItem.render().el);
  },

//  toggleFolderVisibility: function () {
//    this.el.classList.toggle("visible");
//  },

  createDocument: function () {
    var document = this.model.buildDocument({ name: "Untitled..." });
    this.model.documents.add(document);
    Editor.open(document);
    Preview.open(document);
    document.view.rename();
  },

  destroyFolder: function () {
    if (confirm(_.template(this.confirmTemplate, { name: this.model.get('name') }))) {
      this.collection.remove(this.model);
    }
  }
});
_.extend(FolderView.prototype, RenameHelper);

