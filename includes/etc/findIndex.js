const findIndex = (string, node, previous) => {
	const lines = node.textContent.split("\n");
	const length = lines.length;
	for (let i = 0; i < length; i++) {
		if (lines[i].includes(string) && i > previous) {
			return i;
		}
	}
	return -1;
}

