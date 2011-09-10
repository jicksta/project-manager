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
        loadFixture(fixture);
        setup();
      });

      it("should send the new value of the model attribute on keyup", function() {
        var input = $("#jasmine_content input[data-binding]");
        input.val("New Name").keyup();
        expect(model).toHaveAttrs({name: "New Name"});
      });

    });
  });

  function setup() {
    var parent = $("#jasmine_content");
    Bindings.init(parent);
  }

  function View(model) {
    var self = new Backbone.View({model: model});
    return self;
  }

});