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
var vizzini = new Item("vizzini", "vizzini", "audiotag2", "assets/images/Vizzini.png");
var max = new Item("miracle max", "miraclemax", "audiotag3", "assets/images/miracle.jpg");
var count = new Item("count rugen", "countrugen", "audiotag4", "assets/images/count.jpg");
var inigo = new Item("inigo montoya", "inigomontoya", "audiotag5", "assets/images/inigo.png");
var humperdink = new Item("prince humperdink", "princehumperdink", "audiotag6", "assets/images/humperdink.jpg");
var buttercup = new Item("princess buttercup", "princessbuttercup", "audiotag7", "assets/images/buttercup.png");
var westley = new Item("dread pirate roberts", "dreadpirateroberts", "audiotag8", "assets/images/captainRoberts.jpg");

// Array that holds the new Items
var gameArray = [fezzik, vizzini, max, count, inigo, humperdink, buttercup, westley];
var checkIsLetter = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

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
    done: false,
    score: 0,
    reallyDone: false,
    boxes: ["box1", "box2", "box3", "box4", "box5", "box6"],
    insideBox: ["inside1", "inside2", "inside3", "inside4", "inside5", "inside6"],
    whichBox: 0,
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
            // reset the boxes for the health meter and their text opacity
            if (game.whichBox < game.insideBox.length) {
                document.getElementById(game.insideBox[game.whichBox]).style.opacity = 0;
            };
            game.whichBox = 0;
            game.backBox();
            document.getElementById(game.insideBox[0]).style.opacity = 1;
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

            for (var o = 0; o < game.boxes.length; o++) {
                document.getElementById(game.boxes[o]).style.opacity = 1;
            }

            // run event listener
            game.playerPress();


        } else {
            // Game Over Stuff
            console.log("out of arrays")
            game.gameOverRun();
        }
    },

    playerPress: function (event) {
        console.log(game.done + " before if ran");
        // For passing on the key pressed to game.checkGuess
        document.onkeyup = function (event) {
            if (game.done === false && checkIsLetter.indexOf(event.key) != -1) {
                game.guess = event.key.toLowerCase();
                console.log("game.done (should be false)= " + game.done);
                game.checkGuess();
            } else {
                console.log("The game is really over");
                // keeps only letters being entered and stops from running while in between words
            }
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
            // taking the nodeList that queryselectorall returns and making it a real array
            var hiddenAll = Array.prototype.slice.call(document.querySelectorAll(".hidden"));

            // Check to see if guess is correct, run through until all letters in array that match guess are gone
            if (this.correct.indexOf(game.guess) != -1) {
                console.log(this.correct.indexOf(game.guess));
                // make correct letters visiable, the vana-white move
                hiddenAll[this.correct.indexOf(game.guess)].className = "show";
                // removes from correct array
                this.correct.splice(this.correct.indexOf(game.guess), 1);
                // lets the function know if a letter was ever part of correct array
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
                    // penalties for wrong guess
                    game.chances--;
                    document.getElementById(game.boxes[game.whichBox]).style.opacity = 0;
                    document.getElementById(game.insideBox[game.whichBox]).style.opacity = 0;
                    game.whichBox++;
                    game.backBox();
                    // gates the higher end of how many boxes are called in inside boxese
                    // if index higher than length, bad times
                    if (game.whichBox < game.insideBox.length) {
                        document.getElementById(game.insideBox[game.whichBox]).style.opacity = 1;
                    };
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
                for (var l = 0; l < game.boxes.length; l++) {
                    document.getElementById(game.boxes[l]).style.opacity = 0;
                }
                game.picPlace.style.backgroundImage = "url(" + game.image + ")";
                game.done = true;
                game.beforeNext();
            } else {
                console.log("keep guessing");
            };
        } else {
            // Round over stuff
            game.losses++
            document.getElementById("audiotagLost").play();
            game.picPlace.style.backgroundImage = "url(assets/images/machinedraw.png)";
            for (var l = 0; l < game.boxes.length; l++) {
                document.getElementById(game.boxes[l]).style.opacity = 0;
            };
            game.lossesOut.textContent = game.losses;
            game.done = true;
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
        document.getElementById("audiotagLost").pause();
        game.audio = "";
        game.done = false;
        game.start();
    },
    // Pause before newRound is run if you are right. Displays the word and waits for enter key to be pressed through game.checkGuess
    beforeNext: function () {
        game.output.innerHTML = "<h3 id='between'>" + game.active.name.toUpperCase() + "</h3>";
        game.nextRound.innerHTML = "<h2 id='press'>Press Enter to continue</h2>";
        document.getElementById("hideUsed").style.display = "none";
        game.score += game.chances;
        document.getElementById("scorePlace").textContent = game.score;
        document.onkeyup = function (event) {
            if (event.key === "Enter" && game.reallyDone === false) {
                game.newRound();
                console.log(event.key + " this is from beforenext");
            }
        }
    },
    // setting color of health bar
    backBox: function () {
        switch (game.whichBox) {
            case 0:
                for (var t = 0; t < game.boxes.length; t++) {
                    document.getElementById(game.boxes[t]).style.backgroundColor = "green";
                }
                console.log(game.whichBox);
                break;
            case 1:
                for (var t = 0; t < game.boxes.length; t++) {
                    document.getElementById(game.boxes[t]).style.backgroundColor = "yellowgreen";
                }
                console.log(game.whichBox);
                break;
            case 2:
                for (var t = 0; t < game.boxes.length; t++) {
                    document.getElementById(game.boxes[t]).style.backgroundColor = "orange";
                }
                console.log(game.whichBox);
                break;
            case 3:
                for (var t = 0; t < game.boxes.length; t++) {
                    document.getElementById(game.boxes[t]).style.backgroundColor = "orangered";
                }
                console.log(game.whichBox);
                break;
            case 4:
                for (var t = 0; t < game.boxes.length; t++) {
                    document.getElementById(game.boxes[t]).style.backgroundColor = "red";
                }
                console.log(game.whichBox);
                break;
            case 5:
                for (var t = 0; t < game.boxes.length; t++) {
                    document.getElementById(game.boxes[t]).style.backgroundColor = "black";
                }
                console.log(game.whichBox);
                break;
            default:
                for (var t = 0; t < game.boxes.length; t++) {
                    document.getElementById(game.boxes[t]).style.backgroundColor = "purple";
                }
                console.log(game.whichBox);
        }
    },
    // rearranging the page for end game screen and picking audio based on number of correct words
    gameOverRun: function () {
        document.getElementById("hideUsed").style.display = "none";
        document.getElementById("hideChance").style.display = "none";
        document.getElementById("container").style.display = "block";
        document.getElementById("gamePic").style.display = "none";
        document.getElementById("winsOver").textContent = game.wins;
        document.getElementById("lossesOver").textContent = game.losses;
        document.getElementById("scorePlaceOver").textContent = game.score;
        document.getElementById("gameOver").className = "gameOver2 center";
        document.getElementById("modal").className = "modal fadeInA";
        document.getElementById("rules").className = "gone";
        document.getElementById("buttonArea").className = "gone";
        game.done = true;
        game.reallyDone = true;
        console.log("game wins = " + game.wins);
        if (game.wins >= 7){
            document.getElementById("greatWins").play()
        } else if (game.wins == 6 || game.wins == 5) {
            document.getElementById("goodWins").play()
        } else if (game.wins ==4 || game.wins ==3) {
            document.getElementById("badWins").play()
        } else {
            document.getElementById("incon").play()

        }
    },

}

var modal = {
    sum: function () {
        document.getElementById("themeAudio").play();
        console.log("playing start audio");
        document.getElementById("middleSection").className = "middleSection2 fadeInA";
        document.getElementById("startAudio").className = "myBtn myBtn-animate";
        document.getElementById("sumUp").className = "myBtn myBtn-reAnimate";
    },
    id: document.getElementById("modal"),
    rules: document.getElementById("rules"),
    main: document.getElementById("main-body"),
    fadeOut: function () {
        document.getElementById("closeModal").removeEventListener("mouseup", modal.fadeOut);
        modal.id.className = "modal fadeOutA";
        document.getElementById("themeAudio").pause();
        console.log("fading");
        setTimeout(function () {
            modal.id.className = "gone";
            console.log("display none now");
        }, 1500);
        game.start();
    },
    fadeBack: function () {
        modal.id.className = "modal fadeInA";
        modal.rules.className = "gone";
    }
};

document.getElementById("closeModal").addEventListener("mouseup", modal.fadeOut);