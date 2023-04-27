// Target these HTML elements
let targets = document.querySelectorAll('#crypticResponse1, #crypticResponse2');

// HLJS Configuration
let config = {
	characterData: true,
	attributes: true,
	childList: true,
	subtree: false
};

// HLJS Register Language
hljs.registerLanguage('hristo', function () {
	return {
		case_insensitive: true,
		contains: language
	}
});

targets.forEach(function (target) {
	// Add background to the whole window
	target.parentNode.className += ' bg';

	// Observer
	let observer = new MutationObserver(function (mutations) {
		mutations.forEach(function (mutation, index) {
			// Disconnect the observer to prevent infinite loop
			observer.disconnect();

			// Get the command line fields
			const DOM_Hist_El = document.getElementById(`crypticHistoList${index + 1}Id`);
			const DOM_Offi_El = document.getElementById(`officeIdList${index + 1}Id`);

			// Preprocess the text
			target.textContent = preprocessor(target.textContent);

			// Highlight the text
			hljs.highlightElement(target);

			// Add hovering effect on the highlighted text (IATA, STATUS, OFFICE)
			let HLJS_Iata_El = document.querySelectorAll('.hljs-iata');
			let HLJS_Stat_El = document.querySelectorAll('.hljs-status');
			let HLJS_Offi_El = document.querySelectorAll('.hljs-office-info');
			HLJS_Iata_El.forEach((el) => readIata(el));
			HLJS_Stat_El.forEach((el) => readStatus(el));
			HLJS_Offi_El.forEach((el) => readOffice(el, DOM_Hist_El, DOM_Offi_El));

			// Reconnect the observer
			observer.observe(target, config);
		});
	});

	// Give some breathing room for the DOM to load
	observer.observe(target, config);

	// Trigger the observer
	setTimeout(function () {
		target.textContent += " ";
	}, 1000);
});

// TODO:
// SEATS
// FLYING BLUE ACCOUNT WITH *SSR