// https://oscar.airfrance-is.com/oscar/portalAmadeusTransaction.do?method=sendCrypticCommand&crypticRequest=PV%2F${iataOfficeId}&numEmulator=1&officeId=${officeId}
// /(?<=^NAM\*OFFICE\sNAME\s{6}\-\s)(.*)/gm

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === 'callApi') {
		// Make a request to a random API
		fetch('https://randomuser.me/api/?format=xml')
			.then(response => response.text())
			.then(data => {
				let match = data.match(/(?<=\<name\>).*(?=\<\/name\>)/);
				sendResponse(match);
			})
			.catch(error => {
				console.error(error);
				sendResponse(null);
			});

		// Return true to indicate that sendResponse will be called asynchronously
		return true;
	}
});
