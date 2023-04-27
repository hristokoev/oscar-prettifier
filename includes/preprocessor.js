const preprocessor = (text) => {
	text = text.replace(/(OS\/)|(CS\/)|(TC\/)|(AS\/)|(XS\/)|(DL\/)|(RF\-)/gm, (x) => `${x.slice(0, 2)}: `);
	let flag = true;
	while (flag) {
		flag = false;
		text = text.replace(/^(?!RP)(.+)((\n        )|(\n      ))/gm, function (match, p1) { flag = true; return p1 });
	}
	text = text.replace(/[0-9]{2}[A-Z]{3}[0-9]{4}Z/gi, (x) => `\n${x}\n`);
	text = text.replace(/(\/(?:.(?!\/[A-Z]{2}))*\*)|(\*.*\*)/gi, '');
	text = text.replace(/((?<=\n)[0-9]{2})([A-Z]{3})([0-9]{2})([0-9]{2})Z/gi, (match, day, month, year, time) => convertTime(match, day, month, year, time));
	text = text.replace(/((?<= [0-9] )[A-Z]{3}(?=[A-Z]{3} ))((?<= [0-9] [A-Z]{3})[A-Z]{3}(?= ))/gi, (match, p1, p2) => `${p1} ${p2}`);
	return text;
};