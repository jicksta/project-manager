describe("Bindings", function() {

  var model, view;
  beforeEach(function() {
    model = new Backbone.Model;
    view = new View(model);
  });

  var fixtureTextField = "<input type='text' data-binding='name'/>";

  describe("bindings from the view to the model", function() {
    describe("bindings for input[type=text]", function() {

      beforeEach(function() {
        setup(fixtureTextField);
      });

      it("should send the new value of the model attribute on keyup", function() {
        var changeSpy = jasmine.createSpy("name change spy");
        model.bind("change:name", changeSpy);
        var input = $("#jasmine_content input[data-binding]");
        input.val("New Name").keyup();
        expect(changeSpy).toHaveBeenCalled();
        expect(model.get("name")).toEqual("New Name")
      });

    });
  });

  describe("bindings from the model to the view", function() {
    describe("for a text input binding", function() {
      beforeEach(function() {
        setup(fixtureTextField);
      });

      it("should automatically change the value of the fixture text field", function() {
        model.set({name: "From Model"});
        var input = $("#jasmine_content input[data-binding]");
        expect(input.val()).toEqual("From Model");
      });

    });
  });

  function setup(fixture) {
    $(view.el).html(fixture).appendTo("#jasmine_content");
    view.render().viewBindings();
  }

  function View(model) {
    var self = new Backbone.View({model: model});
    _.extend(self, Bindings);
    return self;
  }

});