$(document).ready(function(){
	
	var id = 0;
	var imgArray = [];
	var videoObject = $("#videoFrameId");
	
	//Click listener
	$("#screenshot_id").click(function(){
		var data = { 
			type: "FROM_PAGE", 
			text: "Screen Shot!" 
		};
		console.log("Click Screenshot");
		
		//send to extension [content]
		window.postMessage(data, "*");
	});
	
	$("#btn0_id").click(function(){
		// document.getElementById('popupImgForm').style.display = "block";
	});
	
	//mouse event
	// videoObject.mousemove(function(event){
		// console.log("Mouse event = " + event.pageX + ", " + event.pageY);
	// });
	
	//window listener
	window.addEventListener('message', function(event){
		
		if (event.source != window) 
			return;
		
		switch(event.data.type)
		{			
			//get Screenshot response from extension [content]
			case "FROM_EXTENSION":
				console.log("Show Screenshot");
				
				//set to image src
				insertImgSrc(id, event.data.imgSrc, 0);
				id = id + 1;
				
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
	
	function insertImgSrc(id, imgSrc, videoTime){
		var img_id = "imgList_item" + id;
		var imgDict = {};	
		var insertImgHtml = '<img id="' + img_id + '" src="' + imgSrc + '" width = 100 height = 100 />'
		
		imgDict['id'] = img_id;
		imgDict['imgSrc'] = imgSrc;
		imgDict['videoTime'] = videoTime;
		imgArray.push(imgDict);
		
		$('#imgList').append(insertImgHtml);	
	}
});
