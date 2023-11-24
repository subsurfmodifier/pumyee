function convertHTMLtoCSV(htmlContent) {
  // Implement your logic to convert HTML to CSV
  // This can be a complex task depending on the structure of the HTML
  // You may need to use DOM manipulation or a library like jQuery
  // For simplicity, let's assume a basic conversion for demonstration purposes
  const dummyCSVData = "Header1,Header2,Header3\nValue1,Value2,Value3";
  return dummyCSVData;
}

document.getElementById('convertButton').addEventListener('click', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { action: "convertToCSV" }, function (response) {
      const csvData = convertHTMLtoCSV(response.htmlContent);
      console.log(csvData);
    });
  });
});





  