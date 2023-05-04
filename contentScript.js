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

// Target this HTML elements
const target = document.getElementById('crypticResponse1');

// HLJS Configuration
const config = {
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

			// Get the command line fields
			const DOM_History_El = document.getElementById(`crypticHistoList1Id`);
			const DOM_Office_El = document.getElementById(`officeIdList1Id`);

			// Highlights the text first, then removes the listener (if exists) and runs a callback
			function highlightAndDoStuff(target, callback) {				
				hljs.highlightElement(target);
				chrome.storage.onChanged.removeListener(updateChangesOnListener);
				callback();
			}

			if (containsMultiple(DOM_History_El.value, ["PV", "RPP/RLC", "RT", "RPP/RHA", "RHA"], ["MD", "MU", "MT", "MB", "PLD"])) {
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

					if (options.linesToggle) {
						document.querySelectorAll('.highlight-line').forEach((line, index) => {
							line.className += ' active';
						});
					}
					
					readFlightAndDate();
				
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

			// options.officeToggle && HLJS_Office_El.forEach((el) => {
			// 	let iata = el.textContent;
			// 	let office = DOM_Office_El.value;
			// 	chrome.runtime.sendMessage({ action: 'callApi', officeIata: iata, officeId: office }, response => {
			// 		console.log(response);
			// 		el.textContent = response;
			// 	});
			// 	el.style.color = options.colorOffices;
			// });

			let promises = [];

			options.officeToggle && HLJS_Office_El.forEach((el, index) => {
				let iata = String(el.textContent);
				let office = DOM_Office_El.value;
				let promise = new Promise((resolve, reject) => {
					el.textContent = "Loading...";
					setTimeout(() => {
						chrome.runtime.sendMessage({ action: 'callApi', officeIata: iata, officeId: office }, response => {
							if (response) {
								resolve(response);
							} else {
								el.textContent = iata;
							}
						});
					}, 200 * index);
				});
				el.style.color = options.colorOffices;
				promises.push(promise);
			});

			Promise.all(promises)
				.then(responses => {
					responses.forEach((response, index) => {
						HLJS_Office_El[index].textContent = response;
					})
					if (responses.length > 0) {
						fetch(`https://oscar.airfrance-is.com/oscar/portalAmadeusTransaction.do?method=sendCrypticCommand&crypticRequest=${DOM_History_El.value}&numEmulator=1&officeId=${DOM_Office_El.value}`)
					}
				})
				.catch(error => {
					console.error(error);
				})

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
setTimeout(() => {
	target.textContent += " ";
}, 100);

const containsMultiple = (string, commands) => {
	let length = commands.length;
	if (string.length == 0) {
		return true;
	}
	for (let i = 0; i < length; i++) {
		if (string.includes(commands[i])) {
			return true;
		}
	}
}