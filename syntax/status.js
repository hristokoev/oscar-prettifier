const LANG_STATUS = [
	{
		className: 'status',
		begin: /(?<=[A-Z]{3} )(KK|KL|LK|NK|SS|TK|TL|TN|NO|UC|US|UU|HK|HN|HL|HX)[0-9]{1,2}(?= )/
	},
	{
		className: 'status un',
		begin: /(?<=[A-Z]{3} )(UN)[0-9]{1,2}(?= )/
	}
]