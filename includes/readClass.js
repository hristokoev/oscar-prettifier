const readClass = (flightClass, partner) => {
	const classText = flightClass.textContent;
	const clone = flightClass.cloneNode(true);
	const parent = flightClass.parentNode;
	const container = document.createElement('div');
	clone.textContent = partner ? "Partner class" : CLASSESAFKL[classText];
	clone.className = 'popup';
	parent.replaceChild(container, flightClass);
	container.className = 'container';
	container.appendChild(flightClass);
	container.appendChild(clone);
}