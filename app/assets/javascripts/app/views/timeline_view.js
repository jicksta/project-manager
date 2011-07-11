Gantt.Views.TimelineView = Backbone.View.extend({

  events: {
    "click .zoom-in": "zoomIn",
    "click .zoom-out": "zoomOut"
  },

  DEFAULT_WEEKS_IN_VIEW: 5,
  
  initialize: function(options) {
    var self = this;

    _.bindAll(self, "zoomIn", "zoomOut", "render");

    self.weeks = [];
    self.projects = new Gantt.Collections.ProjectsCollection(options.projects);

    self.numberOfWeeks = 1 + self.projects.latestDate().getWeek() - self.projects.earliestDate().getWeek();
    self.weekNumberingOffsetFromNow = Gantt.now().getWeek() - self.projects.earliestDate().getWeek();
  },

  render: function() {
    var self = this;

    self.projectsContainer = self.$(".projects").hide();
    self.weeksContainer = self.$(".weeks");
    self.nowMarker = self.$(".vertical-line");

    renderWeeks();
    renderProjects();
    
    self._setZoom(self.DEFAULT_WEEKS_IN_VIEW);

    self.projectsContainer.show();

    function renderWeeks() {
      for (var i = 0; i < self.numberOfWeeks; i++) {
        var weekDistance = i - self.weekNumberingOffsetFromNow;
        var week = $("<div/>")
            .addClass("week")
            .text(weekDistance > 0 ? "+" + weekDistance : weekDistance)
            .appendTo(self.weeksContainer)
            .addClass((i % 2 == 0) ? "even" : "odd");
        self.weeks.push(week);
      }
    }

    function renderProjects() {
      self.projectViews = self.projects.map(function(project) {
        var projectView = new Gantt.Views.ProjectView({model: project}).render();
        self.projectsContainer.append(projectView.el);
        return projectView;
      });
    }
    return self;
  },

  zoomIn: function() {
    var newZoom = Math.max(1, this.currentZoom - 1);
    this._setZoom(newZoom);
  },

  zoomOut: function() {
    this._setZoom(this.currentZoom + 1);
  },

  _setZoom: function(numberOfWeeksInView) {
    var self = this;
    self.currentZoom = numberOfWeeksInView;

    var weekWidthPercentage = 100 / numberOfWeeksInView;
    var dayWidthPercentage = weekWidthPercentage / 7;
    _(self.weeks).each(function(week) {
      week.css("width", weekWidthPercentage + "%")
    });

    _(self.projectViews).each(function(projectView) {
      var project = projectView.model;

      var start = new Date(project.get("start")), end = new Date(project.get("end"));
      var lengthOfTimeInWeeks = end.getWeek() - start.getWeek();

      self.projectsContainer.append(projectView);

      $(projectView.el).css({
        width: (weekWidthPercentage * lengthOfTimeInWeeks) + "%",
        left: leftOffset(start)
      });

      self.nowMarker.css("left", leftOffset(Gantt.now()));
    });

    function leftOffset(date) {
      var dateWeek = date.getWeek();
      var earliestWeek = self.projects.earliestDate().getWeek();
      var dateDay = date.getDay();
      return ((dateWeek - earliestWeek) * weekWidthPercentage) + dateDay * dayWidthPercentage + "%";
    }

  }
});
