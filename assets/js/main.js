// Constructor for new items in game
function Item(name, noSpaces, audio, image, show) {
    this.name = name;
    this.letters = noSpaces.split("");
    this.audioID = audio;
    this.imageID = image;
};
// Collection of the var new Items
// Make sure spelling is same for both, Will not go to space today if wrong
var fezzik = new Item("fezzik", "fezzik", "audiotag1", "assets/images/fezzik.jpg");
var vizzini = new Item("vizzini", "vizzini", "audiotag2", "assets/images/Vizzini.png");
var max = new Item("miracle max", "miraclemax", "audiotag3", "assets/images/miracle.jpg");
var count = new Item("count rugen", "countrugen", "audiotag4", "assets/images/count.jpg");
var inigo = new Item("inigo montoya", "inigomontoya", "audiotag5", "assets/images/inigo.png");
var humperdink = new Item("prince humperdink", "princehumperdink", "audiotag6", "assets/images/humperdink.jpg");
var buttercup = new Item("princess buttercup", "princessbuttercup", "audiotag7", "assets/images/buttercup.png");
var westley = new Item("dread pirate roberts", "dreadpirateroberts", "audiotag8", "assets/images/captainRoberts.jpg");

// Array that holds the new Items
var gameArray = [fezzik, vizzini, max, count, inigo, humperdink, buttercup, westley];
// var gameArray = [fezzik];



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
    image: "",
    chances: 6,
    wins: 0,
    losses: 0,
    opacityBlack: 1,
    // output ids for HTML
    winsOut: document.getElementById("wins"),
    lossesOut: document.getElementById("losses"),
    output: document.getElementById("output"),
    chancePlace: document.getElementById("chancePlace"),
    usedPlace: document.getElementById("usedPlace"),
    nextRound: document.getElementById("nextRound"),
    picPlace: document.getElementById("gamePic"),
    // methods used to run the game

    start: function () {
        if (gameArray.length > 0) {
            // Pick an Array
            var number = Math.floor((Math.random() * gameArray.length) + 0);
            game.active = gameArray[number];
            game.whichArray = number;
            // Set vars in game to item properties
            game.correct = gameArray[number].letters;
            game.audio = gameArray[number].audioID;
            game.interactive = gameArray[number].name.split("");
            game.image = gameArray[number].imageID;
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
            game.output.innerHTML = "<h1 class='huge'>Game Is Over!!</h1>";
            document.getElementById("hideUsed").style.display = "none";
            document.getElementById("hideChance").style.display = "none";
            document.getElementById("container").style.display = "block";
            document.getElementById("gamePic").style.display = "none";
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
            game.newRound();
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
                game.picPlace.style.backgroundImage = "url("+game.image+")";
                game.beforeNext();
            } else {
                console.log("keep guessing");
                game.playerPress();
            };
        } else {
            // Round over stuff
            game.losses++
            document.getElementById("audiotagLost").play();
            game.lossesOut.textContent = game.losses;
            game.beforeNext();
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
        document.getElementById("hideUsed").style.display = "block";
        game.nextRound.innerHTML = "";
        game.picPlace.style.backgroundImage = "";
        document.getElementById(game.audio).pause();
        game.audio = "";
        game.start();
    },
    // Pause before newRound is run if you are right. Displays the word and waits for enter key to be pressed through game.checkGuess
    beforeNext: function () {
        game.output.innerHTML = "<h3 id='between'>" + game.active.name.toUpperCase() + "</h3>";
        game.nextRound.innerHTML = "<h2 id='press'>Press Enter to continue</h2>";
        document.getElementById("hideUsed").style.display = "none";
    }

}



var modal = {
    sum: function(){
        document.getElementById("themeAudio").play();
        console.log("playing start audio");
    },
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



