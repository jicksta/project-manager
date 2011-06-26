var Gantt = {};
(function(ns) {
  ns.init = function() {
    var projects = [
      {start: -2, end: 1, name: "Foo"},
      {start: -1, end: 1, name: "Bar"},
      {start: 0, end: 3, name: "Qaz"}
    ];

    initWeeks(projects);
  };

  function initWeeks(projects) {
    var weeks = $(".week");
    var thisWeek = weeks.eq(weeks.length / 2);
    thisWeek.text("WEEK +0");
    weeks.not(thisWeek).text("WEEK +/- X");

    var verticalLine = $(".vertical-line");

    var weekWidth = thisWeek.width();
    var now = new Date(NOW);
    var weekOffset = (weekWidth * now.getDay()) / 6;
    verticalLine.position({
      my: "left top",
      at: "left bottom",
      of: thisWeek,
      offset: String(weekOffset) + " 0"
    });

    var projectsContainer = $(".projects");

    _.each(projects, function(project) {
      var projectView = $("<div/>").addClass("project");
      projectView.text(project.name);

      var startWeekForProject = weeks.eq((weeks.length / 2) + project.start);
      var endWeekForProject = weeks.eq((weeks.length / 2) + project.end);

      var weekSpan = 1 + project.end + Math.abs(project.start);
      projectView.width(weekSpan * weekWidth);

      projectView.css({"margin-left": startWeekForProject.offset().left});

      projectsContainer.append(projectView);

    });


  }
})(Gantt);