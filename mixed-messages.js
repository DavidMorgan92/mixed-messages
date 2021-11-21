const fs = require('fs');

/**
 * Loads an array of libs from a JSON file
 * @param {string} [filename=libs.json] - The libs file to load
 * @returns An array of libs
 */
function loadLibs(filename = "libs.json") {
	const data = fs.readFileSync(filename);
	const obj = JSON.parse(data);
	return obj.libs;
}

/**
 * Load a words object which contains words to inject into a lib
 * @param {string} [filename=words.json] - The words file to load
 * @returns The words object for injecting into the libs
 */
function loadWords(filename = "words.json") {
	const data = fs.readFileSync(filename);
	const obj = JSON.parse(data);
	return obj;
}

const libs = loadLibs();
const words = loadWords();

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

console.log(generateMadLib());
