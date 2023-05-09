// Welcome page
chrome.runtime.onInstalled.addListener(function() {
    chrome.tabs.create({ url: "welcome/index.html" });
});

// Milweb URL handler
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.linkUrl) {
		// Create a new tab and open the first webpage
		chrome.tabs.create({ url: message.linkUrl }, async (firstTab) => {
		  // Wait for the first webpage to finish loading
		  await new Promise((resolve) => {
			chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
			  if (tabId === firstTab.id && changeInfo.status === 'complete') {
				chrome.tabs.onUpdated.removeListener(listener);
				resolve();
			  }
			});
		  });

		  chrome.storage.local.set({ lastFlightOperator: message.fo }).then(() => {
			console.log("Value is set to " + message.fo);
		  });
	
		  // Update the URL of the first tab to the second webpage
		  chrome.tabs.update(firstTab.id, { url: `https://milweb.airfrance-is.com/MilordWeb/flightInfo.do?searchAirlDsgCd=${message.fo}&searchFlightNumber=${message.fn}&searchFltIdDtWDate=${message.fd}&action=search&` });
		});
	  }
});
  