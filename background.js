console.log('service worker is running');

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.ID === 1) {
        console.log(message.ID);
        console.log(message.content);
        sendResponse({ acknowledgement: 'content ready-message received' });
        chrome.runtime.sendMessage({ ID: 2, content: 'content script is ready', command: 'activate the create button', name: 'apple' }, function (response) {
            console.log(response.acknowledgement);
            console.log('sent message to popup');
        });
    }
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.ID === 3) {
        console.log(message.ID);
        console.log(message.command);
        sendResponse({ acknowledgement: 'command received' });
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs && tabs.length > 0) {
                const activeTabId = tabs[0].id;
                if (activeTabId !== undefined) {
                    chrome.tabs.sendMessage(activeTabId, { ID: 4, command: 'execute content script', content: 'convey message' }, function(response) {
                    console.log(response.acknowledgement);
                    });        
                } else {
                    console.log('activeTabId is undefined');
                }        
            }
        console.log('sent another command');
        chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
            console.log('olleh');
            if (message.ID == 5) {
                console.log(message.ID);
            } else {
                console.log('message is not received');
            };
            console.log(message.type);
            console.log('trying to access message 5');
            sendResponse({ acknowledgement: 'command received' });
            let elementList = message.data;
            console.log(elementList);
            chrome.runtime.sendMessage({ ID: 6, type: 'variable', data: elementList }, function (response) {
                console.log(response.acknowledgement);
            });
        });
        });
    }
});

    

console.log('service worker is still running');

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.ID === 7) {
        console.log(message.ID);
        console.log(message.command);
        sendResponse({ acknowledgement: 'command received' });
        chrome.runtime.sendMessage({ ID: 8, command: 'show paragraph' } , function (response) {
            console.log(response.acknowledgement);
        });
    }
});
    
      




