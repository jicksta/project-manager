var Gantt = {Views: {}, Models: {}, Collections: {}, Presenters: {}};
_.extend(Gantt, Backbone.Events);

(function(ns) {
  var now = new Date("Mon, 27 Jun 2011 19:35:16 -0700");

  ns.now = function() {
    return now;
  };

  ns.setTime = function(time) {
    now = time;
  }
  
})(Gantt);

$(function() {
  Bindings.setupTriggers(Gantt, document.body);
});