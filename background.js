fetch(chrome.runtime.getURL('data.json'))
	.then(response => response.json())
	.then(data => {
		// Save data to local storage
		chrome.storage.local.set({ key: data }, function () {
			console.log('Data saved to local storage');
		});
	});

let isLoading = false;

async function getData(key) {
	isLoading = true;
	const result = await chrome.storage.local.get(['key']);
	isLoading = false;
	return result.key[key];
}

hljs.registerLanguage('hristo', function () {
	return {
		case_insensitive: true, // language is case-insensitive
		contains: [
			{
				className: 'index-green',
				variants: [
					{
						// SINGLE TRIPLE DIGIT (    123)
						begin: /^ {4}[0-9]{3} (?=(OS|CS|TC))/
					},
					{
						// DOUBLE TRIPLE DIGIT BEFORE "/"
						begin: /^[0-9]{3}(?=\/[0-9]{3} (OS|CS|TC))/
					},
					{
						// DOUBLE TRIPLE DIGIT AFTER "/"
						begin: /(?<=^[0-9]{3}\/)[0-9]{3} (?=(OS|CS|TC))/
					},
				]
			},
			{
				className: 'index-yellow',
				variants: [
					{
						// SINGLE TRIPLE DIGIT (    123)
						begin: /^ {4}[0-9]{3} (?=AS)/
					},
					{
						// DOUBLE TRIPLE DIGIT BEFORE "/"
						begin: /^[0-9]{3}(?=\/[0-9]{3} AS)/
					},
					{
						// DOUBLE TRIPLE DIGIT AFTER "/"
						begin: /(?<=^[0-9]{3}\/)[0-9]{3} (?=AS)/
					},
				]
			},
			{
				className: 'index-red',
				variants: [
					{
						// SINGLE TRIPLE DIGIT (    123)
						begin: /^ {4}[0-9]{3} (?=(XS|DL))/
					},
					{
						// DOUBLE TRIPLE DIGIT BEFORE "/"
						begin: /^[0-9]{3}(?=\/[0-9]{3} (XS|DL))/
					},
					{
						// DOUBLE TRIPLE DIGIT AFTER "/"
						begin: /(?<=^[0-9]{3}\/)[0-9]{3} (?=(XS|DL))/
					},
				]
			},
			{
				className: 'index',
				variants: [
					{
						// SINGLE DIGIT
						begin: /^(  [0-9])/
					},
					{
						// DOUBLE DIGIT
						begin: /^( [0-9]{2})/
					},
					{
						// TRIPLE DIGIT
						begin: /^([0-9]{3})/
					},
					{
						// DIGIT ON SAME ROW
						begin: /((?<=   )[0-9]{1,2}(?=\.))/
					},
					{
						// SINGLE TRIPLE DIGIT (    123)
						begin: /^ {4}[0-9]{3} /
					},
					{
						// DOUBLE TRIPLE DIGIT BEFORE "/"
						begin: /^[0-9]{3}(?=\/[0-9]{3} )/
					},
					{
						// DOUBLE TRIPLE DIGIT AFTER "/"
						begin: /(?<=^[0-9]{3}\/)[0-9]{3} /
					},
				]
			},
			{
				className: 'flight',
				variants: [
					{
						// KLM
						begin: /(?<=[A-Z]{2}\: )((KL   [0-9])|(KL  [0-9]{2})|(KL [0-9]{3})|(KL[0-9]{4}))/
					},
					{
						// AF
						begin: /(?<=[A-Z]{2}\: )((AF   [0-9])|(AF  [0-9]{2})|(AF [0-9]{3})|(AF[0-9]{4}))/
					},
					{
						// DELTA
						begin: /(?<=[A-Z]{2}\: )((DL   [0-9])|(DL  [0-9]{2})|(DL [0-9]{3})|(DL[0-9]{4}))/
					}
				]
			},
			{
				className: 'flight-partner',
				begin: /(?<=[A-Z]{2}\: )(([A-Z]{2}   [0-9])|([A-Z]{2}  [0-9]{2})|([A-Z]{2} [0-9]{3})|([A-Z]{2}[0-9]{4}))/
			},
			{
				className: 'time',
				variants: [
					{
						// FLIGHT DATE
						begin: /(?<=[A-Z] )[0-9]{2}[A-Z]{3}(?= [0-9])/
					},
					{
						// FLIGHT TIME (HHMM) DEPARTURE
						begin: /(?<= )[0-9]{4}(?= [0-9]{4})/
					},
					{
						// FLIGHT TIME (HHMM) ARRIVAL
						begin: /(?<=[0-9]{4} )[0-9]{4}(\+1)?(?=$)/
					}
				]
			},
			{
				className: 'date',
				begin: /(?<=\n        )[0-9]{2} (JANUARY|FEBRUARY|MARCH|APRIL|MAY|JUNE|JULY|AUGUST|SEPTEMBER|OCTOBER|NOVEMBER|DECEMBER) [0-9]{2}\:[0-9]{2} UTC\+0/gi
			},
			{
				className: 'iata',
				variants: [
					{
						// IATA CODE DEPARTURE
						begin: /(?<= [0-9] )[A-Z]{3}(?= [A-Z]{3} )/
					},
					{
						// IATA CODE ARRIVAL
						begin: /(?<= [0-9] [A-Z]{3} )[A-Z]{3}(?= )/
					}
				]
			},
			{
				className: 'contact-info',
				variants: [
					{
						// EMAIL
						begin: /.*APE ([A-Z0-9._%+-]+(@|\/\/)[A-Z0-9.-]+\.[A-Z]{2,4}).*$/gi
					},
					{
						// PHONE
						begin: /.*APM \+?([0-9]{3}[-. ]?[0-9]{3}[-. ]?[0-9]{4}).*$/gi
					}
				]
			},
			{
				className: 'message',
				begin: /.*\bMESSAGE\b.*$/
			},
			{
				className: 'status',
				begin: /(?<=[A-Z]{3} )(KK|KL|LK|NK|SS|TK|TL|TN|NO|UC|US|UU|HK|HN|HL|HX)[0-9]{1,2}(?= )/
			},
			{
				className: 'status un',
				begin: /(?<=[A-Z]{3} )(UN)[0-9]{1,2}(?= )/
			}
		]
	}
})

let targets = document.querySelectorAll('#crypticResponse1');
let config = { characterData: true, attributes: true, childList: true, subtree: false }

let statusCodes = {
	"LK": "Passive booking - wait for confirmation",
	"HK": "Confirmed",
	"TK": "Confirming, tell passenger new times",
	"UN": "Not possible, does not operate",
}

targets.forEach(function (target) {
	target.className += ' hristo';
	target.parentNode.className += ' bg';
	let observer = new MutationObserver(function (mutations) {
		if (isLoading) return;
		mutations.forEach(function (mutation) {
			const historyEl = document.getElementById("crypticHistoList1Id");
			target.textContent = target.textContent.replace(/\r\n\)|\n\)|\r\)/gm, "\n\n>>> GO TO NEXT PAGE (F8)");
			target.textContent = target.textContent.replace(/(OS\/)|(CS\/)|(TC\/)|(AS\/)|(XS\/)|(DL\/)|(RF\-)/gm, function (x) { return x.slice(0, 2) + ": " });
			// if (historyEl.value.indexOf("RHA") == 0 || historyEl.value.indexOf("RPP/RHA") == 0) {
			target.textContent = target.textContent.replace(/(\n        )|(\n      )/gm, "");
			// } else {
			// 	target.textContent = target.textContent.replace(/^(?!RP)(.+)(\n      )/gm, (match, p1, p2) => p1);					
			// }
			target.textContent = target.textContent.replace(/[0-9]{2}[A-Z]{3}[0-9]{4}Z/gi, function (x) { return x = "\n" + x + "\n" });
			target.textContent = target.textContent.replace(/\/(?:.(?!\/[A-Z]{2}))*\*(?=\n)/gi, '');
			target.textContent = target.textContent.replace(/((?<=\n)[0-9]{2})([A-Z]{3})([0-9]{2})([0-9]{2})Z/gi, function (match, p1, p2, p3, p4) {
				switch (p2) {
					case 'JAN': return `        ${p1} JANUARY ${p3}:${p4} UTC+0`;
					case 'FEB': return `        ${p1} FEBRUARY ${p3}:${p4} UTC+0`;
					case 'MAR': return `        ${p1} MARCH ${p3}:${p4} UTC+0`;
					case 'APR': return `        ${p1} APRIL ${p3}:${p4} UTC+0`;
					case 'MAY': return `        ${p1} MAY ${p3}:${p4} UTC+0`;
					case 'JUN': return `        ${p1} JUNE ${p3}:${p4} UTC+0`;
					case 'JUL': return `        ${p1} JULY ${p3}:${p4} UTC+0`;
					case 'AUG': return `        ${p1} AUGUST ${p3}:${p4} UTC+0`;
					case 'SEP': return `        ${p1} SEPTEMBER ${p3}:${p4} UTC+0`;
					case 'OCT': return `        ${p1} OCTOBER ${p3}:${p4} UTC+0`;
					case 'NOV': return `        ${p1} NOVEMBER ${p3}:${p4} UTC+0`;
					case 'DEC': return `        ${p1} DECEMBER ${p3}:${p4} UTC+0`;
				}
				return match;
			});
			target.textContent = target.textContent.replace(/((?<= [0-9] )[A-Z]{3}(?=[A-Z]{3} ))((?<= [0-9] [A-Z]{3})[A-Z]{3}(?= ))/gi, function (match, p1, p2) {
				return p1 + " " + p2;
			});
			observer.disconnect();
			hljs.highlightElement(target);
			observer.observe(target, config);
			observer.disconnect();
			let statuses = document.querySelectorAll('.hljs-status');
			statuses.forEach(function (status) {
				statusRead(status);
			});
			let iatas = document.querySelectorAll('.hljs-iata');
			iatas.forEach(function (iata) {
				iataRead(iata);
			});
			observer.observe(target, config);
		});
	});
	observer.observe(target, config);
	setTimeout(function () {
		target.textContent += ".";
	}, 1000);
});

function statusRead(status) {
	const statusText = status.textContent.slice(0, 2);
	const clone = status.cloneNode(true);
	const parent = status.parentNode;
	const container = document.createElement('div');
	clone.textContent = statusCodes[statusText] || "Unknown status code, check Ask";
	clone.className = 'popup';
	parent.replaceChild(container, status);
	container.className = 'container';
	container.appendChild(status);
	container.appendChild(clone);
}

function iataRead(iata) {
	const iataText = iata.textContent.slice(0, 3);
	const clone = iata.cloneNode(true);
	const parent = iata.parentNode;
	const container = document.createElement('div');
	clone.textContent = "Loading...";
	iata.addEventListener('click', async function () {
		const data = await getData(iataText);
		window.open(`https://www.google.com/search?q=${data}`);
	});
	iata.addEventListener('mouseover', async function () {
		clone.textContent = await getData(iataText);
	});
	clone.className = 'popup';
	parent.replaceChild(container, iata);
	container.className = 'container';
	container.appendChild(iata);
	container.appendChild(clone);
}

// SEATS
// PHONE + EMAIL