var canvas = document.querySelector('canvas');

canvas.width = 1365;
canvas.height = 768;

var c = canvas.getContext('2d');

canvas.style = "position: absolute; top: 0px; left: 0px; right: 0px; margin:auto;";

var dinoImg = new Image();

var back1Img = new Image();
var back2Img = new Image();
back1Img.src = 'Images/back1.png';
back2Img.src = 'Images/back2.png';

var cactus1Img = new Image();
cactus1Img.src = 'Images/cactus1.png';


var jumpSound = new Audio('Sounds/Jump.wav');

var deathMusic = new Audio('Sounds/DeathMusic.mp3');

var runningMusic = new Audio('Sounds/RunningMusic.mp3');

var death = new Audio('Sounds/Death.mp3');

var menumusic = new Audio('Sounds/MenuMusic.wav')

var standardHeight = 480;

var dino = {
  x: 100,
  y:standardHeight,
  jumping: false,
  inAir: false,
  jumpheight: 30,
  jumpheightstandard: 30,
  animationState: 2,
  crouch: false,
  gravitation: 2,
  image: undefined,
  speed: 20,
  backwards: false,
  died: false,
  score: 0,
  scoreVisual: "",
  highscore:getCookie("highscore") === -1 ? 0 : getCookie("highscore"),
  highscoreVisual: "",
  playOnce: false
};

var back1 = {
  x: 0,
  y: 0,
};
var cactus1 = {
  x: 2000+Math.random()*1000,
  y: standardHeight
};
var back2 = {
  x: 1365,
  y: 0,
};
var mouse = {
  x: undefined,
  y: undefined,
  click: false
}

window.addEventListener('mousedown', function(event){
  mouse.click = true;
});
window.addEventListener('mouseup', function(event){
  mouse.click = false;
});
window.addEventListener('mousemove', function(event){
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener('keydown', function(event){
  console.log(event)
  if(event.key === "f"){
    canvas.requestFullscreen();      
  }
  if(event.key === " " && dino.inAir === false && dino.died === false){
    jump();
  }
  if(event.key === "Shift"){
    crouch()  
  }
  if(event.key === "Enter" && dino.died === true){
    exitDeath();
  }
});
window.addEventListener('keyup', function(event){
  console.log(event)
  if(event.key === "Shift"){
    crouchEnd()  
  }
});

function update(){

  requestAnimationFrame(update);

  c.clearRect(0,0,canvas.width,canvas.height);

  if(dino.animationState === 1){
    dino.image = 'Images/dino1.png';
  }
  if(dino.animationState === 2){
    dino.image = 'Images/dino2.png';
  }
  if(dino.animationState === 3){
    dino.image = 'Images/dino3.png';
  }
  if(dino.animationState === 4){
    dino.image = 'Images/dino4.png';
  }
  if(dino.animationState === 5){
    dino.image = 'Images/dino5.png';
  }
  if(dino.animationState === 5){
    dino.image = 'Images/dino5.png';
  }
  if(dino.animationState === 6){
    dino.image = 'Images/dino6.png';
  }




  if(back1Img.complete) {
    c.drawImage(back1Img, back1.x, back1.y);
  }else {
    back1Img.addEventListener('load', loaded)
    back1Img.addEventListener('error', function() {
    })
  }  
  if(back2Img.complete) {
    c.drawImage(back2Img, back2.x, back2.y);
  }else {
    back2Img.addEventListener('load', loaded)
    back2Img.addEventListener('error', function() {
    })
  }


  if(dinoImg.complete) {
    c.drawImage(dinoImg, dino.x, dino.y);
  }else {
    dinoImg.addEventListener('load', loaded)
    dinoImg.addEventListener('error', function() {
    })
  }

  if(cactus1Img.complete) {
    c.drawImage(cactus1Img, cactus1.x, cactus1.y);
  }else {
    cactus1Img.addEventListener('load', loaded)
    cactus1Img.addEventListener('error', function() {
    })
  }

  if(back1.x < -1365 && dino.backwards === false){
    back1.x = 1365-dino.speed;
    back2.x = 0-dino.speed;
  }
  if(back2.x < -1365 && dino.backwards === false){
    back2.x = 1365-dino.speed;
    back1.x = 0-dino.speed;
  }
  if(back1.x > 1365 && dino.backwards === true){
    back1.x = -1365-dino.speed;
    back2.x = 0-dino.speed;
  }
  if(back2.x > 1365 && dino.backwards === true){
    back2.x = -1365-dino.speed;
    back1.x = 0-dino.speed;
  }
  if(dino.speed < 0){
    dino.backwards = true;
  }
  if(dino.speed > 0){
    dino.backwards = false;
  }
  if(dino.y > standardHeight){
    dino.y = standardHeight;
  }
  if(cactus1.x < -2000 && dino.backwards === false){
    cactus1.x = 2000+Math.random()*1000;
  }
  if(cactus1.x > 2000 && dino.backwards === true){
    cactus1.x = -2000-Math.random()*1000;
  }  
  dinoImg.src = dino.image;
  if(dino.highscore < 10){
    dino.highscoreVisual = "0000" + Math.floor(dino.highscore);
  }
  if(dino.highscore > 10){
    dino.highscoreVisual = "000" + Math.floor(dino.highscore);
  }
  if(dino.highscore > 100){
    dino.highscoreVisual = "00" + Math.floor(dino.highscore);
  }
  if(dino.highscore > 1000){
    dino.highscoreVisual = "0" + Math.floor(dino.highscore);
  }
  if(dino.highscore > 10000){
    dino.highscoreVisual = Math.floor(dino.highscore);
  }
  if(dino.score < 10){
    dino.scoreVisual = "0000" + Math.floor(dino.score);
  }
  if(dino.score > 10){
    dino.scoreVisual = "000" + Math.floor(dino.score);
  }
  if(dino.score > 100){
    dino.scoreVisual = "00" + Math.floor(dino.score);
  }
  if(dino.score > 1000){
    dino.scoreVisual = "0" + Math.floor(dino.score);
  }
  if(dino.score > 10000){
    dino.scoreVisual = Math.floor(dino.score);
  }

  c.textAlign = "right"
  c.font = "75px IMPACT";
  c.fillStyle = "black";
  c.fillText("HI " + dino.highscoreVisual + "   " + dino.scoreVisual, 1320, 110);
  
  
  c.textAlign = "left"
  c.font = "15px IMPACT";
  c.fillStyle = "black";
  c.fillText("V0.1 Experimental", 0, 768);

  if(dino.died === false){
    back1.x -= dino.speed;
    back2.x -= dino.speed;
    cactus1.x -= dino.speed;

    dino.speed = dino.score/100+20;

    dino.score += 0.1;

    runningMusic.play();
  
    if(dino.jumping === true){
      up();
    }
    if(dino.y > standardHeight){
      dino.jumping = false;
      dino.jumpheight = dino.jumpheightstandard;
      dino.gravitation = dino.jumpheightstandard/23;
    }
    if(dino.y < standardHeight){
      dino.inAir = true;
    }else{ 
      dino.inAir = false;
      if(dino.animationState === 3){
        if(dino.crouch === true){
          dino.animationState = 4;
        }else{
          dino.animationState = 1;
        }
      }
    }
  }
  if(dino.x > cactus1.x-50 && dino.x-100 < cactus1.x && dino.y > standardHeight-100){
    dino.died = true;
  }
  if(dino.died === true){
    dino.animationState = 6;
    c.textAlign = "center";
    c.font = "75px IMPACT";
    c.fillStyle = "black";
    c.fillText("You died, press ENTER to play more!", 1365/2, 768/2)
    deathMusic.play();
    runningMusic.pause();
    runningMusic.currentTime = 0;
    if(dino.playOnce == false){
      death.play();
      dino.playOnce = true;
    }
    if(dino.highscore < dino.score){
      dino.highscore = dino.score;
      document.cookie = `highscore=${dino.highscore};Expires=Sun, 22 Oct 2030 08:00:00 UTC;`;
    }
  } 
};


function jump(){
  dino.jumping = true;
  dino.animationState = 3;
  jumpSound.play();  
}
function up(){
  dino.y -= dino.jumpheight;
  dino.jumpheight -= dino.gravitation;
}
function animation1(){
  if(dino.died === false){
    if(dino.animationState === 2){
      dino.animationState = 1;
    }
    if(dino.animationState === 5){
      dino.animationState = 4;
    }
  }
  setTimeout(animation2, 110);
}
function animation2(){
  if(dino.died === false){
    if(dino.animationState === 1){
      dino.animationState = 2;
    }
    if(dino.animationState === 4){
      dino.animationState = 5;
    }
  }
  setTimeout(animation1, 110);
}
function crouch(){
  dino.crouch = true;
  if(dino.animationState === 1 || dino.animationState === 2 && dino.inAir === false){
    dino.animationState = 4;
  }
}
function crouchEnd(){
  dino.crouch = false;
  dino.animationState = 1;
}
function exitDeath(){
  dino = {
    x: 100,
    y:standardHeight,
    jumping: false,
    inAir: false,
    jumpheight: 30,
    jumpheightstandard: 30,
    animationState: 2,
    crouch: false,
    gravitation: 2,
    image: undefined,
    speed: 20,
    backwards: false,
    died: false,
    score: 0,
    scoreVisual: "",
    highscore:getCookie("highscore") === -1 ? 0 : getCookie("highscore"),
    highscoreVisual: "",
    playOnce: false
  };

  back1 = {
    x: 0,
    y: 0,
  };
  cactus1 = {
    x: 2000+Math.random()*1000,
    y: standardHeight
  };
  back2 = {
    x: 1365,
    y: 0,
  };  
  deathMusic.pause();
  deathMusic.currentTime = 0;
  death.pause();
  death.currentTime = 0;
}

animation1();
update();



function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return -1;
}