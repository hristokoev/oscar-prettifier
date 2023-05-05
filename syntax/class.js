const LANG_CLASS = [
	{
		className: 'class',
		begin: /(?<=([A-Z]{2}\: (AF|KL|DL)[ 0-9]{4} )|(^[ 0-9]{3}  (AF|KL|DL)[ 0-9]{4} ))[A-Z](?=( [0-9]{2}[A-Z]{3}|\/[ A-Z0-9]{6} [A-Z]))/
	},
	{
		className: 'class-partner',
		variants: [
			{
				begin: /(?<=([A-Z]{2}\: [A-Z]{2}[ 0-9]{4} )|(^[ 0-9]{3}  [A-Z]{2}[ 0-9]{4} ))[A-Z](?= [0-9]{2}[A-Z]{3})/
			},
			{
				begin: /(?<=[ A-Z0-9]{6} [A-Z]\/[ A-Z0-9]{6} )[A-Z](?= [0-9]{2}[A-Z]{3})/
			}
		]
	}
];