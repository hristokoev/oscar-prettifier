// Target these HTML elements
let targets = document.querySelectorAll('#crypticResponse1, #crypticResponse2');

// HLJS Configuration
let config = {
	characterData: true,
	attributes: true,
	childList: true,
	subtree: false,
};

// Options
let options = {
	class: true,
	iata: true,
	status: true,
	office: true,
	mergeLines: true,
	hideSegmentIndicators: true,
}

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
			const DOM_History_El = document.getElementById(`crypticHistoList${index + 1}Id`);
			const DOM_Office_El = document.getElementById(`officeIdList${index + 1}Id`);

			// Preprocess the text
			target.textContent = preprocessor(target.textContent, options);

			// Highlight the text
			hljs.highlightElement(target);

			// get the elements
			const firstIndex = document.querySelector('.hljs-index-green');
			const firstDate = document.querySelector('.hljs-date');
			originalSegment(firstIndex, firstDate);

			// Add hovering effect on the highlighted text (IATA, STATUS, OFFICE)
			const HLJS_Class_El = document.querySelectorAll('.hljs-class');
			const HLJS_Class_P_El = document.querySelectorAll('.hljs-class-partner');
			const HLJS_Iata_El = document.querySelectorAll('.hljs-iata');
			const HLJS_Stats_El = document.querySelectorAll('.hljs-status');
			const HLJS_Office_El = document.querySelectorAll('.hljs-office-info');
			options.class && HLJS_Class_El.forEach((el) => readClass(el, false));
			options.class && HLJS_Class_P_El.forEach((el) => readClass(el, true));
			options.iata && HLJS_Iata_El.forEach((el) => readIata(el));
			options.status && HLJS_Stats_El.forEach((el) => readStatus(el));
			options.office && HLJS_Office_El.forEach((el) => readOffice(el, DOM_History_El, DOM_Office_El));

			// Reconnect the observer
			observer.observe(target, config);
		});
	});

	// Start observing
	observer.observe(target, config);

	// Trigger the observer
	setTimeout(function () {
		target.textContent += " ";
	}, 10);
});

// TODO:
// SEATS
// FLYING BLUE ACCOUNT WITH *SSR