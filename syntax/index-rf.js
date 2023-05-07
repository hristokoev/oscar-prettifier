const LANG_INDEX_RF = [
	{
		className: 'index-rf',
		variants: [
			{
				// SINGLE TRIPLE DIGIT (    123)
				begin: /^ {4}[0-9]{3} (?=RF)/
			},
			{
				// DOUBLE TRIPLE DIGIT BEFORE "/"
				begin: /^[0-9]{3}(?=\/[0-9]{3} RF)/
			},
			{
				// DOUBLE TRIPLE DIGIT AFTER "/"
				begin: /(?<=^[0-9]{3}\/)[0-9]{3} (?=RF)/
			}
		]
	}
];