var Sidebar = new (Backbone.View.extend({
  el: document.getElementById("sidebar"),

  events: {
    "click #createFolder": "createFolder"
  },

  createFolder: function () {
    var folder = new Folder({ name: "Untitled..." });
    FolderList.add(folder);
    folder.view.rename();
  }
}));
