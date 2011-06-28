var Gantt = {};

(function(ns) {

  var NOW = new Date("Mon, 27 Jun 2011 19:35:16 -0700");

  var projects = _([
    {"name": "engineer world-class web-readiness", "start": "Mon, 02 May 2011 19:35:16 -0700", "end": "Mon, 16 May 2011 19:35:16 -0700"},
    {"name": "unleash impactful platforms", "start": "Mon, 09 May 2011 19:35:16 -0700", "end": "Mon, 23 May 2011 19:35:16 -0700"},
    {"name": "generate visionary synergies", "start": "Mon, 16 May 2011 19:35:16 -0700", "end": "Mon, 30 May 2011 19:35:16 -0700"},
    {"name": "mesh cross-media interfaces", "start": "Mon, 23 May 2011 19:35:16 -0700", "end": "Mon, 06 Jun 2011 19:35:16 -0700"},
    {"name": "morph value-added communities", "start": "Mon, 30 May 2011 19:35:16 -0700", "end": "Mon, 13 Jun 2011 19:35:16 -0700"},
    {"name": "integrate scalable vortals", "start": "Mon, 06 Jun 2011 19:35:16 -0700", "end": "Mon, 20 Jun 2011 19:35:16 -0700"},
    {"name": "optimize open-source systems", "start": "Mon, 13 Jun 2011 19:35:16 -0700", "end": "Mon, 27 Jun 2011 19:35:16 -0700"},
    {"name": "incubate back-end content", "start": "Mon, 20 Jun 2011 19:35:16 -0700", "end": "Mon, 04 Jul 2011 19:35:16 -0700"}
  ]);

  ns.init = function() {
    newInit(projects);
  };


  function newInit(projects) {

    var allDateStrings = projects.pluck("start").concat(projects.pluck("end"));
    var allDates = _.map(allDateStrings, function(dateString) {
      return new Date(dateString);
    });

    var earliestDate = _.min(allDates, function(date) {
      return Math.min(NOW, date);
    });
    var latestDate   = _.max(allDates, function(date) {
      return Math.max(NOW, date);
    });

    var numberOfWeeks = 1 + latestDate.getWeek() - earliestDate.getWeek();

    var weekWidthPercentage = 100 / numberOfWeeks;
    var dayWidthPercentage = weekWidthPercentage / 7;

    var weeksContainer = $(".weeks");
    for (var i = 0; i < numberOfWeeks; i++) {
      $("<div/>").addClass("week").text(i).appendTo(weeksContainer).css("width", weekWidthPercentage + "%").addClass((i % 2 == 0) ? "even" : "odd");
    }

    var projectsContainer = $(".projects");
    projects.each(function(project) {
      var start = new Date(project.start), end = new Date(project.end);

      var projectView = $("<div/>").addClass("project");
      projectView.text(project.name);

      var lengthOfTimeInWeeks = end.getWeek() - start.getWeek();

      projectsContainer.append(projectView);
      projectView.css({
        width: (weekWidthPercentage * lengthOfTimeInWeeks) + "%",
        "left": leftOffset(start)
      });
    });

    var nowMarker = $(".vertical-line");
    nowMarker.css("left", leftOffset(NOW));

    function leftOffset(date) {
      return ((date.getWeek() - earliestDate.getWeek()) * weekWidthPercentage) + (date.getDay() * dayWidthPercentage) + "%";
    }

  }

})(Gantt);