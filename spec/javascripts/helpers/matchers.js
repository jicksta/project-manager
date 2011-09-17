var QUACKS_LIKE = {};
QUACKS_LIKE[Gantt.Models.Project] = function(operand) {
  return "lengthOfTimeInDays" in operand;
}

beforeEach(function() {
  this.addMatchers({

    toBeCloseTo: function(number, options) {
      var delta = options.delta;
      return (this.actual >= number - delta) && (this.actual <= number + delta);
    },

    quacksLike: function(klass) {
      return QUACKS_LIKE[klass].call(this, this.actual);
    },

    toHaveAttrs: function(attributes) {
      var model = this.actual;
      if(!model.get) throw("Operand must be a Backbone model!");

      for(var key in attributes) {
        if(attributes.hasOwnProperty(key)) {
          var value = attributes[key];
          var modelValue = model.get(key);
          if(modelValue != value) {
            expect(modelValue).toEqual(value);
            return false;
          }
        }
      }
      return true;
    }
  })
});
