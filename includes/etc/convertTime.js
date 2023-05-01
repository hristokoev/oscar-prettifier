const convertTime = (all, p1, p2, p3, p4) => {
	switch (p2) {
		case 'JAN': return `        ${p1} January ${p3}:${p4} UTC+0`;
		case 'FEB': return `        ${p1} February ${p3}:${p4} UTC+0`;
		case 'MAR': return `        ${p1} March ${p3}:${p4} UTC+0`;
		case 'APR': return `        ${p1} April ${p3}:${p4} UTC+0`;
		case 'MAY': return `        ${p1} May ${p3}:${p4} UTC+0`;
		case 'JUN': return `        ${p1} June ${p3}:${p4} UTC+0`;
		case 'JUL': return `        ${p1} July ${p3}:${p4} UTC+0`;
		case 'AUG': return `        ${p1} August ${p3}:${p4} UTC+0`;
		case 'SEP': return `        ${p1} September ${p3}:${p4} UTC+0`;
		case 'OCT': return `        ${p1} October ${p3}:${p4} UTC+0`;
		case 'NOV': return `        ${p1} November ${p3}:${p4} UTC+0`;
		case 'DEC': return `        ${p1} December ${p3}:${p4} UTC+0`;
	}
	return all;
}