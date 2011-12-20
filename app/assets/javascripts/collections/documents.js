var Documents = new Backbone.Collection();

Documents.model = Document;
Documents.url = "/documents";

Documents.bind("add", function (model, collection) {
  model.treeItem = new TreeItem({ model: model, collection: collection });
  tree.push(model.treeItem);
});

Documents.bind("destroy", function (model) {
  editor.close();
  model.preview.close();
  model.treeItem.remove();
  delete model.preview;
  delete model.treeItem;
  delete model;
});

Documents.bind("change:name", function (model, value) {
  model.treeItem.render();
  model.save();
});

Documents.bind("change:selected", function (model, value) {
  if (!model.preview) {
    model.preview = new Preview({ model: model });
  }
  if (value) {
    model.preview.render();
    model.bind("change:contents", model.preview.render, model.preview);
  } else {
    model.unbind("change:contents", model.preview.render);
  }
});

