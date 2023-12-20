console.log('popup is running');
importScripts('./message.js');

const messageReceiverHandler = module.messageReceiverHandler;

function createButton() {
    function handleButtonClick() {
        chrome.runtime.sendMessage({ ID: 3, command: 'execute content script' });
    }
    const create = document.getElementById('create_csv');
    console.log(create);
    create.addEventListener('click', handleButtonClick);
    }

function createDownloadButton(elementList) {
    if(elementList) {
        console.log('this is the elementList:' , elementList);
        const itemName = 'Item, Price, Quantity' + '\n' + elementList.join('\n');
        const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), itemName], { type: 'text/csv;charset=utf-8' });
        console.log(blob);
        const div = document.getElementById('download_div');
        console.log(div);
    while(div.firstChild) {
        div.removeChild(div.firstChild);
    }
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
    } else {
        console.log('elementList is not found');
    }
};

function createWarningParagraph() {
    const warning = document.getElementById('warning');
    const paragraph = document.createElement('p');
    paragraph.id = 'warning_content';
    warning.appendChild(paragraph);
    paragraph.textContent = 'Please select an item';
};

messageReceiverHandler(2, undefined, undefined, createButton);
messageReceiverHandler(6, undefined, undefined, createDownloadButton);
messageReceiverHandler(8, undefined, undefined, createWarningParagraph);
        















