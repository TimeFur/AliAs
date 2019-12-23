document.getElementById("scrshot_id").addEventListener("click", function(){
	
	//https://stackoverflow.com/questions/4573956/taking-screenshot-using-javascript-for-chrome-extensions/4574782
	chrome.tabs.captureVisibleTab(null, {}, function (image_url) {
		document.getElementById("response_id").innerHTML=image_url;
	});
});

chrome.tabs.query({"currentWindow":true, 'active': true}, function(tabs){
	var url = tabs[0].url;
	var id = tabs[0].id;
	var regex = 'https://www.youtube.com/watch\\?v='
	var createUrl = "http://127.0.0.1:8000/alias/";
	
	// var executeCommand = 'var data = { type: "FROM_PAGE", text: "Screen Shot!" };	window.postMessage(data, "*");';
	var executeCommand = 'console.log("Get in")';
	
	
	console.log("Current URL = " + url);
	if (url.match(regex))
	{
		//open alias website
		chrome.tabs.create({'url': createUrl}, function(tabs){
			
		});	
	}
});
