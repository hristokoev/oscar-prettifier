const addStyle = (element) => {
    return 	element.textContent = `@font-face {
		font-family: 'Monocode';
		src: url(${ chrome.runtime.getURL('fonts/monocode/monocode-light.ttf') });
		font-weight: 300;
		font-style: normal;
	}
	@font-face {
		font-family: 'Monocode';
		src: url(${ chrome.runtime.getURL('fonts/monocode/monocode-lightitalic.ttf') });
		font-weight: 300;
		font-style: italic;
	}
	@font-face {
		font-family: 'Monocode';
		src: url(${ chrome.runtime.getURL('fonts/monocode/monocode-regular.ttf') });
		font-weight: normal;
		font-style: normal;
	}
	@font-face {
		font-family: 'Monocode';
		src: url(${ chrome.runtime.getURL('fonts/monocode/monocode-italic.ttf') });
		font-weight: normal;
		font-style: italic;
	}
	@font-face {
		font-family: 'Monocode';
		src: url(${ chrome.runtime.getURL('fonts/monocode/monocode-medium.ttf') });
		font-weight: 500;
		font-style: normal;
	}
	@font-face {
		font-family: 'Monocode';
		src: url(${ chrome.runtime.getURL('fonts/monocode/monocode-mediumitalic.ttf') });
		font-weight: 500;
		font-style: italic;
	}
	@font-face {
		font-family: 'Monocode';
		src: url(${ chrome.runtime.getURL('fonts/monocode/monocode-semibold.ttf') });
		font-weight: 600;
		font-style: normal;
	}
	@font-face {
		font-family: 'Monocode';
		src: url(${ chrome.runtime.getURL('fonts/monocode/monocode-semibolditalic.ttf') });
		font-weight: 600;
		font-style: italic;
	}
	@font-face {
		font-family: 'Monocode';
		src: url(${ chrome.runtime.getURL('fonts/monocode/monocode-bold.ttf') });
		font-weight: bold;
		font-style: normal;
	}
	@font-face {
		font-family: 'Monocode';
		src: url(${ chrome.runtime.getURL('fonts/monocode/monocode-bolditalic.ttf') });
		font-weight: bold;
		font-style: italic;
	}`;
}