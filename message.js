function messageReceiver(i) {
    return new Promise(function (resolve, reject) {
        function messageListener(message, sender, sendResponse) {
            if (message.ID === i) {
                resolve(message);
                chrome.runtime.onMessage.removeListener(messageListener);
            }
        }
        chrome.runtime.onMessage.addListener(messageListener);
        //why add listener here?
    });
}

function messageReceiverHandler(i, commandString, storage, processFunction) {
    messageReceiver(i)
        .then(function (message) {
            console.log(message.ID + 'is received');
            if(storage !== undefined) {
                storage.variable = message.data;
                chrome.runtime.sendMessage({ ID: i + 1, command: commandString, data: storage.variable});
            } else if (commandString !== undefined) {
                chrome.runtime.sendMessage({ ID: i + 1, command: commandString});
            }            
            if(processFunction !== undefined) {
                processFunction();
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}
