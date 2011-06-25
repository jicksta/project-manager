var Gantt = {};
(function(ns) {
  ns.init = function() {
    var weeks = $(".week");
    var thisWeek = weeks.eq(weeks.length / 2);
    thisWeek.text("WEEK +0");
    weeks.not(thisWeek).text("WEEK +/- X");

    var verticalLine = $(".vertical-line");

    var weekWidth = thisWeek.width();
    var now = new Date(NOW);
    var weekOffset = (weekWidth * now.getDay()) / 6;
    verticalLine.position({
      my: "left top",
      at: "left bottom",
      of: thisWeek,
      offset: String(weekOffset) + " 0"
    });
  };
})(Gantt);