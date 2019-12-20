
//https://pjchender.github.io/2019/05/21/chrome-content-script/
window.addEventListener('message', function(event){
	
    // We only accept messages from ourselves
	var data = { 
		type: "FROM_EXTENSION", 
		text: "Data from content js" 
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
					//console.log(response.screenshot_url);
					console.log("Response from background: " + response);
					
					//send response
					data.text = response;
					window.postMessage(data, "*");
			});
			
		break;
		
		default:
		break;
	}
  },
  false
);