const observer = new MutationObserver(function (mutations, mutationInstance) {
  mutations.forEach(function (mutation) {
       if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      mutation.addedNodes.forEach(function (addedNode) {
        if (addedNode.id === 'cart_body' && addedNode.firstChild.className === 'inner_cont') {
          const query = 'body > div:nth-child(2) > div:nth-child(2) > div > div > div:nth-child(2) > div > div:nth-child(1) > ol > li:nth-child(n) > div.cart--basket_body > div > ul > li > div > div.item_info > dl > dd > div.section.item_title > a > span';
          const itemList = document.querySelectorAll(query);
          let elementList = [];
          itemList.forEach((item) => {
            elementList.push(item.textContent); 
          });
          chrome.runtime.sendMessage({type: 'variable', data: elementList});         
        } 
      });
    } 
  });
});

observer.observe(document, {
  childList: true,
  subtree: true,
});





