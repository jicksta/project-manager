//beforeEach(function() {
//  this.addMatchers({
//    toBePlaying: function(expectedSong) {
//      var player = this.actual;
//      return player.currentlyPlayingSong === expectedSong &&
//             player.isPlaying;
//    }
//  });
//});

function kvp(key,value) {
  var pair = {};
  pair[key] = value;
  return pair;
}