describe("Bindings", function() {

  var model, view;
  beforeEach(function() {
    model = new Backbone.Model;
    view = new View(model);
  });

  describe("bindings from the view to the model", function() {
    describe("bindings for input[type=text]", function() {
      var fixture = "<input type='text' data-binding='name'/>";

      beforeEach(function() {
        $(view.el).append(fixture);
        setup();
      });

      it("should send the new value of the model attribute on keyup", function() {
        var input = $("#jasmine_content input[data-binding]");
        console.log(input)
        input.val("New Name").keyup();
        expect(model).toHaveAttrs({name: "New Name"});
      });

    });
  });

  function setup() {
    $("#jasmine_content").append(view.el);
  }

  function View(model) {
    var self = new Backbone.View({model: model});
    _.extend(self, Bindings);
    self.viewBindings();
    return self;
  }

});
