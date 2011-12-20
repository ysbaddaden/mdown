var Document = Backbone.Model.extend({
//  initialize: function (attributes, collection) {
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
//  },

//  storageId: function () {
//    return this.url() + ":contents";
//  },

  url: function () {
    if (this.isNew()) {
      return "/documents.json";
    } else {
      return "/documents/" + this.get("id") + ".json";
    }
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
