beforeEach(function() {
  this.addMatchers({
    toHaveAttrs: function(attributes) {
      var model = this.actual;
      if(!model.get) throw("Operand must be a Backbone model!");
      
      _.each(attributes, function(value, key) {
        expect(model.get(key)).toEqual(value);
      });
    }
  })
});
