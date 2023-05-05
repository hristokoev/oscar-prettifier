const LANG_INDEX = [
	{
		className: 'index',
		variants: [
			{
				// SINGLE DIGIT
				begin: /^(  [0-9])/
			},
			{
				// DOUBLE DIGIT
				begin: /^( [0-9]{2})/
			},
			{
				// TRIPLE DIGIT
				begin: /^([0-9]{3})/
			},
			{
				// DIGIT ON SAME ROW
				begin: /((?<=   )[0-9]{1,2}(?=\.))/
			},
			{
				// SINGLE TRIPLE DIGIT (    123)
				begin: /(^ {4}[0-9]{3} )|(^[0-9]\.?  )/
			},
			{
				// DOUBLE TRIPLE DIGIT BEFORE "/"
				begin: /^[0-9]{3}(?=\/[0-9]{3} )/
			},
			{
				// DOUBLE TRIPLE DIGIT AFTER "/"
				begin: /(?<=^[0-9]{3}\/)[0-9]{3} /
			},
		]
	}
];