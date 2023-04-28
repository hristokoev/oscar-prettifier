const LANG_CLASS = [
	{
		className: 'class',
		begin: /(?<=([A-Z]{2}\: (AF|KL|DL)[ 0-9]{4} )|(^[ 0-9]{3}  (AF|KL|DL)[ 0-9]{4} ))[A-Z](?= [0-9]{2}[A-Z]{3})/
	},
	{
		className: 'class-partner',
		begin: /(?<=([A-Z]{2}\: [A-Z]{2}[ 0-9]{4} )|(^[ 0-9]{3}  [A-Z]{2}[ 0-9]{4} ))[A-Z](?= [0-9]{2}[A-Z]{3})/
	}
];