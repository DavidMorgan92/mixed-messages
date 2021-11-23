# mixed-messages

This program randomly generates a mad lib from built in sets of stories and words.

## Usage

Load the program with the following command line:
```
$ node mixed-messages.js
```

### Example output

>It was a brief, cold November day. I woke up to the hungry smell of pidgeon roasting in the bathroom downstairs. I went down the stairs to see if I could help go the dinner. My mom said, "See if Doug needs a fresh brain." So I carried a tray of glasses full of water into the dancing room. When I got there, I couldn't believe my arms! There were cards dancing on the badge!

## Lib formatting
The program can be customized by editing the libs.json and words.json files. libs.json contains a list of libs, one of which will be chosen at random by the program to be filled with random words. The words will be chosen from the object in words.json.

Libs contain what are called "inject sites" into which random words are injected. An inject site is a keyword indicating the type of word that should be injected, surrounded by curly brackets.

Example extract from a lib:
>...I woke up to the {adj} smell of {bird} roasting in the {roominahouse} downstairs. I {verbpasttense} down the stairs to see if I could help {verb} the dinner...

The type of word corresponds to one of the lists in the object in words.json.

Example from words.json:
```
"adj": [
	"adorable",
	"adventurous",
	"aggressive",
	"annoying",
	...
```

An inject site can optionally be fillowed by a tilde (~), in which case the word injected will be capitalized.
