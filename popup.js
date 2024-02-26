console.log('popup running');
async function addReference() {
  const currentTab =  await chrome.tabs.query({active: true, currentWindow: true});
  if(currentTab[0].url === "https://www.i-screammall.co.kr/order/cart") {
    referenceDiv.style.display = 'block';
  }
}
addReference();
const warningDiv = document.getElementById('warning');
const referenceDiv = document.getElementById('reference');
warningDiv.style.display = 'none';
referenceDiv.style.display = 'none';

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
})




