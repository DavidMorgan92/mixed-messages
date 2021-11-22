// Use file system module for loading JSON files
const fs = require('fs');

/**
 * Load a JSON object from the given file
 * @param {string} filename - The file to load
 * @returns The object in the JSON file
 */
function loadJSON(filename) {
	const data = fs.readFileSync(filename);
	const obj = JSON.parse(data);
	return obj;
}

/**
 * Array of libs to inject random words into
 */
const libs = loadJSON("libs.json").libs;

/**
 * Object containing lists of words to inject into a lib
 */
const words = loadJSON("words.json");

/**
 * Replace a section of the starting string with the injection
 * @param {string} startingString - String into which to inject
 * @param {number} startIndex - Start position of the injection site
 * @param {number} endIndex - End position of the injection site
 * @param {string} injection - The string to inject
 * @returns The starting string with the given injection
 */
function injectString(startingString, startIndex, endIndex, injection) {
	return startingString.substr(0, startIndex) + injection + startingString.substr(endIndex);
}

/**
 * Inject random words of the given inject type into the lib and return it
 * @param {string} injectType - The type of word to inject into the lib
 * @param {string} lib - The lib into which to inject random words
 * @returns The lib with random words injected into it
 */
function injectIntoLib(injectType, lib) {
	const searchStr = "{" + injectType + "}";
	let startIndex = 0, index;

	// For each injection site for the current inject
	while ((index = lib.indexOf(searchStr, startIndex)) > -1) {
		// Get the start and end indices of the injection site
		const injectStart = index;
		const injectEnd = index + searchStr.length;

		// Get a random word to inject
		const injectStr = words[injectType][Math.floor(Math.random() * words[injectType].length)];

		// Inject the string and store the result as the new lib
		lib = injectString(lib, injectStart, injectEnd, injectStr);

		// Advance the startIndex to the end of the injected word for the next search iteration
		startIndex = injectEnd;
	}

	return lib;
}

/**
 * Select a random madlib and insert randomly selected words into it
 * @returns A random madlib
 */
function generateMadLib() {
	// Choose a random lib
	let lib = libs[Math.floor(Math.random() * libs.length)];

	// Inject random words into the chosen lib
	// Loop over words' members
	for (let injectType in words) {
		// Inject random words of this type into the chosen lib
		lib = injectIntoLib(injectType, lib);
	}

	return lib;
}

// Generate a mad lib and display it in the console
console.log(generateMadLib());
