console.log('popup running');
const warningDiv = document.getElementById('warning');
console.log(warningDiv);
warningDiv.style.display = 'none';

const download = document.getElementById('download');
download.addEventListener('click', sendMessage);
async function sendMessage() {
  const activeTab = await chrome.tabs.query({active: true, currentWindow: true});
  chrome.tabs.sendMessage(activeTab[0].id, {message: 'download'});
  warningDiv.style.display === 'none';
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if(request.message === 'checkbox not found') {
    warningDiv.style.display = 'block';
  }
});

