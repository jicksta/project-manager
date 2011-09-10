var Bindings = {};
(function(ns) {

  var SELECTORS = {
    textFields: "input[data-binding]",
    withBindings: "[data-binding]"
  };

//  ns.$fnMixin = { typedVal: typedVal };

  ns.viewBindings = function viewBindings() {
    var el = this.el,
        $el = $(this.el),
        model = this.model;

    $el.delegate(SELECTORS.textFields, "keyup", function() {
      var modelAttribute = this.getAttribute("data-binding"),
          valueFromView = typedVal.call(this);

      model.set(kvp(modelAttribute, valueFromView), {avoidCycles: this});
    });

    var elementsWithBindings = $el.find(SELECTORS.withBindings);
    if ($el.is(SELECTORS.withBindings)) elementsWithBindings = elementsWithBindings.andSelf();

    elementsWithBindings.each(function() {
      var element = this,
          modelAttribute = element.getAttribute("data-binding");
      model.bind("change:" + modelAttribute, function(model, newValue, options) {
        if (options.avoidCycles != element) typedVal.call(element, newValue);
      });

      typedVal.call(element, model.get(modelAttribute));
    });

    return this;
  };

  // JavaScript doesn't provide a literal to get an object with a dynamic key.
  function kvp(key, value) {
    var pair = {};
    pair[key] = value;
    return pair
  }

  function typedVal() {
    var element = $(this);

    var fn = (arguments.length == 1) ? setter : getter;
    return fn.apply(this, arguments);

    function getter() {
      if (element.is(":text")) {
        return element.val()
      } else {
        return element.text();
      }
    }

    function setter(value) {
      if (element.is(":text")) {
        element.val(value);
      } else {
        if (value === "" || value === null || value === undefined) {
          element.html("&nbsp;");
        } else {
          element.text(value);
        }
      }
      return value;
    }
  }

})(Bindings);
