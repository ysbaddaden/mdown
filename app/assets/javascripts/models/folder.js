var Folder = Backbone.Model.extend({
  urlRoot: "/folders",

  buildDocument: function (attributes) {
    attributes.folder_id = this.get("id");
    return new Document(attributes);
  }
});

