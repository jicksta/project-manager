Gantt.bind("init:details", function() {
  var detailsView;
  var detailsContainer = $(".details").first().get();

  Gantt.bind("gantt:show-event", showProjectDetails);

  function showProjectDetails(model) {
    var view = new Gantt.Views.DetailsView({model:model}).render();
    if (detailsView) {
      $(detailsView.el).replaceWith(view.el);
    } else {
      $(detailsContainer).append(view.el);
    }
    detailsView = view;
  }
});