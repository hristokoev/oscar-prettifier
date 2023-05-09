const LANG_CONTACT = [
	{
		className: 'contact-info',
		variants: [
			{
				// EMAIL
				begin: /(?<=.*(APE|CTCE.*)) ([A-Z0-9._%+-]+(@|\/\/)[A-Z0-9.-]+\.[A-Z]{2,4}).*$/gi
			},
			{
				// PHONE
				begin: /(?<=.*(APM|CTCM.*)) \+?([0-9]{3}[-. ]?[0-9]{3}[-. ]?[0-9]{4}).*$/gi
			}
		]
	}
];