Gantt.Presenters.ProjectPresenter = function(projectView) {
  var self = new Backbone.Model;

  self.bind("change:width", function() {
    setWidth(self.get("width"));
  });

  return self;

  function setWidth(widthPercent) {
    if(widthPercent !== undefined) {
      $(projectView.el).css("width", widthPercent.toString() + "%");
    }
  }

};
