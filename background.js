console.log('background is running');

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.message === 'checkbox not found') {
        chrome.runtime.sendMessage(request);
    }
});