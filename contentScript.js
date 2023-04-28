// Options
let defaultOptions = {
	switch: true,
	theme: "Dark",
	classToggle: true,
	iataToggle: true,
	statusToggle: true,
	officeToggle: true,
	mergeLinesToggle: true,
	hideSegmentStatusToggle: true,
	colorText: "#adbbbc",
	colorBg: "#22272e",
	colorIndex: "#8dd881",
	colorHighlight: "#d0f4ea",
	colorAirports: "#92d9f8",
	colorOffices: "#f7ea5b",
	colorContacts: "#f7ea5b",
	colorImportant: "#f57066"
};

let options = {};

// Target these HTML elements
let targets = document.querySelectorAll('#crypticResponse1, #crypticResponse2');

// HLJS Configuration
let config = {
	characterData: true,
	attributes: true,
	childList: true,
	subtree: false,
};

// HLJS Register Language
hljs.registerLanguage('hristo', function () {
	return {
		case_insensitive: true,
		contains: language
	}
});

// Load the options from local storage
chrome.storage.local.get("prettifySettings", (settings) => {
	if (settings.prettifySettings === undefined) {
		// Set default settings to local storage
		chrome.runtime.sendMessage({ ...defaultOptions });
	} else {
		// Set the options
		options.switch = settings.prettifySettings.switch;
		options.classToggle = settings.prettifySettings.classToggle;
		options.iataToggle = settings.prettifySettings.iataToggle;
		options.statusToggle = settings.prettifySettings.statusToggle;
		options.officeToggle = settings.prettifySettings.officeToggle;
		options.mergeLinesToggle = settings.prettifySettings.mergeLinesToggle;
		options.hideSegmentStatusToggle = settings.prettifySettings.hideSegmentStatusToggle;
		options.colorText = settings.prettifySettings.colorText;
		options.colorBg = settings.prettifySettings.colorBg;
		options.colorIndex = settings.prettifySettings.colorIndex;
		options.colorHighlight = settings.prettifySettings.colorHighlight;
		options.colorAirports = settings.prettifySettings.colorAirports;
		options.colorOffices = settings.prettifySettings.colorOffices;
		options.colorContacts = settings.prettifySettings.colorContacts;
		options.colorImportant = settings.prettifySettings.colorImportant;
	}

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
				options.classToggle && HLJS_Class_El.forEach((el) => readClass(el, false));
				options.classToggle && HLJS_Class_P_El.forEach((el) => readClass(el, true));
				options.iataToggle && HLJS_Iata_El.forEach((el) => readIata(el));
				options.statusToggle && HLJS_Stats_El.forEach((el) => readStatus(el));
				options.officeToggle && HLJS_Office_El.forEach((el) => readOffice(el, DOM_History_El, DOM_Office_El));

				// Reconnect the observer
				observer.observe(target, config);
			});
		});

		// Start observing
		options.switch && observer.observe(target, config);

		// Trigger the observer
		setTimeout(function () {
			target.textContent += " ";
		}, 10);
	});

});

// TODO:
// SEATS
// FLYING BLUE ACCOUNT WITH *SSR