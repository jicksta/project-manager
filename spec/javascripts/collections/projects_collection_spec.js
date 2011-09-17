describe("Collections.ProjectsCollection", function() {
  describe("#latestDate", function() {
    it("should return undefined when the collection is empty", function() {
      var collection = new Gantt.Collections.ProjectsCollection;
      expect(collection.latestDate()).toBeUndefined();
    });
  });
});
