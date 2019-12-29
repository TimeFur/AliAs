
var player = null;

//when loading ytAPI done, then call follow function
function onYouTubeIframeAPIReady() {
	player = new YT.Player('videoSrc', {
		width: 600,
		height: 400,
		// videoId: 'SJl1AV9uQbA',
		playerVars: {
			color: 'white',
			// playlist: 'taJ60kskkns,FG0fTKAqZ5g'
		},
		events: {
			'onReady': initialize,
			'onStateChange': stateChange
		}
	});

	console.log("Youtube api get!!!");
}

function setVideoId(url){
	if (player != null){
		player.cueVideoById(url, 0, 'large');	
	}
}

function initialize(event){
	player.cueVideoById('SJl1AV9uQbA', 0, 'large');	
}

function stateChange(event){
	if (event.data == YT.PlayerState.PLAYING) {
		console.log("state change = " + event.data);
	}
}
