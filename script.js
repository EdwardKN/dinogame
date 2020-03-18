var canvas = document.querySelector('canvas');

canvas.width = 1365;
canvas.height = 768;

var c = canvas.getContext('2d');

canvas.style = "position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto;";

var dinoImg = new Image();

var jumpSound = new Audio('Sounds/jump.wav');


var dino = {
  x: 100,
  y:400,
  jumping: false,
  inAir: false,
  jumpheight: 23,
  jumpheightstandard: 23,
  animationState: 2,
  crouch: false,
  gravitation: 1,
  image: undefined
};

var background = "white";

window.addEventListener('keydown', function(event){
  console.log(event)
  if(event.key === "f"){
    canvas.requestFullscreen()      
  }
  if(event.key === " " && dino.inAir === false){
    jump();
  }
  if(event.key === "Shift"){
    crouch()  
  }
});
window.addEventListener('keyup', function(event){
  console.log(event)
  if(event.key === "Shift"){
    crouchEnd()  
  }
});

function update(){
  c.fillStyle = background;
  c.fillRect(0,0,1920,1080);

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
if (dinoImg.complete) {
  c.drawImage(dinoImg, dino.x, dino.y);
} else {
  dinoImg.addEventListener('load', loaded)
  dinoImg.addEventListener('error', function() {
  })
}
  dinoImg.src = dino.image;

  if(dino.jumping === true){
    up();
  }
  if(dino.y > 400){
    dino.jumping = false;
    dino.jumpheight = dino.jumpheightstandard;
    dino.gravitation = dino.jumpheightstandard/23;
  }
  if(dino.y < 400){
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
  if(dino.animationState === 2){
    dino.animationState = 1;
  }
  if(dino.animationState === 5){
    dino.animationState = 4;
  }
  setTimeout(animation2, 150);
}
function animation2(){
  if(dino.animationState === 1){
    dino.animationState = 2;
  }
  if(dino.animationState === 4){
    dino.animationState = 5;
  }
  setTimeout(animation1, 150);
}
function crouch(){
  dino.crouch = true;
  if(dino.animationState === 1 || dino.animationState === 2){
    dino.animationState = 4;
  }
}
function crouchEnd(){
  dino.crouch = false;
  dino.animationState = 1;
}
animation1();
setInterval(update, 16);