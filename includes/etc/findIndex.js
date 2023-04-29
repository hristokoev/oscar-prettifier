const findIndex = (string, node) => {
	const lines = node.textContent.split("\n");
	const length = node.textContent.length;
	for (let i = 0; i < length; i++) {
	  if (lines[i].includes(string)) {
	    return i;
	  }
	}
	return -1;
}

