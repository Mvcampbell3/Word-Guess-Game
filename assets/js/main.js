var output = document.getElementById("output");
var chances = 6;
var chancePlace = document.getElementById("chancePlace");
var usedPlace = document.getElementById("usedPlace");

function Item(name) {
    this.name = name;
    this.letters = name.split("");
    this.setArray = function () {
        game.correct = this.letters;
    }
};
// Need to add another parameter that includes what to display/play when guessed correct.

var metallica = new Item("metallica");
var nirvana = new Item("nirvana");
var slipknot = new Item('slipknot');

var gameArray = [metallica, nirvana, slipknot];



var game = {
    guess: "",
    tripped: false,
    used: [],
    correct: [],
    checkGuess: function () {
        // This is magic the likes of which I have not seen nor can I attempt to explain
        // I wanted to be able to make the NodeList into a real Array
        // This was what google brought me to, I call him the pinocchio move
        var hiddenAll = Array.prototype.slice.call(document.querySelectorAll(".hidden"));
        // Back to what I know how to do
        if (this.correct.indexOf(game.guess) != -1) {

            console.log(this.correct.indexOf(game.guess));

            hiddenAll[this.correct.indexOf(game.guess)].className = "show";

            this.correct.splice(this.correct.indexOf(game.guess), 1);

            game.tripped = true;

            this.checkGuess();

        } else if (game.used.indexOf(game.guess) != -1) {
            console.log("was used before");
        } else {
            console.log("not in array");
            game.used.push(game.guess);
            usedPlace.textContent = game.used;
            if (!game.tripped) {
                chances--;
                chancePlace.textContent = chances;
            } else {
                game.tripped = false;
            }
            this.checkWord();
        }
    },
    playerPress: function (event) {

        // For passing on the key pressed to game.checkGuess

        console.log(event.key);
        game.guess = event.key;
        this.checkGuess();
    },
    checkWord: function () {

        if (chances > 0) {
            if (this.correct.length == 0) {
                console.log("you won");
                game.newRound();
            } else {
                console.log("keep guessing");
            };
        } else {
            // GAME OVER STUFF
        }
    },
    start: function () {
        if (gameArray.length > 0) {
            var number = Math.floor((Math.random() * gameArray.length) + 0);

            game.correct = gameArray[number].letters;
            gameArray.splice(number, 1);
            console.log(game.correct);
            console.log(number + " index of array in gameArray set");
            console.log(gameArray) + " is the array left in the gameArray set";
            
            for (var i = 0; i < game.correct.length; i++) {
                output.innerHTML += "<div class='new'><h3 class='hidden'>" + game.correct[i] + "</h3></div>";
            };


        } else {
            console.log("out of arrays")
            output.innerHTML = "<h1>You are a winner!!</h1>";
        }
    },
    newRound: function () {
        output.innerHTML = "";
        game.correct = [];
        game.start();
        chances = 6;
        chancePlace.textContent = chances;
        game.used = [];
        usedPlace.textContent = game.used;
    },

    removeSpaces: function () {
        console.log("I dont know what I am doing")
    }

}



