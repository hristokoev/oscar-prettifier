// Get the selected color presets from the popup UI
let darkPreset = {
	switch: true,
	theme: "dark",
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
}

let lightPreset = {
	switch: true,
	theme: "light",
	classToggle: true,
	iataToggle: true,
	statusToggle: true,
	officeToggle: true,
	mergeLinesToggle: true,
	hideSegmentStatusToggle: true,
	colorText: "#2E343B",
	colorBg: "#FFFFFF",
	colorIndex: "#00A955",
	colorHighlight: "#1978D4",
	colorAirports: "#00A4A6",
	colorOffices: "#E26A6A",
	colorContacts: "#B8860B",
	colorImportant: "#FF0000"
}

let richPreset = {
	switch: true,
	theme: "rich",
	classToggle: true,
	iataToggle: true,
	statusToggle: true,
	officeToggle: true,
	mergeLinesToggle: true,
	hideSegmentStatusToggle: true,
	colorText: "#CCB9CF",
	colorBg: "#232743",
	colorIndex: "#98D8AA",
	colorHighlight: "#FDE2F3",
	colorAirports: "#FDE2F3",
	colorOffices: "#FFE175",
	colorContacts: "#FFE175",
	colorImportant: "#FE5858"
}

let cameoPreset = {
	switch: true,
	theme: "cameo",
	classToggle: true,
	iataToggle: true,
	statusToggle: true,
	officeToggle: true,
	mergeLinesToggle: true,
	hideSegmentStatusToggle: true,
	colorText: "#E8E8E8",
	colorBg: "#3C3B39",
	colorIndex: "#D2CEA9",
	colorHighlight: "#FDE3A7",
	colorAirports: "#FDE3A7",
	colorOffices: "#F1F227",
	colorContacts: "#F1F227",
	colorImportant: "#F57066"
}

let highContrastDarkPreset = {
	switch: true,
	theme: "highContrastDark",
	classToggle: true,
	iataToggle: true,
	statusToggle: true,
	officeToggle: true,
	mergeLinesToggle: true,
	hideSegmentStatusToggle: true,
	colorText: "#FFFFFF",
	colorBg: "#000000",
	colorIndex: "#FFFFFF",
	colorHighlight: "#FFFFFF",
	colorAirports: "#FFFFFF",
	colorOffices: "#00FFFF",
	colorContacts: "#FF2600",
	colorImportant: "#FF2600"
}

// Event listener for preset dropdown
document.getElementById("theme").addEventListener("change", function () {
	let theme = this.value;
	switch (theme) {
		case "dark":
			chrome.storage.sync.set(darkPreset);
			break;
		case "light":
			chrome.storage.sync.set(lightPreset);
			break;
		case "rich":
			chrome.storage.sync.set(richPreset);
			break;
		case "cameo":
			chrome.storage.sync.set(cameoPreset);
			break;
		case "highContrastDark":
			chrome.storage.sync.set(highContrastDarkPreset);
			break;
	}
	loadPreset();
});

document.getElementById("switch").addEventListener("change", function () {
	let newValue = this.checked;
	chrome.storage.sync.set({ "switch": newValue });
});

document.getElementById("classToggle").addEventListener("change", function () {
	let newValue = this.checked;
	chrome.storage.sync.set({ "classToggle": newValue });
});

document.getElementById("iataToggle").addEventListener("change", function () {
	let newValue = this.checked;
	chrome.storage.sync.set({ "iataToggle": newValue });
});

document.getElementById("statusToggle").addEventListener("change", function () {
	let newValue = this.checked;
	chrome.storage.sync.set({ "statusToggle": newValue });
});

document.getElementById("officeToggle").addEventListener("change", function () {
	let newValue = this.checked;
	chrome.storage.sync.set({ "officeToggle": newValue });
});

document.getElementById("mergeLinesToggle").addEventListener("change", function () {
	let newValue = this.checked;
	chrome.storage.sync.set({ "mergeLinesToggle": newValue });
});

document.getElementById("hideSegmentStatusToggle").addEventListener("change", function () {
	let newValue = this.checked;
	chrome.storage.sync.set({ "hideSegmentStatusToggle": newValue });
});

document.getElementById("colorText").addEventListener("change", function () {
	let newValue = this.value;
	chrome.storage.sync.set({ "colorText": newValue });
});

document.getElementById("colorBg").addEventListener("change", function () {
	let newValue = this.value;
	chrome.storage.sync.set({ "colorBg": newValue });
});

document.getElementById("colorIndex").addEventListener("change", function () {
	let newValue = this.value;
	chrome.storage.sync.set({ "colorIndex": newValue });
});

document.getElementById("colorHighlight").addEventListener("change", function () {
	let newValue = this.value;
	chrome.storage.sync.set({ "colorHighlight": newValue });
});

document.getElementById("colorAirports").addEventListener("change", function () {
	let newValue = this.value;
	chrome.storage.sync.set({ "colorAirports": newValue });
});

document.getElementById("colorOffices").addEventListener("change", function () {
	let newValue = this.value;
	chrome.storage.sync.set({ "colorOffices": newValue });
});

document.getElementById("colorContacts").addEventListener("change", function () {
	let newValue = this.value;
	chrome.storage.sync.set({ "colorContacts": newValue });
});

document.getElementById("colorImportant").addEventListener("change", function () {
	let newValue = this.value;
	chrome.storage.sync.set({ "colorImportant": newValue });
});


// Function to load selected preset from Chrome Storage
function loadPreset() {
	chrome.storage.sync.get(["switch", "theme", "classToggle", "iataToggle", "statusToggle", "officeToggle", "mergeLinesToggle", "hideSegmentStatusToggle", "colorText", "colorBg", "colorIndex", "colorHighlight", "colorAirports", "colorOffices", "colorContacts", "colorImportant"], function (result) {
		document.getElementById("switch").checked = result.switch || typeof result.switch === 'undefined' && darkPreset.switch;
		document.getElementById("theme").value = result.theme || darkPreset.theme;
		document.getElementById("classToggle").checked = result.classToggle || typeof result.classToggle === 'undefined' && darkPreset.classToggle;
		document.getElementById("iataToggle").checked = result.iataToggle || typeof result.iataToggle === 'undefined' && darkPreset.iataToggle;
		document.getElementById("statusToggle").checked = result.statusToggle || typeof result.statusToggle === 'undefined' && darkPreset.statusToggle;
		document.getElementById("officeToggle").checked = result.officeToggle || typeof result.officeToggle === 'undefined' && darkPreset.officeToggle;
		document.getElementById("mergeLinesToggle").checked = result.mergeLinesToggle || typeof result.mergeLinesToggle === 'undefined' && darkPreset.mergeLinesToggle;
		document.getElementById("hideSegmentStatusToggle").checked = result.hideSegmentStatusToggle || typeof result.hideSegmentStatusToggle === 'undefined' && darkPreset.hideSegmentStatusToggle;
		document.getElementById("colorText").value = result.colorText || darkPreset.colorText;
		document.getElementById("colorBg").value = result.colorBg || darkPreset.colorBg;
		document.getElementById("colorIndex").value = result.colorIndex || darkPreset.colorIndex;
		document.getElementById("colorHighlight").value = result.colorHighlight || darkPreset.colorHighlight;
		document.getElementById("colorAirports").value = result.colorAirports || darkPreset.colorAirports;
		document.getElementById("colorOffices").value = result.colorOffices || darkPreset.colorOffices;
		document.getElementById("colorContacts").value = result.colorContacts || darkPreset.colorContacts;
		document.getElementById("colorImportant").value = result.colorImportan || darkPreset.colorImportant;
	});
}

// Call loadPreset function when popup is opened
loadPreset();

// Reset
document.getElementById("resetButton").addEventListener("click", function () {
	chrome.storage.sync.set(darkPreset);
	loadPreset();
});