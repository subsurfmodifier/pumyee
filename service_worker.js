console.log('background running');

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if(message === 'content up and running') {
        console.log('content up and running');
        chrome.runtime.sendMessage('content up and running');
    }
})

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if(message === 'createCSV') {
        console.log('received');
        chrome.runtime.sendMessage('createCSV');
    }
})

console.log('done');

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.type === 'variable') {
        chrome.runtime.sendMessage(message);
    }
})
