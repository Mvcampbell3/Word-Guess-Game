# Word-Guess-Game
Version too late to fix

Found that when deployed to github pages, the picture for inigo montoya would not load.

Did not notice until after deadline had passed, so I am just updating the README file.

I am not sure the cause, the js has inigo.png not capitalized while the file name is Inigo.png;
However does work on local file. Would push that update to see if that was cause.

If still not loading, would pick another picture. 

Sorry that I did not catch this issue earlier.

---------------------------------------------------
Version 8

Basically finished, will probably be spending the rest of time until it is due tinkering, breaking, then fixing things

Added to the modal object, making it the game over screen;

Worked on the styling to get the animations working

----------------------------------------------------
Version 7

Added switch statement to color the boxes for health meter thing

working on css style, not happy with landing modal

Game works well though

Need to make toLowerCase a thing

----------------------------------------------------
Version 6

Kind of fixed issue where onkeyup was messing with game over screen, 

    apparently it continuosly runs so got rid of repeated calls for it and 

    gated inside document.onkeyup to check if game is over.
    
    Sloppy fix, still trying to get cleaner one.


----------------------------------------------------
Version 5

Going with a Princess Bride theme for now, started bringing in some things for it.

Need to figure out what I want the page to look like

------------------------------------------------------
Version 4

Beat the brakes off of the space issue, just decided to not be dumb and make new property in item

also added michael bisping audio file, probably not going to be in final version but for testing

audio clips will now play after the word is correctly spelled. don't know about what happens if new round is press
    before audio ends. testing coming.

--------------------------------------------------------
Version 3

Added a modal that gives rules and has start button

Starting to think about the theme I want to use

I am going to have the modal block out everything, page below will have the themeing
    only thing to transfer over will be the h1.mainTitle
    
---------------------------------------------------------
Version 2

The spaces in arrays are evil. For now, I am focusing on single word items

game.used will hold values of pressed keys per word.
    also able to stop chances from going down if same key pressed that is already pushed into used array

added assets folder with css/js/images/sounds dirs and moved things around for proper format

Begining to work on css and html, js works pretty well. DON'T USE SPACES!

-----------------------------------------------------------
Version 1

Added the two files that I have been working on.

Need to find out if I can use the spaces in Arrays for good, not evil.
    
Plan is download the mp3 files and use them from an assets forder through js.
