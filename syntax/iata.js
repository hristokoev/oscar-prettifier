const LANG_IATA = [
	{
		className: 'iata',
		variants: [
			{
				// IATA CODE DEPARTURE
				begin: /(?<= [0-9] )[A-Z]{3}(?= [A-Z]{3} )/
			},
			{
				// IATA CODE ARRIVAL
				begin: /(?<= [0-9] [A-Z]{3} )[A-Z]{3}(?= )/
			}
		]
	},
	{
		// IATA OFFICE ID
		className: 'office-info',
		begin: /(?<=\s)[0-9]{8}(?=\sSU)/
	}
];