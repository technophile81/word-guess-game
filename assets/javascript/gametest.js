// Hangman Game
// ------------------------------------------------------------------------------------------------------------------------------------
// (╯°□°）╯︵ ┻━┻ TABLE FLIP BUT I GOT THIS

// Establish an object for the entire game.
var hangman = {};

// Display how many wins the user has (starts at 0).
hangman.wins = 0;
hangman.roundsPlayed = 0;

// Display how many guesses are remaining (starts at max - 7). 
// NOTE TO SELF: When declaring an anonymous function, add space between function and opening parenthesis.
hangman.newRound = function () {
    this.wrongGuessesRemaining = 7; // Resets guesses
    this.lettersTyped = [];  // Declares empty array
    this.roundStarted = false; // Checks if the user has started the game
    this.selectNewWord(); // Invokes new word from function
};

hangman.startRound = function () {
    this.roundsPlayed++;
    this.roundStarted = true; // This starts the game.
};

// Select a new word from an array. 
hangman.selectNewWord = function () {

    var allWords = [
        "wafer",
        "cheesecake",
        "tart",
        "donut",
        "pudding",
        "cupcake",
        "brownie",
        "applepie",
        "macaroon",
        "chocolate",
        "danish",
        "tiramisu",
        "marzipan",
        "souffle",
        "bearclaw",
        "redvelvet",
        "fruitcake",
        "cookie",
        "bonbon",
        "gingersnap",
        "sugarplum",
        "toffee",
        "licorice",
        "cherry pie",
        "caramel",
        "muffin",
        "meringue",
        "croissant"
    ];

    this.currentWord = allWords[Math.floor(Math.random() * allWords.length)]; // Current word is randomly generated through this formula

    return this.currentWord; // Return the currentWord variable/attribute.
};

// Return the word current word / letters typed containing a score where the underscores has or hasn't been typed; for every character in the word, check if it's in if it's typed; if not,put an underscore
hangman.getWordDisplay = function () {

    var displayWord = ""; // This variable will contain a returned display.

    for (var i = 0; i < this.currentWord.length; i++) { // This accesses each letter in order.

        //if (displayWord.length > 0) { // This adds a space between each letter or underscore, except at the beginning of the word. So first time it loops, it will not execute.
        //        displayWord += " ";
        //    }
        var letter = this.currentWord.charAt(i);  // Variable is assigning the current character indexed by i.

        if (this.lettersTyped.includes(letter) || this.wrongGuessesRemaining < 1) { // This will show the answer when user runs out of guesses
            displayWord += letter.toUpperCase(); // displayWord letters are uppercase

        } else {
            displayWord += "_"; // This replaces the letter with the underscore. This should be default because user has not yet pressed keys.

        }
    }
    return displayWord;
};

// Updates the display to reflect the current state of the game
hangman.updateDisplay = function () {
    document.getElementById("hangman-wins").innerHTML = this.wins; // + " / " + this.totalRounds; // incrememnt totalRounds in startRound
    document.getElementById("hangman-guesses").innerHTML = this.wrongGuessesRemaining;
    document.getElementById("hangman-letters").innerHTML = this.getWordDisplay();
    document.getElementById("hangman-typed").innerHTML = this.lettersTyped.join(""); // This method on an array will by default concatenate all items with a comma, but it takes one argument to override this to be any other string to use as the glue - including an empty string.
    if (this.roundsPlayed < 1) {
        document.getElementById("instructions").innerHTML = "Press the SPACE BAR to play!";
    } else if (this.roundWon()) {
        document.getElementById("instructions").innerHTML = "Congratulations! Hit the SPACE BAR to play again!";
    } else if (this.roundLost()) {
        document.getElementById("instructions").innerHTML = "You suck. Hit the SPACE BAR to play again!";
    } else {
        document.getElementById("instructions").innerHTML = "Good luck! Guess by typing letters on your keyboard.";
    }
};

hangman.roundLost = function () {
    return (this.wrongGuessesRemaining < 1);
};

hangman.roundWon = function () {
    return (!this.roundLost() && !this.getWordDisplay().includes("_"));
};

// Invokes handleKey
hangman.handleKey = function (key) {

    if (!this.roundStarted) {
        if (key === " ") {
            if (this.roundsPlayed > 0) {
                this.newRound();
            }
            this.startRound();
            this.updateDisplay();
        }

    } else {
        var validKeys = "abcdefghijklmnopqrstuvwxyz"; // String of the alphabet

        key = key.toLowerCase(); // This makes user input case irrelevant.

        if (!this.lettersTyped.includes(key) && validKeys.includes(key)) { // This means user hasn't typed the key already and it is valid.           
            this.lettersTyped.push(key); // This adds the key to the lettersTyped array.

            if (!this.currentWord.includes(key)) { // If user inputs wrong guess, wrong guess count goes down.
                this.wrongGuessesRemaining--;
                // Cake
                // document.getElementById("cake").setAttribute("src","assets/images/"+wrongGuessesRemaining+".png");  //


                if (this.roundLost()) {
                    this.roundStarted = false;

                }
            } else if (this.roundWon()) {
                this.wins++;
                this.roundStarted = false;
            }
        }
        this.updateDisplay();
    }
};



// document.getElementById("cake").innerHTML = "Nope +wrongGuessesRemaining+ try again";


hangman.cakeReveal = function () {

    if (this.wrongGuessesRemaining === 6) {
        document.getElementById("cake").setAttribute("src", "../assets/images/6.png");
    }
};

hangman.cakeReveal();

hangman.handleReveal = function () {
    this.wrongGuessesRemaining = 0;
    this.roundStarted = false;
    this.updateDisplay();
};

// A function to handle the keyPress. 
document.onkeyup = function (event) { // callback to be invoked when the onkeyup event occurs
    hangman.handleKey(event.key);
};

document.getElementById("hangman-reveal").onclick = function (event) {
    hangman.handleReveal();
    document.getElementById("hangman-reveal").blur();
};




hangman.newRound();
hangman.updateDisplay();

