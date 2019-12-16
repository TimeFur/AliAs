$(document).ready(function(){
	$("#search_btn").click(function(){
		var search_msg = $("#search_target").val();
		$.get("/search/", {'search_msg' : search_msg}, function(ret){
			$('#msgcontent').html(ret);
		})
	});

	$("#imgclick").click(function(){
		var search_msg = $("#search_target").val();
		$.get("/search/", {'search_msg' : search_msg}, function(ret){
			$('#msgcontent').html(ret);
		})
	});

	$('#circle').click(function(){
		$(this).animate({width:'50px',
						height:'50px'});
	});
	
	$("#loopBtn").click(function(){
		setInterval(function(){
			$("#img").animate({width:"+=1px"});
			
			console.log($('#img').width());
		}, 500);
	});
	
	$("#searchVideo_btn").click(function(){
		console.log("Click");
		var videoID = $("#searchVideo_ID").val();
		
		$.get("/searchVideo/", {"videoID" : videoID}, function(ret){
			
		})
	});
	
});
