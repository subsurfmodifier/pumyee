console.log('content.js running');

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log({ request, sender, sendResponse });
});