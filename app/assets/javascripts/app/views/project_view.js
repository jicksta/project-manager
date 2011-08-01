Gantt.Views.ProjectView = Backbone.View.extend({

  className: "project",

  initialize: function() {
    _.bindAll(this, "render");
  },

  render: function() {
    $(this.el).attr("data-binding", "name");
    this.viewBindings();
    return this;
  }
});

_.extend(Gantt.Views.ProjectView.prototype, Bindings);
