/* Title: Monkey Tower Defense
based off of "Bloons TD"
Made by: Aidan Huang
Started: 2020-10-29
Finished: 2020-11-06
References: https://p5js.org/reference/#/p5/text, https://docs.google.com/document/d/1dJ7aXB58eWpWk-_YtY0IwhiVuEYfe_cqJjDCpiMmOKs/edit,
https://docs.google.com/document/d/1W3RKqRC46yJk7e2N4jCQMuVZIX4TT6qYQPI7ag3cf3Q/edit,
https://p5js.org/reference/#/p5/mouseClicked,
https://p5js.org/reference/#/p5/bezier
*/

//Global variable initalization
let state;
let xPosition;
let yPosition;
let size;
let mouthsize;
let mouthspeed;
let balloonxpos;
let balloonypos;
let balloonspeed;
let balloonspopped;
let collided;
let column;
let gameround;
let distanceBetween;
let collisionDistance;

//Game setup
function setup() {
  frameRate(75);
  ellipseMode(CENTER);
  rectMode(CENTER);
  createCanvas(800, 800);
  xPosition = 400;
  yPosition = 400;
  size = 35;
  mouthsize = 5;
  mouthspeed = 0.5;
  state = 0;
  balloonspeed = 1;
  balloonxpos = 220;
  balloonypos = -200;
  collided = false;
  balloonspopped = 0;
  background(220);
  mainmenu();
  column = 0;
  gameround = 1;
 
  
}

function draw() {


/* ------------------------------ Game States Control ----------------------------*/
  
/*
State 0 = main menu
State 1 = The game starts
State 2 = How to play
State 3 = You won
State 4 = You lost
*/
  
  if (state == 1) {
    game();
    balloonypos = balloonypos + balloonspeed; //changes speed of the balloons
    if (balloonypos > 800) { // if the balloon reaches the end
      state = 4;
    }
  }
  
  else if (state == 2) {
    howtoplay();
    if (mouseX>50 && mouseX<150 && mouseY>130 && mouseY<170) {
      state = 0;
    }
  }
  
  else if (state == 3) {
    youwon(); 
    balloonypos = -200;
    balloonspeed = 1;
    balloonspopped = 0;
    gameround = 1;
  }
  
  else if (state == 4) {
    youlost(); 
    if (mouseX>326 && mouseX<474 && mouseY>565 && mouseY<614) {
      state = 0;
    }
    balloonypos = -200;
    balloonspeed = 1;
    balloonspopped = 0;
    gameround = 1;
  }


/* -------------------------------------------------------------------------*/
  
    
   //changes size of the mouth
  mouthsize = mouthsize + mouthspeed;
  if (mouthsize > 15) {
    mouthspeed = -0.4;
  } 
  else if (mouthsize < 7) {
    mouthspeed = 0.4;
  }
  
  //Detects if cursor is on balloon
  collisionDetector(50,50,10,mouseX,mouseY,10);
}

//Upon when the mouse is clicked
function mouseClicked() {

  if (state == 0) {
    mainmenu();
    if (mouseX>320 && mouseX<480 && mouseY>370 && mouseY<430) {
      state = 1; // The game starts
    }
    else if (mouseX>250 && mouseX<550 && mouseY>470 && mouseY<530) {
      state = 2; // how to play
      
    }
  }

//check to see if the crosshair is on the balloon, when clicked, the balloon resets and speed goes faster
    if (collided === true) {
      balloonspopped++;
      balloonypos = -100;
      balloonspeed = balloonspeed + 0.3;
      
      
//randomizes which path the balloon goes
  column = random(0, 2);
  if (column < 1) {
    balloonxpos = 220;
  } else if (column >= 1) {
    balloonxpos = 530;
  
    }
  }
  
  // Game rounds, new round after 10 balloons popped
  if (balloonspopped == 10) {
    gameround = 2;
  }
  else if (balloonspopped == 20) {
    gameround = 3;
  }
  else if (balloonspopped == 30) {
    state = 3;
  }
  
}

/* ------------------------------ Game States ----------------------------*/

/*
State 0 = main menu
State 1 = The game starts
State 2 = How to play
State 3 = You won
State 4 = You lost
*/

//state 0
function mainmenu() {
  cursor();
  clear();
  fill(252, 247, 207);
  stroke(0);
  rect(400,400,800,800);
  textSize(60);
  fill(255, 230, 0);
  text('Monkey Tower Defense', 100, 300);
  
  textSize(50);
  fill(150)
  noStroke();
  rect(400,400, 150, 60);
  fill(70);
  text('Start',350,420);
  
  fill(150)
  noStroke();
  rect(400,500, 300, 60);
  fill(70);
  text('How to play',270,515);
 
}

//state 1
function game() {
  noCursor();
  clear();
  fill(109, 181, 54);
  stroke(0);
  rectMode(CENTER);
  rect(400,400,800,800);
  fill(214, 214, 214);
  rect(220,400, 150,800);
  rect(530,400, 150,800);
  balloons(balloonxpos, balloonypos);
  drawCharacter(375, 400, 40);
  reticle(mouseX, mouseY);
  fill(0);
  textSize(20);
  text('Round '+gameround, 20, 30);
  text('Balloons popped: '+ balloonspopped, 60, 100, 80, 80);
  flower(680,100);
  flower(730,640);
  flower(80,500);
  water();
}

//state 2
function howtoplay() {
  cursor();
  clear();
  fill(252, 247, 207);
  stroke(0);
  rect(400,400,800,800);
  fill(0);
  textSize(50);
  fill(0);
  text('How to play the game', 150, 300);
  textSize(25);
  let s = 'Your objective is to eliminate all balloons.';
  fill(50);
  text(s, 460, 600, 600, 500); 
  let s1 = 'Use your cursor to aim at the balloon targets and click mouse1 to fire. Balloon speeds increase after each balloon you pop. Win the game by reaching 30 popped balloons, lose the game if a balloon enters the endzone.';
  text(s1, 400, 670, 600, 500); 
  
  //backbutton
  fill(255);
  stroke(0);
  rect(100, 150, 100, 40);
  fill(0);
  text('<-- Back',50, 160);
  
}

//state 3
function youwon() {
  cursor();
  clear();
  fill(232, 232, 49);
  stroke(0);
  rect(400,400,800,800);
  textSize(70);
  fill(0);
  text('You won!', 265, 350);
  
}

//state 4
function youlost() {
  cursor();
  clear();
  fill(0);
  rect(400,400,800,800);
  stroke(255);
  fill(186, 11, 17);
  textSize(70);
  text('You lost.', 275, 350);
  fill(0);
  stroke(255);
  rect(400,590,150,50);
  fill(255);
  textSize(30);
  text('Play again',330,600);
  
  
}


/* ------------------------ Functions -------------------*/

//balloons
function balloons(balloonxpos, balloonypos) {
  fill(222, 18, 18);
  ellipse(balloonxpos,balloonypos,40,55);
  fill(112, 112, 112);
  noStroke();
  ellipse(balloonxpos,balloonypos+70,50,30);
  stroke(0);
  noFill();
  bezier(balloonxpos, balloonypos+30, balloonxpos-15, balloonypos+50, balloonxpos+20, balloonypos+50, balloonxpos, balloonypos+70);
}

//aim reticle
function reticle(mouseX, mouseY) {
  stroke(0);
  strokeWeight(2);
  line(mouseX, mouseY-10, mouseX, mouseY-30); // top reticle
  line(mouseX-30, mouseY, mouseX-10, mouseY); // left reticle
  line(mouseX, mouseY+10, mouseX, mouseY+30); // bottom reticle
  line(mouseX+30, mouseY, mouseX+10, mouseY); // right reticle
}



function collisionDetector(x0,y0,radius0,x1,y1,radius1) {

   //Calculate the distance
   distanceBetween = sq((y1-balloonypos)) + sq((x1-balloonxpos));
   collisionDistance = sq(radius0+radius1);
  
   //if colliding and mouse clicked, reset balloon, otherwise not collided
   if ( collisionDistance >= distanceBetween ) {
     collided = true;
   }
   else {
     collided = false;
   }
 
}

//creates flowers
function flower(xpos, ypos) {
  strokeWeight(4);
  stroke(56, 166, 89);
  fill(56, 166, 89);
  line(xpos,ypos-10,xpos,ypos+40);
  ellipseMode(CORNERS);
  stroke(222, 31, 88);
  fill(222, 31, 88);
  ellipse(xpos-5,ypos-50,xpos+5,ypos-30);
  ellipse(xpos-22,ypos-25,xpos-5,ypos-35);
  ellipse(xpos-5,ypos-25,xpos+5,ypos-8);
  ellipse(xpos+3,ypos-25,xpos+22,ypos-35);
  ellipseMode(CENTER);
  stroke(247, 250, 57);
  fill(247, 250, 57);
  ellipse(xpos, ypos-30,15,15);
  strokeWeight(2);
}

//water
function water() {
  fill(34, 188, 240);
  stroke(0);
  ellipse(930,350,500,500);
}


//creates the monkey
function drawCharacter(xPosition, yPosition, size) {
  
  //monkey ears
  let earsX1 = xPosition - size;
  let earsY1 = yPosition - size*1.5;
  let earsX2 = xPosition + size; 
  let earsY2 = yPosition - size*1.5; 

  
  //outer ears (darker color)
  stroke(205,133,63);
  fill(205,133,63);
  ellipse(earsX1,earsY1,size/2,size/2);
  ellipse(earsX2,earsY2,size/2,size/2);
  //inner ears (lighter color)
  stroke(255,235,205);
  fill(255,235,205);
  ellipse(earsX1,earsY1,size/2.5,size/2.5); 
  ellipse(earsX2,earsY2,size/2.5,size/2.5); 
  
  
  
  //monkey head outer (darker color)
  let headX1 = xPosition;
  let headY1 = yPosition - size*1.5;
  stroke(205,133,63);
  fill(205,133,63);
  ellipse(headX1,headY1,size*2,size*2);
  //monkey head inner (lighter color)
  stroke(255,235,205);
  fill(255,235,205);
  ellipse(headX1,headY1,size*1.65,size*1.65);
  
  
  
  //monkey body outer (darker color)
  let bodyX1 = xPosition;
  let bodyY1 = yPosition + size*0.5;
  let bodyY2 = yPosition + size*0.3;
  stroke(205,133,63);
  fill(205,133,63);
  ellipse(bodyX1,bodyY1,size*2,size*2.5); 
  //monkeybody inner (lighter color)
  stroke(255,235,205);
  fill(255,235,205);
  ellipse(bodyX1,bodyY2,size*1.70,size*2); 
  
  
  
  //monkey arms
  let armsX1 = xPosition - size;
  let armsX2 = xPosition + size;
  let armsY1 = yPosition;
  stroke(205,133,63);
  fill(205,133,63);
  ellipse(armsX1,armsY1,size,size/2); //right arm
  ellipse(armsX2,armsY1,size,size/2); 
  
  
  
  //monkey face
  let faceX1 = xPosition - size*0.4;
  let faceX2 = xPosition + size*0.4;
  let faceX3 = xPosition + size*0.2;
  let faceY1 = yPosition - size*1.6;
  let faceY2 = yPosition - size*1.1;
  stroke(255,255,255);
  fill(255,255,255);
  ellipse(faceX1,faceY1,size/2.5,size/2);
  ellipse(faceX2,faceY1,size/2.5,size/2);
  stroke(255,255,255);
  fill(0);
  ellipse(faceX1,faceY1,size/4,size/4); 
  ellipse(faceX2,faceY1,size/4,size/4); 
   //mouth
  ellipse(faceX3,faceY2,mouthsize,mouthsize); //size is 30 at default
  
  
  
  //monkey legs
  let legsX1 = xPosition - size*0.5;
  let legsX2 = xPosition + size*0.5;
  let legsY1 = yPosition + size*1.6;
  stroke(205,133,63);
  fill(205,133,63);
  ellipse(legsX1,legsY1,size,size/2);
  ellipse(legsX2,legsY1,size,size/2); 
  
  
  
  //monkey tail
  noFill();//only draws the line
  strokeWeight(size*0.08);
  let x1 = xPosition+size*1.6, x2 = xPosition+size*0.9, x3 = xPosition+size*1.7, x4 = xPosition+size*0.65; 
  let y1 = yPosition+size*0.5, y2 = yPosition+size*0.3, y3 = yPosition+size*1.4, y4 = yPosition+size*1.3;
  bezier(x1, y1, x2, y2, x3, y3, x4, y4); //gets coordinates of anchor and control points and outputs a line
}
