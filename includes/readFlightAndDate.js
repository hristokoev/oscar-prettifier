const readFlightAndDate = () => {
	let elements = document.querySelectorAll(".highlight-line");
	let elementsLength = elements.length;
	for (let i = 0; i < elementsLength; i++) {
		let flight = elements[i].querySelector(".hljs-flight");
		let date = elements[i].querySelector(".hljs-time");
		if (flight !== null) {
			let flightOperator = flight.textContent.match(/(?<=^)(AF|KL)/gm).toString();
			let flightNumber = flight.textContent.match(/(?<=^(AF|KL))[ 0-9]{1,4}/gm).toString();
			let flightDate = convertDaysMilweb(date.textContent);
			if (flightOperator == "KL") {
				flightNumber = flightNumber.replace(" ", "0");
			}
			let anchor = document.createElement("a");
			anchor.href = `https://milweb.airfrance-is.com/MilordWeb/logon.do?action=changeLocalAirline&localAirline=${flightOperator}`;
			anchor.target = "_blank";
			elements[i].replaceChild(anchor, flight);
			anchor.appendChild(flight);
			
			// Add a click event listener to the link
			anchor.addEventListener('click', (event) => {
				// Prevent the default link behavior
				event.preventDefault();

				let lastOperator;
				chrome.storage.local.get(["lastFlightOperator"])
				.then((result) => {
					lastOperator = result.lastFlightOperator;
					if (lastOperator == flightOperator) {
						window.open(`https://milweb.airfrance-is.com/MilordWeb/flightInfo.do?searchAirlDsgCd=${flightOperator}&searchFlightNumber=${flightNumber}&searchFltIdDtWDate=${flightDate}&action=search&`)			
					} else {
						// Send a message to the background script to open the pages
						chrome.runtime.sendMessage({ linkUrl: anchor.href, fo: flightOperator, fn: flightNumber, fd: flightDate });
					}
				});			
			});
		}
	}
}