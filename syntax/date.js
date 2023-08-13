// const LANG_DATE = [
// 	{
// 		className: 'date',
// 		begin: /(?<=\n        )[0-9]{2} (JANUARY|FEBRUARY|MARCH|APRIL|MAY|JUNE|JULY|AUGUST|SEPTEMBER|OCTOBER|NOVEMBER|DECEMBER) [0-9]{2}\:[0-9]{2} UTC\+0/gi
// 	}
// ];

// NEW VERSION:

const LANG_DATE = [
	{
		className: 'date',
		begin: /(?<=\n        )[0-9]{2}(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)[0-9]{4}Z/gi
	}
];