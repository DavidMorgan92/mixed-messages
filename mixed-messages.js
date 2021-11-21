// Set of libs which can be injected with words from libInjects
const libs = [
    "It was a {adj}, cold November day. I woke up to the {adj} smell of {bird} roasting in the {roominahouse} downstairs. I {verbpasttense} down the stairs to see if I could help {verb} the dinner. My mom said, \"See if {name} needs a fresh {noun}.\" So I carried a tray of glasses full of {liquid} into the {verbing} room. When I got there, I couldn't believe my {bodypartplural}! There were {nounplural} {verbing} on the {noun}!",
    "The majestic {animal} has roamed the forests of {country} for thousands of years. Today, she wanders in search of {nounplural}. She must find food to survive. While hunting for {food}, she found a {screendevice} hidden behind a {noun}. She has never seen anything like this before. What will she do? With the device in her teeth, she tries to {verb}, but nothing happens. She takes it back to her family. When her family sees it, they quickly {verb}. Soon, the device becomes {adj}, and the family decides to put it back where they found it."
];

// Sets of words to inject into a lib
const libInjects = {
    // General adjectives
    adj: [
        "adorable",
        "adventurous",
        "aggressive",
        "annoying",
        "beautiful",
        "caring",
        "confident",
        "clumsy",
        "considerate",
        "excitable",
        "glamorous",
        "grumpy",
        "happy",
        "helpful",
        "important",
        "intimidating",
        "obnoxious",
        "odd",
        "talented",
        "thoughtless",
        "timid",
        "handsome",
        "bright",
        "clear",
        "distinct",
        "drab",
        "elegant",
        "filthy",
        "gleaming",
        "grotesque",
        "long",
        "magnificent",
        "precious",
        "sparkling",
        "spotless",
        "strange",
        "unsightly",
        "unusual",
        "valuable",
        "brave",
        "calm",
        "cheerful",
        "comfortable",
        "courageous",
        "determined",
        "eager",
        "elated",
        "encouraged",
        "energetic",
        "excited",
        "exuberant",
        "fantastic",
        "fine",
        "healthy",
        "joyful",
        "pleasant",
        "relieved",
        "angry",
        "annoyed",
        "anxious",
        "ashamed",
        "awful",
        "bewildered",
        "bored",
        "confused",
        "defeated",
        "defiant",
        "depressed",
        "disgusted",
        "disturbed",
        "dizzy",
        "embarrassed",
        "envious",
        "frightened",
        "hungry",
        "lonely",
        "scared",
        "terrified",
        "worried",
        "big",
        "colossal",
        "enormous",
        "gigantic",
        "great",
        "huge",
        "immense",
        "large",
        "little",
        "long",
        "mammoth",
        "massive",
        "meagre",
        "mighty",
        "miniature",
        "miniscule",
        "petite",
        "puny",
        "short",
        "tall",
        "teeny",
        "tiny",
        "ancient",
        "brief",
        "early",
        "fast",
        "late",
        "mordern",
        "old",
        "quick",
        "rapid",
        "short",
        "slow",
        "swift",
        "young"
    ],
    // General nouns
    noun: [
        "apple",
        "arithmetic",
        "badge",
        "basket",
        "basketball",
        "battle",
        "beast",
        "beetle",
        "beggar",
        "brain",
        "bubble",
        "bucket",
        "cactus",
        "cannon",
        "cow",
        "celery",
        "cellar",
        "cloth",
        "coach",
        "coast",
        "crate",
        "cream",
        "daughter",
        "donkey",
        "earthquake",
        "feast",
        "finger",
        "flock",
        "frame",
        "furniture",
        "geese",
        "ghost",
        "giraffe",
        "governor",
        "honey",
        "hope",
        "income",
        "island",
        "jeans",
        "judge",
        "lamp",
        "lettuce",
        "marble",
        "month",
        "ocean",
        "patch",
        "plane",
        "playground",
        "poison",
        "riddle",
        "scale",
        "seashore",
        "sidewalk",
        "sleet",
        "smoke",
        "bathtub",
        "nose",
        "sidewalk",
        "son",
        "stage",
        "station",
        "throat",
        "throne",
        "title",
        "toothbrush",
        "turkey",
        "umbrella",
        "underwear",
        "vacation",
        "vegetable",
        "poison",
        "riddle",
        "visitor",
        "voyage",
        "year"
    ],
    // General plural nouns
    nounplural: [
        "cards"
    ],
    // General verbs
    verb: [
        "go"
    ],
    // General past tense verbs
    verbpasttense: [
        "went"
    ],
    // General verbs ending in -ing
    verbing: [
        "dancing"
    ],
    // Types of animal
    animal: [
        "lion"
    ],
    // Types of bird
    bird: [
        "pidgeon"
    ],
    // A room in a house
    roominahouse: [
        "bathroom"
    ],
    // Proper names
    name: [
        "Doug"
    ],
    // Devices with screens
    screendevice: [
        "tablet"
    ],
    // Liquids
    liquid: [
        "water"
    ],
    // Plural body parts
    bodypartplural: [
        "arms"
    ],
    // Countries
    country: [
        "Switzerland"
    ],
    // Types of food
    food: [
        "spaghetti"
    ]
}

// Takes a starting string, replaces the content between start index and end idex with the given injection, and returns the new string
function injectString(startingString, startIndex, endIndex, injection) {
    return startingString.substr(0, startIndex) + injection + startingString.substr(endIndex);
}

// Generate a complete mad lib and return it
function generateMadLib() {
    // Choose a random lib
    let lib = libs[Math.floor(Math.random() * libs.length)];

    // Inject random words into the chosen lib
    // Loop over libInjects' members
    for (let inject in libInjects) {
        // Search for injection sites for the current inject
        let startIndex = 0, index;
        let searchStr = "{" + inject + "}";

        // For each injection site for the current inject
        while ((index = lib.indexOf(searchStr, startIndex)) > -1) {
            // Get the start and end indices of the injection site
            const injectStart = index;
            const injectEnd = index + searchStr.length;

            // Get a random word to inject
            const injectStr = libInjects[inject][Math.floor(Math.random() * libInjects[inject].length)];

            // Inject the string and store the result as the new lib
            lib = injectString(lib, injectStart, injectEnd, injectStr);

            // Advance the startIndex to the end of the injected word for the next search iteration
            startIndex += index + injectStr.length;
        }
    }

    return lib;
}

console.log(generateMadLib());
