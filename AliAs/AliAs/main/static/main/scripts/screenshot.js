$(document).ready(function(){
	
	var id = 0;
	var imgArray = [];
	
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
		// $('#imgList').children().each(function(index){
			// console.log($(this).text());
		// });
		var result = $('#imgList').children().attr("id");
		
		$.each(imgArray, function(index, dict){
			console.log(dict['id']);
		});
	});
	
	//Hover event
	$('#imgList').hover(function(){
		console.log("handler in");
		
		//loop imgList item & bind hover event
		var children = document.getElementById('imgList').children;
		$.each(children, function(index, value){
			$('#' + value['id']).hover(function(){
				console.log("Get imgSrc => " + value['id']);
			}, function(){});	
		});
		
	}, 	function(){
		
		//unbind element hover
		var children = document.getElementById('imgList').children;
		$.each(children, function(index, value){
			$('#' + value['id']).unbind();
		});
		
		$('#imgList').unbind();
	});
	
	//window listener
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
