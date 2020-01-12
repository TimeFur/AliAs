$(document).ready(function(){
	$("#search_btn").click(function(){
		sendSearchText();
	});
	$("#searchID").keyup(function(event){
		if (event.keyCode == 13)
			sendSearchText();
	});
	
	$("#searchVideo_btn").click(function(){
		console.log("Click");
		var videoID = $("#searchVideo_ID").val();
		
		$.get("/searchVideo/", {"videoID" : videoID}, function(ret){
			
		})
	});
	
	$('#btn0_id').click(function(){
		downloadVideo();
	});
	
	$('#editId').click(function(){
		var urlhref = '/editPage';
		var videoID = $("#videoFrameId").attr('videourl');
		var getDict = 'videoUrl=' + videoID;
		var imgTag = document.getElementsByTagName('img');
		var postArray = [];
		var postImgItem = {};
		
		postImgItem['videoUrl'] = videoID;
		postArray.push(postImgItem);
		//get img element
		for (var i = 0; i < imgTag.length; i++){
			if (imgTag[i].getAttribute('id') != 'popImgId'){
			
				postImgItem = {};
				postImgItem[imgTag[i].getAttribute('id')] = ['imgSrc', 
															 imgTag[i].getAttribute('currenttime'),
															 imgTag[i].getAttribute('col-text')];
				postArray.push(postImgItem);
			}
		}
		console.log(postArray);
		
		//Set imgList data to Database
		$.ajax({
			type: "POST",
			url: "/editInfo/",
			data: {
				postArray
			},
			success: function(response){
				location.replace(urlhref);
			}
		});
	});
	//From content extension by window listener
	window.addEventListener('message', function(event){
		
		if (event.source != window) 
			return;
		
		switch(event.data.type)
		{
			//get videoUrl response from extension [content]
			case "FROM_EXTENSION_VIDEOURL":
				console.log("FROM_EXTENSION_VIDEOURL URL = " + event.data.videoUrl);
				$('#videoFrameId').attr('videourl', event.data.videoUrl);
				
				//send videoUrl to [view.py]
				$.ajax({
					type: "POST",
					url: "/getVideoUrl/",
					data: {
						"videoUrl": event.data.videoUrl
					},
					success: function(response){
						console.log("VideoUrl send done = " + response);
						
						//set url to playercontrol script
						window.ytrFirstUrlId(response);
						// $('#videoSrc').attr('src', response);
					}
				});
			break;
		}
	  },
	  false
	);
	
	function sendSearchText(){
		var search_msg = $("#searchID").val();
		var searchHTML = '<font size="5" color="orange">' + search_msg + ':' + '</font>';
		var retHTML = '';
		var resultHTML;
		
		$.get("/search/", {'search_msg' : search_msg}, function(ret){
			if (ret != ""){
				retHTML = '<font size="3">' + ret + '</font>';
				resultHTML = searchHTML + retHTML;
				$('#searchInfoId').append(resultHTML);
			}
		})
	}
	
	function downloadVideo(){
		var url = $('#videoFrameId').attr('videourl');
				
		//send videoUrl to [view.py]
		$.ajax({
			type: "POST",
			url: "/downloadVideo/",
			data: {
				"videoUrl": url
			},
			success: function(response){
				
			}
		});
	}
});
