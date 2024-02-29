console.log('content.js running');

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    let itemNameQuery = null;
    let priceQuery = null;
    let quantityQuery = null;
    let item = null;
    let price = null;
    let quantity = null;
    let elementList = [];
    const count = document.querySelectorAll('#cart_form > table > tbody> tr').length;

    if (request.message === 'download') {
        for (let i = 1; i <= count; i++) {
            itemNameQuery = '#cart_form > table > tbody > tr:nth-child(' + i + ') > td.relative > dl > dd > a';
            priceQuery = '#cart_form > table > tbody > tr:nth-child(' + i + ') > td:nth-child(3)';
            quantityQuery = '#cart_form > table > tbody > tr:nth-child(' + i + ') > td.cart_num_wrap > div > div:nth-child(1)';
            item = document.querySelector(itemNameQuery);
            if (item !== null) {
                price = document.querySelector(priceQuery);
                if (price !== null) {
                    let elementString = item.textContent.replace(/,/g, '') + ',' + price.textContent.replace(/[,\s원]/g,'');
                    quantity = document.querySelector(quantityQuery);
                    if (quantity !== null) {
                        console.log('lulu');
                        elementString += ',' + quantity.textContent + ',' + price.textContent.replace(/[,\s원]/g,'')*quantity.textContent;
                        console.log(elementString);
                        elementList.push(elementString);
                        console.log(elementList);
                    } else {
                        console.log(i + 'th quantity is not found');
                    }
                } else {
                    console.log(i + 'th price is not found');
                }
            } else {
                console.log(i + 'th item is not found');
            }
        }
    }
    if (elementList.length !== 0) {
        const itemName = '품목, 단가, 수량, 가격' + '\n' + elementList.join('\n');
        const blob = new Blob([itemName]);
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'data.csv';
        link.click();
    }
})
