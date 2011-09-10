describe("Views.ProjectView", function() {
  describe("#openDetails", function() {
    it("should trigger the ShowProject intent", function() {
      var project = new Gantt.Models.Project;
      var view = new Gantt.Views.ProjectView({model: project});
      view.openDetails();
      Gantt.Intents.ShowProject()
    });
  });

});
