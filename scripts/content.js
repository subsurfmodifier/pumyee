console.log('content.js running');

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.message === 'lala') {
            console.log('lala received');
            const link = document.createElement('a');
            const blob = new Blob(['lala']);
            link.href = URL.createObjectURL(blob);
            link.download = 'data.csv';
            link.click();
    }
})



