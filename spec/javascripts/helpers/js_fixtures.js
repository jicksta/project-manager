var FIXTURE_CACHE = {};

function readFixture(fixtureName) {
  if (fixtureName in FIXTURE_CACHE) {
    return FIXTURE_CACHE[fixtureName];
  } else {
    var url = "/__root__/tmp/js_dom_fixtures/" + fixtureName + ".html";
    FIXTURE_CACHE[fixtureName] = jQuery.ajax({
      async: false,
      url: url
    }).responseText;
    return FIXTURE_CACHE[fixtureName];
  }
}

function loadFixture(fixtureName) {
  return jQuery("#jasmine_content").html(readFixture(fixtureName));
}