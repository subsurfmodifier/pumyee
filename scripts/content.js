let itemNameQuery = null;
let priceQuery = null;
let quantityQuery = null;
let elementString = null;
const elementList = [];
let item = null;
let price = null;
let quantity = null;

console.log('content is running');

const observer = new MutationObserver(function (mutations, mutationInstance) {
    mutations.forEach(function (mutation) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach(function (addedNode) {
          if (addedNode.id === 'cart_body' && addedNode.firstChild.className === 'inner_cont') {
            chrome.runtime.sendMessage('content up and running');
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log('initiating messageListener');
    if(message == 'createCSV') {
        const count = document.querySelectorAll('#cart_list > ol > li').length;
    for (let i = 1; i <= count; i++) {
    itemNameQuery = '#cart_list > ol > li:nth-child(' + i + ') > div.cart--basket_body > div > ul > li > div > div.item_info > dl > dd > div.section.item_title > a > span';
    priceQuery = '#cart_list > ol > li:nth-child(' + i + ') > div.cart--basket_body > div > ul > li > div > div.item_info > dl > dd > div.section__wrapper > div.section__item--right > div.section.item_price > span > span > strong';
    quantityQuery = '#cart_list > ol > li:nth-child(' + i + ') > div.cart--basket_body > div > ul > li > div > div.item_info > dl > dd > div.section__wrapper > div.section__item--left > div.section.item_qty > div > input';
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
        if(i === count) {
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
    };
    console.log('beautiful');
    console.log(elementList);
    chrome.runtime.sendMessage({ type: 'variable', data: elementList });
    }
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
       
   