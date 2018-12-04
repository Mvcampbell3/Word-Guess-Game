// Constructor for new items in game
function Item(name, noSpaces, audio, image) {
    this.name = name;
    this.letters = noSpaces.split("");
    this.audioID = audio;
    this.imageID = image;

};
// Collection of the var new Items
// Make sure spelling is same for both, Will not go to space today if wrong
var fezzik = new Item("fezzik", "fezzik", "audiotag1", "assets/images/fezzik.jpg");
var vizzini = new Item("vizzini", "vizzini", "audiotag2", "assets/images/fezzik.jpg");
var max = new Item("miracle max", "miraclemax", "audiotag3", "assets/images/fezzik.jpg");


// Array that holds the new Items
var gameArray = [fezzik, vizzini, max]



// Game Object
var game = {
    // variables used in game.methods
    guess: "",
    tripped: false,
    used: [],
    audio: "",
    active: "",
    correct: [],
    interactive: [],
    chances: 6,
    wins: 0,
    losses: 0,
    // output ids for HTML
    winsOut: document.getElementById("wins"),
    lossesOut: document.getElementById("losses"),
    output: document.getElementById("output"),
    chancePlace: document.getElementById("chancePlace"),
    usedPlace: document.getElementById("usedPlace"),
    nextRound: document.getElementById("nextRound"),
    // methods used to run the game

    start: function () {
        if (gameArray.length > 0) {
            // Pick an Array
            var number = Math.floor((Math.random() * gameArray.length) + 0);
            game.active = gameArray[number];
            // Set vars in game to item properties
            game.correct = gameArray[number].letters;
            game.audio = gameArray[number].audioID;
            game.interactive = gameArray[number].name.split("");
            gameArray.splice(number, 1);
            console.log(game.correct);
            console.log(number + " index of array in gameArray set");
            console.log(gameArray) + " is the array left in the gameArray set";


            // Put the letters from item.nospaces into output area
            for (var i = 0; i < game.interactive.length; i++) {
                if (game.interactive[i] != " ") {
                    game.output.innerHTML += "<div class='new'><h3 class='hidden'>" + game.interactive[i] + "</h3></div>";
                } else {
                    game.output.innerHTML += "<div class='space'></div>";
                }
            };

            // run event listener
            game.playerPress();

        } else {
            // Game Over Stuff
            console.log("out of arrays")
            game.output.innerHTML = "<h1>Game is over!!</h1>";
            document.getElementById("hideUsed").style.display = "none";
        }
    },

    playerPress: function (event) {

        // For passing on the key pressed to game.checkGuess

        document.onkeyup = function (event) {
            game.guess = event.key;
            console.log(game.guess);
            game.checkGuess();
        }
    },

    checkGuess: function () {

        // Top part for using enter key to move on to new round if finished word
        if (game.guess == "Enter" && game.correct.length == 0) {
            console.log("enter pressed here");
            game.newRound();
        } else if (game.guess == "Enter" && game.correct.length > 0) {
            console.log("enter pressed and have not finished word");

        } else {

            // This is magic the likes of which I have not seen nor can I attempt to explain
            // I wanted to be able to make the NodeList into a real Array
            // This was what google brought me to, I call him the pinocchio move
            var hiddenAll = Array.prototype.slice.call(document.querySelectorAll(".hidden"));
            // Back to what I know how to do

            // Check to see if guess is correct, run through until all letters in array that match guess are gone
            if (this.correct.indexOf(game.guess) != -1) {

                console.log(this.correct.indexOf(game.guess));

                hiddenAll[this.correct.indexOf(game.guess)].className = "show";

                this.correct.splice(this.correct.indexOf(game.guess), 1);

                game.tripped = true;

                this.checkGuess();
            
            // No penatly for using letter more than once
            } else if (game.used.indexOf(game.guess) != -1) {
                console.log("was used before");

            // Eventually letter will get through to here, if was correct at one point, tripped will be true
            // Letter added to used array and displayed
            } else {
                console.log("not in array");
                game.used.push(game.guess);
                game.usedPlace.textContent = game.used;
                if (!game.tripped) {
                    game.chances--;
                    game.chancePlace.textContent = game.chances;
                } else {
                    // Was right before so need to reset the trip
                    game.tripped = false;
                }
                this.checkWord();
            }
        }
    },
    
    checkWord: function () {
        // Since all letters will eventually get here, need to check if word is complete
        if (game.chances > 0) {
            if (this.correct.length == 0) {
                console.log("you won");
                // Play Song/Sound
                document.getElementById(game.audio).play();
                game.wins++;
                game.winsOut.textContent = game.wins;
                game.beforeNext();
            } else {
                console.log("keep guessing");
                game.playerPress();
            };
        } else {
            // GAME OVER STUFF
            game.losses++
            game.lossesOut.textContent = game.losses;
            game.newRound();
        }
    },
    // Resets all of the properties to empty, not really neccesary because game.start would override but I like it.
    newRound: function () {
        output.innerHTML = "";
        game.correct = [];
        game.chances = 6;
        game.chancePlace.textContent = game.chances;
        game.used = [];
        game.usedPlace.textContent = game.used;
        game.nextRound.innerHTML = "";
        document.getElementById(game.audio).pause();
        game.audio = "";
        game.start();
    },
    // Pause before newRound is run if you are right. Displays the word and waits for enter key to be pressed through game.checkGuess
    beforeNext: function () {
        game.output.innerHTML = "<h3 class='between'>The Answer Was " + game.active.name.toUpperCase() + "</h3>";
        game.nextRound.innerHTML = "<h3>Press Enter to continue</h3>"

    }

}



var modal = {
    id: document.getElementById("modal"),
    rules: document.getElementById("rules"),
    main: document.getElementById("main-body"),
    fade: function () {
        var opa = 1;
        var timer = setInterval(function () {
            if (opa <= 0) {
                clearInterval(timer);
                modal.id.style.display = "none";
                modal.rules.display = "none";
                modal.main.style.display = "block";
                game.start();
            } else {
                opa = opa - 0.03;
                modal.id.style.opacity = opa;
                modal.rules.style.opacuty = opa;
            }
        }, 25)
    }
}