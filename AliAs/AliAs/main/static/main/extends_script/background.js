chrome.runtime.onInstalled.addListener(function(){
	console.log("Alias extension");
});

//https://stackoverflow.com/questions/18794407/chrome-extension-api-chrome-tabs-capturevisibletab-on-background-page-to-conten
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	
	var createUrl = "http://127.0.0.1:8000/alias/";
	
	switch(request.type)
	{
		case "FROM_CONTENT_SCREENSHOT":
			var image_url = "None";
			chrome.tabs.captureVisibleTab(
				null, 
				{}, 
				function (dataUrl) {
					image_url = dataUrl;
					sendResponse({imgSrc : dataUrl});
				}
			);
		break;
		
		case "FROM_POPUP_OPENURL":
			var curTabUrl = request.currentUrl;
			var fromTabId = request.fromTabId;
			
			// open Alias website
			chrome.tabs.create({'url': createUrl}, function(tabs){
				
				var msg = {
					type: "TOGGLESELF_SEND_YTURL",
					videoUrl: curTabUrl
				}
				
				// setTimeout(function(){injectContentScript(tabs.id, msg)}, 2000);
				injectContentScript(tabs.id, msg);
			});
			
			sendResponse('RESPONSE TO POPUP');
		break;
		
		default:
			alert("BG default");
			console.log("chrome listener default");
			sendResponse('default!!!');
		break;
	}
	//allow sendResponse async, let captureVisibleTab sendReponse
	return true;
});

//https://www.bennettnotes.com/post/fix-receiving-end-does-not-exist/
function injectContentScript(id, msg){
	//inject content scripts & send tab message
	chrome.tabs.executeScript(	null, {file: "toggleWeb.js"},	function(res){
								chrome.tabs.sendMessage(id, 
														msg, 
														function(response){
								});
	});
}