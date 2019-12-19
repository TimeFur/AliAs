
//https://pjchender.github.io/2019/05/21/chrome-content-script/
window.addEventListener('message', function(event){
	//var port = chrome.runtime.connect();
    // We only accept messages from ourselves
	var data = { 
		type: "FROM_EXTENSION", 
		text: "Data from content js" 
	};
	
    if (event.source != window) 
		return;

	//get message
    if (event.data.type && event.data.type == 'FROM_PAGE') {
		console.log('Website received: ' + event.data.text);
		
		//send response
		window.postMessage(data, "*");
    }
  },
  false
);