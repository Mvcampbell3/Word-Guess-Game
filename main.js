var output = document.getElementById("output");
var chances = 5;

function Item(name){
    this.name = name;
    this.letters = name.split("");
    this.setArray = function() {
        game.correct = this.letters;
    }
};

var metallica = new Item("metallica");
var james = new Item("james");
var kevin = new Item("kevin");

var gameArray = [metallica, james, kevin];


var game = {
    guess: "",
    right: [], // May not need this
    tripped: false,
    used: [],
    correct: [],
    checkGuess: function(){
        // This is magic the likes of which I have not seen not can I attempt to explain
        var hiddenAll = Array.prototype.slice.call(document.querySelectorAll(".hidden"));
        // Back to what I know how to do
        if (this.correct.indexOf(game.guess) != -1) {

            console.log(this.correct.indexOf(game.guess));

            hiddenAll[this.correct.indexOf(game.guess)].className = "show";

            game.right.push(game.guess); //May Not need this

            this.correct.splice(this.correct.indexOf(game.guess), 1);

            game.tripped = true;

            this.checkGuess();
        } else {
            console.log("not in array");
            game.used.push(game.guess);
            if (!game.tripped) {
                chances--;
            } else {
                game.tripped = false;
            }
            this.checkWord();
        }
    },
    playerPress: function(event) {

        // For passing on the key pressed to game.checkGuess

        console.log(event.key);
        game.guess = event.key;
        this.checkGuess();
    },
    checkWord: function(){
        // wrap this in a if (chances > 0) {...} else { game over }

        if (this.correct.length == 0) {
            console.log("you won");
            //ADD WINNING STUFF
            game.newRound();
        } else {
            console.log("keep guessing");
            // ADD LOSING STUFF

        }
    },
    start: function(){
        if (gameArray.length > 0){
            var number = Math.floor((Math.random()*gameArray.length)+ 0);

            game.correct = gameArray[number].letters;
            gameArray.splice(number, 1);
            console.log(game.correct);
            console.log(gameArray);

            console.log(number);

            for (var i = 0; i < game.correct.length; i++){
                output.innerHTML += "<div class='new'><h3 class='hidden'>" + game.correct[i] + "</h3></div>";
            };
        } else {
            console.log("out of arrays")
            output.innerHTML = "<h1>You are a winner!!</h1>";
        }
    },
    newRound: function(){
        output.innerHTML = "";
        game.correct = [];
        game.start();
    }
    
}



