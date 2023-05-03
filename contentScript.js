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

// Target this HTML elements
const target = document.getElementById('crypticResponse1');

// HLJS Configuration
const config = {
	characterData: true,
	attributes: true,
	childList: true,
	subtree: false,
};

// Get the command line fields
const DOM_History_El = document.getElementById(`crypticHistoList1Id`);
const DOM_Office_El = document.getElementById(`officeIdList1Id`);

// HLJS Register Language
hljs.registerLanguage('hristo', function () {
	return {
		case_insensitive: true,
		contains: language
	}
});

target.className += ' hristo';

// Observer
const observer = new MutationObserver(function (mutations) {
	mutations.forEach(function () {
		chrome.storage.sync.get(Object.keys(defaultOptions), function (result) {
			if (Object.keys(result).length === 0 && result.constructor === Object) {
				chrome.storage.sync.set(defaultOptions);
				options = { ...defaultOptions };
			} else {
				options = { ...result };
			}

			// Do not run if the switch is off
			if (!options.switch) return;

			// Disconnect the observer to prevent infinite loop
			observer.disconnect();

			// Preprocess the text
			target.textContent = preprocessor(target.textContent, options);

			// Highlights the text first, then removes the listener (if exists) and runs a callback
			function highlightAndDoStuff(target, callback) {
				hljs.highlightElement(target);
				chrome.storage.onChanged.removeListener(updateChangesOnListener);
				callback();
			}

			highlightAndDoStuff(target, function () {
				let optionsToListenerOptions = Object.fromEntries(Object.entries(options).filter(([key]) => key.includes('color') || key.includes('theme')));
				for (const [key, value] of Object.entries(optionsToListenerOptions)) {
					optionsToListenerOptions[key] = { "newValue": value };
				}
				// Update changes
				updateChangesOnLoad(optionsToListenerOptions);
				// Event listener for changes in Chrome Storage
				chrome.storage.onChanged.addListener(updateChangesOnListener);
			});

			if (options.linesToggle) {
				// Highlight lines
				hljs.initHighlightLinesOnLoad([]);
				let endLines = [];
				let endLine = findIndex("UTC+0", target, -1);
				while (endLine != -1) {
					endLines.push(endLine);
					endLine = findIndex("UTC+", target, endLine);
				}
				endLines.forEach((el) => {
					document.querySelectorAll('.highlight-line').forEach((line, index) => {
						if (index == el) {
							line.style.borderBottom = "0.5px solid";
						}
					});
				});
				let xsLines = [];
				let firstLine = findIndex("XS:", target, -1);
				while (firstLine != -1) {
					xsLines.push(firstLine);
					firstLine = findIndex("XS:", target, firstLine);
				}
				xsLines.forEach((el) => {
					document.querySelectorAll('.highlight-line').forEach((line, index) => {
						if (index == el) {
							line.style.textDecoration = "line-through 0.5px solid";
							line.style.opacity = "0.75";
						}
					});
				});
			}

			// Apply the theme
			const HLJS_Class_El = document.querySelectorAll('.hljs-class');
			const HLJS_Class_P_El = document.querySelectorAll('.hljs-class-partner');
			const HLJS_Iata_El = document.querySelectorAll('.hljs-iata');
			const HLJS_Stats_El = document.querySelectorAll('.hljs-status');
			const HLJS_Office_El = document.querySelectorAll('.hljs-office-info');
			const HLJS_Highlighted_El = document.querySelectorAll('.hljs-flight, .hljs-flight-partner, .hljs-time');
			const HLJS_Date_El = document.querySelectorAll('.hljs-date');
			const HLJS_Index_El = document.querySelectorAll('.hljs-index, .hljs-index-green, .hljs-index-yellow, .hljs-index-red');
			const HLJS_Contacts_El = document.querySelectorAll('.hljs-contact-info');
			const HLJS_Important_El = document.querySelectorAll('.hljs-message, .hljs-status.un');
			document.querySelector('.hljs').style.color = options.colorText;
			document.querySelector('.hljs').style.backgroundColor = options.colorBg;
			document.querySelector('.hljs').parentNode.style.backgroundColor = options.colorBg;
			options.classToggle && HLJS_Class_El.forEach((el) => { readClass(el, false); el.style.cursor = "pointer"; });
			options.classToggle && HLJS_Class_P_El.forEach((el) => { readClass(el, true); el.style.cursor = "pointer"; });
			options.iataToggle && HLJS_Iata_El.forEach((el) => { readIata(el); el.style.cursor = "pointer"; });
			HLJS_Iata_El.forEach((el) => el.style.color = options.colorAirports);
			options.statusToggle && HLJS_Stats_El.forEach((el) => { readStatus(el); el.style.cursor = "pointer"; });
			options.officeToggle && HLJS_Office_El.forEach((el) => {
				let iata = el.textContent.split(' ')[1];
				let office = DOM_Office_El.value;
				chrome.runtime.sendMessage({ action: 'callApi', iata: iata, office: office }, response => {
					// Log the response from the API
					console.log(response);
				});
				// readOffice(el, DOM_History_El, DOM_Office_El);
				el.style.cursor = "pointer";
				el.style.color = options.colorOffices;
			});
			HLJS_Office_El.forEach((el) => el.style.color = options.colorOffices);
			HLJS_Highlighted_El.forEach((el) => el.style.color = options.colorHighlight);
			HLJS_Date_El.forEach((el) => { el.style.color = options.colorBg; el.style.backgroundColor = options.colorText; });
			HLJS_Index_El.forEach((el) => el.style.color = options.colorIndex);
			HLJS_Contacts_El.forEach((el) => el.style.color = options.colorContacts);
			HLJS_Important_El.forEach((el) => el.style.color = options.colorImportant);
			// Modify the popup
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
});

// Start observing
observer.observe(target, config);

// Trigger the observer
setTimeout(function () {
	target.textContent += " ";
}, 10);