chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if(message == 'content up and running') {
    console.log('got the message from the popup side');
      const create = document.getElementById('create');
    console.log(create);
    function createCSV() {
      chrome.runtime.sendMessage('createCSV');
    };
    create.addEventListener('click', createCSV);
    create.addEventListener('click', console.log('clicking'));
    
    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
      if (message.type === 'variable') {
        const elementList = message.data;
        const itemName = 'Item, Price, Quantity' + '\n' + elementList.join('\n');
        const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), itemName], {type:'text/csv;charset=utf-8'});
        console.log(blob);
        console.log('lala');
        const download = document.createElement('button');
        download.id = 'download';
        download.addEventListener('click', downloadCSV);
        function downloadCSV() {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'data.csv';
          link.click();
        };
      }
    });
    }});
    
 









  