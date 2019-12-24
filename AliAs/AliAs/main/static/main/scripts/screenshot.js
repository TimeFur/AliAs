$(document).ready(function(){
	$("#screenshot_id").click(function(){
		var data = { 
			type: "FROM_PAGE", 
			text: "Screen Shot!" 
		};
		console.log("Click Screenshot");
		
		//send to extension [content]
		window.postMessage(data, "*");
	});

	window.addEventListener('message', function(event){
		
		if (event.source != window) 
			return;
		
		switch(event.data.type)
		{
			//get videoUrl response from extension [content]
			case "FROM_EXTENSION_VIDEOURL":
				console.log("FROM_EXTENSION_VIDEOURL URL = " + event.data.videoUrl);
				
				//send videoUrl to [view]
				$.ajax({
					type: "POST",
					url: "/getVideoUrl/",
					data: {
						"videoUrl": event.data.videoUrl
					},
					success: function(response){
						console.log("VideoUrl send done");
						$("#scrText").text(response);
						$('#videoSrc').attr('src', response);
					}
				});
			break;
			
			//get Screenshot response from extension [content]
			case "FROM_EXTENSION":
				console.log("Show Screenshot");
				
				//set to image src	
				$('#imgList').append('<img id="img_id" src="' + event.data.imgSrc + '" width = 100 height = 100 />');
				// $('<img id="img_id" src="' + event.data.imgSrc + '" width = 100 height = 100 />').appendTo('#imgList'); 
				
				//send to [view]
				$.ajax({
					type: "POST",
					url: "/imgsrc/",
					data: {
						"imgSrc": event.data.imgSrc
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
