
async function screenShot(){
	var data = { 
		type: "FROM_PAGE", 
		text: "Screen Shot!" 
	};
	
	//send to extension
	window.postMessage(data, "*");
	
	//wait response from extension
	window.addEventListener('message', function(event){
		
		if (event.source != window) 
			return;

		if (event.data.type && event.data.type == 'FROM_EXTENSION') {
			console.log('Content script received: ' + event.data.text);
		}
	  },
	  false
	);
}
