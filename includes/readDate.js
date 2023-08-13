const readDate = (date) => {
	let clone = date.cloneNode(true);
	const parent = date.parentNode;
	const container = document.createElement('div');
	clone.className = 'popup';
	clone.textContent = clone.textContent.replace(/([0-9]{2})([A-Z]{3})([0-9]{2})([0-9]{2})Z/gi, (match, day, month, year, time) => convertTime(match, day, month, year, time));
	parent.replaceChild(container, date);
	container.className = 'container';
	container.appendChild(date);
	container.appendChild(clone);
}