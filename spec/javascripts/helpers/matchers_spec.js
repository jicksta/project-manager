describe("Matcher meta-specs", function() {
  describe("#beCloseTo", function() {

    assertClose({target: 100, expected: 99, within: 1});
    assertClose({target: 0.5, expected: 1.5, within: 1});
    assertClose({target: -5, expected: -7, within: 2});

    assertNotClose({target: -5, expected: -7, within: 1});
    assertNotClose({target: 10, expected: 3, within: 3});

    function assertClose(options) {
      it("should return true if " + options.target + " is within " + options.target + " of " + options.expected, function() {
        expect(options.target).toBeCloseTo(options.expected, {delta: options.within});
      });
    }

    function assertNotClose(options) {
      it("should return false if " + options.target + " is NOT within " + options.target + " of " + options.expected, function() {
        expect(options.target).not.toBeCloseTo(options.expected, {delta: options.within});
      });
    }
    
  });

  describe("#quacksLike", function() {
    it("should work with a project", function() {
      expect(new Gantt.Models.Project).quacksLike(Gantt.Models.Project);
    });
  });
});