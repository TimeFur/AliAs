$(document).ready(function(){
	$("#screenshot_id").click(function(){
		var data = { 
			type: "FROM_PAGE", 
			text: "Screen Shot!" 
		};
		console.log("Screenshot");
		
		//send to extension [content]
		window.postMessage(data, "*");
		
		//wait response from extension [content]
		window.addEventListener('message', function(event){
			var imgSrc = document.getElementById("img_id");
			
			if (event.source != window) 
				return;

			switch(event.data.type)
			{
				case "FROM_EXTENSION":
					//set to image src	
					imgSrc.src = event.data.imgSrc;
					
					//send to [view]
					$.ajax({
						type: "POST",
						url: "/imgsrc/",
						data: {
							"imgSrc": imgSrc.src
						},
						success: function(response){
							
						}
					});
				break;
			}
		  },
		  false
		);
			
	});

	//get videoUrl response from extension [content]
	window.addEventListener('message', function(event){
		
		if (event.source != window) 
			return;
		
		switch(event.data.type)
		{
			case "FROM_EXTENSION_VIDEOURL":
				console.log("FROM_EXTENSION_VIDEOURL URL = " + event.data.videoUrl);
			break;
		}
	  },
	  false
	);	
});
