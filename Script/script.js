(function() {
  var canvas = document.getElementById('game-layer');

  canvas.width = 1365;
  canvas.height = 768;

  var c = canvas.getContext('2d');



  var dinoImg = new Image();

  var hatImg = new Image();
  var hatsImg = new Image();

  var heartImg = new Image();
  var heart2Img = new Image();
  var heartsImg = new Image();

  var back1Img = new Image();
  var back2Img = new Image();
  back1Img.src = 'Images/Background/back1.png';
  back2Img.src = 'Images/Background/back2.png';

  var cactus1Img = new Image();

  var cactus2Img = new Image();

  var cactus3Img = new Image();

  var bird1Img = new Image();

  var coinImg = new Image();



  var jumpSound = new Audio('Sounds/Jump.wav');

  var deathMusic = new Audio('Sounds/DeathMusic.mp3');
  deathMusic.volume = 0.5;

  var runningMusic = new Audio('Sounds/RunningMusic.mp3');

  var coinSound = new Audio('Sounds/Coin.mp3');

  var death = new Audio('Sounds/Death.mp3');

  var menumusic = new Audio('Sounds/MenuMusic.mp3');
  var menumusic2 = new Audio('Sounds/MenuMusic2.mp3');
  
  var beep1 = new Audio('/Sounds/beep1.mp3');
  var beep2 = new Audio('/Sounds/beep2.mp3');

  var muted = false;




  var standardHeight = 480;

  var userArray = [];

  var lineSpace = 768 / 25;

  var leaderboardShow = false;
  var leaderboardSide = 1;

  var version = "V0.1.5";

  var oldVersion = false;

  var scores = [0];
  scores.unshift(Math.floor(0));

  var average = 0;
  
  var averageVisual = "00000";

  var tmpX;

  var tmpY;



  var user = {
    highscore: 0,
    username: undefined,
    password: undefined,
    mail: undefined,
    loggedIn: false,
    puttingInUsername: false,
    puttingInPassword: false,
    puttingInMail: false,
    loginColor: "white",
    usernameInput: "",
    passwordInput: "",
    passwordColor: "white",
    usernameColor: "white",
    passwordInputVisual: "",
    noAccountColor: "white",
    rememberMe: false,
    encryptedPassword: undefined,
    logOutColor: "white",
    wrongText: ""
  };

  var dino = {
    x: 100,
    y: standardHeight,
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
    doOnce: false,
    fastFall: false,
    start: true,
    timer: "",
    lives: 0,
    hitOnce: false,
    startedrunning: false
  };





  setInterval(teleport, 1000)





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
    y: (standardHeight + 100) - Math.random() * 300,
    animationState: 1,
    image: undefined
  };
  var coin = {
    x: -20,
    y: -20,
    animationState: 1,
    image: undefined,
    value: 0
  }

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
  };
  var menu = {
    paused: true,
    shopVisual: false,
    shopcolor: "white",
    shoptext: "Shop",
    sideValue:0,
    sideColor: "white",
    sideColor2: "white",
    side2: false,
    color6: "white",
    text6: "Buy for 1500 Gold",
    color7: "white",
    text7: "Buy for 2500 Gold",
    equipedLife: Number(getCookie("equipedLife") === -1 ? 0 : getCookie("equipedLife")),
    bindingVisual: false,
    bindingColor: "white",
    avgColor: "black",
    avgVisual: false,
    yeeColor: "white"
  };
  var bindings = getCookie("bindings") === -1 ? {
    jump1: "Space",
    jump2: "ArrowUp",
    crouch1: "ControlLeft",
    crouch2: "ShiftLeft",
    pause1: "KeyP",
    pause2: "KeyE",
    leaderboard1: "Tab",
    leaderboard2: "KeyR",
    mute1: "KeyM",
    mute2: "KeyL",
    fullscreen1: "KeyF",
    fullscreen2: "KeyV",
    jump1Changing: false,
    jump2Changing: false,
    crouch1Changing: false,
    crouch2Changing: false,
    pause1Changing: false,
    pause2Changing: false,
    leaderboard1Changing: false,
    leaderboard2Changing: false,
    mute1Changing: false,
    mute2Changing: false,
    fullscreen1Changing: false,
    fullscreen2Changing: false,
    jump1ChangingColor: "white",
    jump2ChangingColor: "white",
    crouch1ChangingColor: "white",
    crouch2ChangingColor: "white",
    pause1ChangingColor: "white",
    pause2ChangingColor: "white",
    leaderboard1ChangingColor: "white",
    leaderboard2ChangingColor: "white",
    mute1ChangingColor: "white",
    mute2ChangingColor: "white",
    fullscreen1ChangingColor: "white",
    fullscreen2ChangingColor: "white",
  } : JSON.parse(getCookie("bindings"))

  var hat = {
    crouchValue: 65,
    crouchValue2: 0,
    buyvalue: "0,0,0,0,0,0,0",
    color1: "white",
    text1: "Buy for 25 Gold",
    color2: "white",
    text2: "Buy for 50 Gold",
    color3: "white",
    text3: "Buy for 150 Gold",
    color4: "white",
    text4: "Buy for 300 Gold",
    color5: "white",
    text5: "Buy for 500 Gold",
    equipedHat:Number(getCookie("equipedHat") === -1 ? 0 : getCookie("equipedHat")),
    hatboost: 0,
    fly: false
  };

  if(user.loggedIn === "true" || user.loggedIn === true) {
    getScore();
    setTimeout(function(){
    sendScore(user.username, Math.floor(user.highscore), user.password, user.mail, Math.floor(coin.value), hat.buyvalue, scores);
    dino.inAir = false;
    dino.died = false;
    user.loggedIn = true;
    }, 2000)
  }
  if(menu.equipedLife === 1){
    heartImg.src = "Images/Hearts/Heart.png"
    dino.lives = 1;
  }
  if(menu.equipedLife === 2){
    heartImg.src = "Images/Hearts/Heart.png"
    heart2Img.src = "Images/Hearts/Heart.png"
    dino.lives = 2;
  }
  if(hat.equipedHat === 1){
    hatImg.src = "Images/Hats/1.png"
    hat.hatboost = 0.01;
  }
  if(hat.equipedHat === 2){
    hatImg.src = "Images/Hats/2.png"
    hat.hatboost = 0.025;
  }
  if(hat.equipedHat === 3){
    hatImg.src = "Images/Hats/3.png"
    hat.hatboost = 0.0375;
  }
  if(hat.equipedHat === 4){
    hatImg.src = "Images/Hats/4.png"
    hat.hatboost = 0.05;
  }
  if(hat.equipedHat === 5){
    hatImg.src = "Images/Hats/5.png"
    hat.hatboost = 0.075;
  }
  document.addEventListener('mouseleave', function(event){
    if(document.fullscreenElement){
    }else{
      dino.stand = true;
      dino.start = false;
      runningMusic.pause();
    }
  });
  window.addEventListener('click', function (event) {
    mouse.click = true;
    setTimeout(function () {
      mouse.click = false;
    }, 15)
  });
  canvas.addEventListener('mousemove', function (event) {
    let tmpXmulti = 1365/screen.width;
    let tmpYmulti = 768/screen.height;
    if(document.fullscreenElement){
      mouse.x = event.offsetX*tmpXmulti;
      mouse.y = event.offsetY*tmpYmulti;
    }else{
      mouse.x = event.offsetX;
      mouse.y = event.offsetY;      
    }

  });

  window.addEventListener('keydown', function (event) {
    console.log(event)
    if(event.code === bindings.mute1 || event.code === bindings.mute2){
      if(menu.bindingVisual === false){
        mute();
      }
    }
    
    if (event.code === bindings.fullscreen1 || event.code === bindings.fullscreen2) {
      if (canvas.RequestFullScreen) {
        canvas.RequestFullScreen();
      } else if (canvas.webkitRequestFullScreen) {
        canvas.webkitRequestFullScreen();
      } else if (canvas.mozRequestFullScreen) {
        canvas.mozRequestFullScreen();
      } else if (canvas.msRequestFullscreen) {
        canvas.msRequestFullscreen();
      } else {
        alert("This browser doesn't supporter fullscreen");
      }
    }
    if (event.code === bindings.crouch1 || event.code === bindings.crouch2){
      if(user.loggedIn === true && dino.stand === false && dino.died === false && menu.bindingVisual === false){
        crouch()
        dino.fastFall = true
      }
    }
    if(event.code === "Enter" && dino.died === true && menu.shopVisual === false && menu.bindingVisual === false) {
      if(oldVersion === false){
        exitDeath();
      }else{
        alert("You are running on an old version of the game. Please reload to play more.");
      }
    }
    if (event.code === bindings.leaderboard1 || event.code === bindings.leaderboard2) {
      if(user.loggedIn === true && menu.bindingVisual === false){
        leaderboardShow = true;
        getScore();
      }
    }
    if (event.code === bindings.pause1 || event.code === bindings.pause2) {
      runningMusic.pause();
      menu.paused = true;
      dino.stand = true;
      dino.start = false;
    }



    if (user.puttingInUsername === true && event.code === "Backspace") {
      user.usernameInput = user.usernameInput.slice(0, -1);
    }
    if (user.puttingInPassword === true && event.code === "Backspace") {
      user.passwordInput = user.passwordInput.slice(0, -1);
      user.passwordInputVisual = user.passwordInputVisual.slice(0, -1);
    }
  });
  window.addEventListener('keypress', function (event) {
    if (user.puttingInUsername === true && event.key !== "Enter" && user.usernameInput.length < 20) {
      user.usernameInput += event.key;
    }
    if (user.puttingInPassword === true && event.key !== "Enter" && user.passwordInput.length < 20) {
      user.passwordInput += event.key;
      user.passwordInputVisual += "•"
    }
if (event.code === bindings.jump1 || event.code === bindings.jump2) {
      if(dino.inAir === false && dino.died === false && user.loggedIn === true && menu.shopVisual === false && menu.bindingVisual === false){
        if (dino.stand === true && dino.start === true) {
          jump();
          dino.stand = false;
          dino.startedrunning = true;
        }
        if (dino.stand === false) {
          jump();
          dino.startedrunning = true;
        }
        if (dino.start === false && dino.stand === true && dino.timer === "") {
          beep1.play();
          dino.timer = "3";
          menu.paused = false;
          setTimeout(function () {
            beep1.currentTime = 0;
            beep1.play();
            dino.timer = "2";
          }, 1000)
          setTimeout(function () {
            dino.timer = "1";
            beep1.currentTime = 0;
            beep1.play();
          }, 2000)
          setTimeout(function () {
            dino.stand = false;
            dino.startedrunning = true;
            dino.timer = "";
            beep2.currentTime = 0;
            beep2.play()
            runningMusic.play();
          }, 3000);
        }
      }
    }



  });
  window.addEventListener('keyup', function (event) {
    if (event.code === bindings.crouch1 && menu.bindingVisual === false || event.code === bindings.crouch2 && menu.bindingVisual === false) {
      crouchEnd()
      dino.fastFall = false;
    }
    if (event.code === bindings.leaderboard1 || event.code === bindings.leaderboard2){
      if(user.loggedIn === true && menu.bindingVisual === false){
        leaderboardShow = false;
      }
    }
  });



  function update() {
    requestAnimationFrame(update);

    c.clearRect(0, 0, canvas.width, canvas.height);
    
    if(scores.length > 1){
      scores = scores.filter(function(val) {
          return val !== 0;
      });
    }
    if(scores === []){
      scores = [0];
    }
    if(user.loggedIn === true){
      if(scores === 0){
        scores = [0]
      }
      if(scores !== 0 && scores !== []){
        let sum = scores.reduce((previous, current) => current += previous);
        average = sum / scores.length;
    
      }
    }

    if (dino.animationState === 1) {
      dino.image = 'Images/Dinosaur/dino1.png';
    }
    if (dino.animationState === 2) {
      dino.image = 'Images/Dinosaur/dino2.png';
    }
    if (dino.animationState === 3) {
      dino.image = 'Images/Dinosaur/dino3.png';
    }
    if (dino.animationState === 4) {
      dino.image = 'Images/Dinosaur/dino4.png';
    }
    if (dino.animationState === 5) {
      dino.image = 'Images/Dinosaur/dino5.png';
    }
    if (dino.animationState === 5) {
      dino.image = 'Images/Dinosaur/dino5.png';
    }
    if (dino.animationState === 6) {
      dino.image = 'Images/Dinosaur/dino6.png';
    }

    if (bird1.animationState === 1) {
      bird1.image = 'Images/Bird/bird1.png';
    }
    if (bird1.animationState === 2) {
      bird1.image = 'Images/Bird/bird2.png';
    }
    if(coin.animationState === 1){
      coin.image = 'Images/Coins/coin1.png'
    }




    if (back1Img.complete) {
      c.drawImage(back1Img, Math.floor(back1.x), back1.y);
      back1Img.src = 'Images/Background/back1.png';
    } else {
      back1Img.addEventListener('load', loaded)
      back1Img.addEventListener('error', function () {
      })
    }
    if (back2Img.complete) {
      c.drawImage(back2Img, Math.floor(back2.x), back2.y);
      back2Img.src = 'Images/Background/back2.png';
    } else {
      back2Img.addEventListener('load', loaded)
      back2Img.addEventListener('error', function () {
      })
    }


    if (dinoImg.complete) {
      c.drawImage(dinoImg, Math.floor(dino.x), Math.floor(dino.y));
      if(hat.fly === false){
        c.drawImage(hatImg, Math.floor(dino.x+70)+hat.crouchValue2, Math.floor(dino.y-hat.crouchValue), 150, 100);
        tmpY = Math.floor(dino.y-hat.crouchValue);
        tmpX = Math.floor(dino.x+70)+hat.crouchValue2;
      }else{
        tmpX -= dino.speed;
        c.drawImage(hatImg, Math.floor(tmpX), Math.floor(tmpY), 150, 100);
      }

      dinoImg.src = dino.image;
    } else {
      dinoImg.addEventListener('load', function () {

      })
      dinoImg.addEventListener('error', function () {
      })
    }

    if (bird1Img.complete) {
      c.drawImage(bird1Img, Math.floor(bird1.x), Math.floor(bird1.y));
      bird1Img.src = bird1.image;
    } else {
      bird1Img.addEventListener('load', function () {

      })
      bird1Img.addEventListener('error', function () {
      })
    }

    if (cactus1Img.complete) {
      c.drawImage(cactus1Img, Math.floor(cactus1.x), cactus1.y);
      cactus1Img.src = 'Images/Cactus/cactus1.png';
    } else {
      cactus1Img.addEventListener('load', loaded)
      cactus1Img.addEventListener('error', function () {
      })
    }

    if (cactus2Img.complete) {
      c.drawImage(cactus2Img, Math.floor(cactus2.x), cactus2.y);
      c.drawImage(cactus2Img, Math.floor(cactus4.x), cactus4.y);
      cactus2Img.src = 'Images/Cactus/cactus2.png';

    } else {
      cactus2Img.addEventListener('load', loaded)
      cactus2Img.addEventListener('error', function () {
      })
    }
    if (cactus3Img.complete) {
      c.drawImage(cactus3Img, Math.floor(cactus3.x), cactus3.y - 15);
      cactus3Img.src = 'Images/Cactus/cactus3.png';
    } else {
      cactus3Img.addEventListener('load', loaded)
    }
    if (coinImg.complete) {
      c.drawImage(coinImg, Math.floor(coin.x), Math.floor(coin.y), 200, 200);
      c.drawImage(heartImg, Math.floor(coin.x+200), Math.floor(coin.y+50), 100, 100);
      c.drawImage(heart2Img, Math.floor(coin.x+300), Math.floor(coin.y+50), 100, 100);
      coinImg.src = coin.image;
      c.fillStyle = "black";
      c.textAlign = "center";
      c.font = "30px IMPACT, Sans-serif";
      c.fillText(Math.floor(coin.value*10)/10, coin.x+96, coin.y+115)
    } else {
      coinImg.addEventListener('load', function () {

      })
      coinImg.addEventListener('error', function () {
      })
    }


    if (back1.x < -1365 && dino.backwards === false) {
      back1.x = 1365 - dino.speed;
      back2.x = 0 - dino.speed;
    }
    if (back2.x < -1365 && dino.backwards === false) {
      back2.x = 1365 - dino.speed;
      back1.x = 0 - dino.speed;
    }
    if (back1.x > 1365 && dino.backwards === true) {
      back1.x = -1365 - dino.speed;
      back2.x = 0 - dino.speed;
    }
    if (back2.x > 1365 && dino.backwards === true) {
      back2.x = -1365 - dino.speed;
      back1.x = 0 - dino.speed;
    }

    if (dino.speed < 0) {
      dino.backwards = true;
    }
    if (dino.speed > 0) {
      dino.backwards = false;
    }
    if (dino.y > standardHeight) {
      dino.y = standardHeight;
    }



    if (user.highscore < 10) {
      user.highscoreVisual = "0000" + Math.floor(user.highscore);
    }
    if (user.highscore > 10) {
      user.highscoreVisual = "000" + Math.floor(user.highscore);
    }
    if (user.highscore > 100) {
      user.highscoreVisual = "00" + Math.floor(user.highscore);
    }
    if (user.highscore > 1000) {
      user.highscoreVisual = "0" + Math.floor(user.highscore);
    }
    if (user.highscore > 10000) {
      user.highscoreVisual = Math.floor(user.highscore);
    }
    if (dino.score < 10) {
      dino.scoreVisual = "0000" + Math.floor(dino.score);
    }
    if (dino.score > 10) {
      dino.scoreVisual = "000" + Math.floor(dino.score);
    }
    if (dino.score > 100) {
      dino.scoreVisual = "00" + Math.floor(dino.score);
    }
    if (dino.score > 1000) {
      dino.scoreVisual = "0" + Math.floor(dino.score);
    }
    if (dino.score > 10000) {
      dino.scoreVisual = Math.floor(dino.score);
    }

    if (average < 10) {
      averageVisual = "0000" + Math.floor(average);
    }
    if (average > 10) {
      averageVisual = "000" + Math.floor(average);
    }
    if (average > 100) {
      averageVisual = "00" + Math.floor(average);
    }
    if (average > 1000) {
      averageVisual = "0" + Math.floor(average);
    }
    if (average > 10000) {
      averageVisual = Math.floor(average);
    }


    if (dino.freeze === true) {
      setTimeout(function () {
        dino.freeze = false;

        dino.doOnce = false;
      }, 4000);
      if (dino.doOnce === false) {
        dino.doOnce = true;
        coin.value ++;
        if(average >= 1000){
          coin.value++;
        }
        if(average >= 3000){
          coin.value++;
        }
        if(average >= 5000){
          coin.value++;
        }
        if(average >= 7000){
          coin.value++;
        }
        if(average >= 9000){
          coin.value++;
        }
        sendScore(user.username, Math.floor(user.highscore), user.password, user.mail, Math.floor(coin.value), hat.buyvalue, scores);

        ;
        setTimeout(function () {
          dino.visualShow = false;
        }, 500
        );
        setTimeout(function () {
          dino.visualShow = true;
        }, 1000
        );
        setTimeout(function () {
          dino.visualShow = false
        }, 1500
        );
        setTimeout(function () {
          dino.visualShow = true
        }, 2000
        );
        setTimeout(function () {
          dino.visualShow = false;
        }, 2500
        );
        setTimeout(function () {
          dino.visualShow = true;  
        }, 3000
        );
      }

      if (dino.freezeValue === 100 || dino.freezeValue > 100) {
        dino.scoreVisual = "00" + Math.floor(dino.freezeValue);
      }
      if (dino.freezeValue === 1000 || dino.freezeValue > 1000) {
        dino.scoreVisual = "0" + Math.floor(dino.freezeValue);
      }
      if (dino.freezeValue === 10000 || dino.freezeValue > 10000) {
        dino.scoreVisual = Math.floor(dino.freezeValue);
      }
    }


    if (dino.visualShow === true) {
      dino.scoreVisualVisual = "HI " + user.highscoreVisual + "   " + dino.scoreVisual;
    } else {
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
    c.fillText(version, 0, 768);

    if (dino.died === false && dino.stand === false && user.loggedIn === true) {
      menu.paused = false;
      back1.x -= dino.speed;
      back2.x -= dino.speed;
      cactus1.x -= dino.speed;
      cactus2.x -= dino.speed;
      cactus3.x -= dino.speed;
      cactus4.x -= dino.speed;
      bird1.x -= dino.speed;
      if (dino.score < 4000) {
        dino.speed = Math.floor(dino.score / 300 + 20);
      } else {
        dino.speed = Math.floor(4000 / 300 + 20);
      }

  	  if(dino.crouch === true && dino.inAir === false){
        if(hat.crouchValue > -35){
          hat.crouchValue -= 10;
        }
        hat.crouchValue2 = 15;
      }else if(dino.inAir === true && dino.jumpheight < 0){
        hat.crouchValue += 3;
      }else{
        hat.crouchValue = 65
        hat.crouchValue2 = 0;
      }

      dino.score += (0.1+hat.hatboost);

      runningMusic.play();
      if (Math.floor(dino.score) % 100 === 0 && dino.score > 99) {
        dino.freeze = true;
        dino.freezeValue = dino.score;
        coinSound.play();
      }
    }
    if (dino.died === false) {
      if (dino.jumping === true) {
        up();
      }
      if (dino.y > standardHeight) {
        dino.jumping = false;
        dino.jumpheight = dino.jumpheightstandard;
        dino.gravitation = dino.jumpheightstandard / 23;
        dino.y = standardHeight;
        dino.inAir = false;
      }
      if (dino.y < standardHeight) {
        dino.inAir = true;
      } else {
        dino.inAir = false;
        if (dino.animationState === 3) {
          if (dino.crouch === true) {
            dino.animationState = 4;
          } else {
            dino.animationState = 1;
          }
        }
      }
    }
      
    if (dino.died === true) {


      c.fillStyle = "black"
      c.font = "75px IMPACT, Sans-serif";
      c.fillRect(1365-420, 768-240, 400, 100)
      c.fillStyle = menu.shopcolor;
      c.textAlign = "center";
      c.fillText(menu.shoptext, 1365 - 210, 768 - 150);
      if(mouse.x > 1365 - 420 && mouse.x < 1365 - 20 && mouse.y > 768-240 && mouse.y < 768 - 140){
        menu.shopcolor = "#A2A2A2";
        if(mouse.click === true){
          if(menu.shopVisual === false){
            menu.shopVisual = true;
            exitDeath();
            return;
          }
          if(menu.shopVisual === true){
            menu.shopVisual = false;
            menu.shoptext = "Shop"
            menumusic.pause();
            menumusic.currentTime = 0;            
            return;
          }
        }
      }else{
        menu.shopcolor = "white"
      }

      dino.animationState = 6;

      deathMusic.play();
      runningMusic.pause();
      runningMusic.currentTime = 0;
      c.fillStyle = "black"
      c.fillRect(1365 - 420, 768 - 120, 400, 100)
      c.fillStyle = user.logOutColor;
      c.textAlign = "center";
      c.fillText("Log out", 1365 - 210, 768 - 30);
      c.textAlign = "right"
      c.font = "bold 75px arial,serif";
      c.fillStyle = "black";
      c.textBaseline = "ideographic";
      if(menu.shopVisual === false && leaderboardShow === false){
          c.fillStyle = menu.avgColor;
          c.fillText("Avg   "+averageVisual, 1320, 190);
          if(mouse.x < 1320 && mouse.x > 1320-450 && mouse.y > 100 && mouse.y < 200){
            menu.avgColor = "#A2A2A2";
            if(mouse.click === true){
              if(menu.avgVisual === false){
                menu.avgVisual = true;
              }else{
                menu.avgVisual = false;
              }
            }
          }else{
            menu.avgColor = "black"
          }
        }
      if (dino.playOnce == false) {
        death.play();
        dino.playOnce = true;
      }
      if(menu.bindingVisual === false){
        if (mouse.x > 1365 - 420 && mouse.x < 1365 - 20 && mouse.y > 768 - 120 && mouse.y < 768 - 20) {
          user.logOutColor = "#A2A2A2"
          if (mouse.click === true) {
            exitDeath();
            user = {
              highscore: 0,
              username: undefined,
              password: undefined,
              mail: undefined,
              loggedIn: false,
              puttingInUsername: false,
              puttingInPassword: false,
              puttingInMail: false,
              loginColor: "white",
              usernameInput: "",
              passwordInput: "",
              passwordColor: "white",
              usernameColor: "white",
              passwordInputVisual: "",
              noAccountColor: "white",
              rememberMe: false,
              encryptedPassword: undefined,
              logOutColor: "white",
              wrongText: ""
            };
            hat.buyvalue = "";
            coin.value = 0;
            hatArray = [];
            hat.equipedHat = 0;
            menu.equipedLife = 0;
            hat.hatboost = 0;
            dino.lives = 0;
            hatImg.src = "";
            heartImg.src = "";
            heart2Img.src = "";
            scores = [0]
            document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "equipedHat=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "equipedLife=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          }
        } else {
          user.logOutColor = "white";
        }
      }
      if (user.highscore < dino.score) {
        user.highscore = dino.score;
        sendScore(user.username, Math.floor(user.highscore), user.password, user.mail, Math.floor(coin.value), hat.buyvalue, scores);
      }
      sendScore(user.username, Math.floor(user.highscore), user.password, user.mail, Math.floor(coin.value), hat.buyvalue, scores);
        c.textAlign = "center";
        c.font = "75px IMPACT, Sans-serif";
        c.fillStyle = "black";
        c.fillText("You died, press ENTER to play again!", 1365 / 2, 768 / 2)
    }
    if (dino.x > cactus1.x - 50 && dino.x - 100 < cactus1.x && dino.y > standardHeight - 100) {
      if(dino.lives === 0 && dino.hitOnce === false){
        dino.died = true;
        scores.unshift(Math.floor(dino.score));
        let sum = scores.reduce((previous, current) => current += previous);
        average = sum / scores.length;
        getVersion();
        dino.hitOnce = true;
      }else{
        if(dino.hitOnce === false){
          dino.lives--;
          dino.hitOnce = true;
        }
        if(dino.lives === 1){
          heart2Img.src = "";
        }
        if(dino.lives === 0){
          heartImg.src = "";
        }
      }
    }else if (dino.x > cactus2.x - 50 && dino.x - 100 < cactus2.x && dino.y > standardHeight - 100) {
      if(dino.lives === 0 && dino.hitOnce === false){
        dino.died = true;
        scores.unshift(Math.floor(dino.score));
        let sum = scores.reduce((previous, current) => current += previous);
        average = sum / scores.length;
        getVersion();
        dino.hitOnce = true;
      }else{
        if(dino.hitOnce === false){
          dino.lives--;
          dino.hitOnce = true;
        }        
        if(dino.lives === 1){
          heart2Img.src = "";
        }
        if(dino.lives === 0){
          heartImg.src = "";
        }
        return;
      }
    }else if (dino.x > cactus3.x - 50 && dino.x - 100 < cactus3.x && dino.y > standardHeight - 100) {
      if(dino.lives === 0 && dino.hitOnce === false){
        dino.died = true;
        scores.unshift(Math.floor(dino.score));
        let sum = scores.reduce((previous, current) => current += previous);
        average = sum / scores.length;
        getVersion();
        dino.hitOnce = true;
      }else{
        if(dino.hitOnce === false){
          dino.lives--;
          dino.hitOnce = true;
        }        
        if(dino.lives === 1){
          heart2Img.src = "";
        }
        if(dino.lives === 0){
          heartImg.src = "";
        }
        return;
      }
    }else if (dino.x > cactus4.x - 50 && dino.x - 100 < cactus4.x && dino.y > standardHeight - 100) {
       if(dino.lives === 0 && dino.hitOnce === false){
        dino.died = true;
        scores.unshift(Math.floor(dino.score));
        let sum = scores.reduce((previous, current) => current += previous);
        average = sum / scores.length;
        getVersion();
        dino.hitOnce = true;
      }else{
        if(dino.hitOnce === false){
          dino.lives--;
          dino.hitOnce = true;
        }        
        if(dino.lives === 1){
          heart2Img.src = "";
        }
        if(dino.lives === 0){
          heartImg.src = "";
        }
        return;
      }
    }else if (dino.x + 150 > bird1.x + 50 && dino.y > bird1.y - 100 && dino.x < bird1.x + 50 && dino.y < bird1.y + 100 && dino.crouch === false) {
      if(dino.lives === 0 && dino.hitOnce === false){
        dino.died = true;
        scores.unshift(Math.floor(dino.score));
        let sum = scores.reduce((previous, current) => current += previous);
        average = sum / scores.length;
        dino.hitOnce = true;
        getVersion();
      }else{
        if(dino.hitOnce === false){
          dino.lives--;
          dino.hitOnce = true;
        }        
        if(dino.lives === 1){
          heart2Img.src = "";
        }
        if(dino.lives === 0){
          heartImg.src = "";
        }
        return;
      } 
    }else if (dino.x + 150 > bird1.x + 50 && dino.y > bird1.y - 100 && dino.x < bird1.x + 50 && dino.y + 100 < bird1.y + 100 && dino.crouch === true) {
      if(dino.lives === 0 && dino.hitOnce === false){
        dino.died = true;
        scores.unshift(Math.floor(dino.score));
        let sum = scores.reduce((previous, current) => current += previous);
        average = sum / scores.length;
        
        dino.hitOnce = true;
        getVersion();
      }else{
        if(dino.hitOnce === false){
          dino.lives--;
          dino.hitOnce = true;
        }        
        if(dino.lives === 1){
          heart2Img.src = "";
        }
        if(dino.lives === 0){
          heartImg.src = "";
        }
        return;
      }    
    }else{
      dino.hitOnce = false;
    }
    if (dino.x + 150 > bird1.x + 50 && dino.y > bird1.y - 100 && dino.x < bird1.x + 50 && dino.y < bird1.y + 100 && dino.crouch === true && hat.fly === false) {
      hat.fly = true;
      hat.hatboost = 0;
      setTimeout(function(){
        hat.fly = false;
        if(hat.equipedHat = 1){
          hat.hatboost = 0.01;
        }
        if(hat.equipedHat = 2){
          hat.hatboost = 0.025;
        }
        if(hat.equipedHat = 3){
          hat.hatboost = 0.0375;
        }
        if(hat.equipedHat = 4){
          hat.hatboost = 0.05;
        }
        if(hat.equipedHat = 5){
          hat.hatboost = 0.075;
        }
      }, 10000)
    }
    if (dino.x + 150 > bird1.x + 50 && dino.y > bird1.y - 100 && dino.x < bird1.x + 50 && dino.y - 75 < bird1.y + 100 && dino.crouch === false && hat.fly === false) {
      hat.fly = true;
      hat.hatboost = 0;
      hat.fly = true;
      hat.hatboost = 0;
      setTimeout(function(){
        hat.fly = false;
        if(hat.equipedHat = 1){
          hat.hatboost = 0.01;
        }
        if(hat.equipedHat = 2){
          hat.hatboost = 0.025;
        }
        if(hat.equipedHat = 3){
          hat.hatboost = 0.0375;
        }
        if(hat.equipedHat = 4){
          hat.hatboost = 0.05;
        }
        if(hat.equipedHat = 5){
          hat.hatboost = 0.075;
        }
      }, 10000)
    }
    c.fillStyle = "black";
    c.textAlign = "center"
    c.font = "500px IMPACT, Sans-serif";
    c.fillText(dino.timer, 1365/2, 768/6*5);
    if(menu.shopVisual === true){
      menumusic.play()
      c.textAlign = "center"
      c.fillStyle = "#1270CE";
      c.fillRect(0, 0, 1365, 768);
      menu.shoptext = "Leave shop"


      if (hatsImg.complete) {
        c.drawImage(hatsImg, 0-menu.sideValue, 0);
        hatsImg.src = "/Images/Hats/Hats.png";
      } else {
        hatsImg.addEventListener('load', function () {

        })
        hatsImg.addEventListener('error', function () {
        })
      }
      if (heartsImg.complete) {
        c.drawImage(heartsImg, 1365-menu.sideValue, 0);
        heartsImg.src = "/Images/Hearts/Hearts.png";
      } else {
        heartsImg.addEventListener('load', function () {

        })
        heartsImg.addEventListener('error', function () {
        })
      }
      c.fillStyle = "black"
      c.fillRect(1200-menu.sideValue, 410, 100, 100);
      c.fillStyle = "black"
      c.fillRect(150+1250-menu.sideValue, 410, 100, 100);
      c.fillStyle = "black"
      c.fillRect(100-menu.sideValue, 658, 400, 100);
      c.fillStyle = "black"
      c.fillRect(510-menu.sideValue, 658, 400, 100);
      c.fillStyle = "black"
      c.fillRect(100-menu.sideValue, 290, 400, 100);
      c.fillStyle = "black"
      c.fillRect(510-menu.sideValue, 290, 400, 100);
      c.fillStyle = "black"
      c.fillRect(920-menu.sideValue, 290, 400, 100);
      c.textAlign = "center"
      c.fillRect(120+1365-menu.sideValue, 150, 400, 100);
      c.fillStyle = "black"
      c.fillRect(700+1365-menu.sideValue, 150, 400, 100);
      c.textAlign = "center"
      c.font = "50px IMPACT, Sans-serif";
      c.fillStyle = hat.color1;
      c.fillText(hat.text1, 300-menu.sideValue, 370)
      c.fillStyle = hat.color2;
      c.fillText(hat.text2, 710-menu.sideValue, 370)
      c.fillStyle = hat.color3;
      c.fillText(hat.text3, 1120-menu.sideValue, 370)
      c.fillStyle = hat.color4;
      c.fillText(hat.text4, 300-menu.sideValue, 740)
      c.fillStyle = hat.color5;
      c.fillText(hat.text5, 710-menu.sideValue, 740)
      c.fillStyle = menu.color6;
      c.fillText(menu.text6, 320+1365-menu.sideValue, 230)
      c.fillStyle = menu.color7;
      c.fillText(menu.text7, 900+1365-menu.sideValue, 230)
      c.fillStyle = menu.sideColor;
      c.fillText(">", 1250-menu.sideValue, 490)
      c.fillStyle = menu.sideColor2;
      c.fillText("<", 1250+200-menu.sideValue, 490)
      c.fillStyle = "white"
      c.fillText("Hats(scoreboosters)", 1365/2-menu.sideValue, 75)
      c.fillText("Extra lives", 1365+1365/2-menu.sideValue, 75)
      var hatArray = hat.buyvalue.split(",");
      if(mouse.x > 1200-menu.sideValue && mouse.y > 410 && mouse.x < 1200+100-menu.sideValue && mouse.y < 410+100 && menu.sideValue === 0){
        menu.sideColor = "#A2A2A2"
        if(mouse.click === true){
          menu.side2 = true;
        }
      }else{
        menu.sideColor = "white"
      }
      if(menu.side2 === true && menu.sideValue < 1365){
        menu.sideValue += 25;
      }
      if(mouse.x > 40+1365-menu.sideValue && mouse.y > 410 && mouse.x < 1365-menu.sideValue+140 && mouse.y < 410+100 && menu.sideValue > 1305){
        menu.sideColor2 = "#A2A2A2"
        if(mouse.click === true){
          menu.side2 = false;
        }
      }else{
        menu.sideColor2 = "white"
      }
     if(menu.side2 === false && menu.sideValue > 0){
        menu.sideValue -= 25;
      }
      if(hatArray[0] === "1" && hat.equipedHat !== 1){
        hat.text1 = "Equip";
      }else if(hat.equipedHat === 1){
        hat.text1 = "Unequip";
      }else{
        hat.text1 = "Buy for 25 Gold";
      }
      if(hatArray[1] === "1" && hat.equipedHat !== 2){
        hat.text2 = "Equip";
      }else if(hat.equipedHat === 2){
        hat.text2 = "Unequip";
      }else{
        hat.text2 = "Buy for 50 Gold";
      }

      if(hatArray[2] === "1" && hat.equipedHat !== 3){
        hat.text3 = "Equip";
      }else if(hat.equipedHat === 3){
        hat.text3 = "Unequip";
      }else{
        hat.text3 = "Buy for 150 Gold";
      }
      if(hatArray[3] === "1" && hat.equipedHat !== 4){
        hat.text4 = "Equip";
      }else if(hat.equipedHat === 4){
        hat.text4 = "Unequip";
      }else{
        hat.text4 = "Buy for 300 Gold";
      }
      if(hatArray[4] === "1" && hat.equipedHat !== 5){
        hat.text5 = "Equip";
      }else if(hat.equipedHat === 5){
        hat.text5 = "Unequip";
      }else{
        hat.text5 = "Buy for 500 Gold";
      }
      if(hatArray[5] === "1" && menu.equipedLife !== 1){
        menu.text6 = "Equip";
      }else if(menu.equipedLife === 1){
        menu.text6 = "Unequip";
      }else{
        menu.text6 = "Buy for 1500 Gold";
      }
      if(hatArray[6] === "1" && menu.equipedLife !== 2){
        menu.text7 = "Equip";
      }else if(menu.equipedLife === 2){
        menu.text7 = "Unequip";
      }else{
        menu.text7 = "Buy for 2500 Gold";
      }
      if(mouse.x > 120+1365-menu.sideValue && mouse.x < 520+1365-menu.sideValue && mouse.y > 150 && mouse.y < 250){
        menu.color6 = "#A2A2A2";
        if(mouse.click === true){
          if(coin.value >= 1500 && hatArray[5] === "0"){
            hatArray[5] = "1";
            hat.buyvalue = hatArray.toString()
            coin.value = coin.value-1500;
            sendScore(user.username, Math.floor(user.highscore), user.password, user.mail, Math.floor(coin.value), hat.buyvalue, scores);
            return
          }
          if(hatArray[5] === "1" && menu.equipedLife !== 1){
            heart2Img.src = ""
            heartImg.src = "/Images/Hearts/Heart.png"
            menu.equipedLife = 1;
            dino.lives = 1;
            document.cookie = `equipedLife=${menu.equipedLife};Expires=Sun, 22 Oct 2030 08:00:00 UTC;`;
          }else{
            heartImg.src = ""
            menu.equipedLife = 0;
            document.cookie = "equipedLife=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            dino.lives = 0;
          }
        }
      }else{
        menu.color6 = "white";
      }
      if(mouse.x > 700+1365-menu.sideValue && mouse.x < 1100+1365-menu.sideValue && mouse.y > 150 && mouse.y < 250){
        menu.color7 = "#A2A2A2";
        if(mouse.click === true){
          if(coin.value >= 2500 && hatArray[6] === "0"){
            hatArray[6] = "1";
            hat.buyvalue = hatArray.toString()
            coin.value = coin.value-2500;
            sendScore(user.username, Math.floor(user.highscore), user.password, user.mail, Math.floor(coin.value), hat.buyvalue, scores);
            return
          }
          if(hatArray[6] === "1" && menu.equipedLife !== 2){
            heartImg.src = "/Images/Hearts/Heart.png"
            heart2Img.src = "/Images/Hearts/Heart.png"
            menu.equipedLife = 2;
            dino.lives = 2;
            document.cookie = `equipedLife=${menu.equipedLife};Expires=Sun, 22 Oct 2030 08:00:00 UTC;`;
          }else{
            heartImg.src = ""
            heart2Img.src = ""
            menu.equipedLife = 0;
            document.cookie = "equipedLife=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            dino.lives = 0
          }
        }
      }else{
        menu.color7 = "white";
      }
      if(mouse.x > 100-menu.sideValue && mouse.x < 500-menu.sideValue && mouse.y > 290 && mouse.y < 390){
        hat.color1 = "#A2A2A2";
        if(mouse.click === true){
          if(coin.value >= 25 && hatArray[0] === "0"){
            hatArray[0] = "1";
            hat.buyvalue = hatArray.toString()
            coin.value = coin.value-25;
            sendScore(user.username, Math.floor(user.highscore), user.password, user.mail, Math.floor(coin.value), hat.buyvalue, scores);
            return
          }
          if(hatArray[0] === "1" && hat.equipedHat !== 1){
            hatImg.src = "/Images/Hats/1.png"
            hat.equipedHat = 1;
            hat.hatboost = 0.01;
            document.cookie = `equipedHat=${hat.equipedHat};Expires=Sun, 22 Oct 2030 08:00:00 UTC;`;
          }else{
            hatImg.src = ""
            hat.equipedHat = 0;
            document.cookie = "equipedHat=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            hat.hatboost = 0;
          }
        }
      }else{
        hat.color1 = "white"
      }
      if(mouse.x > 510-menu.sideValue && mouse.x < 910-menu.sideValue && mouse.y > 290 && mouse.y < 390){
        hat.color2 = "#A2A2A2";
        if(mouse.click === true){
          if(coin.value >= 50 && hatArray[1] === "0"){
            hatArray[1] = "1";
            hat.buyvalue = hatArray.toString()
            coin.value = coin.value-50;
            sendScore(user.username, Math.floor(user.highscore), user.password, user.mail, Math.floor(coin.value), hat.buyvalue, scores);
            return
          }
          if(hatArray[1] === "1" && hat.equipedHat !== 2){
            hatImg.src = "/Images/Hats/2.png"
            hat.equipedHat = 2;
            hat.hatboost = 0.025;
            document.cookie = `equipedHat=${hat.equipedHat};Expires=Sun, 22 Oct 2030 08:00:00 UTC;`;
          }else{
            hatImg.src = ""
            hat.equipedHat = 0;
            document.cookie = "equipedHat=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            hat.hatboost = 0;
          }
        }
      }else{
        hat.color2 = "white"
      }
      if(mouse.x > 920-menu.sideValue && mouse.x < 1320-menu.sideValue && mouse.y > 290 && mouse.y < 390){
        hat.color3 = "#A2A2A2";
        if(mouse.click === true){
          if(coin.value >= 150 && hatArray[2] === "0"){
            hatArray[2] = "1";
            hat.buyvalue = hatArray.toString()
            coin.value = coin.value-150;
            sendScore(user.username, Math.floor(user.highscore), user.password, user.mail, Math.floor(coin.value), hat.buyvalue, scores);
            return
          }
          if(hatArray[2] === "1" && hat.equipedHat !== 3){
            hatImg.src = "/Images/Hats/3.png"
            hat.equipedHat = 3;
            hat.hatboost = 0.0375;
            document.cookie = `equipedHat=${hat.equipedHat};Expires=Sun, 22 Oct 2030 08:00:00 UTC;`;
          }else{
            hatImg.src = ""
            hat.equipedHat = 0;
            document.cookie = "equipedHat=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            hat.hatboost = 0;
          }
        }
      }else{
        hat.color3 = "white"
      }
      if(mouse.x > 100-menu.sideValue && mouse.x < 500-menu.sideValue && mouse.y > 658 && mouse.y < 758){
        hat.color4 = "#A2A2A2";
        if(mouse.click === true){
          if(coin.value >= 300 && hatArray[3] === "0"){
            hatArray[3] = "1";
            hat.buyvalue = hatArray.toString()
            coin.value = coin.value-300;
            sendScore(user.username, Math.floor(user.highscore), user.password, user.mail, Math.floor(coin.value), hat.buyvalue, scores);
            return
          }
          if(hatArray[3] === "1" && hat.equipedHat !== 4){
            hatImg.src = "/Images/Hats/4.png"
            hat.equipedHat = 4;
            hat.hatboost = 0.05
            document.cookie = `equipedHat=${hat.equipedHat};Expires=Sun, 22 Oct 2030 08:00:00 UTC;`;
          }else{
            hatImg.src = ""
            hat.equipedHat = 0;
            document.cookie = "equipedHat=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            hat.hatboost = 0;
          }
        }
      }else{
        hat.color4 = "white"
      }
      if(mouse.x > 510-menu.sideValue && mouse.x < 910-menu.sideValue && mouse.y > 658 && mouse.y < 758){
        hat.color5 = "#A2A2A2";
        if(mouse.click === true){
          if(coin.value >= 500 && hatArray[4] === "0"){
            hatArray[4] = "1";
            hat.buyvalue = hatArray.toString()
            coin.value = coin.value-500;
            sendScore(user.username, Math.floor(user.highscore), user.password, user.mail, Math.floor(coin.value), hat.buyvalue, scores);
            return
          }
          if(hatArray[4] === "1" && hat.equipedHat !== 5){
            hatImg.src = "/Images/Hats/5.png"
            hat.equipedHat = 5;
            hat.hatboost = 0.075;
            document.cookie = `equipedHat=${hat.equipedHat};Expires=Sun, 22 Oct 2030 08:00:00 UTC;`;
          }else{
            hatImg.src = ""
            hat.equipedHat = 0;
            document.cookie = "equipedHat=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            hat.hatboost = 0;
          }
        }
      }else{
        hat.color5 = "white"
      }
    }
    

    if (user.loggedIn === false) {
      menumusic2.play();
      c.fillStyle = "black";
      c.fillRect(100, 100, 1365 - 200, 768 - 200);
      c.fillStyle = "white";
      c.fillRect(1365 / 2 - 100, 575, 200, 65);
      c.fillStyle = "white";
      c.fillRect(1365 / 3 * 2 - 120, 500, 100, 55);
      c.fillStyle = "white";
      c.font = "75px IMPACT, Sans-serif";
      c.fillText("Please login to play!", 1365 / 2, 200)
      c.fillStyle = "red"
      c.font = "75px IMPACT, Sans-serif";
      c.fillText(user.wrongText, 1365 / 2, 400)
      c.font = "45px IMPACT, Sans-serif";

      c.textAlign = "right";
      c.fillStyle = "white"
      c.fillText("Remember me:", 1365 / 3 * 2 - 150, 555);
      c.textAlign = "center";
      c.fillStyle = "black"
      if (user.rememberMe === true) {
        c.fillText("X", 1365 / 3 * 2 - 70, 555);
      }
      c.fillStyle = user.loginColor;
      c.fillText("Login", 1365 / 2, 635);
      c.fillStyle = user.usernameColor;
      c.fillText("Username:" + user.usernameInput, 1365 / 2, 275);
      c.fillStyle = user.passwordColor;
      c.fillText("Password:" + user.passwordInputVisual, 1365 / 2, 475);
      c.textDecoration = "underline";
      c.fillStyle = user.noAccountColor;
      c.font = "25px IMPACT, Sans-serif";
      c.fillText("Click here to register an account", 1365 / 2, 670)
      c.textDecoration = "none";
      if (mouse.click === true) {
        user.puttingInPassword = false;
        user.passwordColor = "white";
        user.puttingInUsername = false;
        user.usernameColor = "white";
      }
      if (mouse.x > ((1365 / 3) * 2) - 120 && mouse.x < ((1365 / 3) * 2) - 20 && mouse.y > 500 && mouse.y < 555) {
        if (mouse.click === true) {
          if (user.rememberMe === false) {
            user.rememberMe = true;
            return;
          }
          if (user.rememberMe === true) {
            user.rememberMe = false;
            return;
          }
        }
      }
      if (mouse.x > 1365 / 2 - 100 && mouse.x < 1365 / 2 - 100 + 200 && mouse.y > 575 && mouse.y < 575 + 65) {
        user.loginColor = "#A2A2A2";
        if (mouse.click === true) {
          getScore();
        }
      } else {
        user.loginColor = "black";
      }
      if (mouse.x > 1365 / 2 - 175 && mouse.x < 1365 / 2 + 350
       && mouse.y > 650 && mouse.y < 670) {
        user.noAccountColor = "blue"
        if (mouse.click === true) {
          location.replace("https://account-creater--edwardedwardkn.repl.co/")
        }
      } else {
        user.noAccountColor = "white"
      }
      if (mouse.x > 100 && mouse.x < 1365 - 200 && mouse.y > 225 && mouse.y < 325) {
        if (mouse.click === true) {
          togglePuttingUsername();
        }
      }
      if (mouse.x > 100 && mouse.x < 1365 - 200 && mouse.y > 425 && mouse.y < 525) {
        if (mouse.click === true) {
          togglePuttingPassword();
        }
      }
    }
  
    if(menu.paused === true && user.loggedIn === true && dino.died === false){
      if(menu.bindingVisual === false){
        c.fillStyle = "black"
        c.font = "75px IMPACT, Sans-serif";
        c.fillRect(1365 - 420, 768 - 120, 400, 100)
        c.fillStyle = user.logOutColor;
        c.textAlign = "center";
        c.fillText("Log out", 1365 - 210, 768 - 30);
        c.textAlign = "right"
        c.font = "bold 75px arial,serif";
        c.fillStyle = "black";
        c.textBaseline = "ideographic";
        if(menu.shopVisual === false && leaderboardShow === false){
          c.fillStyle = menu.avgColor;
          c.fillText("Avg   "+averageVisual, 1320, 190);
          if(mouse.x < 1320 && mouse.x > 1320-450 && mouse.y > 100 && mouse.y < 200){
            menu.avgColor = "#A2A2A2";
            if(mouse.click === true){
              if(menu.avgVisual === false){
                menu.avgVisual = true;
              }else{
                menu.avgVisual = false;
              }
            }
          }else{
            menu.avgColor = "black"
          }
        }
      }
      if(menu.avgVisual === true){
        c.fillStyle = "black";
        c.fillRect(1365/3, 768/5, (1365/3), (768/5)*3)
        c.fillStyle = "white";
        c.font = "bold 35px IMPACT,Sans-serif";
        c.textAlign = "center"
        c.fillText("Reset average",1365/2, 768/5+50);
        c.fillText("(Costs 150 gold)",1365/2, 768/5+95);
        c.font = "bold 75px IMPACT,Sans-serif";
        c.fillStyle = menu.yeeColor;
        c.fillText("yee", 1365/2, 768/3+300);

        if(mouse.x > 620 && mouse.y > 490 && mouse.x < 740 && mouse.y < 540){
          menu.yeeColor = "#A2A2A2";
          if(mouse.click){
            if(coin.value >= 150){
              coin.value -= 150;
              scores = 0;
              sendScore(user.username, Math.floor(user.highscore), user.password, user.mail, Math.floor(coin.value), hat.buyvalue, scores);
              menu.avgVisual = false;
              let sum = scores.reduce((previous, current) => current += previous);
              average = sum / scores.length;
            }
          }
        }else{
          menu.yeeColor = "white"
        }
      }
      if(dino.startedrunning === false && menu.bindingVisual === false){
        c.fillStyle = "black"
        c.font = "75px IMPACT, Sans-serif";
        c.fillRect(1365-420, 768-240, 400, 100)
        c.fillStyle = menu.shopcolor;
        c.textAlign = "center";
        c.fillText(menu.shoptext, 1365 - 210, 768 - 150);
        if(mouse.x > 1365 - 420 && mouse.x < 1365 - 20 && mouse.y > 768-240 && mouse.y < 768 - 140){
          menu.shopcolor = "#A2A2A2";
          if(mouse.click === true){
            if(menu.shopVisual === false){
              menu.shopVisual = true;
              return;
            }
            if(menu.shopVisual === true){
              menu.shopVisual = false;
              menu.shoptext = "Shop"
              menumusic.pause();
              menumusic.currentTime = 0;
              return;
            }
          }
        }else{
          menu.shopcolor = "white"
        }
        if(menu.shopVisual === false){
          c.fillStyle = "black"
          c.font = "75px IMPACT, Sans-serif";
          c.fillRect(1365-420, 768-360, 400, 100)
          c.fillStyle = menu.bindingColor;
          c.textAlign = "center";
          c.fillText("Keybinds", 1365 - 220, 768 - 270);
          if(mouse.x > 1365 - 420 && mouse.x < 1365 - 20 && mouse.y > 768-360 && mouse.y < 768 - 260){
            menu.bindingColor = "#A2A2A2";
            if(mouse.click === true){
            setTimeout(function(){
              menu.bindingVisual = true;
            },50)
            }
          }else{
            menu.bindingColor = "white"
          }
        }
      }
      if(menu.bindingVisual === false){
        if (mouse.x > 1365 - 420 && mouse.x < 1365 - 20 && mouse.y > 768 - 120 && mouse.y < 768 - 20) {
          user.logOutColor = "#A2A2A2"
          if (mouse.click === true) {
            exitDeath();
            user = {
              highscore: 0,
              username: undefined,
              password: undefined,
              mail: undefined,
              loggedIn: false,
              puttingInUsername: false,
              puttingInPassword: false,
              puttingInMail: false,
              loginColor: "white",
              usernameInput: "",
              passwordInput: "",
              passwordColor: "white",
              usernameColor: "white",
              passwordInputVisual: "",
              noAccountColor: "white",
              rememberMe: false,
              encryptedPassword: undefined,
              logOutColor: "white",
              wrongText: ""
            };
            hat.buyvalue = "";
            coin.value = 0;
            hatArray = [];
            hat.equipedHat = 0;
            menu.equipedLife = 0;
            hat.hatboost = 0;
            dino.lives = 0;
            hatImg.src = "";
            heartImg.src = "";
            heart2Img.src = "";
            average = 0;
            scores = 0;
            document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "equipedHat=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "equipedLife=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          }
        } else {
          user.logOutColor = "white";
        }
      }
    }
    if (leaderboardShow === true) {
      for (var i = 0; i < userArray.length; i++) {
        if(userArray[i].name === "Knullbullepojken"){
          userArray[i].name = "Kanelbullepojken";
        }
        if(userArray[i].name === "månsärlitegay"){
          userArray[i].name = "månsärlitecool";     
        }
        if(userArray[i].name === "FuL"){
          userArray[i].name = "FiN";
        }
        if(userArray[i].name === "måns e lite gay"){
          userArray[i].name = "måns e lite fin";
        }
      }

      c.textAlign = "center";
      c.fillStyle = "#1270CE";
      c.fillRect(1365 / 20 + 10, 768 / 20 + 10, 1365 - 1365 / 10 - 20, 768 - 768 / 10 - 20);

      c.fillStyle = "white"
      c.font = " " + 1365 / 30 + "px Impact, Sans-serif";

      if(leaderboardSide === 1){

        userArray.sort(comparescore);
        c.textAlign = "center";
        c.fillStyle = "white";
        c.fillText("Leaderboard(Highscores)", 1365 / 2, lineSpace * 3+10);
        c.fillStyle = "#d4af37";
        c.fillText("1." + userArray[0].name + ": " + userArray[0].score + " Points", 1365 / 2, lineSpace * 5);
        c.fillStyle = "#C0C0C0";
        c.fillText("2." + userArray[1].name + ": " + userArray[1].score + " Points", 1365 / 2, lineSpace * 7);
        c.fillStyle = "#cd7f32";
        c.fillText("3." + userArray[2].name + ": " + userArray[2].score + " Points", 1365 / 2, lineSpace * 9);
        c.fillStyle = "white";
        c.fillText("4." + userArray[3].name + ": " + userArray[3].score + " Points", 1365 / 2, lineSpace * 11);
        c.fillText("5." + userArray[4].name + ": " + userArray[4].score + " Points", 1365 / 2, lineSpace * 13);
        c.fillText("6." + userArray[5].name + ": " + userArray[5].score + " Points", 1365 / 2, lineSpace * 15);
        c.fillText("7." + userArray[6].name + ": " + userArray[6].score + " Points", 1365 / 2, lineSpace * 17);
        c.fillText("8." + userArray[7].name + ": " + userArray[7].score + " Points", 1365 / 2, lineSpace * 19);
        c.fillText("9." + userArray[8].name + ": " + userArray[8].score + " Points", 1365 / 2, lineSpace * 21);
        c.fillText("10." + userArray[9].name + ": " + userArray[9].score + " Points", 1365 / 2, lineSpace * 23);

        if(mouse.x > 1130 && mouse.x < 1230 && mouse.y > lineSpace*6 && mouse.y < lineSpace*6+100){
          leaderboardColor = "#A2A2A2";
          if(mouse.click === true){
            leaderboardSide = 2;
          }
        }else{
          var leaderboardColor = "white"
        }
        c.fillStyle = "black";
        c.fillRect(1130,  lineSpace*6 , 100, 100)
        c.fillStyle = leaderboardColor;
        c.font = "bold 80px IMPACT,Sans-serif";
        c.fillText(">", 1180,  lineSpace*9+10);


      }
      if(leaderboardSide === 2){
        for(var g = 0; g < userArray.length; g++){
          try {
              if(userArray[g].name === "undefined"){
                continue;
              }
                arr = userArray[g].scoreArray.split(',').map(function(item) {
                return parseInt(item, 10);
                })
              
              let sum = arr.reduce((previous, current) => current += previous);
              userArray[g].average = sum / arr.length;
          }
          catch (e) {
            continue;
          }
        }
        userArray.sort(function(a, b){
            return b.average-a.average
        })

        c.fillStyle = "white";
        c.textAlign = "center"
        c.fillText("Leaderboard(Average)", 1365 / 2, lineSpace * 3+10);
        c.fillStyle = "#d4af37";
        c.fillText("1." + userArray[0].name + ": " + Math.floor(userArray[0].average) + " Points", 1365 / 2, lineSpace * 5);
        c.fillStyle = "#C0C0C0";
        c.fillText("2." + userArray[1].name + ": " + Math.floor(userArray[1].average) + " Points", 1365 / 2, lineSpace * 7);
        c.fillStyle = "#cd7f32";
        c.fillText("3." + userArray[2].name + ": " + Math.floor(userArray[2].average) + " Points", 1365 / 2, lineSpace * 9);
        c.fillStyle = "white";
        c.fillText("4." + userArray[3].name + ": " + Math.floor(userArray[3].average) + " Points", 1365 / 2, lineSpace * 11);
        c.fillText("5." + userArray[4].name + ": " +Math.floor(userArray[4].average) + " Points", 1365 / 2, lineSpace * 13);
        c.fillText("6." + userArray[5].name + ": " + Math.floor(userArray[5].average) + " Points", 1365 / 2, lineSpace * 15);
        c.fillText("7." + userArray[6].name + ": " + Math.floor(userArray[6].average) + " Points", 1365 / 2, lineSpace * 17);
        c.fillText("8." + userArray[7].name + ": " + Math.floor(userArray[7].average) + " Points", 1365 / 2, lineSpace * 19);
        c.fillText("9." + userArray[8].name + ": " + Math.floor(userArray[8].average) + " Points", 1365 / 2, lineSpace * 21);
        c.fillText("10." + userArray[9].name + ": " + Math.floor(userArray[9].average) + " Points", 1365 / 2, lineSpace * 23);
        if(mouse.x > 120 && mouse.x < 220 && mouse.y > lineSpace*6 && mouse.y < lineSpace*6+100){
          leaderboardColor = "#A2A2A2";
          if(mouse.click === true){
            leaderboardSide = 1;
          }
        }else{
          var leaderboardColor = "white"
        }
        c.fillStyle = "black";
        c.fillRect(120,  lineSpace*6 , 100, 100)
        c.fillStyle = leaderboardColor;
        c.font = "bold 80px IMPACT,Sans-serif";
        c.fillText("<", 170,  lineSpace*9+10);

      }
    }
    if(menu.bindingVisual === true){
      menumusic.play();
      c.textAlign = "center"
      c.fillStyle = "#1270CE";
      c.fillRect(0, 0, 1365, 768);

      c.fillStyle = "black"
      c.font = "75px IMPACT, Sans-serif";
      c.fillRect(20, 20, 400, 100)
      c.fillStyle = menu.bindingColor;
      c.textAlign = "center";
      c.fillText("Back", 220, 110);
      c.fillStyle = "White";
      c.fillText("Keybinds", 1365/2, 110);
      c.textAlign = "right";
      c.fillText("Jump:", 450, lineSpace * 10);
      c.fillText("Crouch:", 450, lineSpace * 13);
      c.fillText("Leaderboard:", 450, lineSpace * 16);
      c.fillText("Mute sound:", 450, lineSpace * 19);
      c.fillText("Pause:", 450, lineSpace * 22);
      c.fillText("Fullscreen:", 450, lineSpace * 25);
      c.textAlign = "center";
      c.fillText("Primary", 1365/2, lineSpace * 7);
      c.fillText("Secondary", 1365/5*4, lineSpace * 7);
      c.fillStyle = "black";
      c.fillRect(500, lineSpace*7, 1365/3*2-80, lineSpace*18)
      c.strokeStyle = "white";
      c.lineWidth = 5;
      c.strokeRect(500, lineSpace*7, 1365/3*2-80, lineSpace*18);
      c.strokeRect(500, lineSpace*10, 1365/3*2-80, lineSpace*15);
      c.strokeRect(500, lineSpace*13, 1365/3*2-80, lineSpace*12);
      c.strokeRect(500, lineSpace*16, 1365/3*2-80, lineSpace*9);
      c.strokeRect(500, lineSpace*19, 1365/3*2-80, lineSpace*6);
      c.strokeRect(500, lineSpace*22, 1365/3*2-80, lineSpace*3);
      c.strokeRect(500+1365/3-40, lineSpace*7, (1365/3*2)/2-40, lineSpace*18);

      c.fillStyle = "white"
      c.textAlign = "left";
      c.fillStyle = bindings.jump1ChangingColor;
      c.fillText(bindings.jump1, 520, lineSpace*10)
      c.fillStyle = bindings.crouch1ChangingColor;
      c.fillText(bindings.crouch1, 520, lineSpace*13)
      c.fillStyle = bindings.leaderboard1ChangingColor;
      c.fillText(bindings.leaderboard1, 520, lineSpace*16)
      c.fillStyle = bindings.mute1ChangingColor;
      c.fillText(bindings.mute1, 520, lineSpace*19)
      c.fillStyle = bindings.pause1ChangingColor;
      c.fillText(bindings.pause1, 520, lineSpace*22)
      c.fillStyle = bindings.fullscreen1ChangingColor;
      c.fillText(bindings.fullscreen1, 520, lineSpace*25)

      c.fillStyle = bindings.jump2ChangingColor;
      c.fillText(bindings.jump2, 500+1365/3-40+20, lineSpace*10)
      c.fillStyle = bindings.crouch2ChangingColor;
      c.fillText(bindings.crouch2, 500+1365/3-40+20, lineSpace*13)
      c.fillStyle = bindings.leaderboard2ChangingColor;
      c.fillText(bindings.leaderboard2, 500+1365/3-40+20, lineSpace*16)
      c.fillStyle = bindings.mute2ChangingColor;
      c.fillText(bindings.mute2, 500+1365/3-40+20, lineSpace*19)
      c.fillStyle = bindings.pause2ChangingColor;
      c.fillText(bindings.pause2, 500+1365/3-40+20, lineSpace*22)
      c.fillStyle = bindings.fullscreen2ChangingColor;
      c.fillText(bindings.fullscreen2, 500+1365/3-40+20, lineSpace*25)
      if(bindings.jump1Changing === true){
        bindings.jump1ChangingColor = "#696969";
      }
      if(bindings.crouch1Changing === true){
        bindings.crouch1ChangingColor = "#696969";
      }
      if(bindings.leaderboard1Changing === true){
        bindings.leaderboard1ChangingColor = "#696969";
      }
      if(bindings.mute1Changing === true){
        bindings.mute1ChangingColor = "#696969";
      }
      if(bindings.pause1Changing === true){
        bindings.pause1ChangingColor = "#696969";
      }
      if(bindings.fullscreen1Changing === true){
        bindings.fullscreen1ChangingColor = "#696969";
      }
      if(bindings.jump2Changing === true){
        bindings.jump2ChangingColor = "#696969";
      }
      if(bindings.crouch2Changing === true){
        bindings.crouch2ChangingColor = "#696969";
      }
      if(bindings.leaderboard2Changing === true){
        bindings.leaderboard2ChangingColor = "#696969";
      }
      if(bindings.mute2Changing === true){
        bindings.mute2ChangingColor = "#696969";
      }
      if(bindings.pause2Changing === true){
        bindings.pause2ChangingColor = "#696969";
      }
      if(bindings.fullscreen2Changing === true){
        bindings.fullscreen2ChangingColor = "#696969";
      }

      window.addEventListener('keyup', function(event){
        if(bindings.jump1Changing === true){
          bindings.jump1 = event.code;
        }
        if(bindings.crouch1Changing === true){
          bindings.crouch1 = event.code;
        }
        if(bindings.leaderboard1Changing === true){
          bindings.leaderboard1 = event.code;
        }
        if(bindings.mute1Changing === true){
          bindings.mute1 = event.code;
        }
        if(bindings.pause1Changing === true){
          bindings.pause1 = event.code;
        }
        if(bindings.fullscreen1Changing === true){
          bindings.fullscreen1 = event.code;
        }
        if(bindings.jump2Changing === true){
          bindings.jump2 = event.code;
        }
        if(bindings.crouch2Changing === true){
          bindings.crouch2 = event.code;
        }
        if(bindings.leaderboard2Changing === true){
          bindings.leaderboard2 = event.code;
        }
        if(bindings.mute2Changing === true){
          bindings.mute2 = event.code;
        }
        if(bindings.pause2Changing === true){
          bindings.pause2 = event.code;
        }
        if(bindings.fullscreen2Changing === true){
          bindings.fullscreen2 = event.code;
        }
        if(bindings.jump1Changing === true || bindings.jump2Changing === true || bindings.crouch1Changing === true || bindings.crouch2Changing === true || bindings.leaderboard1Changing === true || bindings.leaderboard2Changing === true || bindings.mute1Changing === true || bindings.mute2Changing === true || bindings.pause1Changing === true || bindings.pause2Changing === true || bindings.fullscreen1Changing === true || bindings.fullscreen2Changing === true){
          bindings.jump1Changing = false;
          bindings.jump2Changing = false;
          bindings.crouch1Changing = false;
          bindings.crouch2Changing = false;
          bindings.leaderboard1Changing = false;
          bindings.leaderboard2Changing = false;
          bindings.mute1Changing = false;
          bindings.mute2Changing = false;
          bindings.pause1Changing = false;
          bindings.pause2Changing = false;
          bindings.fullscreen1Changing = false;
          bindings.fullscreen2Changing = false;
          bindings.jump1ChangingColor = "white";
          bindings.jump2ChangingColor = "white";
          bindings.crouch1ChangingColor = "white";
          bindings.crouch2ChangingColor = "white";
          bindings.leaderboard1ChangingColor = "white";
          bindings.leaderboard2ChangingColor = "white";
          bindings.mute1ChangingColor = "white";
          bindings.mute2ChangingColor = "white";
          bindings.pause1ChangingColor = "white";
          bindings.pause2ChangingColor = "white";
          bindings.fullscreen1ChangingColor = "white";
          bindings.fullscreen2ChangingColor = "white";
        }
          document.cookie = `bindings=${JSON.stringify(bindings)};Expires=Sun, 22 Oct 2030 08:00:00 UTC;`;
      });



        if(mouse.x > 500 && mouse.x < 500+(1365/3*2)/2-40 && mouse.y > lineSpace * 7 && mouse.y < lineSpace * 10){
          if(bindings.jump1Changing === false){
            bindings.jump1ChangingColor = "#A2A2A2";
          }
          if(mouse.click === true){
            bindings.jump1Changing = true;
            bindings.jump2Changing = false;
            bindings.crouch1Changing = false;
            bindings.crouch2Changing = false;
            bindings.leaderboard1Changing = false;
            bindings.leaderboard2Changing = false;
            bindings.mute1Changing = false;
            bindings.mute2Changing = false;
            bindings.pause1Changing = false;
            bindings.pause2Changing = false;
            bindings.fullscreen1Changing = false;
            bindings.fullscreen2Changing = false;         
          }
        }else{
          if(bindings.jump1Changing === false){
            bindings.jump1ChangingColor = "white"
          }
        }
        if(mouse.x > 500 && mouse.x < 500+(1365/3*2)/2-40 && mouse.y > lineSpace * 10 && mouse.y < lineSpace * 13){
          if(bindings.crouch1Changing === false){
            bindings.crouch1ChangingColor = "#A2A2A2";
          }
          if(mouse.click === true){
            bindings.jump1Changing = false;
            bindings.jump2Changing = false;
            bindings.crouch1Changing = true;
            bindings.crouch2Changing = false;
            bindings.leaderboard1Changing = false;
            bindings.leaderboard2Changing = false;
            bindings.mute1Changing = false;
            bindings.mute2Changing = false;
            bindings.pause1Changing = false;
            bindings.pause2Changing = false;
            bindings.fullscreen1Changing = false;
            bindings.fullscreen2Changing = false;         
          }
        }else{
          if(bindings.crouch1Changing === false){
            bindings.crouch1ChangingColor = "white"
          }
        }
        if(mouse.x > 500 && mouse.x < 500+(1365/3*2)/2-40 && mouse.y > lineSpace * 13 && mouse.y < lineSpace * 16){
          if(bindings.leaderboard1Changing === false){
            bindings.leaderboard1ChangingColor = "#A2A2A2";
          }
          if(mouse.click === true){
            bindings.jump1Changing = false;
            bindings.jump2Changing = false;
            bindings.crouch1Changing = false;
            bindings.crouch2Changing = false;
            bindings.leaderboard1Changing = true;
            bindings.leaderboard2Changing = false;
            bindings.mute1Changing = false;
            bindings.mute2Changing = false;
            bindings.pause1Changing = false;
            bindings.pause2Changing = false;
            bindings.fullscreen1Changing = false;
            bindings.fullscreen2Changing = false;         
          }
        }else{
          if(bindings.leaderboard1Changing === false){
            bindings.leaderboard1ChangingColor = "white"
          }
        }
        if(mouse.x > 500 && mouse.x < 500+(1365/3*2)/2-40 && mouse.y > lineSpace * 16 && mouse.y < lineSpace * 19){
          if(bindings.mute1Changing === false){
            bindings.mute1ChangingColor = "#A2A2A2";
          }
          if(mouse.click === true){
            bindings.jump1Changing = false;
            bindings.jump2Changing = false;
            bindings.crouch1Changing = false;
            bindings.crouch2Changing = false;
            bindings.leaderboard1Changing = false;
            bindings.leaderboard2Changing = false;
            bindings.mute1Changing = true;
            bindings.mute2Changing = false;
            bindings.pause1Changing = false;
            bindings.pause2Changing = false;
            bindings.fullscreen1Changing = false;
            bindings.fullscreen2Changing = false;         
          }
        }else{
          if(bindings.mute1Changing === false){
            bindings.mute1ChangingColor = "white"
          }
        }
        if(mouse.x > 500 && mouse.x < 500+(1365/3*2)/2-40 && mouse.y > lineSpace * 19 && mouse.y < lineSpace * 22){
          if(bindings.pause1Changing === false){
            bindings.pause1ChangingColor = "#A2A2A2";
          }
          if(mouse.click === true){
            bindings.jump1Changing = false;
            bindings.jump2Changing = false;
            bindings.crouch1Changing = false;
            bindings.crouch2Changing = false;
            bindings.leaderboard1Changing = false;
            bindings.leaderboard2Changing = false;
            bindings.mute1Changing = false;
            bindings.mute2Changing = false;
            bindings.pause1Changing = true;
            bindings.pause2Changing = false;
            bindings.fullscreen1Changing = false;
            bindings.fullscreen2Changing = false;         
          }
        }else{
          if(bindings.pause1Changing === false){
            bindings.pause1ChangingColor = "white"
          }
        }
        if(mouse.x > 500 && mouse.x < 500+(1365/3*2)/2-40 && mouse.y > lineSpace * 22 && mouse.y < lineSpace * 25){
          if(bindings.fullscreen1Changing === false){
            bindings.fullscreen1ChangingColor = "#A2A2A2";
          }
          if(mouse.click === true){
            bindings.jump1Changing = false;
            bindings.jump2Changing = false;
            bindings.crouch1Changing = false;
            bindings.crouch2Changing = false;
            bindings.leaderboard1Changing = false;
            bindings.leaderboard2Changing = false;
            bindings.mute1Changing = false;
            bindings.mute2Changing = false;
            bindings.pause1Changing = false;
            bindings.pause2Changing = false;
            bindings.fullscreen1Changing = true;
            bindings.fullscreen2Changing = false;         
          }
        }else{
          if(bindings.fullscreen1Changing === false){
            bindings.fullscreen1ChangingColor = "white"
          }
        }
        if(mouse.x > 500+(1365/3*2)/2-40 && mouse.x < 500+((1365/3*2)/2-40)+((1365/3*2)/2-40) && mouse.y > lineSpace * 7 && mouse.y < lineSpace * 10){
          if(bindings.jump2Changing === false){
            bindings.jump2ChangingColor = "#A2A2A2";
          }
          if(mouse.click === true){
            bindings.jump1Changing = false;
            bindings.jump2Changing = true;
            bindings.crouch1Changing = false;
            bindings.crouch2Changing = false;
            bindings.leaderboard1Changing = false;
            bindings.leaderboard2Changing = false;
            bindings.mute1Changing = false;
            bindings.mute2Changing = false;
            bindings.pause1Changing = false;
            bindings.pause2Changing = false;
            bindings.fullscreen1Changing = false;
            bindings.fullscreen2Changing = false;         
          }
        }else{
          if(bindings.jump2Changing === false){
            bindings.jump2ChangingColor = "white"
          }
        }
        if(mouse.x > 500+(1365/3*2)/2-40 && mouse.x < 500+(1365/3*2)/2-40+(1365/3*2)/2-40 && mouse.y > lineSpace * 10 && mouse.y < lineSpace * 13){
          if(bindings.crouch2Changing === false){
            bindings.crouch2ChangingColor = "#A2A2A2";
          }
          if(mouse.click === true){
            bindings.jump1Changing = false;
            bindings.jump2Changing = false;
            bindings.crouch1Changing = false;
            bindings.crouch2Changing = true;
            bindings.leaderboard1Changing = false;
            bindings.leaderboard2Changing = false;
            bindings.mute1Changing = false;
            bindings.mute2Changing = false;
            bindings.pause1Changing = false;
            bindings.pause2Changing = false;
            bindings.fullscreen1Changing = false;
            bindings.fullscreen2Changing = false;         
          }
        }else{
          if(bindings.crouch2Changing === false){
            bindings.crouch2ChangingColor = "white"
          }
        }
        if(mouse.x > 500+((1365/3*2)/2-40) && mouse.x < 500+((1365/3*2)/2-40)+((1365/3*2)/2-40) && mouse.y > lineSpace * 13 && mouse.y < lineSpace * 16){
          if(bindings.leaderboard2Changing === false){
            bindings.leaderboard2ChangingColor = "#A2A2A2";
          }
          if(mouse.click === true){
            bindings.jump1Changing = false;
            bindings.jump2Changing = false;
            bindings.crouch1Changing = false;
            bindings.crouch2Changing = false;
            bindings.leaderboard1Changing = false;
            bindings.leaderboard2Changing = true;
            bindings.mute1Changing = false;
            bindings.mute2Changing = false;
            bindings.pause1Changing = false;
            bindings.pause2Changing = false;
            bindings.fullscreen1Changing = false;
            bindings.fullscreen2Changing = false;         
          }
        }else{
          if(bindings.leaderboard2Changing === false){
            bindings.leaderboard2ChangingColor = "white"
          }
        }
        if(mouse.x > 500+(1365/3*2)/2-40 && mouse.x < 500+(1365/3*2)/2-40+(1365/3*2)/2-40 && mouse.y > lineSpace * 16 && mouse.y < lineSpace * 19){
          if(bindings.mute2Changing === false){
            bindings.mute2ChangingColor = "#A2A2A2";
          }
          if(mouse.click === true){
            bindings.jump1Changing = false;
            bindings.jump2Changing = false;
            bindings.crouch1Changing = false;
            bindings.crouch2Changing = false;
            bindings.leaderboard1Changing = false;
            bindings.leaderboard2Changing = false;
            bindings.mute1Changing = false;
            bindings.mute2Changing = true;
            bindings.pause1Changing = false;
            bindings.pause2Changing = false;
            bindings.fullscreen1Changing = false;
            bindings.fullscreen2Changing = false;         
          }
        }else{
          if(bindings.mute2Changing === false){
            bindings.mute2ChangingColor = "white"
          }
        }
        if(mouse.x > 500+(1365/3*2)/2-40 && mouse.x < 500+(1365/3*2)/2-40+(1365/3*2)/2-40 && mouse.y > lineSpace * 19 && mouse.y < lineSpace * 22){
          if(bindings.pause2Changing === false){
            bindings.pause2ChangingColor = "#A2A2A2";
          }
          if(mouse.click === true){
            bindings.jump1Changing = false;
            bindings.jump2Changing = false;
            bindings.crouch1Changing = false;
            bindings.crouch2Changing = false;
            bindings.leaderboard1Changing = false;
            bindings.leaderboard2Changing = false;
            bindings.mute1Changing = false;
            bindings.mute2Changing = false;
            bindings.pause1Changing = false;
            bindings.pause2Changing = true;
            bindings.fullscreen1Changing = false;
            bindings.fullscreen2Changing = false;         
          }
        }else{
          if(bindings.pause2Changing === false){
            bindings.pause2ChangingColor = "white"
          }
        }
        if(mouse.x > 500+(1365/3*2)/2-40 && mouse.x < 500+(1365/3*2)/2-40+(1365/3*2)/2-40 && mouse.y > lineSpace * 22 && mouse.y < lineSpace * 25){
          if(bindings.fullscreen2Changing === false){
            bindings.fullscreen2ChangingColor = "#A2A2A2";
          }
          if(mouse.click === true){
            bindings.jump1Changing = false;
            bindings.jump2Changing = false;
            bindings.crouch1Changing = false;
            bindings.crouch2Changing = false;
            bindings.leaderboard1Changing = false;
            bindings.leaderboard2Changing = false;
            bindings.mute1Changing = false;
            bindings.mute2Changing = false;
            bindings.pause1Changing = false;
            bindings.pause2Changing = false;
            bindings.fullscreen1Changing = false;
            bindings.fullscreen2Changing = true;         
          }
        }else{
          if(bindings.fullscreen2Changing === false){
            bindings.fullscreen2ChangingColor = "white"
          }
        }
      if(mouse.x > 500 && mouse.x < 500+1365/3*2-80+(1365/3*2)/2-40 && mouse.y > lineSpace*7 && mouse.y < lineSpace*25){

      }else{
        if(mouse.click === true){
          bindings.jump1Changing = false;
          bindings.jump2Changing = false;
          bindings.crouch1Changing = false;
          bindings.crouch2Changing = false;
          bindings.leaderboard1Changing = false;
          bindings.leaderboard2Changing = false;
          bindings.mute1Changing = false;
          bindings.mute2Changing = false;
          bindings.pause1Changing = false;
          bindings.pause2Changing = false;
          bindings.fullscreen1Changing = false;
          bindings.fullscreen2Changing = false;
          bindings.jump1ChangingColor = "white";
          bindings.jump2ChangingColor = "white";
          bindings.crouch1ChangingColor = "white";
          bindings.crouch2ChangingColor = "white";
          bindings.leaderboard1ChangingColor = "white";
          bindings.leaderboard2ChangingColor = "white";
          bindings.mute1ChangingColor = "white";
          bindings.mute2ChangingColor = "white";
          bindings.pause1ChangingColor = "white";
          bindings.pause2ChangingColor = "white";
          bindings.fullscreen1ChangingColor = "white";
          bindings.fullscreen2ChangingColor = "white";
        }
      }

      if(mouse.x > 20 && mouse.x < (20+400) && mouse.y > 20 && mouse.y < (20+100)){
        menu.bindingColor = "#A2A2A2";
        if(mouse.click === true){
          setTimeout(function(){
            menu.bindingVisual = false;
            menumusic.pause();
            menumusic.currentTime = 0;
          }, 50)
        }
      }else{
        menu.bindingColor = "white"
      }
    }
  };
setTimeout(function(){
  getSession(getCookie("session"));
}, 1000)

  function jump() {
    dino.jumping = true;
    dino.animationState = 3;
    jumpSound.play();
  }
  function up() {
    dino.y -= dino.jumpheight;
    dino.jumpheight -= dino.gravitation;
    if (dino.fastFall === true) {
      dino.jumpheight -= dino.gravitation;
    }
  }
  function animation1() {
    if (dino.died === false && dino.stand === false) {
      if (dino.animationState === 2) {
        dino.animationState = 1;
      }
      if (dino.animationState === 5) {
        dino.animationState = 4;
      }
    }
    setTimeout(animation2, 110);
  }
  function animation2() {
    if (dino.died === false && dino.stand === false) {
      if (dino.animationState === 1) {
        dino.animationState = 2;
      }
      if (dino.animationState === 4) {
        dino.animationState = 5;
      }
    }
    setTimeout(animation1, 110);
  }
  function animation3() {
    if (bird1.animationState === 2 && dino.died === false) {
      bird1.animationState = 1;
    }
    setTimeout(animation4, 400);
  }
  function animation4() {
    if (bird1.animationState === 1 && dino.died === false) {
      bird1.animationState = 2;
    }
    setTimeout(animation3, 400);
  }
  function crouch() {
    dino.crouch = true;
    if (dino.animationState === 1 || dino.animationState === 2 && dino.inAir === false) {
      dino.animationState = 4;
    }
  }
  function crouchEnd() {
    dino.crouch = false;
    dino.animationState = 1;
  }
  function exitDeath() {
    menu.paused = true;
    dino = {
      x: 100,
      y: standardHeight,
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
      doOnce: false,
      fastFall: false,
      start: true,
      timer: "",
      lives: 0,
      hitOnce: false,
      startedrunning: false
    };
    if(menu.equipedLife === 2){
      heartImg.src = "/Images/Hearts/Heart.png"
      heart2Img.src = "/Images/Hearts/Heart.png"
      menu.equipedLife = 2;
      dino.lives = 2;
    }
    if(menu.equipedLife === 1){
      heartImg.src = "/Images/Hearts/Heart.png"
      menu.equipedLife = 1;
      dino.lives = 1;
    }
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
      y: (standardHeight + 100) - Math.random() * 300,
      animationState: 1,
      image: undefined
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
    for (var i = 0; i < ca.length; i++) {
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

  function togglePuttingUsername() {
    user.puttingInPassword = false;
    user.passwordColor = "white";
    if (user.puttingInUsername == false) {
      user.puttingInUsername = true;
      user.usernameColor = "#A2A2A2";
      return;
    };
    if (user.puttingInUsername == true) {
      user.puttingInUsername = false;
      user.usernameColor = "white";
      return;
    };
  }
  function togglePuttingPassword() {
    user.puttingInUsername = false;
    user.usernameColor = "white";
    if (user.puttingInPassword == false) {
      user.puttingInPassword = true;
      user.passwordColor = "#A2A2A2";
      return;
    };
    if (user.puttingInPassword == true) {
      user.puttingInPassword = false;
      user.passwordColor = "white";
      return;
    };
  }
  function getScore() {
    const http = new XMLHttpRequest();
    const url = `https://l2niipto9l.execute-api.eu-north-1.amazonaws.com/test/helloworld`;
    http.open("GET", url);
    http.send();

    http.onreadystatechange = (e) => {
      userArray = JSON.parse(http.responseText)
      for (let i = 0; i < userArray.length; i++) {
        user.encryptedPassword = CryptoJS.MD5(user.passwordInput).toString();
        if (user.encryptedPassword === userArray[i].password && userArray[i].name === user.usernameInput){
          user.loggedIn = true;
          menumusic2.pause();
          menumusic2.currentTime = 0;
          user.username = userArray[i].name;
          user.password = userArray[i].password;
          user.mail = userArray[i].mail;
          user.highscore = userArray[i].score;
          coin.value = userArray[i].coins;
          hat.buyvalue = userArray[i].hats;
          if(user.rememberMe === true){
            console.log("hej")
            var session = CryptoJS.MD5(Math.random()*1000000+user.username);
            sendSession(user.username, session);
            document.cookie = `session=${session};Expires=Sun, 22 Oct 2030 08:00:00 UTC;`;
          }
          try {
            if(userArray[i].scoreArray !== 0){
            scores = userArray[i].scoreArray.split(',').map(function(item) {
            return parseInt(item, 10);
            let sum = scores.reduce((previous, current) => current += previous);
            average = sum / scores.length;
          
            
            });
            }else{
              scores = [0];
            }
          }
          catch (e) {
            continue;
          }

          
          scores = scores.filter(function(val) {
            return val !== 0;
          });
          let sum = scores.reduce((previous, current) => current += previous);
          average = sum / scores.length;


        }else{
          user.wrongText = "Wrong username or password";
          }
        }
      return userArray;
      };
    };
  

  function showLeaderboard() {
    if (leaderboardShow == true) {
      leaderboardShow = false;
      return;
    };
    if (leaderboardShow == false) {
      leaderboardShow = true;
      getScore();
      return;
    };
  };

  function sendScore(username, score, password, mail, coins, hats, scores) {
    const http = new XMLHttpRequest();
    const url = `https://l2niipto9l.execute-api.eu-north-1.amazonaws.com/test/update?username=${username}&score=${score}&password=${password}&mail=${mail}&coins=${coins}&hats=${hats}&scoreArray=${scores}`;
    http.open("GET", url);
    http.send();
  };
  
  function sendSession(username, session){
    const http = new XMLHttpRequest();
    const url = `https://l2niipto9l.execute-api.eu-north-1.amazonaws.com/test/sendsession?username=${username}&session=${session.toString()}`;
    http.open("GET", url);
    http.send();
  }
  function getSession(session){
    
    const http = new XMLHttpRequest();
    const url = `https://l2niipto9l.execute-api.eu-north-1.amazonaws.com/test/getsession`;
    if(session !== -1){
      http.open("GET", url);
      http.send();
    }

    http.onreadystatechange = (e) => {
      let sessions = JSON.parse(http.responseText);

      for(let i = 0; i < sessions.length; i++){
        if(sessions[i].session === session){
          console.log("inloggad")
          getScore();
          setTimeout(function(){
            for(let l = 0; l < userArray.length; l++){
              console.log("hej")
              if(sessions[i].name === userArray[l].name){
                user.username = userArray[l].name;
                user.password = userArray[l].password;
                user.mail = userArray[l].mail;
                user.highscore = userArray[l].score;
                coin.value = userArray[l].coins;
                hat.buyvalue = userArray[l].hats;
                scores = userArray[l].scoreArray.split(',').map(function(item) {
                return parseInt(item, 10);
                let sum = scores.reduce((previous, current) => current += previous);
                average = sum / scores.length;
                });                
                user.loggedIn = true;
                menumusic2.pause();
                menumusic2.currentTime = 0;
              }
            }        
          },1000);
        }
      }
    }
  }


  function teleport() {
    if (dino.stand === false && dino.died === false && user.loggedIn === true && dino.timer === ""){
      var chosen = Math.floor(Math.random() * 6);

      if (cactus1.x < -200 && chosen === 1) {
        cactus1.x = 2000;
      }
      else if (cactus2.x < -200 && chosen === 2) {
        cactus2.x = 2000;
      }
      else if (cactus3.x < -200 && chosen === 3) {
        cactus3.x = 2000;
      }
      else if (cactus4.x < -200 && chosen === 4) {
        cactus4.x = 2000;
      }
      else if (bird1.x < -200 && chosen === 5 || bird1.x < -200 && chosen === 6) {
        bird1.x = 2000;
        bird1.y = (standardHeight + 100) - Math.random() * 300;
      }
      else {
        chosen = Math.floor(Math.random() * 6);
      }
    }
  }




getScore();


function getVersion(){
  const http = new XMLHttpRequest();
  const url = `https://l2niipto9l.execute-api.eu-north-1.amazonaws.com/test/updateneeded`;
  http.open("GET", url);
  http.send();

    http.onreadystatechange = (e) => {
      var newestVersion = JSON.parse(http.responseText)
      if(version !== newestVersion){
        oldVersion = true;
      }
    }
}
function mute() {
  if(muted === false){
    muted = true;
    deathMusic.volume = 0;
    jumpSound.volume = 0;
    runningMusic.volume = 0;
    coinSound.volume = 0;
    death.volume = 0;
    menumusic.volume = 0;
    menumusic2.volume = 0;
    beep1.volume = 0;
    beep2.volume = 0;
    return;
  }
  if(muted === true){
    muted = false;
    deathMusic.volume = 0.5;
    jumpSound.volume = 1;
    runningMusic.volume = 1;
    coinSound.volume = 1;
    death.volume = 1;
    menumusic.volume = 1;
    menumusic2.volume = 1;
    beep1.volume = 1;
    beep2.volume = 1;
    return;
  }
}

function comparescore(a, b) {

    let scoreA = a.score;
    let scoreB = b.score;
    
    return scoreB - scoreA;
}
function compareAverage(a, b) {

    let scoreA = a.average;
    let scoreB = b.average;
    
    return scoreB - scoreA;
}
})();

c.textAlign = "right";
c.font = "bold 30px IMPACT,Sans-serif";
c.fillText("x:"+mouse.x, mouse.x, mouse.y);
c.fillText("y:"+mouse.y, mouse.x, mouse.y+20);
