// Options
let options = {
	switch: true,
};

// Default options
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
	colorPNR: "#8dd881",
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