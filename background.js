// Listen for messages from the content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

	// Save default settings to local storage
	chrome.storage.local.set({ prettifySettings: request });

	// Send a response back to the content script
	sendResponse({ message: "Hello from background script!" });
});