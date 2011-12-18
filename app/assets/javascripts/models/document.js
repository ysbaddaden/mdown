var Document = Backbone.Model.extend({
  initialize: function (attributes, collection) {
    this.treeItem = new TreeItem({
      model: this,
      collection: collection
    }).render();
    
    this.bind("change:name", function (model, value) {
      model.treeItem.render();
    });
    
    this.bind("change:selected", function (model, value) {
      if (value) {
        model.preview().render();
        model.bind("change:contents", model.preview().render, model.preview());
      } else {
        model.unbind("change:contents");
      }
    });
  },

  url: function () {
    if (this.isNew()) {
      return "/documents.json";
    } else {
      return "/documents/" + this.get("id") + ".json";
    }
  },

  preview: function () {
    if (!this._preview) {
      this._preview = new Preview({ model: this });
    }
    return this._preview;
  }
});

