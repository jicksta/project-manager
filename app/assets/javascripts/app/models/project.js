Gantt.Models.Project = Backbone.Model.extend({
  initialize: function(options) {
    this.set({
      start: new Date(options.start),
      end: new Date(options.end)
    });
  }
});
