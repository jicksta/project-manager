Gantt.Views.TimelineView = Backbone.View.extend({

  events: {
    "click .zoom-in": "zoomIn",
    "click .zoom-out": "zoomOut"
  },

  DEFAULT_WEEKS_IN_VIEW: 5,

  initialize: function(options) {
    var self = this;

    _.bindAll(self, "zoomIn", "zoomOut", "render", "_recalculateComputedProperties", "_addProjectViewFromProject");

    self.weeks = [];
    self.projects = new Gantt.Collections.ProjectsCollection(options.projects || []);

    self._recalculateComputedProperties();

    Gantt.bind("new-project", function() {
      var project = new Gantt.Models.Project;
      self.projects.add(project);
      self._addProjectViewFromProject(project);
      self._recalculateComputedProperties();
      Gantt.trigger("gantt:show-event", project);
    });
  },

  render: function() {
    var self = this;

    self.projectsContainer = self.$(".projects").hide();
    self.weeksContainer = self.$(".weeks");
    self.nowMarker = self.$(".vertical-line");

    renderWeeks();

    self.projectViews = [];
    self.projects.each(self._addProjectViewFromProject);

    self._setZoom(self.DEFAULT_WEEKS_IN_VIEW);

    self.projectsContainer.show();

    Gantt.trigger("gantt:show-event", self.projects.first());

    return self;

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
  },

  _addProjectViewFromProject: function(project) {
    var projectView = new Gantt.Views.ProjectView({model: project}).render();
    this.projectsContainer.append(projectView.el);
    this.projectViews.push(projectView);
    return projectView;
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
    var numberOfDaysInView = 7 * numberOfWeeksInView;

    self.currentZoom = numberOfWeeksInView;

    var weekWidthPercentage = 100 / numberOfWeeksInView;
    var dayWidthPercentage = weekWidthPercentage / 7;
    _(self.weeks).each(function(week) {
      week.css("width", weekWidthPercentage + "%")
    });

    _(self.projectViews).each(function(projectView) {
      var project = projectView.model;

      projectView.render({
        widthPercentage: dayWidthPercentage * project.lengthOfTimeInDays(),
        startOffsetPercentage: leftOffset(project.get("start_time"))
      });

      self.nowMarker.css("left", leftOffset(Gantt.now()));
    });

    function leftOffset(date) {
      var dateWeek = date.getWeek();
      var earliestWeek = self.projects.earliestDate().getWeek();
      var dateDay = date.getDay();
      return ((dateWeek - earliestWeek) * weekWidthPercentage) + dateDay * dayWidthPercentage + "%";
    }

  },

  _recalculateComputedProperties: function() {
    if (this.projects.length === 0) {
      this.numberOfWeeks = 0;
      this.weekNumberingOffsetFromNow = 0;
    } else {
      this.numberOfWeeks = 1 + this.projects.latestDate().getWeek() - this.projects.earliestDate().getWeek();
      this.weekNumberingOffsetFromNow = Gantt.now().getWeek() - this.projects.earliestDate().getWeek();
    }
  }
});
