chrome.runtime.onInstalled.addListener(function(){
	chrome.storage.sync.set({color: '#3aa757'}, function(){
		console.log("The color is green.");
	});
});

//https://stackoverflow.com/questions/18794407/chrome-extension-api-chrome-tabs-capturevisibletab-on-background-page-to-conten
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	
	switch(request.type)
	{
		case "FROM_CONTENT_SCREENSHOT":
			var image_url = "None";
			
			chrome.tabs.captureVisibleTab(
				null, 
				{}, 
				function (dataUrl) {
					image_url = dataUrl;
					sendResponse({imgSrc : dataUrl});
				}
			);
		break;
		
		default:
			console.log("chrome listener default");
			sendResponse('default!!!');
		break;
	}
	//allow sendResponse async, let captureVisibleTab sendReponse
	return true;
});