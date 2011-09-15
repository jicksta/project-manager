function readFixture(fixtureName) {
  var url = "/__root__/tmp/js_dom_fixtures/" + fixtureName + ".html";
  var response = $.ajax({
    async: false,
    url: url
  }).responseText;

  if(response.length == 0) throw "Fixture \"" + fixtureName + "\" was empty!";

  return response;
}

function loadFixture(fixtureName) {
  $("#jasmine_content").html(readFixture(fixtureName));
}
