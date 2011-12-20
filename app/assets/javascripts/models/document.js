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
        model.unbind("change:contents", model.preview().render);
      }
    });
    
//    if (window.localStorage) {
//      this.bind("change:contents", function (model) {
//        console.log("localStorage.setItem()")
//        localStorage.setItem(model.storageId(), {
//          rev: model.get('rev'),
//          contents: model.get('contents')
//        });
//      });
//      
//      this.bind("save:success", function (model) {
//        console.log("localStorage.removeItem()")
//        localStorage.removeItem(model.storageId());
//      });
//    }
    
//    this.bind("change", function (model, value) {
//      this.dirty = true;
//    });
//    this.bind("save:success", function (model, value) {
//      this.dirty = false;
//    });
  },

  storageId: function () {
    return this.url() + ":contents";
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
  },

//  dirty: false,

//  isDirty: function () {
//    return this.dirty;
//  },

//  save: function (attrs, options) {
//    this.trigger("save", model);
//    
//    options = options || {};
//    var model = this;
//    
//    var success = options.success;
//    options.success = function(resp, status, xhr) {
//      model.trigger("save:success", model);
//      if (success) {
//        success(model, resp, xhr);
//      }
//    };
//    
//    var error = options.error;
//    options.error = function(resp, status, xhr) {
//      model.trigger("save:error", model);
//      if (error) {
//        error(model, resp, xhr);
//      }
//    };
//    
//    Backbone.Model.prototype.save.call(this, attrs, options);
//  }
});
