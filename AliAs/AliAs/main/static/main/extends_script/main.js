document.getElementById("scrshot_id").addEventListener("click", function(){
	
	document.getElementById("response_id").innerHTML="Get click!";
	
	//https://stackoverflow.com/questions/4573956/taking-screenshot-using-javascript-for-chrome-extensions/4574782
	chrome.tabs.captureVisibleTab(null, {}, function (image_url) {
		document.getElementById("response_id").innerHTML=image_url;
	});
});