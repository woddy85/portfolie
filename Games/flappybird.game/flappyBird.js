var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

//load image//
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipenorth = new Image();
var pipesouth = new Image();

//source (path)//
bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipenorth.src = "images/pipenorth.png";
pipesouth.src = "images/pipesouth.png";

//audio src//
var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

//more variable//
var gap = 85; //this is the gap between north pipe and south pipe//
var constant = pipenorth.height + gap; //the constan is the south pipe position, and calkulating bothsouth and north//

var bX = 10; //the bird positions//
var bY = 150;

var gravity = 1.5; //bird fall pixel//
var score = 0; //we initiate the player's score//
var highscore = "highscore";
var highscore = 0;

//eventlistener for bird movement//
document.addEventListener("keypress", moveUp);

function moveUp() {
  bY -= 35;
  fly.play();
}

var pipe = [];
pipe[0] = {
  x: cvs.width,
  y: 0
};

function draw() {
  ctx.drawImage(bg, 0, 0); //background//

  for (var i = 0; i < pipe.length; i++) {
    ctx.drawImage(pipenorth, pipe[i].x, pipe[i].y); // draw pipe north//
    ctx.drawImage(pipesouth, pipe[i].x, pipe[i].y + constant);

    pipe[i].x--;

    if (pipe[i].x == 125) {
      //pipe distnce widht and
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * pipenorth.height) - pipenorth.height
      });
    }
    //detect colision
    if (
      (bX + bird.width >= pipe[i].x &&
        bX <= pipe[i].x + pipenorth.width &&
        (bY <= pipe[i].y + pipenorth.height ||
          bY + bird.height >= pipe[i].y + constant)) ||
      bY + bird.height >= cvs.height - fg.height
    ) {
      location.reload();
    }

    if (pipe[i].x == 5) {
      score++;
      scor.play();
    }

    if (pipe[i].x == 5) {
      highscore++; //her
      scor.play();
    }
  }

  //constant is north pipe hight and the gap between  pipes or our bird would fly through.
  constant = pipenorth.height + gap;
  ctx.drawImage(fg, 0, cvs.height - fg.height);
  ctx.drawImage(bird, bX, bY); //bird character
  bY += gravity; // continuesly  fall?
  ctx.fillStyle = "#000";
  ctx.font = "20px verdana";
  ctx.fillText("Score : " + score, 10, cvs.height - 80);
  ctx.fillText("Highscore : " + highscore, 10, cvs.height - 20);
  requestAnimationFrame(draw);
}
draw();
