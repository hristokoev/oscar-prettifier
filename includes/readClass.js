const classesAFKL = {
	"Y": "Economy",
	"B": "Economy",
	"M": "Economy",
	"U": "Economy",
	"K": "Economy",
	"W": "Economy",
	"H": "Economy",
	"S": "Economy",
	"L": "Economy",
	"A": "Economy",
	"Q": "Economy",
	"T": "Economy",
	"E": "Economy",
	"N": "Economy",
	"R": "Economy",
	"V": "Economy",
	"X": "Economy",
	"G": "Economy",
	"J": "Business",
	"C": "Business",
	"D": "Business",
	"I": "Business",
	"Z": "Business",
	"O": "Business",
	"P": "Economy (Europe) or La Première (Intercontinental)",
	"F": "Economy (Europe) or La Première (Intercontinental)",
	"W": "Economy (Europe) or Premium Comfort (Intercontinental)",
	"S": "Economy (Europe) or Premium Comfort (Intercontinental)",
	"A": "Economy (Europe) or Premium Comfort (Intercontinental)",
}

const readClass = (flightClass, partner) => {
	const classText = flightClass.textContent;
	const clone = flightClass.cloneNode(true);
	const parent = flightClass.parentNode;
	const container = document.createElement('div');
	clone.textContent = "Loading...";
	flightClass.addEventListener('mouseover', function () {
		clone.textContent = partner ? "Partner class" : classesAFKL[classText];
	});
	clone.className = 'popup';
	parent.replaceChild(container, flightClass);
	container.className = 'container';
	container.appendChild(flightClass);
	container.appendChild(clone);
}