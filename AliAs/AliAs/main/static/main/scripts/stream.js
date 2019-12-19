const videoElem = document.getElementById("video");
const logElem = document.getElementById("log");
const startElem = document.getElementById("start");
const stopElem = document.getElementById("stop");

// Options for getDisplayMedia()
var displayMediaOptions = {
	video: {
		cursor: "always"
	},
	audio: false
};

// Set event listeners for the start and stop buttons
startElem.addEventListener("click", function(evt) {
  startCapture();
}, false);

stopElem.addEventListener("click", function(evt) {
  stopCapture();
}, false);

async function startCapture() {
	logElem.innerHTML = "";

	try {
		videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
	} catch(err) {
		console.error("Error: " + err);
	}
}

async function startstream(displayMediaOptions){
	let captureStream = null;
	
	try{
		captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
		dumpOptionsInfo();
	}catch(err){
		console.error("Error: " + err);
	}
	
	return captureStream;
}

function dumpOptionsInfo() {
	const videoTrack = videoElem.srcObject.getVideoTracks()[0];

	console.info("Track settings:");
	console.info(JSON.stringify(videoTrack.getSettings(), null, 2));
	console.info("Track constraints:");
	console.info(JSON.stringify(videoTrack.getConstraints(), null, 2));
}