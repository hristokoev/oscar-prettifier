const processLines = (string, lines, firstLine, className) => {
	while (firstLine != -1) {
		lines.push(firstLine);
		firstLine = findIndex(string, target, firstLine);
	}	
	lines.forEach((el) => {
		console.log(el);
		document.querySelectorAll('.highlight-line').forEach((line, index) => {
			if (index == el) {
				line.className += className || '';
			}
		});
	});				
}