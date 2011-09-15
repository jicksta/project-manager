beforeEach(function() {
  $("#jasmine_content").empty().unbind();
  Gantt.unbind();
});

function kvp(key,value) {
  var pair = {};
  pair[key] = value;
  return pair;
}