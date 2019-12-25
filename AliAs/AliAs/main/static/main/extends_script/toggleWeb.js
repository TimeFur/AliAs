chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	
	var data = { 
		type: "FROM_EXTENSION_VIDEOURL", 
		videoUrl: "NONE",
	};
	
	switch(request.type)
	{
		case "TOGGLESELF_SEND_YTURL":
		
			//send to Alias url
			data.videoUrl = request.videoUrl;
			window.postMessage(data, "*");
			
			sendResponse("TOGGLESELF RESPONSE TO BG");
		break;
		
		default:
		break;
	}
	
	return true;
});