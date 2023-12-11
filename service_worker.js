chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.type === 'variable') {
        chrome.runtime.sendMessage(message);
    }
})
