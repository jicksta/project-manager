describe("Presenters.ProjectPresenters", function() {
  it("should set the width of the project's view when the width property of the presenter changes", function() {
    var view = new Backbone.View;
    var presenter = new Gantt.Presenters.ProjectPresenter(view);

    presenter.set({width: 42});

    expect(viewWidth()).toEqual("42%");

    function viewWidth() { return $(view.el).css("width") }
  });

});
