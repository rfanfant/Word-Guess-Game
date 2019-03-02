

// Enable debugging 
var enableDebug = true;

var wordGame = {

   wins: 0,
   losses: 0,
   secretWord: [],
   guessesRemaining: 9,
   userGuess: "",
   guessedCharacters: [],
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

   /********************************************************************************************
    * updates the game display based off user input
    * *****************************************************************************************/
   updateDisplay: function () {

      console.log("**********************************************************************");
      console.log("wins: " + this.wins);
      console.log("losses: " + this.losses);
      console.log("guesses: " + this.guessesRemaining);
      console.log("user guess: " + userGuess);
      this.displayGuessedCharacters();
      console.log("***********************************************************************");
   },

   /********************************************************************************************
   * updates the game display based total user wins
   * *****************************************************************************************/
   displayWins: function () {
      if (enableDebug)
         console.log(" userGuess is conatined in secret word");
   },

   /********************************************************************************************
* updates the game display based total user wins
* *****************************************************************************************/
   displayMatches: function () {
      if (enableDebug)
         console.log("displayMatches has been called");
   },



   /********************************************************************************************
   * updates the game display based total user losses
   * *****************************************************************************************/
   displayLosses: function () {
   },



   /********************************************************************************************
   * updates the game display based on how many guesses the user has remaining
   * *****************************************************************************************/
   displayGuessesRemaining: function () {
   },

   /********************************************************************************************
   * updates the game display with characters users has already guessed
   * *****************************************************************************************/
   displayGuessedCharacters: function () {

      var strText = "";
      for (var i=0; i < guessedCharacters.length; i++)
      {
         strText +=  (this.guessedCharacters[i] + " ") ;
      }
   
      console.log("guessedCharacters: " + strText);
   },

   /********************************************************************************************
   * checks to see if a duplicate character was entered by the user. If so, return true, else 
   * return false
   **********************************************************************************************/
   duplicateInputCharacter: function (inputCharacter) {

      /* compare input character to every character in the array of previously guessed characters*/
      if (this.guessedCharacters.indexOf(inputCharacter) < 0)
         return false;
      else
         return true;
   },

   userWins: function () {
      if (enableDebug)
         console.log("userWins funcition called")

   },




   /********************************************************************************************
   *  determines if user input character matches a character in the word
   * *****************************************************************************************/
   matchFound: function (inputCharacter) {
      // save user input

      // determine if userGuess is contained in secrect word
      if (this.guessedCharacters.indexOf(inputCharacter) == -1) {
         if (enableDebug)
            console.log(" userGuess is NOT contained in secret word");
         return false;
      }
      else {
         if (enableDebug)
            console.log(" userGuess is conatined in secret word");
         return true;
      }
   },

   /********************************************************************************************
    *  returns true if usser guessed the characters in our secret word
    * *****************************************************************************************/
   wordMatches: function () {

      // iterate through every character in secretWord and to make sure guessedCharacters contains it. If not
      // wordMatch returns false

      console.log(this.secretWord);

      for (var i = 0; i < this.secretWord.length; i++) {
         // determine if every character in secretWord is contained in guessedCharacters

         if (guessedCharacters.indexOf(this.secretWord[i]) !== -1)
            return false;
         if (enableDebug)
            console.log(" perfect match and user wins")
         wins++;
         this.userWins();
         this.startGame();
      }
      return true;
   },


   /********************************************************************************************
    * called when OnKeyUp event has occured. inputCharacter contains the key that the user pressed.
    * the key is stored in the guessedCharacter array; 
    **********************************************************************************************/
   userInput: function (inputCharacter) {

      // Save user input
      userGuess = inputCharacter;
      alert("userGuess: " + inputCharacter);

      // do nothing if input character is a duplicate
      if (this.duplicateInputCharacter(userGuess) == true) {
         if (enableDebug)
            console.log("duplicate character found");
         return;
      }

      if (enableDebug)
      console.log(" NOT duplicate character");
      // not a duplicate therefore keep track of it
      this.guessedCharacters.push(inputCharacter);

      console.log(guessedCharacters);

      if (this.matchFound(inputCharacter) == true) {

         if (enableDebug)
         {
            console.log("We've found a match");
         }

         // we've found a match so update the display
         if (this.wordMatches() == true) {
            this.userWins();
            this.startGame();

            if (enableDebug)
               console.log("match found!!");
         }
         this.updateDisplay();
      }
      else {
         
         this.guessesRemaining = this.guessesRemaining - 1;
         if (this.guessesRemaining > 0) {
            if(enableDebug)
               console.log("calling updateDisplay");
            this.updateDisplay();
         }
         else { // games over so restart game
            this.gamesOver;
            this.startGame;
         }
      }
   },


   /********************************************************************************************
     * called when OnKeyUp event has occured. inputCharacter contains the key that the user pressed.
     * the key is stored in the guessedCharacter array; 
     **********************************************************************************************/
   startGame: function () {
      secretWord = this.getWord();
      guessesRemaining = 9;
      wins = 0;
      userGuess = "";
      guessedCharacters = "";
      this.updateDisplay();

      for (var i=0; i < this.secretWord.length; i++){
         this.guessedCharacters.push("-");
      }
      
      if (enableDebug)
         console.log("guessedCharacters: " + this.guessedCharacters);
   },


   /********************************************************************************************
   * called when OnKeyUp event has occured. inputCharacter contains the key that the user pressed.
   * the key is stored in the guessedCharacter array; 
   **********************************************************************************************/
   gamesOver: function () {

      alert("Game over");
      secretWord = this.getWord();
      guessesRemaining = 9;
      userGuess = "";
      wins = 0;
      guessedCharacters = "";
      this.updateDisplay();
   }

};
