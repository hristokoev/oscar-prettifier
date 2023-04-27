const convertTime = (all, p1, p2, p3, p4) => {
	switch (p2) {
		case 'JAN': return `        ${p1} JANUARY ${p3}:${p4} UTC+0`;
		case 'FEB': return `        ${p1} FEBRUARY ${p3}:${p4} UTC+0`;
		case 'MAR': return `        ${p1} MARCH ${p3}:${p4} UTC+0`;
		case 'APR': return `        ${p1} APRIL ${p3}:${p4} UTC+0`;
		case 'MAY': return `        ${p1} MAY ${p3}:${p4} UTC+0`;
		case 'JUN': return `        ${p1} JUNE ${p3}:${p4} UTC+0`;
		case 'JUL': return `        ${p1} JULY ${p3}:${p4} UTC+0`;
		case 'AUG': return `        ${p1} AUGUST ${p3}:${p4} UTC+0`;
		case 'SEP': return `        ${p1} SEPTEMBER ${p3}:${p4} UTC+0`;
		case 'OCT': return `        ${p1} OCTOBER ${p3}:${p4} UTC+0`;
		case 'NOV': return `        ${p1} NOVEMBER ${p3}:${p4} UTC+0`;
		case 'DEC': return `        ${p1} DECEMBER ${p3}:${p4} UTC+0`;
	}
	return all;
}