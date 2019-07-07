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