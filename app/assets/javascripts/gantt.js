var Gantt = {};

(function(ns) {

  var NOW = new Date("Mon, 27 Jun 2011 19:35:16 -0700");

  var DEFAULT_WEEKS_IN_VIEW = 6;

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

  var nowMarker, projectViews, projectsContainer, weeks = [], weeksContainer, earliestDate, latestDate;

  var currentZoom;

  function newInit(projects) {

    weeksContainer = $(".weeks"), nowMarker = $(".vertical-line");

    var allDateStrings = projects.pluck("start").concat(projects.pluck("end"));
    var allDates = _.map(allDateStrings, function(dateString) {
      return new Date(dateString);
    });

    earliestDate = _.min(allDates, function(date) { return Math.min(NOW, date); });
    latestDate   = _.max(allDates, function(date) { return Math.max(NOW, date); });

    var numberOfWeeks = 1 + latestDate.getWeek() - earliestDate.getWeek();

    var weekNumberingOffsetFromNow = NOW.getWeek() - earliestDate.getWeek();

    for (var i = 0; i < numberOfWeeks; i++) {
      var weekDistance = i - weekNumberingOffsetFromNow;
      var week = $("<div/>")
          .addClass("week")
          .text(weekDistance > 0 ? "+" + weekDistance : weekDistance)
          .appendTo(weeksContainer)
          .addClass((i % 2 == 0) ? "even" : "odd");
      weeks.push(week);
    }

    projectsContainer = $(".projects").hide();

    projectViews = projects.map(function(project) {
      var projectView = $("<div/>").addClass("project").data("project", project);
      projectView.text(project.name);
      projectsContainer.append(projectView);
      return projectView;
    });

    setZoom(DEFAULT_WEEKS_IN_VIEW);

    $("#zoom-in").click(function() {
      var newZoom = Math.max(1, currentZoom - 1);
      setZoom(newZoom);
    });

    $("#zoom-out").click(function() {
      setZoom(currentZoom + 1);
    });

    projectsContainer.show();

  }

  function setZoom(numberOfWeeksInView) {
    var weekWidthPercentage = 100 / numberOfWeeksInView;
    var dayWidthPercentage = weekWidthPercentage / 7;

    _(weeks).each(function(week) {
      week.css("width", weekWidthPercentage + "%")
    });

    _(projectViews).each(function(projectView) {
      var project = projectView.data("project");

      var start = new Date(project.start), end = new Date(project.end);
      var lengthOfTimeInWeeks = end.getWeek() - start.getWeek();

      projectsContainer.append(projectView);

      projectView.css({
        width: (weekWidthPercentage * lengthOfTimeInWeeks) + "%",
        left: leftOffset(start)
      });

      nowMarker.css("left", leftOffset(NOW));
    });

    currentZoom = numberOfWeeksInView;

    function leftOffset(date) {
      return ((date.getWeek() - earliestDate.getWeek()) * weekWidthPercentage) + (date.getDay() * dayWidthPercentage) + "%";
    }

  }

})(Gantt);
