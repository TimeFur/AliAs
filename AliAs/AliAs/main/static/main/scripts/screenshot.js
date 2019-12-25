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
		// document.getElementById('popupImgForm').style.display = "block";
	});
	
	//Hover event
	$('#imgList').hover(function(){
		console.log("handler in");
		
		//loop imgList item & bind hover event
		var children = document.getElementById('imgList').children;
		$.each(children, function(index, value){
			
			$('#' + value['id']).hover(function(event){
				
				console.log("X: " + event.pageX + ",Y: " + event.pageY);
				
				//show popup form
				popFormSwitch("POPUP", value, event);
			}, function(event){
				//hidden popup form
				popFormSwitch("HIDDEN", value, event);
			});	
		});
		
	}, 	function(){
		console.log("handler out");
		
		//unbind element hover
		var children = document.getElementById('imgList').children;
		$.each(children, function(index, value){
			$('#' + value['id']).unbind();
		});
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
	
	function popFormSwitch(cmd, imgInfo, event)
	{
		//imgInfo is HTML format ['id'] ['src'] ['width'] ['height']
		var popupObject = document.getElementById('popupImgForm');
		var posX = '0px';
		var posY = '0px';
		
		if (event != null)
		{
			posX = ($('#' + imgInfo['id']).position().left + $('#' + imgInfo['id']).width()) + 'px';
			posY = ($('#' + imgInfo['id']).position().top - $('#popupImgForm').height()) + 'px';
		}
		
		console.log("imgList posX = " + posX + ", posY = "+ posY);
		if (cmd == "POPUP")
		{
			document.getElementById('popImgId').src = imgInfo['src'];
			popupObject.style.left = posX;
			popupObject.style.top = posY;
			popupObject.style.display = "block";
		}
		else if(cmd == "HIDDEN")
		{
			// popupObject.style.left = "0px";
			popupObject.style.display = "none";
		}
	}
});
