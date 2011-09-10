Gantt.bind("init:timeline", function() {
  var timelineParentElement = $(".timeline:first").get();
  new Gantt.Views.TimelineView({
    projects: PROJECTS_JSON,
    el: timelineParentElement
  }).render();
});