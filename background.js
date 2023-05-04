chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	let iata = message.officeIata.split(' ')[1];
	console.log(message);
	if (message.action === 'callApi') {
		// Make a request to a random API
		fetch(`https://oscar.airfrance-is.com/oscar/portalAmadeusTransaction.do?method=sendCrypticCommand&crypticRequest=PV%2F${iata}&numEmulator=1&officeId=${message.officeId}`)
			.then(response => response.text())
			.then(data => {
				let match = data.match(/(?<=^NAM\*OFFICE\sNAME\s{6}\-\s)(.*)/gm);
				console.log(match);
				sendResponse(match);
			})
			.catch(error => {
				console.error(error);
				sendResponse(message.officeIata);
			});

		// Return true to indicate that sendResponse will be called asynchronously
		return true;
	}
});
