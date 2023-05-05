const updateChangesOnLoad = (changes) => {
	for (let key in changes) {
		let newValue = changes[key].newValue;
		switch (key) {
			case "colorText":
				document.querySelector('.hljs').style.color = newValue;
				document.querySelectorAll('.popup').forEach((el) => el.style.color = newValue);
				document.querySelectorAll('.popup').forEach((el) => el.style.borderColor = newValue);
				document.querySelectorAll('.hljs-date').forEach((el) => el.style.backgroundColor = newValue);
				break;
			case "colorBg":
				document.querySelector('.hljs').style.backgroundColor = newValue;
				document.querySelector('.hljs').parentNode.style.backgroundColor = newValue;
				document.querySelectorAll('.popup').forEach((el) => el.style.backgroundColor = newValue);
				document.querySelectorAll('.hljs-date').forEach((el) => el.style.color = newValue);
				break;
			case "colorIndex":
				document.querySelectorAll('.hljs-index, .hljs-index-green, .hljs-index-yellow, .hljs-index-red, .hljs-pnr').forEach((el) => el.style.color = newValue);
				break;
			case "colorHighlight":
				document.querySelectorAll('.hljs-flight, .hljs-flight-dl, .hljs-flight-partner, .hljs-time').forEach((el) => el.style.color = newValue);
				break;
			case "colorAirports":
				document.querySelectorAll('.hljs-iata').forEach((el) => el.style.color = newValue);
				break;
			case "colorOffices":
				document.querySelectorAll('.hljs-office-info').forEach((el) => el.style.color = newValue);
				break;
			case "colorContacts":
				document.querySelectorAll('.hljs-contact-info').forEach((el) => el.style.color = newValue);
				break;
			case "colorImportant":
				document.querySelectorAll('.hljs-message, .hljs-status.un').forEach((el) => el.style.color = newValue);
				break;
		}
	};
}

const updateChangesOnListener = (changes) => {
	observer.disconnect();					// the observer is in the content script
	updateChangesOnLoad(changes);
	observer.observe(target, config);
}