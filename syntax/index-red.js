const LANG_INDEX_RED = [
	{
		className: 'index-red',
		variants: [
			{
				// SINGLE TRIPLE DIGIT (    123)
				begin: /^ {4}[0-9]{3} (?=(XS|DL))/
			},
			{
				// DOUBLE TRIPLE DIGIT BEFORE "/"
				begin: /^[0-9]{3}(?=\/[0-9]{3} (XS|DL))/
			},
			{
				// DOUBLE TRIPLE DIGIT AFTER "/"
				begin: /(?<=^[0-9]{3}\/)[0-9]{3} (?=(XS|DL))/
			},
		]
	}
];