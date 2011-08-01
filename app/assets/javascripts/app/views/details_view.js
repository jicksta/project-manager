Gantt.Views.DetailsView = Backbone.View.extend({

  events: {
    "click #new-project": "newProject",
    "change .project-title": "_updateTitle"
  },

  initialize: function() {
    _.bindAll(this, "newProject", "_updateTitle");
  },

  render: function() {
    this.viewBindings();
    
    this.titleField = this.$(".project-title");
    this._refreshFields();
    return this;
  },

  newProject: function() {
    var project = new Gantt.Models.Project;
    new Gantt.Views.ProjectView({model: project});
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
