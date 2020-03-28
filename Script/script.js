var canvas = document.querySelector('canvas');

canvas.width = 1365;
canvas.height = 768;

var c = canvas.getContext('2d', { alpha: false });

var dinoImg = new Image();

var back1Img = new Image();
var back2Img = new Image();
back1Img.src = 'Images/Background/back1.png';
back2Img.src = 'Images/Background/back2.png';

var cactus1Img = new Image();
cactus1Img.src = 'Images/Cactus/cactus1.png';

var cactus2Img = new Image();
cactus2Img.src = 'Images/Cactus/cactus2.png';

var bird1Img = new Image();



var jumpSound = new Audio('Sounds/Jump.wav');

var deathMusic = new Audio('Sounds/DeathMusic.mp3');
deathMusic.volume = 0.5;

var runningMusic = new Audio('Sounds/RunningMusic.mp3');


var coinSound = new Audio('Sounds/Coin.mp3');


var death = new Audio('Sounds/Death.mp3');

var menumusic = new Audio('Sounds/MenuMusic.mp3')

var standardHeight = 480;

var userArray = [];

var lineSpace = 768/25;

var leaderboardShow = false;

var user = {
  highscore:getCookie("highscore") === -1 ? 0 : getCookie("highscore"),
  username: getCookie("username") === -1 ? undefined : getCookie("username"),
  password: getCookie("password") === -1 ? undefined : getCookie("password"),
  mail: getCookie("mail") === -1 ? undefined : getCookie("mail"),
  loggedIn: getCookie("loggedIn") === -1 ? false : getCookie("loggedIn"),
  puttingInUsername: false,
  puttingInPassword: false,
  puttingInMail: false,
  loginColor: "white",
  usernameInput:"",
  passwordInput: "",
  passwordColor: "white",
  usernameColor: "white",
  passwordInputVisual: "",
  noAccountColor: "white",
  rememberMe: false,
  encryptedPassword: undefined,
  logOutColor: "white"
};

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
  highscoreVisual: "",
  playOnce: false,
  stand: true,
  freeze: false,
  freezeValue: undefined,
  visualShow: true,
  doOnce: false
};


if(user.loggedIn === "true"){
  getScore();
  sendScore(user.username, Math.floor(user.highscore), user.password, user.mail);
  dino.inAir = false;
  dino.died = false;
  user.loggedIn = true;
}

var cactus1 = {
  x: -1000,
  y: standardHeight
};
var cactus2 = {
  x: -1000,
  y: standardHeight
};
var cactus3 = {
  x: -1000,
  y: standardHeight
};
var cactus4 = {
  x: -1000,
  y: standardHeight
};


var bird1 = {
  x: -1000,
  y: (standardHeight+100)-Math.random()*300,
  animationState: 1,
  image:undefined
};

var back1 = {
  x: 0,
  y: 0,
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
window.addEventListener('click', function(event){
  mouse.click = true;
  setTimeout(function(){
    mouse.click = false;
  }, 15)
});
window.addEventListener('mousemove', function(event){
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener('keydown', function(event){
  console.log(event)
  if(event.key === "f"){
    if(canvas.RequestFullScreen){
        canvas.RequestFullScreen();
    }else if(canvas.webkitRequestFullScreen){
        canvas.webkitRequestFullScreen();
    }else if(canvas.mozRequestFullScreen){
        canvas.mozRequestFullScreen();
    }else if(canvas.msRequestFullscreen){
        canvas.msRequestFullscreen();
    }else{
        alert("This browser doesn't supporter fullscreen");
    }
  }
  if(event.key === "Shift" && user.loggedIn === true){
    crouch()  
  }
  if(event.key === "Enter" && dino.died === true){
    exitDeath();
  }
  if(event.key === "Tab" && user.loggedIn === true){
    leaderboardShow = true;
    getScore();
  }
  if(user.puttingInUsername === true && event.key === "Backspace"){
    user.usernameInput = user.usernameInput.slice(0, -1);
  }
  if(user.puttingInPassword === true && event.key === "Backspace"){
    user.passwordInput = user.passwordInput.slice(0, -1);
    user.passwordInputVisual = user.passwordInputVisual.slice(0, -1);
  }
});
window.addEventListener('keypress', function(event){
  if(user.puttingInUsername === true && event.key !== "Enter" && user.usernameInput.length < 20){
    user.usernameInput += event.key;
  }
  if(user.puttingInPassword === true && event.key !== "Enter" && user.passwordInput.length < 20){
    user.passwordInput += event.key;
    user.passwordInputVisual += "•"
  }
  if(event.code === "Space" && dino.inAir === false && dino.died === false && user.loggedIn === true){
    jump();
    dino.stand = false;
  }
});
window.addEventListener('keyup', function(event){
  if(event.key === "Shift"){
    crouchEnd()  
  }
  if(event.key === "Tab" && user.loggedIn === true){
    leaderboardShow = false;
  }
});

function update(){

  requestAnimationFrame(update);

  c.clearRect(0,0,canvas.width,canvas.height);

  if(dino.animationState === 1){
    dino.image = 'Images/Dinosaur/dino1.png';
  }
  if(dino.animationState === 2){
    dino.image = 'Images/Dinosaur/dino2.png';
  }
  if(dino.animationState === 3){
    dino.image = 'Images/Dinosaur/dino3.png';
  }
  if(dino.animationState === 4){
    dino.image = 'Images/Dinosaur/dino4.png';
  }
  if(dino.animationState === 5){
    dino.image = 'Images/Dinosaur/dino5.png';
  }
  if(dino.animationState === 5){
    dino.image = 'Images/Dinosaur/dino5.png';
  }
  if(dino.animationState === 6){
    dino.image = 'Images/Dinosaur/dino6.png';
  }

  if(bird1.animationState === 1){
    bird1.image = 'Images/Bird/bird1.png';
  }
  if(bird1.animationState === 2){
    bird1.image = 'Images/Bird/bird2.png';
  }
  dinoImg.src = dino.image;
  bird1Img.src = bird1.image;




  if(back1Img.complete) {
    c.drawImage(back1Img, Math.floor(back1.x), back1.y);
  }else {
    back1Img.addEventListener('load', loaded)
    back1Img.addEventListener('error', function() {
    })
  }  
  if(back2Img.complete) {
    c.drawImage(back2Img, Math.floor(back2.x), back2.y);
  }else {
    back2Img.addEventListener('load', loaded)
    back2Img.addEventListener('error', function() {
    })
  }


  if(dinoImg.complete) {
    c.drawImage(dinoImg, dino.x, Math.floor(dino.y));
  }else {
    dinoImg.addEventListener('load', loaded)
    dinoImg.addEventListener('error', function() {
    })
  }

  if(bird1Img.complete) {
    c.drawImage(bird1Img, Math.floor(bird1.x), Math.floor(bird1.y));
  }else {
    bird1Img.addEventListener('load', loaded)
    bird1Img.addEventListener('error', function() {
    })
  }

  if(cactus1Img.complete) {
    c.drawImage(cactus1Img, Math.floor(cactus1.x), cactus1.y);
    c.drawImage(cactus1Img, Math.floor(cactus3.x), cactus3.y);
  }else {
    cactus1Img.addEventListener('load', loaded)
    cactus1Img.addEventListener('error', function() {
    })
  }
  if(cactus2Img.complete) {
    c.drawImage(cactus2Img, Math.floor(cactus2.x), cactus2.y);
    c.drawImage(cactus2Img, Math.floor(cactus4.x), cactus4.y);

  }else {
    cactus2Img.addEventListener('load', loaded)
    cactus2Img.addEventListener('error', function() {
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
  if(user.highscore < 10){
    user.highscoreVisual = "0000" + Math.floor(user.highscore);
  }
  if(user.highscore > 10){
    user.highscoreVisual = "000" + Math.floor(user.highscore);
  }
  if(user.highscore > 100){
    user.highscoreVisual = "00" + Math.floor(user.highscore);
  }
  if(user.highscore > 1000){
    user.highscoreVisual = "0" + Math.floor(user.highscore);
  }
  if(user.highscore > 10000){
    user.highscoreVisual = Math.floor(user.highscore);
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

  if(dino.freeze === true){
    setTimeout(function(){
      dino.freeze = false;
      dino.visualShow = true;
      dino.doOnce = false;
    },4000);
    if(dino.doOnce === false){
      dino.doOnce = true;
      dino.visualShow = false;
      setTimeout(function(){
        dino.visualShow = true;
      }, 500
      );
      setTimeout(function(){
        dino.visualShow = false;
      }, 1000
      );
      setTimeout(function(){
        dino.visualShow = true;
      }, 1500
      );
      setTimeout(function(){
        dino.visualShow = true;
      }, 2000
      );
      setTimeout(function(){
        dino.visualShow = false;
      }, 2500
      );
      setTimeout(function(){
        dino.visualShow = true;
      }, 3000
      ); 
      setTimeout(function(){
        dino.visualShow = true;
      }, 3500
      );       
      
    }
    if(dino.freezeValue === 100 || dino.freezeValue > 100){
      dino.scoreVisual = "00" + Math.floor(dino.freezeValue);
    }
    if(dino.freezeValue === 1000 || dino.freezeValue > 1000){
      dino.scoreVisual = "0" + Math.floor(dino.freezeValue);
    }
    if(dino.freezeValue === 10000 ||  dino.freezeValue > 10000){
      dino.scoreVisual = Math.floor(dino.freezeValue);
    }    
  }
  if(dino.visualShow === true){
    dino.scoreVisualVisual = "HI " + user.highscoreVisual + "   " + dino.scoreVisual;
  }else{
    dino.scoreVisualVisual = "";
  }
  c.textAlign = "right"
  c.font = "bold 75px arial,serif";
  c.fillStyle = "black";
  c.textBaseline = "ideographic";
  c.fillText(dino.scoreVisualVisual, 1320, 110);
  
  
  c.textAlign = "left"
  c.font = "15px IMPACT";
  c.fillStyle = "black";
  c.fillText("V0.1 Experimental", 0, 768);

  if(dino.died === false && dino.stand === false && user.loggedIn === true){
    back1.x -= dino.speed;
    back2.x -= dino.speed;
    cactus1.x -= dino.speed;
    cactus2.x -= dino.speed;
    cactus3.x -= dino.speed;
    cactus4.x -= dino.speed;
    bird1.x -= dino.speed;

    dino.speed = Math.floor(dino.score/100+20);

    dino.score += 0.1;

    runningMusic.play();
    if(Math.floor(dino.score)%100 === 0 && dino.score > 99){
      dino.freeze = true;
      dino.freezeValue = dino.score;
      coinSound.play();
    }
  }
  if(dino.died === false){
    if(dino.jumping === true){
      up();
    }
    if(dino.y > standardHeight){
      dino.jumping = false;
      dino.stand = false;
      dino.jumpheight = dino.jumpheightstandard;
      dino.gravitation = dino.jumpheightstandard/23;
      dino.y = standardHeight;
      dino.inAir = false;
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
  if(dino.x > cactus2.x-50 && dino.x-100 < cactus2.x && dino.y > standardHeight-100){
    dino.died = true;
  }
  if(dino.x > cactus3.x-50 && dino.x-100 < cactus3.x && dino.y > standardHeight-100){
    dino.died = true;
  }
  if(dino.x > cactus4.x-50 && dino.x-100 < cactus4.x && dino.y > standardHeight-100){
    dino.died = true;
  }
  if(dino.x+150 > bird1.x && dino.y > bird1.y-100 && dino.x < bird1.x+50 && dino.y < bird1.y+100 && dino.crouch === false){
    dino.died = true;
  }
  if(dino.x+150 > bird1.x && dino.y > bird1.y-100 && dino.x < bird1.x+50 && dino.y+100 < bird1.y+100 && dino.crouch === true){
    dino.died = true;
  }

  if(dino.died === true){
    dino.animationState = 6;
    c.textAlign = "center";
    c.font = "75px IMPACT, Sans-serif";
    c.fillStyle = "black";
    c.fillText("You died, press ENTER to play more!", 1365/2, 768/2)
    deathMusic.play();
    runningMusic.pause();
    runningMusic.currentTime = 0;
    c.fillRect(1365-420,768-120, 400, 100)
    c.fillStyle = user.logOutColor;
    c.textAlign = "center";
    c.fillText("Log out", 1365-210, 768-30);
    if(dino.playOnce == false){
      death.play();
      dino.playOnce = true;
    }
    if(mouse.x > 1365-420 && mouse.x < 1365-20 && mouse.y > 768-120 && mouse.y < 768-20){
      console.log("Hej")
      user.logOutColor = "#A2A2A2"
      if(mouse.click === true){
        document.cookie = `username=;Expires=Sun, 22 Oct 1970 08:00:00 UTC;`;
        document.cookie = `password=;Expires=Sun, 22 Oct 1970 08:00:00 UTC;`;
        document.cookie = `mail=;Expires=Sun, 22 Oct 1970 08:00:00 UTC;`;
        document.cookie = `loggedIn=;Expires=Sun, 22 Oct 1970 08:00:00 UTC;`;
        document.cookie = "highscore=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        user = {
          highscore:0,
          username: undefined,
          password: undefined,
          mail: undefined,
          loggedIn: false,
          puttingInUsername: false,
          puttingInPassword: false,
          puttingInMail: false,
          loginColor: "white",
          usernameInput:"",
          passwordInput: "",
          passwordColor: "white",
          usernameColor: "white",
          passwordInputVisual: "",
          noAccountColor: "white",
          rememberMe: false,
          encryptedPassword: undefined,
          logOutColor: "white"
        };
        exitDeath()
      }
    }else{
      user.logOutColor = "white";
    }
    if(user.highscore < dino.score){
      user.highscore = dino.score;
      document.cookie = `highscore=${user.highscore};Expires=Sun, 22 Oct 2030 08:00:00 UTC;`;
      sendScore(user.username,Math.floor(user.highscore),user.password,user.mail);
    }
  }
  if(leaderboardShow === true){
        c.textAlign = "center"
        c.fillStyle = "#1270CE";
        c.fillRect(1365/20+10, 768/20+10, 1365-1365/10-20, 768-768/10-20);

        c.fillStyle = "white";

        c.fillStyle = "white";

        c.font = " "+ 1365 / 30 + "px Impact, Sans-serif";

        c.fillText("Leaderboard", 1365/2, lineSpace*3);

        c.fillStyle = "#d4af37";
        c.fillText("1." + userArray[0].name + ": " + userArray[0].score + " Points", 1365/2, lineSpace*5);
        c.fillStyle = "#C0C0C0";
        c.fillText("2." + userArray[1].name + ": " + userArray[1].score + " Points", 1365/2, lineSpace*7);
        c.fillStyle = "#cd7f32";
        c.fillText("3." + userArray[2].name + ": " + userArray[2].score + " Points", 1365/2, lineSpace*9);
        c.fillStyle = "white";
        c.fillText("4." + userArray[3].name + ": " + userArray[3].score + " Points", 1365/2, lineSpace*11);
        c.fillText("5." + userArray[4].name + ": " + userArray[4].score + " Points", 1365/2, lineSpace*13);
        c.fillText("6." + userArray[5].name + ": " + userArray[5].score + " Points", 1365/2, lineSpace*15);
        c.fillText("7." + userArray[6].name + ": " + userArray[6].score + " Points", 1365/2, lineSpace*17);
        c.fillText("8." + userArray[7].name + ": " + userArray[7].score + " Points", 1365/2, lineSpace*19);
        c.fillText("9." + userArray[8].name + ": " + userArray[8].score + " Points", 1365/2, lineSpace*21);
        c.fillText("10." + userArray[9].name + ": " + userArray[9].score + " Points", 1365/2, lineSpace*23);
    }
  if(user.loggedIn === false){
    menumusic.play();
    c.fillStyle = "black";
    c.fillRect(100, 100, 1365-200, 768-200);
    c.fillStyle = "white";
    c.fillRect(1365/2-100, 575, 200, 65);
    c.fillStyle = "white";
    c.fillRect(1365/3*2-120, 500, 100, 55);
    c.font = "45px IMPACT, Sans-serif";
    c.textAlign = "right";
    c.fillStyle = "white"
    c.fillText("Remember me:", 1365/3*2-150, 555);
    c.textAlign = "center";
    c.fillStyle = "black"
    if(user.rememberMe === true){
      c.fillText("X", 1365/3*2-70, 555);
    }
    c.fillStyle = "red";
    c.fillText("Buttons work bad in fullscreen.(Just so you know)", 1365/2, 200)
    c.fillStyle = user.loginColor;
    c.fillText("Login", 1365/2, 635);
    c.fillStyle = user.usernameColor;
    c.fillText("Username:" + user.usernameInput, 1365/2, 275);
    c.fillStyle = user.passwordColor;
    c.fillText("Password:" + user.passwordInputVisual, 1365/2, 475);
    c.textDecoration = "underline";
    c.fillStyle = user.noAccountColor;
    c.font = "15px IMPACT, Sans-serif";
    c.fillText("Click here to register an account", 1365/2, 670)
    c.textDecoration = "none";
    if(mouse.click === true){
      user.puttingInPassword = false;
      user.passwordColor = "white";
      user.puttingInUsername = false;
      user.usernameColor = "white";
    }
    if(mouse.x > ((1365/3)*2)-120 && mouse.x < ((1365/3)*2)-20 && mouse.y > 500 && mouse.y < 555){
      if(mouse.click === true){
        if(user.rememberMe === false){
          user.rememberMe = true;
          return;
        }
        if(user.rememberMe === true){
          user.rememberMe = false;
          return;
        }
      }
    }
    if(mouse.x > 1365/2-100 && mouse.x < 1365/2-100+200 && mouse.y > 575 && mouse.y < 575+65){
      user.loginColor = "#A2A2A2";
      if(mouse.click === true){
        getScore();
      }
    }else{
      user.loginColor = "black";
    }
    if(mouse.x > 1365/2-100 && mouse.x < 1365/2+200 && mouse.y > 650 && mouse.y < 670){
      user.noAccountColor = "blue"
      if(mouse.click === true){
        location.replace("https://account-creater--edwardedwardkn.repl.co/")
      }
    }else{
      user.noAccountColor = "white"
    }
    if(mouse.x > 100 && mouse.x < 1365-200 && mouse.y > 225 && mouse.y < 325){
      if(mouse.click === true){
        togglePuttingUsername();
      }
    }
    if(mouse.x > 100 && mouse.x < 1365-200 && mouse.y > 425 && mouse.y < 525){
      if(mouse.click === true){
        togglePuttingPassword();
      }
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
  if(dino.died === false && dino.stand === false){
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
  if(dino.died === false && dino.stand === false){
    if(dino.animationState === 1){
      dino.animationState = 2;
    }
    if(dino.animationState === 4){
      dino.animationState = 5;
    }
  }
  setTimeout(animation1, 110);
}
function animation3(){
    if(bird1.animationState === 2){
      bird1.animationState = 1;
    }
  setTimeout(animation4, 400);
}
function animation4(){
    if(bird1.animationState === 1){
      bird1.animationState = 2;
    }
    teleport();
  setTimeout(animation3, 400);
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
    playOnce: false,
    stand: true,
    freeze: false,
    freezeValue: undefined,
    visualShow: true,
    doOnce: false,
    username: getCookie("username") === -1 ? undefined : getCookie("username")
  };

  back1 = {
    x: 0,
    y: 0,
  };
  back2 = {
    x: 1365,
    y: 0,
  }; 
  cactus1 = {
    x: -1000,
    y: standardHeight
  };
  cactus2 = {
    x: -1000,
    y: standardHeight
  };
  cactus3 = {
    x: -1000,
    y: standardHeight
  };
  cactus4 = {
    x: -1000,
    y: standardHeight
  };
  
  
  bird1 = {
    x: -5000,
    y: (standardHeight+100)-Math.random()*300,
    animationState: 1,
    image:undefined
  }; 
  
  deathMusic.pause();
  deathMusic.currentTime = 0;
  death.pause();
  death.currentTime = 0;
}

animation1();
animation3();
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

function togglePuttingUsername(){
  user.puttingInPassword = false;
  user.passwordColor = "white";
  if(user.puttingInUsername == false){
      user.puttingInUsername = true;
      user.usernameColor = "#A2A2A2";
      return;
  };
  if(user.puttingInUsername == true){
      user.puttingInUsername = false;
      user.usernameColor = "white";
      return;
  };
}
function togglePuttingPassword(){
  user.puttingInUsername = false;
  user.usernameColor = "white";
  if(user.puttingInPassword == false){
      user.puttingInPassword = true;
      user.passwordColor = "#A2A2A2";
      return;
  };
  if(user.puttingInPassword == true){
      user.puttingInPassword = false;
      user.passwordColor = "white";
      return;
  };
}
function getScore(){
    const http = new XMLHttpRequest();   
    const url=`https://l2niipto9l.execute-api.eu-north-1.amazonaws.com/test/helloworld`;
    http.open("GET", url);
    http.send();

    http.onreadystatechange=(e)=>{
        userArray = JSON.parse(http.responseText)
        for (let i = 0; i < userArray.length; i++){
          
          user.encryptedPassword = CryptoJS.MD5(user.passwordInput).toString();

          if(user.encryptedPassword === userArray[i].password && userArray[i].name === user.usernameInput || user.encryptedPassword === user.password && userArray[i].name === user.username ){
            user.loggedIn = true;
            menumusic.pause();
            menumusic.currentTime = 0;
            user.username = userArray[i].name;
            user.password = userArray[i].password;
            user.mail = userArray[i].mail;
            user.highscore = userArray[i].score;
            if(user.rememberMe === true){
              document.cookie = `username=${user.username};Expires=Sun, 22 Oct 2030 08:00:00 UTC;`;
              document.cookie = `password=${user.password};Expires=Sun, 22 Oct 2030 08:00:00 UTC;`;
              document.cookie = `mail=${user.mail};Expires=Sun, 22 Oct 2030 08:00:00 UTC;`;
              document.cookie = `loggedIn=${user.loggedIn};Expires=Sun, 22 Oct 2030 08:00:00 UTC;`;
            }
            }     
        };
    };
};

function showLeaderboard(){
    if (leaderboardShow == true) {
        leaderboardShow = false;
        return;
    };
    if(leaderboardShow == false) {
        leaderboardShow = true;
        getScore();
        return;
    };
};

function sendScore(username, score, password, mail){
  const http = new XMLHttpRequest();   
  const url=`https://l2niipto9l.execute-api.eu-north-1.amazonaws.com/test/update?username=${username}&score=${score}&password=${password}&mail=${mail}`;
  http.open("GET", url);
  http.send();
};


function teleport(){
  if(dino.stand === false && dino.died === false && user.loggedIn === true){
    var chosen = Math.floor(Math.random()*6);

    if(cactus1.x < -200 && chosen === 1){
      cactus1.x = 2000;
    }
    else if(cactus2.x < -200 && chosen === 2){
      cactus2.x = 2000;
    }
    else if(cactus3.x < -200 && chosen === 3){
      cactus3.x = 2000;
    }
    else if(cactus4.x < -200 && chosen === 4){
      cactus4.x = 2000;
    }
    else if(bird1.x < -200 && chosen === 5 || bird1.x < -200 && chosen === 6){
      bird1.x = 2000;
      bird1.y = (standardHeight+100)-Math.random()*300;
    }
    else{
      chosen = Math.floor(Math.random()*6);
    }
  }
}