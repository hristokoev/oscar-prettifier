const LANG_TIME = [
	{
		className: 'time',
		variants: [
			{
				// FLIGHT DATE
				begin: /(?<=[A-Z] )[0-9]{2}[A-Z]{3}(?= [0-9])/
			},
			{
				// FLIGHT TIME (HHMM) DEPARTURE
				begin: /(?<= )[0-9]{2}\:[0-9]{2}(?= [0-9]{2}\:[0-9]{2})/
			},
			{
				// FLIGHT TIME (HHMM) ARRIVAL
				begin: /(?<=[0-9]{2}\:[0-9]{2} )[0-9]{2}\:[0-9]{2}((\+1))?(?=$|\/ [0-9]{2}\:[0-9]{2} [0-9]{2}\:[0-9]{2})/
			}
		]
	}
]