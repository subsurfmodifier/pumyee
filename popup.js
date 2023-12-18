console.log('popup is running');


chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.ID === 2) {
        console.log(message.ID);
        console.log(message.command);
        sendResponse({ acknowledgement: 'content ready-message received on the popup side' });
        
            const create = document.getElementById('create_csv');
            function handleButtonClick() {
                chrome.runtime.sendMessage({ ID: 3, command: 'execute content script' }, function (response) {
                    console.log(response.acknowledgement);
                });
            }
            console.log(create);
            create.addEventListener('click', handleButtonClick);
        
    }
    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        if (message.ID === 6) {
            console.log(message.ID);
            sendResponse({ acknowledgement: 'command received' });
            const elementList = message.data;
            console.log('this is the elementList:' , elementList);
            const itemName = 'Item, Price, Quantity' + '\n' + elementList.join('\n');
            const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), itemName], { type: 'text/csv;charset=utf-8' });
            console.log(blob);
            console.log('lala');
            const div = document.getElementById('download_div');
            console.log(div);
            const button = document.createElement('button');
            div.appendChild(button);
            button.id = 'download';
            button.textContent = 'Download';
            const link = document.createElement('a');
            button.appendChild(link);
            console.log(link);
            link.href = URL.createObjectURL(blob);
            link.download = 'data.csv';
            button.addEventListener('click', function () {
                link.click();
            });
        }
    });
});















