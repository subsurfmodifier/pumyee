chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.type === 'variable') {
        const elementList = message.data;
        const itemName = 'Item, Price, Quantity' + '\n' + elementList.join('\n');
        const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), itemName], {type:'text/csv;charset=utf-8'});
        console.log(blob);
        console.log('lala');
        const button = document.getElementById('download');
        console.log(button);

        button.removeEventListener('click', handleButtonClick);

        button.addEventListener('click', handleButtonClick);

        function handleButtonClick() {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'data.csv';
            link.click();
        }
    }
});







  