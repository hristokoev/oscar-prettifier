const LANG_IATA = [
	{
		className: 'iata',
		variants: [
			{
				// IATA CODE DEPARTURE
				begin: /(?<=[0-9]{2}[A-Z]{3} [0-9] )[A-Z]{3}(?= [A-Z]{3} )/
			},
			{
				// IATA CODE ARRIVAL
				begin: /(?<=[0-9]{2}[A-Z]{3} [0-9] [A-Z]{3} )[A-Z]{3}(?= )/
			}
		]
	},
	{
		// IATA OFFICE ID
		className: 'office-info',
		variants: [
			{
				begin: /(?<=CR\-)[A-Z0-9]{9}(?= [0-9]{8} )/
			},
			{
				begin: /(?<=CR\-[A-Z0-9]{9} )[0-9]{8}(?= )/
			},
			{
				begin: /(?<=\/)[A-Z]{3}[A-Z0-9]{2}[0-9]{4}(?= )/
			}
		]
	}
];