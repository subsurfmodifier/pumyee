console.log('popup running');

const download = document.getElementById('download');
const warningDiv = document.getElementById('warning');
const referenceDiv = document.getElementById('reference');
const wrongWebsiteDiv = document.getElementById('wrongWebsite');
warningDiv.style.display = 'none';
referenceDiv.style.display = 'none';
wrongWebsiteDiv.style.display = 'block';
download.style.display = 'none';
async function addReference() {
  const currentTab =  await chrome.tabs.query({active: true, currentWindow: true});
  if(currentTab[0].url === "https://www.i-screammall.co.kr/order/cart") {
    referenceDiv.style.display = 'block';
  } 
  if(currentTab[0].url === "https://www.i-screammall.co.kr/order/cart"|currentTab[0].url == "https://cart.gmarket.co.kr/ko/pc/cart/#/") {
    wrongWebsiteDiv.style.display = 'none';
    download.style.display = 'block';
  }
}
addReference();

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




