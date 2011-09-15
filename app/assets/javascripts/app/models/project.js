Gantt.Models.Project = Backbone.Model.extend({
  initialize: function(options) {
    if(options.start_time) this.set({start_time: new Date(options.start_time)});
    if(options.end_time) this.set({end_time: new Date(options.end_time)});
  },

  lengthOfTimeInDays: function() {
    return 1 + this.get("end_time").diff(this.get("start_time"), "days"); // +1 to be inclusive of both days
  }

});
