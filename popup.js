console.log('popup running');

const create = document.getElementById('create');
console.log(create);
create.addEventListener('click', sendMessage);
async function sendMessage() {
  const activeTab = await chrome.tabs.query({active: true, currentWindow: true});
  const response = await chrome.tabs.sendMessage(activeTab[0].id, {message: 'lala'});
  console.log(response);

  chrome.tabs.sendMessage(activeTab[0].id, {message: 'lala'}, function (response) {
    console.log(response);
  });
}