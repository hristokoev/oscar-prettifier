const LANG_PNR = [
	{
		className: 'pnr',
		variants: [
            {
                // RPP/RLC
                begin: /(?<=[0-9]{4}Z\r\nRPP\/RLC\-)([A-Z0-9]{6})(?=$)/
            },
            {
                // RT
                begin: /(?<=[0-9]{4}Z   )([A-Z0-9]{6})(?=$)/
            }
        ]
	}
];