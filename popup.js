// Save the settings to local storage
function saveSettings(settings) {
	chrome.storage.local.set({ prettifySettings: settings }, () => {
		console.log("Settings saved to local storage:", settings);
	});
}

// Load the settings from local storage
function loadSettings(callback) {
	chrome.storage.local.get("prettifySettings", (result) => {
		const settings = result.prettifySettings || {};
		callback(settings);
	});
}

// Get all the option elements
const optionElements = document.querySelectorAll("input");

// Add an event listener to each option's change event
optionElements.forEach((optionElement) => {
	loadSettings((settings) => {
		// Set the option element's value based on the saved setting
		if (optionElement.type === "checkbox") {
			optionElement.checked = settings[optionElement.name] || false;
		} else if (optionElement.type === "color") {
			optionElement.value = settings[optionElement.name] || "#000000";
		} else if (optionElement.type === "radio") {
			optionElement.checked = optionElement.value == settings[optionElement.name];
		}
	});
	optionElement.addEventListener("change", () => {
		// Get all the selected options
		const selectedOptions = {};
		optionElements.forEach((element) => {
			if (element.type === "checkbox") {
				selectedOptions[element.name] = element.checked;
			} else if (element.type === "color") {
				selectedOptions[element.name] = element.value;
			}
		});

		selectedOptions["theme"] = document.querySelector("input[name='theme']:checked").value;

		// Send a message to the content script with the selected options
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			chrome.tabs.sendMessage(
				tabs[0].id,
				{ selectedOptions: selectedOptions }
			);
		});

		saveSettings(selectedOptions);
	});
});