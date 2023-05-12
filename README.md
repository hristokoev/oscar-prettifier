# Pretty Oscar v1

This is a stand-alone Chrome Extension for the OSCAR tool, more known as Amadeus. It is a tool used by agents to book flights, see flight history, etc. This extension is meant to be used by agents, to make the tool more user-friendly and easier to use.

## Features

- It's simple, really. Makes the tool prettier and easier to read.
- Different themes to choose from.
- Info bubbles on hover for airports, booking classes, etc.
- **Currently only works for the CC department (general PNR information and history).**

## How does it work?

The OSCAR tool has only one `<pre>` tag, which contains all the information. This extension uses regular expressions to find the information and then it parses it into `<span>` elements, like a language parser. Then, it uses CSS to style the elements.

**[highlight.js](https://highlightjs.org/) is used for the syntax highlighting**

## How to install

1. Clone this repository or download it as a .zip file and extract it.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable Developer Mode.
4. Click on "Load unpacked extension..." and select the folder where you cloned/downloaded the repository.
5. Done! You can now use the extension.

## How to use

1. Open the OSCAR tool and log in.
2. By default it's already activated. 
3. Click on the extension icon to choose a theme or change the colors.
4. Done! The tool should now be prettier and easier to read.

## TODO

- [ ] Add more themes.
- [ ] Style SSR and information about seats.
- [ ] Expand the extension to other departments.