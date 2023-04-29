// Options
let options = {};
let defaultOptions = {
	switch: true,
	theme: "dark",
	classToggle: true,
	iataToggle: true,
	statusToggle: true,
	officeToggle: true,
	hideSegmentStatusToggle: true,
	linesToggle: false,
	colorText: "#adbbbc",
	colorBg: "#22272e",
	colorIndex: "#8dd881",
	colorHighlight: "#d0f4ea",
	colorAirports: "#92d9f8",
	colorOffices: "#f7ea5b",
	colorContacts: "#f7ea5b",
	colorImportant: "#f57066"
}

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

chrome.storage.sync.get(["switch", "theme", "classToggle", "iataToggle", "statusToggle", "officeToggle", "hideSegmentStatusToggle", "linesToggle", "colorText", "colorBg", "colorIndex", "colorHighlight", "colorAirports", "colorOffices", "colorContacts", "colorImportant"], function (result) {
	if (Object.keys(result).length === 0 && result.constructor === Object) {
		chrome.storage.sync.set(defaultOptions);
		options = defaultOptions;
	} else {
		options = result;
	}
	targets.forEach(function (target) {

		// Event listener for changes in Chrome Storage
		chrome.storage.onChanged.addListener(function (changes, namespace) {
			observer.disconnect();
			for (let key in changes) {
				let newValue = changes[key].newValue;
				switch (key) {
					case "colorText":
						document.querySelector('.hljs').style.color = newValue;
						document.querySelectorAll('.popup').forEach((el) => el.style.color = newValue);
						document.querySelectorAll('.popup').forEach((el) => el.style.borderColor = newValue);
						break;
					case "colorBg":
						document.querySelector('.hljs').style.backgroundColor = newValue;
						document.querySelectorAll('.popup').forEach((el) => el.style.backgroundColor = newValue);
						break;
					case "colorIndex":
						document.querySelectorAll('.hljs-index, .hljs-index-green, .hljs-index-yellow, .hljs-index-red').forEach((el) => el.style.color = newValue);
						break;
					case "colorHighlight":
						document.querySelectorAll('.hljs-flight, .hljs-flight-partner, .hljs-time, .hljs-date').forEach((el) => el.style.color = newValue);
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
			}
			observer.observe(target, config);
		});

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

				if (options.linesToggle) {
					// Highlight lines
					let start = findIndex("000", target);
					let end = findIndex("+0", target);
					hljs.initHighlightLinesOnLoad([]);
					document.querySelectorAll('.highlight-line').forEach((el, index) => {
						if (index == start) {
							el.style.borderTop = "0.5px solid";
							el.style.paddingTop = "10px"; 
							el.style.marginTop = "10px";
						}
						if (index == end) {
							el.style.borderBottom = "0.5px solid";
							el.style.marginBottom = "10px";
						}
					});
				}

				// Apply the theme
				const HLJS_Class_El = document.querySelectorAll('.hljs-class');
				const HLJS_Class_P_El = document.querySelectorAll('.hljs-class-partner');
				const HLJS_Iata_El = document.querySelectorAll('.hljs-iata');
				const HLJS_Stats_El = document.querySelectorAll('.hljs-status');
				const HLJS_Office_El = document.querySelectorAll('.hljs-office-info');
				const HLJS_Highlighted_El = document.querySelectorAll('.hljs-flight, .hljs-flight-partner, .hljs-time, .hljs-date');
				const HLJS_Index_El = document.querySelectorAll('.hljs-index, .hljs-index-green, .hljs-index-yellow, .hljs-index-red');
				const HLJS_Contacts_El = document.querySelectorAll('.hljs-contact-info');
				const HLJS_Important_El = document.querySelectorAll('.hljs-message, .hljs-status.un');
				document.querySelector('.hljs').style.color = options.colorText;
				document.querySelector('.hljs').style.backgroundColor = options.colorBg;
				options.classToggle && HLJS_Class_El.forEach((el) => {
					readClass(el, false);
					el.style.cursor = "pointer";
				});
				options.classToggle && HLJS_Class_P_El.forEach((el) => {
					readClass(el, true);
					el.style.cursor = "pointer";
				});
				options.iataToggle && HLJS_Iata_El.forEach((el) => {
					readIata(el);
					el.style.cursor = "pointer";
					el.style.color = options.colorAirports;
				});
				options.statusToggle && HLJS_Stats_El.forEach((el) => {
					readStatus(el);
					el.style.cursor = "pointer";
				});
				options.officeToggle && HLJS_Office_El.forEach((el) => {
					readOffice(el, DOM_History_El, DOM_Office_El);
					el.style.cursor = "pointer";
					el.style.color = options.colorOffices;
				});
				HLJS_Highlighted_El.forEach((el) => {
					el.style.color = options.colorHighlight;
				});
				HLJS_Index_El.forEach((el) => {
					el.style.color = options.colorIndex;
				});
				HLJS_Contacts_El.forEach((el) => {
					el.style.color = options.colorContacts;
				});
				HLJS_Important_El.forEach((el) => {
					el.style.color = options.colorImportant;
				});
				const HLJS_Popup_El = document.querySelectorAll('.popup');
				HLJS_Popup_El.forEach((el) => {
					el.style.color = options.colorText;
					el.style.backgroundColor = options.colorBg;
					el.style.borderColor = options.colorText;
				});

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