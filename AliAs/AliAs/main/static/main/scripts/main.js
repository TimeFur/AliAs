$(document).ready(function(){
	$("#search_btn").click(function(){
		var search_msg = $("#search_target").val();
		$.get("/search/", {'search_msg' : search_msg}, function(ret){
			$('#msgcontent').html(ret);
		})
	});
	
	$("#searchVideo_btn").click(function(){
		console.log("Click");
		var videoID = $("#searchVideo_ID").val();
		
		$.get("/searchVideo/", {"videoID" : videoID}, function(ret){
			
		})
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
				
				//send videoUrl to [view.py]
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
		}
	  },
	  false
	);
});
