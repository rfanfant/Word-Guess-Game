

// Enable debugging 
var enableDebug = true;

var wordGame = {

   gameRunning: true,
   wins: 0,
   losses: 0,
   secretWord: [],
   guessesRemaining: 9,
   userGuess: "",
   hangmanCharacters: [],
   userGuessedCharacters: [],
   welcomeToWordGuess: "Wecome to the Word Guess game. Please guess the secret word by entering characters on the keyboard. If you don't guess the secret word in nine tries, you lose the game.",


   /*****************************************************************************************
    * Selects a word from our arry of words and stores the word into variable "secretWord".
    * **************************************************************************************/
   getWord: function () {
      // Array containing our words
      var wordArray = ["bruce", "madonna", "foo", "item", "house", "car", "diapers", "einstien", "japan", "hydrogen", "exotic", "blondie",
         "javascript", "goldfinger", "tesla", "unique", "incredible", "success", "extrapolate", "definition", "thermos",
         "thermostat", "computer", "faucet", "plumber", "girlfriend", "pavement", "mazda", "sunshine", "comb", "catacombs",
         "greece", "belguim", "vienna", "hotdog", "jethro", "hawaii", "songbirds", "craftbeer", "facial", "tissue", "amateur",
         "ridiculous", "hamburger", "phosphate", "uranium", "electrified", "blowtorch", "melanie", "oxford", "dictionary",
         "rocket", "falcon", "serendipity", "visual", "darnit", "tendonitus"];


      // Select and return a single word from our Array
      this.secretWord = wordArray[Math.floor(Math.random() * wordArray.length)];

      if (enableDebug)
         console.log("Computer selected the word: " + this.secretWord);
   },


   /***** ***************************************************************************************
   * updates the game display based total user wins
   * *****************************************************************************************/
   getIsGameRunning: function () {
      return this.gameRunning;
   },
   /***** ***************************************************************************************
   * updates the game display based total user wins
   * *****************************************************************************************/
   getUnderscore: function () {
      return this.hangmanCharacters;
   },

   /********************************************************************************************
   * updates the game display based total user wins
   * *****************************************************************************************/
   getWins: function () {
      return this.wins;
   },

   /********************************************************************************************
   *  returns number of guesses remaining
   ******************************************************************************************/
   getCharsLeft: function () {
      return this.guessesRemaining;
   },
   /********************************************************************************************
   * updates the game display numbre of wins
   * *****************************************************************************************/
   getLosses: function () {
      return this.losses;
   },

   /********************************************************************************************
  * updates the game display with characters users has already guessed
  * *****************************************************************************************/
   getGuessedCharacters: function () {
      return this.userGuessedCharacters;
   },

   /********************************************************************************************
   * updates the game display with characters users has already guessed
   * *****************************************************************************************/
   getUserInput: function () {
      return this.userInput;
   },

   /********************************************************************************************
   * checks to see if a duplicate character was entered by the user. If so, return true, else 
   * return false
   **********************************************************************************************/
   duplicateInputCharacter: function (inputCharacter) {

      /* compare input character to every character in the array of previously guessed characters*/
      if (this.userGuessedCharacters.indexOf(inputCharacter) < 0)
         return false;
      else
         return true;
   },

   userWins: function () {

      this.wins++;
   },

   /********************************************************************************************
   *  replace the hangman "-" characters/location with the correct user guessed character. index
   *   position is determined from comparning user guessed characters to where they are found in 
   *   the secret word.
   * *****************************************************************************************/
   updateHangmanCharacters: function () {
      //index in the array to replace
      var charIndex = 0;

      // replace the "-" character in hangmanCharacter array to show the user locations
      // in the secret word that his userGuess character matches.

      while ((charIndex !== -1) && (charIndex < this.secretWord.length)) {

         // find location of first match (if any)
         charIndex = this.secretWord.indexOf(this.userGuess, charIndex);
         // we found a match of charIndex is not == to -1
         if (charIndex !== -1) {
            // replace the "-" with correct guessed letter
            this.hangmanCharacters.splice(charIndex, 1, this.userGuess);

            //increment search position for next search
            charIndex++;
         }
      }
   },

   /********************************************************************************************
   *  determines if user input characters  matches our secret word
   * *****************************************************************************************/
   wordFound: function (inputCharacter) {
      // save user input

      // determine if userGuess is contained in secrect word
      for (var i = 0; i < this.secretWord.length; i++) {
         // userGuessCharacters need to contain every letter in secret word or else it 
         // cant be a match
         if (this.userGuessedCharacters.indexOf(this.secretWord[i]) === -1) {
            if (enableDebug)
               console.log("  a userGuessedCharacters is NOT contained in secret word");
            return false;
         }
      }

      // If we get to this point, we have a word match
      return true;
   },

   /********************************************************************************************
    *  returns true if usser guessed the characters in our secret word
    * *****************************************************************************************/
   charMatches: function () {

      // iterate through every character in secretWord and to make sure guessedCharacters contains it,
      // if so return true, else return false

      console.log("check to see if user guess matches any characters in secret word!");
      if (this.secretWord.indexOf(this.userGuess) !== -1) {
         if (enableDebug)
            console.log(" character matche in our secret word!");

         // we have characters(s) that match so update the hangmanCharacter array to show 
         // correctly guessed characters
         this.updateHangmanCharacters();
         return true;
      }
      else {
         if (enableDebug)
            console.log(" NO character match in our secret word!");
         return false;
      }
   },

   /********************************************************************************************
    * called when OnKeyUp event has occured. inputCharacter contains the key that the user pressed.
    * the key is stored in the guessedCharacter array; 
    **********************************************************************************************/
   userInput: function (inputCharacter) {

      // Save user input
      this.userGuess = inputCharacter;

      if (this.guessesRemaining === 0)
         return false;

      // do nothing if input character has already been entered by the user
      if (this.duplicateInputCharacter(this.userGuess) == true) {
         if (enableDebug)
            console.log("duplicate character found");

         return true;
      }

      if (enableDebug)
         console.log(" NOT a duplicate character");

      // not a duplicate therefore it's a valid selction so 
      // we will keep track of it
      this.userGuessedCharacters.push(inputCharacter);

      if (enableDebug)
         console.log(this.userGuessedCharacters);


      if (this.charMatches(this.userGuess) == true) {

         if (enableDebug) {
            console.log("We've found a match");
         }

         // we've found a match so update the display
         if (this.wordFound() == true) {
            this.userWins();
            this.gamesOver();

            if (enableDebug)
               console.log("match found!!");
         }
      }
      else {
         // wrong guess so are we done?
         this.guessesRemaining = this.guessesRemaining - 1;
         if (this.guessesRemaining <= 0) {
            this.losses++;
            this.gamesOver();
            return false;
         }      }
      return true;
   },


   /********************************************************************************************
     * called when OnKeyUp event has occured. inputCharacter contains the key that the user pressed.
     * the key is stored in the guessedCharacter array; 
     **********************************************************************************************/
   startGame: function () {

    // Intialize all our variables at the start of a new game
      this.gameRunning = true;
      this.guessesRemaining = 9;
      this.userGuesss = "";
      this.userGuessedCharacters.length = 0;
      this.hangmanCharacters.length = 0;
      this.secretWord.length = 0;

      secretWord = this.getWord();

      // populate hangman characters
      for (var i = 0; i < this.secretWord.length ; i++) {
         this.hangmanCharacters.push("-");
      }
   },

   /********************************************************************************************
   * called when OnKeyUp event has occured. inputCharacter contains the key that the user pressed.
   * the key is stored in the guessedCharacter array; 
   **********************************************************************************************/
   gamesOver: function () {
      this.gameRunning= false;
   }
};
