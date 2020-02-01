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
	
	$('#downloadVideoId').click(function(){
		downloadVideo();
	});
	
	$('#editId').click(function(){
		var urlhref = '/editPage/';
		var videoID = $("#videoFrameId").attr('videourl');
		var getDict = 'videoUrl=' + videoID;
		var imgTag = document.getElementsByTagName('img');
		var postArray = {};
		
		var formData = new FormData();
		
		//get img element
		for (var i = 0; i < imgTag.length; i++){
			
			if (imgTag[i].getAttribute('id') != null
				&& imgTag[i].getAttribute('id') != 'popImgId'){
				
				var imgDict = JSON.stringify({	'src': imgTag[i].getAttribute('src'),
												'curtime': imgTag[i].getAttribute('currenttime'),
												'text': imgTag[i].getAttribute('col-text'),
												'videoId': videoID});
				formData.append(imgTag[i].getAttribute('id'), 
								imgDict);
								
				$.ajax({
					url: '/editInfo/',
					type: 'POST',
					cache: false,
					data: formData,
					processData: false,
					contentType: false
				}).done(function(res) {
				}).fail(function(res) {});
				
				formData.delete(imgTag[i].getAttribute('id'));
			}
		}
		
		formData.append('videoUrl', videoID);
		$.ajax({
			url: '/editInfo/',
			type: 'POST',
			cache: false,
			data: formData,
			processData: false,
			contentType: false
		}).done(function(res) {
			//this will store the history
			var videoKey = videoID.substr(videoID.indexOf("?v=") + 3,);
			window.location = urlhref + videoKey;
		}).fail(function(res) {});
		
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
						//set url to playercontrol script
						window.ytrFirstUrlId(response['videoUrl']);
						$('#videoTitle').text(response['videoTitle']);
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
		var searchHTML;
		var retHTML = '';
		var resultHTML;
		
		$.get("/search/", {'search_msg' : search_msg}, function(ret){
			var appendFlag = true;
			
			//check whether search_msg is already exist or not
			searchList = document.getElementById('searchInfoId');
			if (searchList != null){
				// console.log(searchList.childNodes.length);
				for (var i = 0; i < searchList.childNodes.length; i++){
					if (searchList.childNodes[i].childNodes[0] != null){
						// console.log(searchList.childNodes[i].childNodes[0].id);
						if (searchList.childNodes[i].childNodes[0].id == search_msg)
							appendFlag = false;
					}
				}	
			}
			
			//append text
			if (ret != "" && appendFlag == true){	
				searchHTML = '<font size="5" color="orange" id=' + search_msg + '>' + search_msg + ':' + '</font>';
				retHTML = '<font size="3">' + ret + '</font>';
				resultHTML = '<div id = "searchItemId">' + searchHTML + retHTML + '</div>';
				
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
