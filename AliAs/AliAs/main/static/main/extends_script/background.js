chrome.runtime.onInstalled.addListener(function(){
	chrome.storage.sync.set({color: '#3aa757'}, function(){
		console.log("The color is green.");
	});
});


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	
	switch(request.type)
	{
		case "FROM_CONTENT_SCREENSHOT":
			var image_url = "None";
			chrome.tabs.captureVisibleTab(null, {}, function (image) {
				image_url = image;
			});
			sendResponse(image_url);
		break;
		
		default:
			console.log("chrome listener default");
			
			sendResponse('default~~~');
		break;
	}
	
});