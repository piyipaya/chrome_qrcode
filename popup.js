// 用来解决一个页面可能会有多个window/document发送href的问题，不是正经的解决办法
virgin = true
chrome.extension.onRequest.addListener(function(data) {
	if(virgin){
		virgin = false
		$("#qrcode").qrcode({width: 256,height: 256,text: data.url})
	}
});

chrome.windows.getCurrent(function (currentWindow) {
	chrome.tabs.query({active: true, windowId: currentWindow.id},
	                  function(activeTabs) {
	  chrome.tabs.executeScript(
	    activeTabs[0].id, {file: 'send_url.js', allFrames: true});
	});
});