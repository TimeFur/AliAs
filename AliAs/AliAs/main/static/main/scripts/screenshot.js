
async function screenShot(){
	var data = { 
		type: "FROM_PAGE", 
		text: "Screen Shot!" 
	};
	
	console.log("Scrrenshot");
	//send to extension [content]
	window.postMessage(data, "*");
	
	//wait response from extension [content]
	window.addEventListener('message', function(event){
		var imgSrc = document.getElementById("img_id");
		
		if (event.source != window) 
			return;

		if (event.data.type && event.data.type == 'FROM_EXTENSION') {
			console.log('From Content script received: ' + event.data.imgSrc);
			
			//set to image src	
			imgSrc.src = event.data.imgSrc;
			
			//
		}
	  },
	  false
	);
	
	return true;
}