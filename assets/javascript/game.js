

// Enable debugging 
var enableDebug = false;

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
   *  returns true if the game is still running, else returns false
   * *****************************************************************************************/
   getIsGameRunning: function () {
      return this.gameRunning;
   },

   /***** ***************************************************************************************
   * returns the hangman character string
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
   * returns the number of losses
   * *****************************************************************************************/
   getLosses: function () {
      return this.losses;
   },

   /********************************************************************************************
  * returns list of character(s) guesses by the user
  * *****************************************************************************************/
   getGuessedCharacters: function () {
      return this.userGuessedCharacters;
   },

   /********************************************************************************************
   * returns the recent character that the user guessed
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

   /********************************************************************************************
   * returns who many wins the user has
   * 
   **********************************************************************************************/
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
   *  determines if the user input characters matches our secret word. Returns true if user 
   *  has matched our secret word
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
    *  returns true if  the single character entered by the user matches at least one character
    *  in our secret word. Else return false
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
         // input character doesn't match any character in secret word
         return false;
      }
   },

   /********************************************************************************************
    * called when OnKeyUp event has occured. inputCharacter contains the key that the user pressed.
    **********************************************************************************************/
   userInput: function (inputCharacter) {

      // Save user input character
      this.userGuess = inputCharacter;

      // if we have no guesses remaining return false
      if (this.guessesRemaining === 0)
         return false;

      // do nothing if input character has already been entered by the user
      if (this.duplicateInputCharacter(this.userGuess) == true) {
         if (enableDebug)
            console.log("duplicate character found");

         return true;
      }

      // not a duplicate therefore it's a valid selction so 
      // we will keep track of it
      this.userGuessedCharacters.push(inputCharacter);

      if (enableDebug)
         console.log(this.userGuessedCharacters);

      // determine if input character matches any character in 
      // our secret word
      if (this.charMatches(this.userGuess) == true) {

         if (enableDebug) {
            console.log("We've found a match");
         }

         // we've found a match so check if user has correctly
         // guessed our word
         if (this.wordFound() == true) {
            // user wins the game
            this.userWins();
            this.gamesOver();

            if (enableDebug)
               console.log("match found!!");
         }
      }
      else {
         // wrong guess so determine if are we done? first decrement guesses remaing.
         // returns false if game is over (i.e. no guesses remaining) else return true. 
         this.guessesRemaining = this.guessesRemaining - 1;
         if (this.guessesRemaining <= 0) {
            // no guesses remaining so game over
            this.losses++;
            this.gamesOver();
            return false;
         }
      }
      // this code will never will be called but just in case....
      if(enableDebug)
         alert("ASSERT...this location should never be reached")
      return true;
   },


   /********************************************************************************************
     * startGame sets up the inital conditions at the start of every game. 
     **********************************************************************************************/
   startGame: function () {

      // Intialize all our variables at the start of a new game
      this.gameRunning = true;
      this.guessesRemaining = 9;
      this.userGuesss = "";
      this.userGuessedCharacters.length = 0;
      this.hangmanCharacters.length = 0;
      this.secretWord.length = 0;

      // generate a secret word
      secretWord = this.getWord();
      console.log("secret word is " + this.secretWord);

      // populate each hangman characters with dashes, based on 
      // on the number of characters of our secret word
      for (var i = 0; i < this.secretWord.length; i++) {
         this.hangmanCharacters.push("-");
      }
   },

   /********************************************************************************************
   * returns the running state of the game. return true if game is running, else return false
   **********************************************************************************************/
   gamesOver: function () {
      this.gameRunning = false;
   }
};
