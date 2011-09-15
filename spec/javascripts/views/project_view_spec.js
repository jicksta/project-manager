describe("Views.ProjectView", function() {
  describe("#openDetails", function() {
    it("should trigger gantt:show-project event", function() {
      var bindingSpy = jasmine.createSpy("gantt:show-event spy");
      Gantt.bind("gantt:show-event", bindingSpy);

      var project = new Gantt.Models.Project;
      var view = new Gantt.Views.ProjectView({model: project});

      view.openDetails();
      expect(bindingSpy).toHaveBeenCalled();
    });
  });

});
