const preprocessor = (text, options) => {
	if (options.mergeLines) {
		// Merging multiple lines
		let flag = true;
		while (flag) {
			flag = false;
			text = text.replace(/^(?!RP)(.+)((\n        )|(\n      ))/gm, function (match, p1) { flag = true; return p1 });
		}

		// Separating the time from the rest of the text
		text = text.replace(/[0-9]{2}[A-Z]{3}[0-9]{4}Z/gi, (x) => `\n${x}\n`);

		// Make time more readable
		text = text.replace(/((?<=\n)[0-9]{2})([A-Z]{3})([0-9]{2})([0-9]{2})Z/gi, (match, day, month, year, time) => convertTime(match, day, month, year, time));
	}

	if (options.hideSegmentIndicators) {
		// Changing OS/ to OS:, CS/ to CS:, TC/ to TC:, AS/ to AS:, XS/ to XS:, DL/ to DL:, RF- to RF:
		text = text.replace(/(OS\/)|(CS\/)|(TC\/)|(AS\/)|(XS\/)|(DL\/)|(RF\-)/gm, (x) => `${x.slice(0, 2)}: `);
		
		// Remove the asterisks like /LK *1A/E*
		text = text.replace(/\/[A-Z]{2}(    | \*[A-Z0-9]{2}| \*[A-Z0-9]\*)((\/| )E\*)?/gi, '');
	}

	// Separate IATAs
	text = text.replace(/((?<= [0-9] )[A-Z]{3}(?=[A-Z]{3} ))((?<= [0-9] [A-Z]{3})[A-Z]{3}(?= ))/gi, (match, p1, p2) => `${p1} ${p2}`);

	// Separate hours and minutes
	text = text.replace(/(?<=[A-Z]{3} [A-Z]{3} [A-Z]{2}[0-9]{1,2} )([0-9]{2})([0-9]{2}) ([0-9]{2})([0-9]{2})(\+1)?/gi,
		(match, hh1, mm1, hh2, mm2, plus) => `${hh1}:${mm1} ${hh2}:${mm2}${plus ? plus : ''}`
	);

	return text;
};