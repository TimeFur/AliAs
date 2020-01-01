var player = null;
var readyUrlId = "";

$(document).ready(function(){
	$("#btn0_id").click(function(event){
		if (player != null){
			console.log("Player current time = " + player.getCurrentTime());
		}
	});
});



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
}

window.getYTCurrentTime = function(){
	if (player != null)
		return player.getCurrentTime();
	return 0;
}
window.ytrFirstUrlId = function(url){
	urlArray = url.split('/');
	urlLength = url.split('/').length;
	readyUrlId = urlArray[urlLength - 1];
	
	console.log("Get first urlId = " + urlArray[urlLength - 1]);
}

function setVideoId(urlId){
	if (player != null){
		player.cueVideoById(urlId, 0, 'large');	
	}
}

function initialize(event){
	if (readyUrlId != "")
		player.cueVideoById(readyUrlId, 0, 'large');
	console.log("Get init urlId = " + readyUrlId);	
}

function stateChange(event){
	if (event.data == YT.PlayerState.PLAYING) {
		console.log("state change = " + event.data);
	}
}
