Gantt.Collections.ProjectsCollection = Backbone.Collection.extend({
  
  model: Gantt.Models.Project,

  earliestDate: function() {
    return _.min(this._allDates(), function(date) {
      return Math.min(Gantt.now(), date);
    });
  },

  latestDate: function() {
    return _.max(this._allDates(), function(date) {
      return Math.max(Gantt.now(), date);
    });
  },

  _allDates: function() {
    return this.pluck("start_time").concat(this.pluck("end_time"));
  }

});
