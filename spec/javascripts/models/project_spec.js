describe("Models.Project", function() {

  describe("initialization", function() {

    it("should work when instantiated without times", function() {
      var project = new Gantt.Models.Project;
      expect(project.get("start_time")).toBeUndefined();
      expect(project.get("end_time")).toBeUndefined();
    });

    it("should set the given string dates as JavaScript dates", function() {
      _.each(["start_time", "end_time"], function(property) {
        var date = new Date;
        var project = new Gantt.Models.Project(kvp(property, date.toString()));
        project.get(property)
      });
    });
  });

  describe("#lengthOfTimeInDays", function() {

    it("should work correctly for a simple date in the same week", function() {
      var start = new Date(2011,0,3), end = new Date(2011, 0, 7);
      var project = new Gantt.Models.Project({start_time: start.toString(), end_time: end.toString()});
      expect(project.lengthOfTimeInDays()).toEqual(5);
    });

    it("should work correctly for a date spanning multiple weeks", function() {
      var start = new Date(2011,0,5), end = new Date(2011, 0, 26);
      var project = new Gantt.Models.Project({start_time: start.toString(), end_time: end.toString()});
      expect(project.lengthOfTimeInDays()).toEqual(22);
    });

  });

});