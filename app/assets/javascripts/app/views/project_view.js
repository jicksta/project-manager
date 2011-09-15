Gantt.Views.ProjectView = Backbone.View.extend({

  className: "project",

  events: {
    "click": "openDetails"
  },

  initialize: function() {
    _.bindAll(this, "openDetails", "render");
  },

  openDetails: function() {
    Gantt.trigger("gantt:show-event", this.model);
  },

  render: function(renderParams) {
    _.extend(this, renderParams);

    $(this.el).css({
      width: this.widthPercentage + "%",
      left: this.startOffsetPercentage
    });

    $(this.el).attr("data-binding", "name");
    this.viewBindings();
    return this;
  }
});

_.extend(Gantt.Views.ProjectView.prototype, Bindings);
