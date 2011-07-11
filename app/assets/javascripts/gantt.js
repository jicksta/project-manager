function i(what) {
  var description;
  if(arguments.length == 2) {
    description = what;
    what = arguments[1];
  }
  if(description) {
    console.log(description, what)
  } else {
    console.log(what);
  }
  return what;
}

var Gantt = {Views: {}, Models: {}, Collections: {}};

(function() {
  var now = new Date("Mon, 27 Jun 2011 19:35:16 -0700");

  Gantt.now = function() {
    return now;
  };

  Gantt.setTime = function(time) {
    now = time;
  }

})();
