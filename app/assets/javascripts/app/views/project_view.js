Gantt.Views.ProjectView = Backbone.View.extend({

  className: "project",

  initialize: function() {
    _.bindAll(this, "render");
  },

  render: function() {
    var name = this.model.get("name");
    $(this.el).text(name);
    return this;
  }
});
