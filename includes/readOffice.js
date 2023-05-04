const readOffice = (el) => {
	let iata = el.textContent;
	el.addEventListener("click", () => {
		document.getElementById("crypticRequest1").value = `PV/${iata}}`;
		// ???
		launchCrypticTransaction(1, 2, officeId1, true);
		document.getElementById("amadeusTransaction1Form").submit();
	});
}

// const readOffice = (el, iata, office) => {
// 	const popup = el.cloneNode(true);
// 	const parent = el.parentNode;
// 	const container = document.createElement('div');
// 	popup.textContent = "Loading...";
// 	popup.className = 'popup';
// 	parent.replaceChild(container, el);
// 	container.className = 'container';
// 	container.appendChild(el);
// 	container.appendChild(popup);
// 	addHoverListener(el, popup, iata, office);
// }

// function addHoverListener(el, popup, iata, office) {
// 	el.addEventListener('mouseenter', function listener() {
// 		let promise = new Promise((resolve, reject) => {
// 			chrome.runtime.sendMessage({ action: 'callApi', officeIata: iata, officeId: office }, response => {
// 				if (response) {
// 					resolve(response);
// 				} else {
// 					el.textContent = iata;
// 				}
// 			});
// 		});
// 		promise.then(response => {
// 			popup.textContent = response;
// 			el.removeEventListener('mouseenter', listener);
// 		}).catch(error => {
// 			console.error(error);
// 		});
// 	}, { once: true });
// }