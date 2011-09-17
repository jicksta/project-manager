Gantt.Views.DetailsView = Backbone.View.extend({

  events: {
    "change .project-title": "_updateTitle"
  },

  initialize: function() {
    _.bindAll(this, "_updateTitle");
    this.template = _.template($("#template-project-details").html());
  },

  render: function() {
    var newHTML = this.template(this.model.toJSON());
    $(this.el).html(newHTML);

    this.delegateEvents();
    this.viewBindings();
    
    this.titleField = this.$(".project-title");
    this._refreshFields();
    return this;
  },

  setProject: function(project) {
    this.model = project;
    this._refreshFields();
  },

  _updateTitle: function() {
    this.model.set({title: this.titleField.val()});
  },

  _refreshFields: function() {
    var name = this.model.get("name");
    this.titleField.val(name);
  }

});
_.extend(Gantt.Views.DetailsView.prototype, Bindings);
