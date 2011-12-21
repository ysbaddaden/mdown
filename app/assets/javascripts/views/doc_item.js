var DocItem = Backbone.View.extend({
  tagName: "dd",
  template: '<span class="name"><%- name %></span> <span class="icon destroy">×</span>',
  confirmTemplate: 'Are you sure you want to permanently delete "<%- name %>"?',

  events: {
    "dblclick":       "rename",
    "click":          "openDocument",
    "click .destroy": "destroyDocument"
  },

  initialize: function () {
    _.bindAll(this, 'renameCallback', 'doRename');
    
    this.model.bind("change:selected", function (model, value) {
      var action = value ? "add" : "remove";
      this.el.classList[action]("selected");
    }, this);
  },

  render: function () {
    this.el.innerHTML = _.template(this.template, { name: this.model.get("name") });
    this.span = this.el.querySelector("span.name");
    return this;
  },

  openDocument: function () {
    Editor.open(this.model);
    Preview.open(this.model);
  },

  destroyDocument: function () {
    if (confirm(_.template(this.confirmTemplate, { name: this.model.get('name') }))) {
      this.collection.remove(this.model);
    }
  }
});
_.extend(DocItem.prototype, RenameHelper);

