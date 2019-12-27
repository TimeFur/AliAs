$(document).ready(function(){
	
	var id = 0;
	var imgArray = [];
	var videoObject = $("#videoFrameId");
	var videoSrcObject = $("#videoSrc");
	var videoScanFrmObject = $("#videoScanFrmId");
	
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
	
	// videoFrameMouseListen();
	
	//window listener
	window.addEventListener('message', function(event){
		
		if (event.source != window) 
			return;
		
		switch(event.data.type)
		{			
			//get Screenshot response from extension [content]
			case "FROM_EXTENSION":
				console.log("Show Screenshot");
				
				//crop image as video frame
				cropImage(event.data.imgSrc);
				
				// sendImgSrc(event.data.imgSrc);
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
	
	function cropImage(src){
		var img = new Image;
		var posX = videoSrcObject.position().left;
		var posY = videoSrcObject.position().top;
		var videoWidth = videoSrcObject.width();
		var videoHeight = videoSrcObject.height();
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		var imgCanvasSrc;
		
		canvas.width = videoSrcObject.width();
		canvas.height = videoSrcObject.height();
		
		img.src = src;
		img.onload = function(){
			ctx.drawImage(	img, 
							posX ,posY, 
							videoWidth, videoHeight,
							0 ,0, 
							canvas.width, canvas.height);
			imgCanvasSrc = canvas.toDataURL();
			
			sendImgSrc(imgCanvasSrc);
		};
	}
	
	function sendImgSrc(imgSource){
		//set to image src
		insertImgSrc(id, imgSource, 0);
		id = id + 1;
		
		//send to [view]
		$.ajax({
			type: "POST",
			url: "/imgsrc/",
			data: {
				"imgSrc": imgSource
			},
			success: function(response){
				
			}
		});
	}
	/*----------------------------------
		Video Frame Scanning flow
	----------------------------------*/
	function videoFrameMouseListen(){
		var cur_width;
		var cur_height;
		var targetWidth = 50;
		var detectFlag = 0;
		var mousePosX = -1;
		var mousePosY = -1;
		var scanTime = 10;
		
		//set interval to scan
		setInterval(function(){
			cur_left = videoScanFrmObject.position().left;
			cur_top = videoScanFrmObject.position().top;
			
			if (detectFlag < 3){	
				videoScanFrmObject.css('width', $("#videoFrameId").width() / 50);
				videoScanFrmObject.css('height', $("#videoFrameId").height());
				videoScanFrmObject.css("top", $("#videoFrameId").position().top);
				
				//Scan frame
				if (cur_left < $("#videoFrameId").width() - videoScanFrmObject.width())
					cur_left = cur_left + videoScanFrmObject.width();
				else
					cur_left = $("#videoFrameId").position().left;
				videoScanFrmObject.css("left", cur_left);
			}else{
				videoScanFrmObject.css('width', targetWidth);
				videoScanFrmObject.css('height', targetWidth);
				videoScanFrmObject.css("left", mousePosX);
				videoScanFrmObject.css("top", mousePosY);
			}
		}, scanTime);
		
		//check the position
		videoScanFrmObject.mouseout(function(event){
			if (mousePosX != event.pageX && mousePosY != event.pageY)
			{
				mousePosX = event.pageX;
				mousePosY = event.pageY;
				detectFlag = 1;
			}
			else if (detectFlag < 10)
			{
				detectFlag += 1;
			}
			
			console.log("video scan mouse mouseout = " + event.pageX + ", " + event.pageY);
		});
		//mouse event
		videoScanFrmObject.mousemove(function(event){
			console.log("Mouse move event = " + event.pageX + ", " + event.pageY);
		});
		videoScanFrmObject.mousemove(function(event){
			console.log("Mouse move event = " + event.pageX + ", " + event.pageY);
		});

		videoScanFrmObject.mousedown(function(event){
			console.log("Mouse Down = " + event.pageX + ", " + event.pageY);
			// $('#videoSrc').css('pointer-events', 'auto');
		});
		videoScanFrmObject.mouseup(function(event){
			console.log("Mouse Up = " + event.pageX + ", " + event.pageY);
			// $('#videoSrc').css('pointer-events', 'none');
		});
	}

});
