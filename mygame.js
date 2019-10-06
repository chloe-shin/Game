let canvas;
let ctx;

// Do stuff to set up
// Only the first time we play. 
function setupWebpage() {
    canvas = document.createElement("canvas"); // create <canvas> element into HTML by JavaScript
    ctx = canvas.getContext("2d"); // telling JS to create 2 dimension for canvas.
    canvas.width = 512;
    canvas.height = 480;
    let canvasWrapper = document.getElementById("canvas-wrapper");
    canvasWrapper.appendChild(canvas); //Append <canvas> to the body

}

//Set variable name for background, hero, monster (images)
let bgReady, heroReady, monsterReady;
let bgImage, heroImage, monsterImage;


// Set variables for Score and HasGameStarted and Time (Game Rules)
let score = 0;
let hasGameStarted = false;
let startTime;
const SecondsPerRound = 30;
let elapsedTime = 0;


//Ready for loading image 
function loadImages() {
    bgImage = new Image();
    bgImage.onload = function () {
        bgReady = true;
    };
    bgImage.src = "image/Background.png";

    heroImage = new Image();
    heroImage.onload = function () {
        heroReady = true;
    };
    heroImage.src = "image/cc_sss.png";

    monsterImage = new Image();
    monsterImage.onload = function () {
        monsterReady = true;
    };
    monsterImage.src = "image/bunny.png";

    document.getElementById("userinfo").innerHTML = `Wellcome ${userName.value}`
}

//Location of hero and monster when uploading game.

let heroX = 299;
let heroY = 200;

let monsterX = 100;
let monsterY = 100;

let monsterXdir = 1;
let monsterYdir = 1;

// const monsterPeriod = 1;
// let lastZigzagTime = 0;

//keyboard listeners (this is to power character to move by keyboard)
let keysDown = {};
function setupKeyboardListeners() {
    addEventListener("keydown", function (key) {
        keysDown[key.keyCode] = true;
    }, false);

    addEventListener("keyup", function (key) {
        delete keysDown[key.keyCode];
    }, false);
}
 


//update all variables
let update = function () {
    if (hasGameStarted == false) {
        return;
    }


    //moving monster around 
    monsterX = monsterX + monsterXdir * 5;
    monsterY = monsterY + monsterYdir * 5;
    
    elapsedTime = Math.floor((Date.now() - startTime) / 1000); //second from 1970. 01. 01, 1day is 86,400,000 (86,400*1000) // 
    // if(elapsedTime - lastZigzagTime >= monsterPeriod) {
    //     lastZigzagTime = elapsedTime;
    //     monsterXdir = monsterXdir * -1;
    //     monsterYdir = monsterYdir * -1;
    // }
    
    if (elapsedTime >= SecondsPerRound) { // Game is over! You are out of time.
        hasGameStarted = false;
        resetGame(); //alert : Game Over!, restart game
    }
    if (38 in keysDown) { // Player is holding up key
        heroY -= 5;
    }
    if (40 in keysDown) { // Player is holding down key
        heroY += 5;
    }
    if (37 in keysDown) { // Player is holding left key
        heroX -= 5;
    }
    if (39 in keysDown) { // Player is holding right key
        heroX += 5;
    }

    //Let hero come back to screen//
    if (heroX >= canvas.width) {
        heroX = 0;
    }
    if (heroX <= 0) {
        heroX = 0;
    }
    if (heroY >= canvas.height) {
        heroY = 0;
    }
    if (heroY <= 0) {
        heroY = 0;
    }

    //When monster hit the edge

    if (monsterX >= canvas.width) {
        monsterXdir = -1;
    }
    if (monsterX <= 0) {
        monsterXdir = 1;
    }
    if (monsterY >= canvas.height) {
        monsterYdir = -1;
    }
    if (monsterY <= 0) {
        monsterYdir = 1;
    }

    if ( //when they meet //
        heroX <= (monsterX + 50)
        && monsterX <= (heroX + 50)
        && heroY <= (monsterY + 50)
        && monsterY <= (heroY + 50)
    ) {  
         // Pick a new location for the monster.
        monsterX =  Math.random()*500;
        monsterY =  Math.random()*450;
        
        // get score
        score = score + 1;  
    }
};


var render = function () { // Drawing the right images in the right place
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }
    if (heroReady) {
        ctx.drawImage(heroImage, heroX, heroY);
    }
    if (monsterReady) {
        ctx.drawImage(monsterImage, monsterX, monsterY);
    }
    ctx.font = "18px Montserrat";
    ctx.fillText(`Remaining Time : ${SecondsPerRound - elapsedTime}`, 150, 50);
    ctx.fillText(`Chuon Chuon chasing rabbit!`, 110, 80);

    document.getElementById('score').innerHTML = `🐰 Hurry up! ChuonChuon got ${score} rabbits`;
};

var main = function () {
    update();
    render();
    requestAnimationFrame(main);
};

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

setupWebpage();
// loadImages();
setupKeyboardListeners();
main();

function resetGame() {
    alert(`Game Over! Chuon Chuon got ${score} rabbits!`);
    startGame();
}

function startGame() {
    hasGameStarted = true;
    startTime = Date.now();
    score = 0;
    keysDown = {};
}   

let start = document.getElementById ("start")
// start.addEventListener("click", startGame);


let userName = document.getElementById("userName")

start.addEventListener("click", loadImages);
// document.getElementById("userinfo").innerHTML = `Wellcome ${userName.value}`;



function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }
