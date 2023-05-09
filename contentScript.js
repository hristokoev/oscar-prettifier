// Options
let options = {
	switch: true,
};

let defaultOptions = {
	switch: true,
	theme: "dark",
	classToggle: true,
	iataToggle: true,
	statusToggle: true,
	hideSegmentStatusToggle: true,
	linesToggle: true,
	colorText: "#adbbbc",
	colorBg: "#22272e",
	colorIndex: "#8dd881",
	colorHighlight: "#d0f4ea",
	colorAirports: "#92d9f8",
	colorOffices: "#f7ea5b",
	colorContacts: "#f7ea5b",
	colorImportant: "#f57066"
}

// Is it ok to run?
let isSafe = true;

// Target this HTML element
const target = document.getElementById('crypticResponse1');

// HLJS Configuration
const config = {
	characterData: true,
	attributes: true,
	childList: true,
	subtree: false,
};

// HLJS Register Language
hljs.registerLanguage('oscar', function () {
	return {
		case_insensitive: true,
		contains: language
	}
});

target.className += ' oscar';

// Add style

const style = document.createElement('style');
addStyle(style);

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

			// Add style
			document.head.appendChild(style);

			// Get the command line fields
			let DOM_History_El = document.getElementById(`crypticHistoList1Id`);
			let DOM_Office_El = document.getElementById(`officeIdList1Id`);

			// Disconnect the observer to prevent infinite loop
			observer.disconnect();

			// Highlights the text first, then removes the listener (if exists) and runs a callback
			function highlightAndDoStuff(target, callback) {
				hljs.highlightElement(target);
				chrome.storage.onChanged.removeListener(updateChangesOnListener);
				callback();
			}

			// Limit to these commands
			if (containsMultiple(isSafe, DOM_History_El.value, ["PV", "RPP/RLC", "RT", "RPP/RHA", "RHA", "PLD"], ["MD", "MU", "MT", "MB"])) {
				// Preprocess the text
				target.textContent = preprocessor(target.textContent, options);

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

				// Highlight lines
				hljs.initHighlightLinesOnLoad([]);

				let osLines = [];
				let csLines = [];
				let asLines = [];
				let xsLines = [];
				let dlLines = [];
				let rfLines = [];
				let osString = "OS:";
				let csString = "CS:";
				let asString = "AS:";
				let xsString = "XS:";
				let dlString = "DL:";
				let rfString = "RF:";
				let firstOSLine = findIndex(osString, target, -1);
				let firstCSLine = findIndex(csString, target, -1);
				let firstASLine = findIndex(asString, target, -1);
				let firstXSLine = findIndex(xsString, target, -1);
				let firstDLLine = findIndex(dlString, target, -1);
				let firstRFLine = findIndex(rfString, target, -1);
				function processLines(string, lines, firstLine, className) {
					while (firstLine != -1) {
						lines.push(firstLine);
						firstLine = findIndex(string, target, firstLine);
					}	
					lines.forEach((el) => {
						console.log(el);
						document.querySelectorAll('.highlight-line').forEach((line, index) => {
							if (index == el) {
								line.className += className || '';
							}
						});
					});				
				}
				processLines(osString, osLines, firstOSLine, ' os');
				processLines(csString, csLines, firstCSLine, ' cs');
				processLines(asString, asLines, firstASLine, ' as');
				processLines(xsString, xsLines, firstXSLine, ' dimmed xs');
				processLines(dlString, dlLines, firstDLLine, ' dimmed dl');
				processLines(rfString, rfLines, firstRFLine, ' rf');

				if (options.linesToggle) {
					document.querySelectorAll('.highlight-line').forEach((line, index) => {
						line.className += ' active';
					});
				}

				// Transform flight numbers into Milweb links
				readFlightAndDate();

			}

			// Apply the theme
			const HLJS_Class_El = document.querySelectorAll('.hljs-class');
			const HLJS_Class_P_El = document.querySelectorAll('.hljs-class-partner');
			const HLJS_Iata_El = document.querySelectorAll('.hljs-iata');
			const HLJS_Stats_El = document.querySelectorAll('.hljs-status');
			const HLJS_Office_El = document.querySelectorAll('.hljs-office-info');
			const HLJS_Office_Name_El = document.querySelectorAll('.hljs-office-name');
			const HLJS_Highlighted_El = document.querySelectorAll('.hljs-flight, .hljs-flight-dl, .hljs-flight-partner, .hljs-time');
			const HLJS_Date_El = document.querySelectorAll('.hljs-date');
			const HLJS_Index_El = document.querySelectorAll('.hljs-index, .hljs-index-add, .hljs-index-yellow, .hljs-index-delete');
			const HLJS_Contacts_El = document.querySelectorAll('.hljs-contact-info');
			const HLJS_Important_El = document.querySelectorAll('.hljs-message, .hljs-status.un');
			const HLJS_Dimmed_El = document.querySelectorAll('.dimmed');
			document.querySelector('.hljs').style.color = options.colorText;
			document.querySelector('.hljs').style.backgroundColor = options.colorBg;
			document.querySelector('.hljs').parentNode.style.backgroundColor = options.colorBg;
			options.classToggle && HLJS_Class_El.forEach((el) => { readClass(el, false); el.style.cursor = "pointer"; });
			options.classToggle && HLJS_Class_P_El.forEach((el) => { readClass(el, true); el.style.cursor = "pointer"; });
			options.iataToggle && HLJS_Iata_El.forEach((el) => { readIata(el); el.style.cursor = "pointer"; });
			HLJS_Iata_El.forEach((el) => el.style.color = options.colorAirports);
			options.statusToggle && HLJS_Stats_El.forEach((el) => { readStatus(el); el.style.cursor = "pointer"; });
			HLJS_Office_El.forEach((el) => {
				let iata = el.textContent;
				let office = DOM_Office_El.value;
				readOffice(el, iata, office);
				el.style.color = options.colorOffices;
				el.style.cursor = "pointer"
			});
			HLJS_Office_Name_El.forEach((el) => el.style.color = options.colorOffices);
			HLJS_Office_El.forEach((el) => el.style.color = options.colorOffices);
			HLJS_Highlighted_El.forEach((el) => el.style.color = options.colorHighlight);
			HLJS_Date_El.forEach((el) => { el.style.color = options.colorBg; el.style.backgroundColor = options.colorText; });
			HLJS_Index_El.forEach((el) => el.style.color = options.colorIndex);
			HLJS_Contacts_El.forEach((el) => el.style.color = options.colorContacts);
			HLJS_Important_El.forEach((el) => el.style.color = options.colorImportant);
			HLJS_Dimmed_El.forEach((el) => el.style.backgroundColor = options.colorBg);

			// Modify the popup
			const HLJS_Popup_El = document.querySelectorAll('.popup');
			HLJS_Popup_El.forEach((el) => {
				el.style.color = options.colorText;
				el.style.backgroundColor = options.colorBg;
				el.style.borderColor = options.colorText;
			});

			// PNR link
			const HLJS_PNR_El = document.querySelectorAll('.hljs-pnr');
			HLJS_PNR_El.forEach((el) => {
				el.style.color = options.colorIndex;
				el.addEventListener("click", () => {
					window.open(`https://ticket.airfrance-is.com/ticket/ticket.visu.recherche.do?selectedtab=&pnr=${el.textContent}&valider=OK&foidPreMulti=+&action=rechercheForm&rechercheLargeMulti=off&archiveMulti=off`, "_blank");
				})
			});
			// Reconnect the observer
			observer.observe(target, config);
		});
	});
});

// Reload the page
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	if (message.url) {
		window.location.href = message.url;
	}
});

// Start observing
observer.observe(target, config);

// Trigger the observer
// setTimeout(() => {
// 	target.textContent += " ";
// }, 100);