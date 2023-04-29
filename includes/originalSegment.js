const originalSegment = (firstEl, lastEl, color) => {
	// Get the text content between the elements
	const startIndex = firstEl.textContent.trim();
	const endIndex = lastEl.textContent.trim();

	// Select all elements between the two
	const elements = [];
	while (firstEl && firstEl.textContent.trim() !== endIndex) {
		elements.push(firstEl);
		firstEl = firstEl.nextSibling;
	}

	// Create a new div and add the elements to it
	const newDiv = document.createElement('div');
	elements.forEach((element) => {
		newDiv.appendChild(element.cloneNode(true));
	});
	newDiv.className = "original-segment";
	newDiv.style.borderColor = color;

	// Insert the new div before the last element
	lastEl.parentNode.insertBefore(newDiv, lastEl);

	// Delete the old elements
	elements.forEach((element) => {
		element.parentNode.removeChild(element);
	});

	newDiv.appendChild(lastEl);
}