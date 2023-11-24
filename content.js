chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "convertToCSV") {
      const htmlContent = document.documentElement.outerHTML;
      
      // Access sender details
      const senderExtensionId = sender.id;
      const senderTabId = sender.tab ? sender.tab.id : null;
      
      // Log sender details
      console.log("Received message from extension:", senderExtensionId);
      console.log("Sender tab ID:", senderTabId);
  
      // Send the HTML content as a response
      sendResponse({ htmlContent });
    }
  });

  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "convertToCSV") {
      const htmlContent = document.documentElement.outerHTML;
      sendResponse({ htmlContent });
    }
  });
  