const LANG_INDEX_CHG = [
	{
		className: 'index-change',
		variants: [
			{
				// SINGLE TRIPLE DIGIT (    123)
				begin: /^ {4}[0-9]{3} (?=(CS|TC))/
			},
			{
				// DOUBLE TRIPLE DIGIT BEFORE "/"
				begin: /^[0-9]{3}(?=\/[0-9]{3} (CS|TC))/
			},
			{
				// DOUBLE TRIPLE DIGIT AFTER "/"
				begin: /(?<=^[0-9]{3}\/)[0-9]{3} (?=(CS|TC))/
			},
		]
	}
];