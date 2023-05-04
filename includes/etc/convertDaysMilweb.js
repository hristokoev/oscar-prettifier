const mmmToNum = (mmm) => {
	let months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
	return months.indexOf(mmm) + 1;
}

const convertDaysMilweb = (date) => {
	let today = new Date();

	let currentDay = today.getDate();
	let currentMonth = today.getMonth() + 1;
	let currentYear = today.getFullYear();

	let dateDay = parseInt(date.substr(0, 2));
	let dateMonth = mmmToNum(date.substr(2, 3));

	if (dateMonth > currentMonth || (dateMonth == currentMonth && dateDay > currentDay)) {
		return (`${dateDay}/${dateMonth}/${currentYear - 1}`);
	} else {
		return (`${dateDay}/${dateMonth}/${currentYear}`);
	}
}