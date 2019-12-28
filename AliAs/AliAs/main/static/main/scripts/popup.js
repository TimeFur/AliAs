
$(document).ready(function(){
	var popupHoverFlag = false;
	var hoverFlag = false;
	var hiddenTime = 125;
	var popupImgObj = document.getElementById("popImgId");
	var popupSearchObj = $('#btn_popImgSearch');
	var popupDelObj = $('#btn_popImgDel');
	
	//Popup Click event
	popupSearchObj.click(function(){
		popupImgObj = document.getElementById("popImgId");
		imgSrc = popupImgObj['src'];
		
		//send imgSrc to [view]
		$.ajax({
			type: "POST",
			url: "/imgsearch/",
			data: {
				"imgSrc": imgSrc
			},
			success: function(response){
				console.log(response);
			}
		});
		
		// console.log(popupImgObj);
	});
	
	popupDelObj.click(function(){
		var delId;
		
		popupImgObj = document.getElementById("popImgId");
		
		delId = popupImgObj['name'];
		document.getElementById(delId).remove();
		
		console.log("Del imgId = " + delId);
	});
	
	//Hover event
	$('#imgList').hover(function(){
		console.log("handler in");
		hoverFlag = true;
		
		//loop imgList item & bind hover event
		var children = document.getElementById('imgList').children;
		$.each(children, function(index, value){
			
			$('#' + value['id']).hover(function(event){
				
				console.log("X: " + event.pageX + ",Y: " + event.pageY);
				
				//show popup form
				
				popFormSwitch("POPUP", value, event);
			}, function(event){
				hiddenPopupForm(hiddenTime);
			});	
		});
		
	}, 	function(){
		hoverFlag = false;
		console.log("handler out");
		
		hiddenPopupForm(hiddenTime);
		
		//unbind element hover
		var children = document.getElementById('imgList').children;
		$.each(children, function(index, value){
			$('#' + value['id']).unbind();
		});
	});
	
	$('#popupImgForm').hover(function(){
		popupHoverFlag = true;
	}, function(){
		popupHoverFlag = false;
		
		hiddenPopupForm(hiddenTime);
	});
	
	
	
	function popFormSwitch(cmd, imgInfo, event)
	{
		//imgInfo is HTML format ['id'] ['src'] ['width'] ['height']
		var popupObject = document.getElementById('popupImgForm');
		var posX = '0px';
		var posY = '0px';
		
		if (event != null && imgInfo != null)
		{
			posX = ($('#' + imgInfo['id']).position().left + $('#' + imgInfo['id']).width()) + 'px';
			posY = ($('#' + imgInfo['id']).position().top - $('#popupImgForm').height()) + 'px';
		}
		
		console.log("imgList posX = " + posX + ", posY = "+ posY);
		if (cmd == "POPUP")
		{
			document.getElementById('popImgId').src = imgInfo['src'];
			document.getElementById('popImgId').name = imgInfo['id'];
			popupObject.style.left = posX;
			popupObject.style.top = posY;
			popupObject.style.display = "block";
		}
		else if(cmd == "HIDDEN")
		{
			popupObject.style.top = "0px";
			popupObject.style.left = "0px";
			popupObject.style.display = "none";
		}
	}
	
	function hiddenPopupForm(hidden_timeout){
		setTimeout(function(){
			if (popupHoverFlag == false && hoverFlag == false)
			{
				//hidden popup form
				popFormSwitch("HIDDEN", null, null);	
			}	
		}, hidden_timeout);
	}
})
