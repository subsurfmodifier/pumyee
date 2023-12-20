console.log('this is content script');
importScripts('./message.js');

const messageReceiverHandler = module.messageReceiverHandler;
let itemNameQuery = null;
let priceQuery = null;
let quantityQuery = null;
let item = null;
let price = null;
let quantity = null;

const observer = new MutationObserver(function (mutations, mutationInstance) {
  mutations.forEach(function (mutation) {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      mutation.addedNodes.forEach(function (addedNode) {
        if (addedNode.id === 'cart_body' && addedNode.firstChild.className === 'inner_cont') {
          chrome.runtime.sendMessage({  ID : 1, conmmand: 'content scripst is ready'});
        }
      });
    }
  });
});

observer.observe(document, {
  childList: true,
  subtree: true,
});

const elementList = [];
      const count = document.querySelectorAll('#cart_list > ol > li').length;
          for (let i = 1; i <= count; i++) {
            checkboxQuery = '#cart_list > ol > li:nth-child(' + i + ') > div.cart--basket_footer > div > div:nth-child(1) > span.format-price > span > strong';
            itemNameQuery = '#cart_list > ol > li:nth-child(' + i + ') > div.cart--basket_body > div > ul > li > div > div.item_info > dl > dd > div.section.item_title > a > span';
            priceQuery = '#cart_list > ol > li:nth-child(' + i + ') > div.cart--basket_body > div > ul > li > div > div.item_info > dl > dd > div.section__wrapper > div.section__item--right > div.section.item_price > span > span > strong';
            quantityQuery = '#cart_list > ol > li:nth-child(' + i + ') > div.cart--basket_body > div > ul > li > div > div.item_info > dl > dd > div.section__wrapper > div.section__item--left > div.section.item_qty > div > input';
            if(document.querySelector(checkboxQuery) === null) {
              console.log('checkbox is not found');
              chrome.runtime.sendMessage({ ID: 7, command: 'show paragraph' });
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
                        console.log('this is the elementList:' , elementList);
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

const storage = {variable : elementList};
messageReceiverHandler(4, 'sending elementList to the background', storage);




      
