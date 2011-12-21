var FolderList = new (Backbone.Collection.extend({
  model: Folder,
  url: "/folders"
}));

FolderList.bind('add', function (folder) {
  folder.view = new FolderView({ model: folder, collection: FolderList });
  folder.view.render();
  
  folder.documents = new DocumentList();
  folder.documents.folder = folder;
  
  if (folder.has("documents")) {
    folder.documents.add(folder.get('documents'));
    folder.unset("documents", { silent: true });
//  } else if (!folder.isNew()) {
//    folder.documents.url = folder.url() + "/documents";
//    folder.documents.fetch();
  }
});

FolderList.bind('change:name', function (folder) {
  folder.view.render();
});

FolderList.bind('remove', function (folder) {
  folder.view.remove();
  folder.documents.reset();
  folder.destroy();
  delete folder.view;
  delete folder.documents;
  delete folder;
});

