const readFlightAndDate = () => {
	let elements = document.querySelectorAll(".highlight-line");
	let elementsLength = elements.length;
	for (let i = 0; i < elementsLength; i++) {
	    let flight = elements[i].querySelector(".hljs-flight");
	    let date = elements[i].querySelector(".hljs-time");
	    if (flight !== null) {
		let flightOperator = flight.textContent.match(/(?<=^)(AF|KL)/gm).toString();
		let flightNumber = flight.textContent.match(/(?<=^(AF|KL))[ 0-9]{1,4}/gm).toString();
		if (flightOperator == "KL") {
			flightNumber = flightNumber.replace(" ", "0");
		}
		let anchor = document.createElement("a");
		anchor.href = `https://www.google.com/search?q=${flightOperator}-${flightNumber} on ${convertDaysMilweb(date.textContent)}`;
		anchor.target = "_blank";
		elements[i].replaceChild(anchor, flight);
		anchor.appendChild(flight);
	    }
	}
}