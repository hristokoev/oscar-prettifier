const readClass = (flightClass, partner) => {
	const classText = flightClass.textContent;
	const clone = flightClass.cloneNode(true);
	const parent = flightClass.parentNode;
	const container = document.createElement('div');
	clone.textContent = partner ? `Partner class ${classText}` : CLASSESAFKL[classText];
	if (clone.textContent != `Partner class ${classText}`) {
		switch (CLASSESAFKL[classText]) {
			case "Economy":
				flightClass.textContent = `${classText}`;
				break;
			case "Business":
				flightClass.textContent = `${classText}`;
				break;
			case "Economy (Europe) or\nLa Première (Intercontinental)":
				flightClass.textContent = `${classText}`;
				break;
			case "Economy (Europe) or\nPremium Comfort (Intercontinental)":
				flightClass.textContent = `${classText}`;
				break;
		}
	} else {
		flightClass.textContent = `${classText}`;
	}
	clone.className = 'popup';
	parent.replaceChild(container, flightClass);
	container.className = 'container';
	container.appendChild(flightClass);
	container.appendChild(clone);
}