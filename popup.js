console.log('popup running');

await chrome.runtime.sendMessage({message: 'hello from popup'});

document.addEventListener('DOMContentLoaded', function() {
    const sendMessageButton = document.getElementById('myButton');
    
    sendMessageButton.addEventListener('click', async function() {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      console.log(tab);

      //await chrome.tabs.sendMessage(tab.id, {message: 'hello from popup'})
      await chrome.runtime.sendMessage({message: 'hello from popup'});
    });

});
