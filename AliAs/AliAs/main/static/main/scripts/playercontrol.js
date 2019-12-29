
var player;

//when loading ytAPI done, then call follow function
function onYouTubeIframeAPIReady() {
	player = new YT.Player('videoSrc', {
		width: 600,
		height: 400,
		videoId: 'SJl1AV9uQbA',
		playerVars: {
			color: 'white',
			playlist: 'taJ60kskkns,FG0fTKAqZ5g'
		},
		events: {
			// onReady: initialize
			'onStateChange': function(event) {
				if (event.data == YT.PlayerState.PLAYING) {
				}
			}
		}
	});
	
	console.log("Youtube api get!!!");
}

