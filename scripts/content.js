console.log('this is content script');

const observer = new MutationObserver(function (mutations, mutationInstance) {
  mutations.forEach(function (mutation) {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      mutation.addedNodes.forEach(function (addedNode) {
        if (addedNode.id === 'cart_body' && addedNode.firstChild.className === 'inner_cont') {
          console.log('content script is running');
          chrome.runtime.sendMessage({ content: 'content scrips is ready', ID : 1 }, function (response) {
            console.log(response.acknowledgement);
            console.log('sent message to service worker');
          });
        }
      });
    }
  });
});

observer.observe(document, {
  childList: true,
  subtree: true,
});

let itemNameQuery = null;
let priceQuery = null;
let quantityQuery = null;
let elementString = null;
let item = null;
let price = null;
let quantity = null;

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) { 
    if (message.ID === 4) {
      console.log(message.ID);
      console.log(message.command);
      sendResponse({ acknowledgement: 'command received' });
      const elementList = [];
      const count = document.querySelectorAll('#cart_list > ol > li').length;
          for (let i = 1; i <= count; i++) {
            checkboxQuery = '#cart_list > ol > li:nth-child(' + i + ') > div.cart--basket_footer > div > div:nth-child(1) > span.format-price > span > strong';
            itemNameQuery = '#cart_list > ol > li:nth-child(' + i + ') > div.cart--basket_body > div > ul > li > div > div.item_info > dl > dd > div.section.item_title > a > span';
            priceQuery = '#cart_list > ol > li:nth-child(' + i + ') > div.cart--basket_body > div > ul > li > div > div.item_info > dl > dd > div.section__wrapper > div.section__item--right > div.section.item_price > span > span > strong';
            quantityQuery = '#cart_list > ol > li:nth-child(' + i + ') > div.cart--basket_body > div > ul > li > div > div.item_info > dl > dd > div.section__wrapper > div.section__item--left > div.section.item_qty > div > input';
            if(document.querySelector(checkboxQuery) === null) {
              console.log('checkbox is not found');
              chrome.runtime.sendMessage({ ID: 7, command: 'show paragraph' } , function (response) {
                console.log(response.acknowledgement);
              });
            } else {
              if (document.querySelector(checkboxQuery).textContent !== '0') {
                item = document.querySelector(itemNameQuery);
                if (item !== null) {
                  price = document.querySelector(priceQuery);
                  if (price !== null) {
                    let elementString = item.textContent + ',' + price.textContent.replace(/,/g, '');
                    quantity = document.querySelector(quantityQuery);
                    if (quantity !== null) {
                      console.log('lulu');
                      elementString += ',' + quantity.value;
                      console.log(elementString);
                      elementList.push(elementString);
                      if (i === count) {
                        console.log('beautiful');
                        console.log(elementList);
                        chrome.runtime.sendMessage({ type: 'variable', data: elementList });
                      }
  
                    } else {
                      console.log(i + 'th quantity is not found');
                    }
                  } else {
                    console.log(i + 'th price is not found');
                  }
                } else {
                  console.log(i + 'th item is not found');
                }
              } else {
                console.log(i + 'th checkbox is not checked');
              };
            }  
              
          };
          console.log('beautiful');
          console.log(elementList);
          chrome.runtime.sendMessage({ ID: 5, type: 'variable', data: elementList } , function (response) {
            console.log(response.acknowledgement);
          });
          console.log('sent message 5 to service worker');
    } else {
      console.log('message is not received');
    }
});
