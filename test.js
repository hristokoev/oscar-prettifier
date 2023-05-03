let obj = {
    "classToggle": true,
    "colorAirports": "#92E5A1",
    "colorBg": "#020204",
    "colorContacts": "#D4D4D4",
    "colorHighlight": "#80CE87",
    "colorImportant": "#F57066",
    "colorIndex": "#22B455",
    "colorOffices": "#D4D4D4",
    "colorText": "#22B455",
    "hideSegmentStatusToggle": true,
    "iataToggle": true,
    "linesToggle": true,
    "officeToggle": true,
    "statusToggle": true,
    "switch": true,
    "theme": "matrix"
}

let newObj = (Object.fromEntries(Object.entries(obj).filter(([key]) => key.includes('color') || key.includes('theme'))));

/* RESULT:

newObj = {
    "colorAirports": "#92E5A1",
    "colorBg": "#020204",
    "colorContacts": "#D4D4D4",
    "colorHighlight": "#80CE87",
    "colorImportant": "#F57066",
    "colorIndex": "#22B455",
    "colorOffices": "#D4D4D4",
    "colorText": "#22B455",
    "theme": "matrix"
}
*/

/* DESIRED RESULT:

{
    "colorAirports": {
        "newValue": "#92E5A1",
    },
    "colorBg": {
        "newValue": "#020204",
    },
    "colorContacts": {
        "newValue": "#D4D4D4",
    },
    "colorHighlight": {
        "newValue": "#80CE87",
    },
    "colorImportant": {
        "newValue": "#f57066",
    },
    "colorIndex": {
        "newValue": "#22B455",
    },
    "colorOffices": {
        "newValue": "#D4D4D4",
    },
    "colorText": {
        "newValue": "#22B455",
    },
    "theme": {
        "newValue": "matrix",
    }
}

*/