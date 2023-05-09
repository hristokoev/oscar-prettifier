const LANG_INDEX_GREEN = [
	{
		className: 'index-green',
		variants: [
			{
				// SINGLE TRIPLE DIGIT (    123)
				begin: /^ {4}[0-9]{3} (?=(OS|CS|TC))/
			},
			{
				// DOUBLE TRIPLE DIGIT BEFORE "/"
				begin: /^[0-9]{3}(?=\/[0-9]{3} (OS|CS|TC))/
			},
			{
				// DOUBLE TRIPLE DIGIT AFTER "/"
				begin: /(?<=^[0-9]{3}\/)[0-9]{3} (?=(OS|CS|TC))/
			},
			// {
			// 	// RF LINES
			// 	begin: /(?<=^ {4}[0-9]{3} )RF\: .*$/
			// }
		]
	}
];