console.log('content.js running');

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    if (request.message === 'lala') {
        console.log('sasa');
        let itemNameQuery = null;
        let priceQuery = null;
        let quantityQuery = null;
        let item = null;
        let price = null;
        let quantity = null;

              const elementList = [];
              const count = document.querySelectorAll('#cart_list > ol > li').length;
                  for (let i = 1; i <= count; i++) {
                    checkboxQuery = '#cart_list > ol > li:nth-child(' + i + ') > div.cart--basket_footer > div > div:nth-child(1) > span.format-price > span > strong';
                    itemNameQuery = '#cart_list > ol > li:nth-child(' + i + ') > div.cart--basket_body > div > ul > li > div > div.item_info > dl > dd > div.section.item_title > a > span';
                    priceQuery = '#cart_list > ol > li:nth-child(' + i + ') > div.cart--basket_body > div > ul > li > div > div.item_info > dl > dd > div.section__wrapper > div.section__item--right > div.section.item_price > span > span > strong';
                    quantityQuery = '#cart_list > ol > li:nth-child(' + i + ') > div.cart--basket_body > div > ul > li > div > div.item_info > dl > dd > div.section__wrapper > div.section__item--left > div.section.item_qty > div > input';
                    if(document.querySelector(checkboxQuery) === null) {
                      console.log('checkbox is not found');
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
                              console
                              if (i === count) {
                                console.log('beautiful');
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
                    console.log('beautiful');
                    console.log(elementList);
                    const itemName = 'Item, Price, Quantity' + '\n' + elementList.join('\n');
                    const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), itemName], { type: 'text/csv;charset=utf-8' });
                    console.log(blob);
                    console.log('lala');
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = 'data.csv';
                    console.log(link);
                    link.click();
                  };
                  
            } else {
              console.log('message is not received');
            }
        });


