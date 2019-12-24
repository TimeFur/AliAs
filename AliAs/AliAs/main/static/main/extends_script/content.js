
//https://pjchender.github.io/2019/05/21/chrome-content-script/
window.addEventListener('message', function(event){
	
    // We only accept messages from ourselves
	var data = { 
		type: "FROM_EXTENSION", 
		imgSrc: "Data from content js" 
	};
	
    if (event.source != window) 
		return;

	switch (event.data.type)
	{
		case "FROM_PAGE":
			//get message
			console.log('Website received = ' + event.data.text);
			
			//call screen shot api [to background.js]
			chrome.runtime.sendMessage(
				{type: "FROM_CONTENT_SCREENSHOT"}, 
				function(response){
					//console.log("Response from background: " + response.imgSrc);
					
					//send response
					data.imgSrc = response.imgSrc;
					window.postMessage(data, "*");
			});
			
		break;
		
		default:
			console.log('Website received = Default');
		break;
	}
  },
  false
);

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