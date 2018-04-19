// Hangman Game
// ------------------------------------------------------------------------------------------------------------------------------------
// (╯°□°）╯︵ ┻━┻

// Establish an object for the entire game.

var hangman = {};

// Display how many wins the user has (starts at 0).

hangman.wins = 0;

// Display how many guesses are remaining (starts at max - 7). 
// NOTE TO SELF: When declaring an anonymous function, add space between function and opening parenthesis.

hangman.newGame = function () {
    this.wrongGuessesRemaining = 7; // Resets guesses
    this.lettersTyped = [];  // Declares empty array
    this.gameStarted = false; // Checks if the user has started the game
    this.selectNewWord(); // Invokes new word from function
};

hangman.startGame = function () {

    this.gameStarted = true; // This starts the game.
}

// Select a new word from an array. 

hangman.selectNewWord = function () {

    var allWords = [
        "avengers",
        "thor",
        "ironman",
        "thanos",
        "nickfury",
        "spiderman"
    ];

    this.currentWord = allWords[Math.floor(Math.random() * allWords.length)]; // Current word is randomly generated through this formula

    return this.currentWord; // Return the currentWord variable/attribute.
}

hangman.getWordDisplay = function () { //to return the word current word / letters typed containing a score where the underscores has or hasn't been typed; for every character in the word, check if it's in if it's typed if not  put an underscore
    
    var displayWord = ""; // This variable will contain a returned display.

    for (var i = 0; i < this.currentWord.length; i++) { // This accesses each letter in order.

        if (displayWord.length > 0) { // This adds a space between each letter or underscore, except at the beginning of the word. So first time it loops, it will not execute.
            displayWord += " ";
        }
        var letter = this.currentWord.charAt(i);  // Variable is assigning the current character indexed by i.
        if (this.lettersTyped.includes(letter) || this.wrongGuessesRemaining < 1) { // This will show the answer when user runs out of guesses
            displayWord += letter.toUpperCase(); // displayWord letters are uppercase
            
        } else {
            displayWord += "_"; // This replaces the letter with the underscore. This should be default because user has not yet pressed keys.

        }
    }
    return displayWord;


}

hangman.handleKey = function (key) { // Invokes handleKey 

    if (!this.gameStarted) {
        if (key === " ") {
            this.startGame();
        }

    } else {
        var validKeys = "abcdefghijklmnopqrstuvwxyz"; // String of the alphabet

        key = key.toLowerCase(); // This makes user input case irrelevant.

        if (!this.lettersTyped.includes(key) && validKeys.includes(key)) { // This means user hasn't typed the key already and it is valid.           

            this.lettersTyped.push(key); // This adds the key to the lettersTyped array.

            if (!this.currentWord.includes(key)) { // If user inputs wrong guess, wrong guess count goes down.
                this.wrongGuessesRemaining--;
            }
        }
    }
    console.log(this.getWordDisplay());
}

// A function to handle the keyPress. 

document.onkeyup = function (event) {

    hangman.handleKey(event.key);

};

hangman.newGame();


