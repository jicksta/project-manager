Gantt.bind("init:details", function() {
  var detailsView;
  var detailsContainer = $(".details").first().get();

  Gantt.bind("ShowProjectDetails", ShowProjectDetails);

  function ShowProjectDetails(model) {
    var view = new Gantt.Views.DetailsView({model:model}).render();
    if (detailsView) {
      $(detailsView.el).replaceWith(view.el);
    } else {
      $(detailsContainer).append(view.el);
    }
    detailsView = view;
  }
});