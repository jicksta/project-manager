describe("Views.TimelineView's", function() {
  xdescribe("calculation of view width percentages", function() {

    var projectsData = [
      { start_time: "2011-01-01T00:00:00Z", end_time: "2011-01-03T00:00:00Z", name: "Doesn't matter" },
      { start_time: "2011-03-03T00:00:00Z", end_time: "2011-01-06T00:00:00Z", name: "Doesn't matter" },
      { start_time: "2011-06-01T00:00:00Z", end_time: "2011-01-09T00:00:00Z", name: "Doesn't matter" }
    ];

    it('should take on the width of its contained projects', function() {
      var view = new Gantt.Views.TimelineView({projects: projectsData}).render();
      var width = $(view.el).css("width");
      console.log(width);
//      var timelineWidth = expect(width);
//      expect(timelineWidth).toEqual(1)
    });

    it("should equally distribute projects of the same length", function() {
      var view = new Gantt.Views.TimelineView({projects: projectsData}).render();
      for (var i = 0, length = view.projectViews.length; i < length; i++) {
        var projectView = $(view.projectViews[i].el);
        expect(projectView.css("width")).toBeCloseTo(33, {delta: 1});
        expect(projectView.css("left")).toEqual(i * 20);
      }
    });
  });
});

//function sampleProjectsJsonData() {
//  return [{
//      "created_at": null,
//      "end_time": "2011-07-14T18:21:51Z",
//      "id": null,
//      "name": "engineer world-class web-readiness",
//      "start_time": "2011-07-11T18:21:51Z",
//      "updated_at": null
//  },
//  {
//      "created_at": null,
//      "end_time": "2011-07-26T18:21:51Z",
//      "id": null,
//      "name": "unleash impactful platforms",
//      "start_time": "2011-07-18T18:21:51Z",
//      "updated_at": null
//  },
//  {
//      "created_at": null,
//      "end_time": "2011-08-06T18:21:51Z",
//      "id": null,
//      "name": "generate visionary synergies",
//      "start_time": "2011-07-25T18:21:51Z",
//      "updated_at": null
//  },
//  {
//      "created_at": null,
//      "end_time": "2011-08-26T18:21:51Z",
//      "id": null,
//      "name": "mesh cross-media interfaces",
//      "start_time": "2011-08-01T18:21:51Z",
//      "updated_at": null
//  },
//  {
//      "created_at": null,
//      "end_time": "2011-08-29T18:21:51Z",
//      "id": null,
//      "name": "morph value-added communities",
//      "start_time": "2011-08-08T18:21:51Z",
//      "updated_at": null
//  },
//  {
//      "created_at": null,
//      "end_time": "2011-08-23T18:21:51Z",
//      "id": null,
//      "name": "integrate scalable vortals",
//      "start_time": "2011-08-15T18:21:51Z",
//      "updated_at": null
//  },
//  {
//      "created_at": null,
//      "end_time": "2011-09-06T18:21:51Z",
//      "id": null,
//      "name": "optimize open-source systems",
//      "start_time": "2011-08-22T18:21:51Z",
//      "updated_at": null
//  },
//  {
//      "created_at": null,
//      "end_time": "2011-08-30T18:21:51Z",
//      "id": null,
//      "name": "incubate back-end content",
//      "start_time": "2011-08-29T18:21:51Z",
//      "updated_at": null
//  }];
//}
