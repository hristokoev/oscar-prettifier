const readIata = (iata) => {
	const iataText = iata.textContent.slice(0, 3);
	const clone = iata.cloneNode(true);
	const parent = iata.parentNode;
	const container = document.createElement('div');
	clone.textContent = "Loading...";
	iata.addEventListener('click', function () {
		const data = IATA[iataText];
		window.open(`https://www.google.com/search?q=${data}`);
	});
	iata.addEventListener('mouseover', function () {
		clone.textContent = IATA[iataText];
	});
	clone.className = 'popup';
	parent.replaceChild(container, iata);
	container.className = 'container';
	container.appendChild(iata);
	container.appendChild(clone);
}