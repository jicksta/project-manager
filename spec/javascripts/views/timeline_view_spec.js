describe("Views.TimelineView's", function() {

  describe("initialization", function() {


    describe("with no projects", function() {
      var view;

      beforeEach(function() {
        view = new Gantt.Views.TimelineView({
          el: document.getElementById("jasmine_content"),
          projects: []
        }).render();
      });

      it("should have a numberOfWeeks of 0", function() {
        expect(view.numberOfWeeks).toEqual(0);
      });

      it("should have a weekNumberingOffsetFromNow of 0", function() {
        expect(view.weekNumberingOffsetFromNow).toEqual(0);
      });

    });

  });

  describe("handling the new-project event", function() {

    var view;
    beforeEach(function() {
      loadFixture("main");
      view = new Gantt.Views.TimelineView({
        projects: [],
        el: document.getElementById("jasmine_content")
      }).render();
    });

    it("should add a new a new view to its 'projectViews' property and the DOM", function() {
      expect(view.projectViews.length).toEqual(0);
      Gantt.trigger("new-project");
      expect(view.projectViews.length).toEqual(1);
      var projectView = view.projectViews[0].el;
      expect($(projectView).closest("body").get(0)).toEqual(document.body);
    });

    it("should add a new project to its 'projects' property", function() {
      expect(view.projects.length).toEqual(0);
      Gantt.trigger("new-project");
      expect(view.projects.length).toEqual(1);
    });

    it("should trigger the show project event with the new project", function() {
      var showSpy = jasmine.createSpy();
      Gantt.bind("gantt:show-event", showSpy);
      Gantt.trigger("new-project");
      expect(showSpy).toHaveBeenCalled();
      expect(showSpy.mostRecentCall.args[0]).quacksLike(Gantt.Models.Project);
    });

  });

  xdescribe("calculation of view width percentages", function() {

    var projectsData = [
      { start_time: "2011-01-01T00:00:00Z", end_time: "2011-01-03T00:00:00Z", name: "Doesn't matter" },
      { start_time: "2011-03-03T00:00:00Z", end_time: "2011-01-06T00:00:00Z", name: "Doesn't matter" },
      { start_time: "2011-06-01T00:00:00Z", end_time: "2011-01-09T00:00:00Z", name: "Doesn't matter" }
    ];

    it('should take on the width of its contained projects', function() {
      var view = new Gantt.Views.TimelineView({projects: projectsData}).render();
      var width = $(view.el).css("width");
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
