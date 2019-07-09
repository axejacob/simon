//Declare all Variables here
let order = [];
let playerOrder = [];
let on = false;
let sound = true;
let fierce = false;
let win;
let flash;
let turn;
let good;
let compTurn;
let intervalId;

const turnCounter = document.querySelector("#turn");
const blue = document.querySelector("#blue");
const red = document.querySelector("#red");
const green = document.querySelector("#green");
const yellow = document.querySelector("#yellow");
const fierceButton = document.querySelector("#fierce");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");

fierceButton.addEventListener('click', (event) => {
  if (fierceButton.checked == true) {
    fierce = true;
  } else {
    fierce = false;
  }
});

onButton.addEventListener('click', (event) => {
  if (onButton.checked == true) {
    on = true;
    turnCounter.innerHTML = "-";
  } else {
    on = false;
    turnCounter.innerHTML = "";
    clearColor();
    clearInterval(intervalId);
  }
});

startButton.addEventListener('click', (event) => {
  if (on || win) {
    play();
  }
});

function play() {
  win = false;
  order = [];
  playerOrder = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  turnCounter.innerHTML = 1;
  good = true;
  for (var i = 0; i < 5; i++) {
    order.push(Math.floor(Math.random() * 4) + 1);
  }
  compTurn = true;
  intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
  on = false;
  if (flash == turn) {
    clearInterval(intervalId);
    compTurn = false;
    clearColor();
    on = true;
  }

  if (compTurn) {
    clearColor();
    setTimeout(() => {
      if (order[flash] == 1) one();
      if (order[flash] == 2) two();
      if (order[flash] == 3) three();
      if (order[flash] == 4) four();
      flash++;
    }, 200);
  }
}

function one() {
  if (sound) {
    let audio = document.getElementById("sound1");
    audio.play();
  }
  sound = true;
  blue.style.backgroundColor = "lightskyblue";
}

function two() {
  if (sound) {
    let audio = document.getElementById("sound2");
    audio.play();
  }
  sound = true;
  red.style.backgroundColor = "tomato";
}

function three() {
  if (sound) {
    let audio = document.getElementById("sound3");
    audio.play();
  }
  sound = true;
  green.style.backgroundColor = "lightgreen";
}

function four() {
  if (sound) {
    let audio = document.getElementById("sound4");
    audio.play();
  }
  sound = true;
  yellow.style.backgroundColor = "yellow";
}

function clearColor() {
  blue.style.backgroundColor = "darkblue";
  red.style.backgroundColor = "darkred";
  green.style.backgroundColor = "darkgreen";
  yellow.style.backgroundColor = "#d49700";
}

function flashColor() {
  blue.style.backgroundColor = "lightskyblue";
  red.style.backgroundColor = "tomato";
  green.style.backgroundColor = "lightgreen";
  yellow.style.backgroundColor = "yellow";
}

blue.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(1);
    check();
    one();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 400);
    }
  }
})

red.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(2);
    check();
    two();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 400);
    }
  }
})

green.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(3);
    check();
    three();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 400);
    }
  }
})

yellow.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(4);
    check();
    four();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 400);
    }
  }
})

function check() {
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
    good = false;

  if (playerOrder.length == 5 && good) {
    winGame();
  }

  if (good == false) {
    flashColor();
    turnCounter.innerHTML = "WRONG!";
    setTimeout(() => {
      turnCounter.innerHTML = turn;
      clearColor();

      if (fierce) {
        play();
      } else {
        compTurn = true;
        flash = 0;
        playerOrder = [];
        good = true;
        intervalId = setInterval(gameTurn, 800);
      }
    }, 800);

    sound = false;
  }

  if (turn == playerOrder.length && good && !win) {
    turn++;
    playerOrder = [];
    compTurn = true;
    flash = 0;
    turnCounter.innerHTML = turn;
    intervalId = setInterval(gameTurn, 800);
  }
}

function winGame() {
  flashColor();
  turnCounter.innerHTML = "DYNAMITE!";
  on = false;
  win = true;
}