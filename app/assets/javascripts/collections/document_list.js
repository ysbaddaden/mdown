var DocumentList = Backbone.Collection.extend({
  model: Document,
  url: "/documents",

  initialize: function () {
    this.bind("add", function (document) {
      document.view = new DocItem({ model: document, collection: this });
      this.folder.view.addDocItem(document.view);
    });

    this.bind("remove", function (document) {
      document.view.remove();
      document.destroy();
      delete document.view;
      delete document;
    });
  },
});

