chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === 'callApi') {
		// Make a request to a random API
		fetch('https://official-joke-api.appspot.com/random_joke')
			.then(response => response.json())
			.then(data => {
				// Send the API response back to the content script
				sendResponse(data);
			})
			.catch(error => {
				console.error(error);
				sendResponse(null);
			});

		// Return true to indicate that sendResponse will be called asynchronously
		return true;
	}
});
