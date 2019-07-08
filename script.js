//Declared all variable
let order = [];
let playerOrder = [];
let on = false;
let fierce = false;
let flash;
let sound;
let turn;
let good;
let compTurn;
let intervalId;
let win;

const turnCounter = document.querySelector("#turn");
const fierceButton = document.querySelector("#fierce");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");


//order 1: how we start the game.
//.checked for switches button type. .click is not gonna work.
fierceButton.addEventListener('click', (event) => {
    if (fierceButton.checked == true){
        fierce = true;
        } else {
        fierce = false;
            }
});

onButton.addEventListener('click', (event) => {
    if (onButton.checked == true){
    on = true;
    turnCounter.innerHTML = '-'
    } else{
    on = false;
    turnCounter.innerHTML = '';
    clearColor();
    clearInterval(intervalId);
    }
});

startButton.addEventListener('click', (event) => {
    if (on || win){
        play();
    }
});

// create a default play function
function play(){
    win = false;
    order = [];
    playOrder = [];
    flash = 0;
    intervalId = 0;
    turn = 1;
    turnCounter.innerHTML = 1;
    good = true;

    for(i = 0; i < 20; i++){
        order.push(Math.floor(Math.random() * 4) + 1);
    }
    compTurn = true;

//Computer flash light every 1 sec. setInterval will run gameTurn every 1 sec. It will keep repeating until intervalId is cleared.
    intervalId = setInterval(gameTurn, 1000);
};

//define the gameTurn function: Player can't click buttons when the computer is flashing lights.
function gameTurn(){
    on = false;

    if(flash == turn){
        clearInterval(intervalId);
        compTurn = false;
        clearColor();
        on = true;
    }

    if (compTurn){
        clearColor();
        setTimeout(() => {
            if(order[flash] == 1) one();
            if(order[flash] == 2) two();
            if(order[flash] == 3) three();
            if(order[flash] == 4) four();
            flash++;
        }, 200);
    }
}

function one(){
    if (sound){
        let audio = document.getElementById('sound1');
        audio.play();
    }
    sound = true;
    topL.style.backgroundColor = 'lightblue';
}

function two(){
    if (sound){
        let audio = document.getElementById('sound2');
        audio.play();
    }
    sound = true;
    topR.style.backgroundColor = 'darkred';
}

function three(){
    if (sound){
        let audio = document.getElementById('sound3');
        audio.play();
    }
    sound = true;
    bottomL.style.backgroundColor = 'yellow';
}

function four(){
    if (sound){
        let audio = document.getElementById('sound4');
        audio.play();
    }
    sound = true;
    bottomR.style.backgroundColor = 'lightgreen';
}

function clearColor(){
    topL.style.backgroundColor = '#0057e7';
    topR.style.backgroundColor = '#d62d20';
    bottomL.style.backgroundColor = '#008744';
    bottomR.style.backgroundColor = '#ffa700';
}

topL.addEventListener('click', (event) => {
    if (on) {
        playerOrder.push(1);
        // check();
        one();
        if(!win){
            setTimeout(() => {
                clearColor();
            }, 300)
        }
    }
})

topR.addEventListener('click', (event) => {
    if (on) {
        playerOrder.push(2);
        // check();
        two();
        if(!win){
            setTimeout(() => {
                clearColor();
            }, 300)
        }
    }
})

bottomL.addEventListener('click', (event) => {
    if (on) {
        playerOrder.push(3);
        // check();
        three();
        if(!win){
            setTimeout(() => {
                clearColor();
            }, 300)
        }
    }
})

bottomR.addEventListener('click', (event) => {
    if (on) {
        playerOrder.push(4);
        // check();
        four();
        if(!win){
            setTimeout(() => {
                clearColor();
            }, 300)
        }
    }
})

function check(){
    if(playerOrder[playerOrder.length - 1] !==[playerOrder.length - 1]) good = false;
    if(playerOrder.length == 20 && good == true) {
        winGame();
    }
    if(good == false){
        flashColor();
        turnCounter.innerHTML = 'NO!';
        setTimeout(() => {
            turnCounter.innerHTML = turn;
            clearColor();

        if(fierce){
            play();
        }  else {
            compTurn = true;
            flash = 0;
            playerOrder = [];
            good = true;
            intervalId = setInterval(gameTurn, 1000);
        }
        }, 700);

        sound = false;
    }
}