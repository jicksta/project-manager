Gantt.Models.Project = Backbone.Model.extend({
  initialize: function(options) {
    this.set({
      start_time: new Date(options.start_time),
      end_time: new Date(options.end_time)
    });
  }
});
