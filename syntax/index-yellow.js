const LANG_INDEX_YELLOW = [
	{
		className: 'index-yellow',
		variants: [
			{
				// SINGLE TRIPLE DIGIT (    123)
				begin: /^ {4}[0-9]{3} (?=AS)/
			},
			{
				// DOUBLE TRIPLE DIGIT BEFORE "/"
				begin: /^[0-9]{3}(?=\/[0-9]{3} AS)/
			},
			{
				// DOUBLE TRIPLE DIGIT AFTER "/"
				begin: /(?<=^[0-9]{3}\/)[0-9]{3} (?=AS)/
			},
		]
	}
];