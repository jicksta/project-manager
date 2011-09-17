var Bindings = {};
(function(ns) {

  var SELECTORS = {};
  SELECTORS.hasTrigger = "[data-triggers]";
  SELECTORS.hasBinding = "[data-binding]";
  SELECTORS.textFields = "input" + SELECTORS.hasBinding;

  ns.viewBindings = function viewBindings() {
    var $el = $(this.el),
        model = this.model;

    viewChangesDirectModelChanges();
    modelChangesDirectViewChanges();

    return this;

    function viewChangesDirectModelChanges() {
      $el.delegate(SELECTORS.textFields, {
        keyup: function() {
          var modelAttribute = this.getAttribute("data-binding"),
              valueFromView = typedVal.call(this);

          model.set(kvp(modelAttribute, valueFromView), {avoidCycles: this});
        }
      });
    }

    // Note: Performance of this could probably be improved with low-level DOM events
    function modelChangesDirectViewChanges() {
      var elementsWithBindings = $el.find(SELECTORS.hasBinding);
      if ($el.is(SELECTORS.hasBinding)) elementsWithBindings = elementsWithBindings.andSelf();

      elementsWithBindings.each(function() {
        var element = this,
            modelAttribute = element.getAttribute("data-binding");
        model.bind("change:" + modelAttribute, function(model, newValue, options) {
          if (options.avoidCycles != element) typedVal.call(element, newValue);
        });

        typedVal.call(element, model.get(modelAttribute));
      });

    }

  };

  ns.setupTriggers = function setupTriggers(bus, target) {
    if (!target.jQuery) target = $(target);
    target.delegate(SELECTORS.hasTrigger, {
      click: function() {
        var eventNames = $(this).attr("data-triggers").split(/\s+/);
        _.each(eventNames, function(eventName) {
          bus.trigger(eventName);
        });
      }
    });
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
