Gantt.Models.Project = Backbone.Model.extend({
  initialize: function(options) {
    this.set({name: options.name || 'Untitled'});
    this.set({start_time: options.start_time ? new Date(options.start_time) : new Date});
    this.set({end_time: options.end_time ? new Date(options.end_time) : new Date().add(1, "day") });
  },

  lengthOfTimeInDays: function() {
    return 1 + this.get("end_time").diff(this.get("start_time"), "days"); // +1 to be inclusive of both days
  }

});
