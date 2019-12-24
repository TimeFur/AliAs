// document.getElementById("scrshot_id").addEventListener("click", function(){
	
	// //https://stackoverflow.com/questions/4573956/taking-screenshot-using-javascript-for-chrome-extensions/4574782
	// chrome.tabs.captureVisibleTab(null, {}, function (image_url) {
		// document.getElementById("response_id").innerHTML=image_url;
	// });	
// });

chrome.tabs.query({"currentWindow":true, 'active': true}, function(tabs){
	var url = tabs[0].url;
	var id = tabs[0].id;
	var regex = 'https://www.youtube.com/watch\\?v='

	if (url.match(regex))
	{
		console.log("Current URL = " + url);
		
		chrome.runtime.sendMessage(
			{	type: "FROM_POPUP_OPENURL",
				currentUrl: url,
				fromTabId: id}, 
			function(response){
				console.log("BG Reponse to popup");
		});
	}
});
