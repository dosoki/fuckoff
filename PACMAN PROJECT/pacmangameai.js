var player = {
    x: 20,
    y: 300,
    yspeed: 0,
    xspeed: 0,
    movementSpeed: 0,
    score: 0
}

var AI = {
    x: 530,
    y: 300,
    xspeed: 0,
    yspeed: 0,
    movementSpeed: 0,
    movingRight: false,
    movingLeft: false,
    movingUp: false,
    movingDown: false
}

var food = {
    a0: 20, a1: 20, a2: 20, a3: 20, a4: 20, a5: 20, a6: 20, a7: 20, 
    a8: 20, a9: 20, a10: 20, a11: 20, a12: 20, a13: 20, a14: 20, a15: 20,
    a16: 20, a17: 20, a18: 20, a19: 20, a20: 20, a21: 20, a22: 20, a23: 20, 
    a24: 20, a25: 20, a26: 20, a27: 20, a28: 20, a29: 20, a30: 20, a31: 20, 
    a32: 20, a33: 20, a34: 20, a35: 20, a36: 20, a37: 20, a38: 20, a39: 20 
}

var movementSpeed = 0;
var xdist;
var ydist;
var deaths = 0;
var foodCanvas;
var smartMode = false;
var smartMode2 = false;
var gameWon = false;

function setup() {
    var myCanvas = createCanvas(600, 600);
    myCanvas.parent("screen");
    frameRate(60);
    foodCanvas = createGraphics(600, 600);
    foodAppearCheck();
}


function draw() {
    background(0);
    stroke(0,255,0);
    walls();    
    fill(255,255,0);
    image(foodCanvas, 0, 0);
    goaround();
    playercontrol();
    playermove(); 
    if (gameWon === false && smartMode === false) {
        AIBrain();
        AIMovement();}
    checkDistance();
    checkGameOver();
    foodEat();
    cornerCutAI();
    if (gameWon === false) {smarterAI();}
    winDisplay();
    console.log(smartMode,smartMode2);
   // console.log('SCORE'+player.score);
   // console.log(player.xspeed);
} 

function walls() {
    fill(51);
    rect(0, 0, 40, 270);
    rect(0, 330, 40, 280);
    rect(0, 0, 600, 40);
    rect(560, 0, 40, 270);
    rect(560, 330, 40, 600);
    rect(0, 560, 600, 40);
    rect(100, 100, 40, 170);
    rect(460, 100, 40, 170);
    rect(100, 330, 40, 170);
    rect(460, 330, 40, 170);
    rect(100, 100, 400, 60);
    rect(100, 440, 400, 60);
    rect(200, 330, 200, 40);
    rect(200, 230, 200, 40);

}

function playercontrol() {
    if (keyCode === UP_ARROW) {upMoveCheck(); foodAppearCheck(); player.movementSpeed = 2; AI.movementSpeed = 2}
    if (keyCode === DOWN_ARROW) {downMoveCheck(); foodAppearCheck(); player.movementSpeed = 2; AI.movementSpeed = 2}
    if (keyCode === RIGHT_ARROW) {rightMoveCheck(); foodAppearCheck(); player.movementSpeed = 2; AI.movementSpeed = 2}
    if (keyCode === LEFT_ARROW) {leftMoveCheck(); foodAppearCheck(); player.movementSpeed = 2; AI.movementSpeed = 2}       
}

function playermove() {
    if (player.xspeed === 1 && player.xspeed != 0) {  
        if ((player.y > 300 || player.y < 300) && player.x === 530
        || (player.y === 400 && player.x === 430) || player.y === 200 && player.x === 430) { 
            arc(player.x, player.y, 55, 55, 0.5, 5.5); 
        } else {
            player.x += player.movementSpeed; 
            arc(player.x, player.y, 55, 55, 0.5, 5.5);
        }
    } else if (player.xspeed === -1 && player.xspeed != 0) {
        if ((player.y > 300 || player.y < 300) && player.x === 70
        || (player.y === 400 && player.x === 170) || player.y === 200 && player.x === 170) {
            arc(player.x, player.y, 55, 55, 3.5, 2.5);
    } else {
            player.x -= player.movementSpeed;
            arc(player.x, player.y, 55, 55, 3.5, 2.5);
        }
    } else if (player.yspeed === -1 && player.yspeed != 0 && player.x != 20) {
        if (player.y === 70 || (player.y === 200 && player.x > 165 && player.x < 435)) {
            arc(player.x, player.y, 55, 55, 5, 4);
        } else {
            player.y -= player.movementSpeed;
            arc(player.x, player.y, 55, 55, 5, 4);
        }
    } else if (player.yspeed === 1 && player.yspeed != 0 && player.x != 20) {
        if (player.y === 530 || player.y === 400 && player.x > 165 && player.x < 435) {
            arc(player.x, player.y, 55, 55, 2, 1);
        } else {
            player.y += player.movementSpeed;
            arc(player.x, player.y, 55, 55, 2, 1);        
        }
    } else {
        arc(player.x, player.y, 55, 55, 0.5, 5.5);
    }
}

function goaround() {
    if (player.x < 10) {         
        player.x = 588
    } else if (player.x > 590) {
        player.x = 12
    }
}
function AIBrain() {
    if (ydist > xdist && AI.y > player.y && AI.x === 70 //left column 
        || ydist > xdist && AI.y > player.y && AI.x === 530 //right column
        || ydist > xdist && AI.y > player.y && AI.x === 170 && AI.y <= 435 && AI.y >= 165
        && player.x >= 165 && player.x <= 435 && player.y >= 200 && player.y <= 400 //mid-left column
        || ydist > xdist && AI.y > player.y && AI.x === 430 && AI.y <= 435 && AI.y >= 165
        && player.x >= 165 && player.x <= 435 && player.y >= 200 && player.y <= 400) //mid right column
        {   AI.yspeed = -1;
            AI.xspeed = 0;
        } else if (ydist > xdist && AI.y < player.y && AI.x === 70 //left column
                || ydist > xdist && AI.y < player.y && AI.x === 530 //right column
                || ydist > xdist && AI.y < player.y && AI.x === 170 && AI.y <= 435 && AI.y >= 165
                && player.x >= 165 && player.x <= 435 && player.y >= 200 && player.y <= 400 
                && AI.y >= 200 && AI.y <= 400  //mid-left column
                || ydist > xdist && AI.y < player.y && AI.x === 430 && AI.y <= 435 && AI.y >= 165
                && player.x >= 165 && player.x <= 435 && player.y >= 200 && player.y <= 400) //mid-right column
        {   AI.yspeed = 1;
            AI.xspeed = 0;
        } else if (AI.x < player.x && AI.y === 70 //top row
                || AI.x < player.x && AI.y === 300 //mid row
                || AI.x < player.x && AI.y === 530 //bottom row
                || AI.x < player.x && AI.y === 200 && AI.x > 165 && AI.x < 435  //mid-top section
                || AI.x < player.x && AI.y === 400 && AI.x > 165 && AI.x < 435) //mid-bottom section
        {   AI.xspeed = 1;
            AI.yspeed = 0;
        } else if (AI.x > player.x && AI.y === 70 
                || AI.x > player.x && AI.y === 300 //mid row
                || AI.x > player.x && AI.y === 530 //bottom row
                || AI.x > player.x && AI.y === 200 && AI.x > 165 && AI.x < 435  //mid-top section
                || AI.x > player.x && AI.y === 400 && AI.x > 165 && AI.x < 435) //mid top section
        {   AI.xspeed = -1;
            AI.yspeed = 0;
        } 
}

function AIMovement(){
    fill(255,0,0);
    if (AI.xspeed === 1 && AI.xspeed != 0) {  
        if ((AI.y > 300 || AI.y < 300) && AI.x === 530
        || (AI.y === 400 && AI.x === 430) || AI.y === 200 && AI.x === 430
        || (AI.y < 300 && AI.x === 430 && AI.y > 70) ){ 
            if (AI.movingDown === false && AI.movingLeft === false && AI.movingUp === false) {
            arc(AI.x, AI.y, 55, 55, 0.5, 5.5); }
        } else {
            moveRightAI();
            console.log('bug');
            AI.movingRight = true;
        }
    } else if (AI.xspeed === -1 && AI.xspeed != 0) {
        if ((AI.y > 300 || AI.y < 300) && AI.x === 70
        || (AI.y === 400 && AI.x === 170) || AI.y === 200 && AI.x === 170) {
            if (AI.movingDown === false && AI.movingRight === false && AI.movingUp === false) {
            arc(AI.x, AI.y, 55, 55, 3.5, 2.5);}
    } else {
            moveLeftAI();
            AI.movingLeft = true;
            }
    } else if (AI.yspeed === -1 && AI.yspeed != 0) {
        if (AI.y === 70 || (AI.y === 200 && AI.x >= 165 && AI.x <= 435)) {
            if (AI.movingDown === false && AI.movingLeft === false && AI.movingRight === false) {
            arc(AI.x, AI.y, 55, 55, 5, 4);}
        } else {
            moveUpAI();
            AI.movingUp = true;
            }
    } else if (AI.yspeed === 1 && AI.yspeed != 0) {
        if (AI.y === 530 || AI.y === 400 && AI.x >= 165 && AI.x <= 435) {
            if (AI.movingRight === false && AI.movingLeft === false && AI.movingUp === false) {
            arc(AI.x, AI.y, 55, 55, 2, 1); }
        } else {
            moveDownAI();   
            AI.movingDown = true     
            }
    } else {
        arc(AI.x, AI.y, 55, 55, 0.5, 5.5);
        AI.movingRight = false;
        AI.movingLeft = false;
        AI.movingUp = false;
        AI.movingDown = false;
    }
}

function checkDistance() {
    if (Math.abs(player.x - AI.x) > Math.abs(player.y - AI.y)) {
        xdist = 1;
        ydist = 0;
    } else if (Math.abs(player.x - AI.x) < Math.abs(player.y - AI.y)) {
        xdist = 0
        ydist = 1;
    }
}
function checkGameOver() {
    if ((Math.abs(player.x - AI.x)) < 40 && (Math.abs(player.y - AI.y)) < 40) {
        console.log('GAME OVER!');
        deaths += 1;
        score = 0;
        player.xspeed = 0;
        player.yspeed = 0;
        AI.xspeed = 0;
        AI.yspeed = 0;
        player.x = 20;
        player.y = 300;
        AI.x = 570;
        AI.y = 300;
        player.movementSpeed = 0;
        AI.movementSpeed = 0;
        console.log('DEATHS:' + deaths); 
        foodCanvas.clear();
        foodRespawn();  
        keyCode = 0;    
    }
}
 function keyPressed() {
    foodAppearCheck();
    player.movementSpeed = 2;
     AI.movementSpeed = 2;

 }

 function upMoveCheck() {
    if (player.x === 70 //left column 
        || player.x === 530 //right column
        || player.x === 170 && player.y < 435 && player.y > 165  //mid-left column
        || player.x === 430 && player.y < 435 && player.y > 165) //mid right column
        {   
            player.yspeed = -1;
            player.xspeed = 0;
        }
}
function downMoveCheck() {
    if (player.x === 70 //left column 
        || player.x === 530 //right column
        || player.x === 170 && player.y < 435 && player.y > 165  //mid-left column
        || player.x === 430 && player.y < 435 && player.y > 165) //mid right column
        {   
            player.yspeed = 1;
            player.xspeed = 0;

        }
    }

function rightMoveCheck() {
    if (player.y === 70 //top row
        || player.y === 300 //mid row
        || player.y === 530 //bottom row
        || player.y === 200 && player.x > 165 && player.x < 435  //mid-top section
        || player.y === 400 && player.x > 165 && player.x < 435) //mid-bottom section
    {   player.xspeed = 1;
        player.yspeed = 0;
    }
}

function leftMoveCheck() {
    if  (player.y === 70 
        || player.y === 300 //mid row
        || player.y === 530 //bottom row
        || player.y === 200 && player.x > 165 && player.x < 435  //mid-top section
        || player.y === 400 && player.x > 165 && player.x < 435) //mid top section
    {   player.xspeed = -1;
        player.yspeed = 0;
    }
}

function moveRightAI() {
    AI.x += AI.movementSpeed; 
    fill(255,0,0);
    arc(AI.x, AI.y, 55, 55, 0.5, 5.5);
}

function moveLeftAI() {
    AI.x -= AI.movementSpeed;
    fill(255,0,0);
    arc(AI.x, AI.y, 55, 55, 3.5, 2.5);
}

function moveUpAI() {
    AI.y -= AI.movementSpeed;
    fill(255,0,0);
    arc(AI.x, AI.y, 55, 55, 5, 4);
}

function moveDownAI() {
    AI.y += AI.movementSpeed;
    fill(255,0,0);
    arc(AI.x, AI.y, 55, 55, 2, 1);
    console.log('movedown');
}
//400
function smarterAI() {
    console.log(AI.x,AI.y);
    if (player.y != AI.y && player.y != 300) {
        if (smartMode2 === false && player.x > 170 && player.x < 430 && player.y === 200) {
            smartMode = true;
            if ((AI.x === 170 || AI.x === 430) && AI.y != 200&& AI.y < 301) {
                smartMode = true;
                moveUpAI();
                console.log('upmoving')
            } else if (AI.x > 170 && AI.x < 430) {
                smartMode = true;
                if (player.x >= 300) {
                    if (smartMode === true && AI.x < 430 && AI.y != 200) {
                        
                        moveRightAI();
                        console.log('rightmoving');
                    } else {smartMode = false;}
                } else if (player.x < 300) {
                    if (smartMode === true && AI.x > 170  && AI.y != 200) {
                        moveLeftAI();
                        console.log('leftmoving');

                    } else if ((player.x < 170 || player.x > 430) && (AI.x === 170 || AI.x === 430) && AI.y < 300) {
                        smartMode2 = true;
                        moveDownAI(); 
                    } else {smartMode = false;}
                } else {smartMode = false;}
            } else {smartMode = false;}
        } else if ((player.x < 170 || player.x > 430) && (AI.x === 170 || AI.x === 430) && AI.y < 300 && AI.y > 199) {
                smartMode2 = true;
                moveDownAI(); 
                smartMode = true;
        } else {smartMode = false;}
            
        if (smartMode === false && player.x > 170 && player.x < 430 && player.y === 400) {
                smartMode = true;
                if ((AI.x === 170 || AI.x === 430) && AI.y != 400 && AI.y <400) {
                    smartMode2 = true;
                    smartMode = false;
                    moveDownAI();
                    console.log('downmoving')
                } else if (AI.x > 170 && AI.x < 430) {
                    smartMode2 = true;
                    if (player.x >= 300) {
                        if (smartMode2 === true && AI.x < 430 && AI.y != 400) {
                            
                            moveRightAI();
                            console.log('right2moving');
                        } else {smartMode2 = false; smartMode = false;}
                    } else if (player.x < 300) {
                        if (smartMode2 === true && AI.x > 170  && AI.y != 400) {
                            moveLeftAI();
                            console.log('left2moving');
        
                        } else if ((player.x < 170 || player.x > 430) && (AI.x === 170 || AI.x === 430) && AI.y < 300) {
                            smartMode2 = true;
                            moveDownAI(); 
                        } else {smartMode2 = false;}
                    } else  {smartMode2 = false;}
                } else {smartMode2 = false; smartMode = false;}
        } else if ((player.x < 170 || player.x > 430) && (AI.x === 170 || AI.x === 430)
                                && AI.y > 300 && AI.y < 401) {
                    smartMode2 = true;
                    moveUpAI(); 

        } else {smartMode2 = false; console.log('none');} 
    } else {smartMode = false; smartMode2 = false;}
    //if (smartMode = true) {smartMode2 = false;} 
    //else if (smartMode2 = true) {smartMode = false;}
} 

function cornerCutAI() {
    if (AI.x > 69 && AI.x < 71 && AI.x != 70 ) {
        
            AI.x = 70;
    }
    if (AI.x > 529 && AI.x < 531 && AI.x != 530 ) {
        
            AI.x = 530;
    }
    if (AI.x > 169 && AI.x < 171 && AI.x != 170 && AI.y <= 400 && AI.y >= 200  ) {
        
            AI.x = 170;
    }
    if (AI.x > 429 && AI.x < 431 && AI.x != 430 && AI.y <= 400 && AI.y >= 200 ) {
        
            AI.x = 430;
    }
    if (AI.y > 69 && AI.y < 71 && AI.y != 70) {
        
            AI.y = 70;
    }
    if (AI.y > 299 && AI.y < 301 && AI.y != 300) {
        
            AI.y = 300;
    }
    if (AI.y > 529 && AI.y < 531 && AI.y != 530) {
        
            AI.y = 530;
    } 
    if (AI.y > 199 && AI.y < 201 && AI.y != 200 && AI.x >= 170 && AI.x <= 430) {
        
            AI.y = 200;
    }
    if (AI.y > 399 && AI.y < 401 && AI.y != 400 && AI.x >= 170 && AI.x <= 430) {
        
            AI.y = 400;
    }
}

function foodAppearCheck() {
    foodCanvas.fill(100, 200, 200);
    if(player.movementSpeed > 0) {
    foodSpawn();
    }
}

function foodSpawn() {    
    foodCanvas.rect(60, 60,  food.a1, food.a0); 
    foodCanvas.rect(106, 60, food.a1, food.a1);
    foodCanvas.rect(152, 60, food.a2, food.a2);
    foodCanvas.rect(198, 60, food.a3, food.a3);
    foodCanvas.rect(244, 60, food.a4, food.a4);
    foodCanvas.rect(290, 60, food.a5, food.a5);
    foodCanvas.rect(336, 60, food.a6, food.a6);
    foodCanvas.rect(382, 60, food.a7, food.a7);
    foodCanvas.rect(428, 60, food.a8, food.a8);
    foodCanvas.rect(474, 60, food.a9, food.a9);
    foodCanvas.rect(520, 60, food.a10, food.a10);
    foodCanvas.rect(520, 106, food.a11, food.a11);
    foodCanvas.rect(520, 152, food.a12, food.a12);
    foodCanvas.rect(520, 198, food.a13, food.a13); 
    foodCanvas.rect(520, 244, food.a14, food.a14);
    foodCanvas.rect(520, 290, food.a15, food.a15);
    foodCanvas.rect(520, 336, food.a16, food.a16);
    foodCanvas.rect(520, 382, food.a17, food.a17);
    foodCanvas.rect(520, 428, food.a18, food.a18);
    foodCanvas.rect(520, 474, food.a19, food.a19);
    foodCanvas.rect(520, 520, food.a20, food.a20);
    foodCanvas.rect(474, 520, food.a21, food.a21);
    foodCanvas.rect(428, 520, food.a22, food.a22);
    foodCanvas.rect(382, 520, food.a23, food.a23);
    foodCanvas.rect(336, 520, food.a24, food.a24);
    foodCanvas.rect(290, 520, food.a25, food.a25);
    foodCanvas.rect(244, 520, food.a26, food.a26); 
    foodCanvas.rect(198, 520, food.a27, food.a27);
    foodCanvas.rect(152, 520, food.a28, food.a28);
    foodCanvas.rect(106, 520, food.a29, food.a29);
    foodCanvas.rect(60, 520, food.a30, food.a30);
    foodCanvas.rect(60, 474, food.a31, food.a31);
    foodCanvas.rect(60, 428, food.a32, food.a32);
    foodCanvas.rect(60, 382, food.a33, food.a33);
    foodCanvas.rect(60, 336, food.a34, food.a34);
    foodCanvas.rect(60, 290, food.a35, food.a35);
    foodCanvas.rect(60, 244, food.a36, food.a36);
    foodCanvas.rect(60, 198, food.a37, food.a37);
    foodCanvas.rect(60, 152, food.a38, food.a38);
    foodCanvas.rect(60, 106, food.a39, food.a39);
}

function foodEat() {
    if (player.x ===70 && player.y === 70 && food.a0 != 0) {
        food.a0 = 0 
        player.score++;
        foodCanvas.clear(0);
    }
    if (player.x ===116 && player.y === 70 && food.a1 != 0) {
        food.a1 = 0 
        player.score++;
        foodCanvas.clear(0);
    }
    if (player.x ===162 && player.y === 70 && food.a2 != 0) {
        food.a2 = 0;
        player.score++;
        foodCanvas.clear(0);
    }
    if (player.x ===208 && player.y === 70 && food.a3 != 0) {
        food.a3 = 0; 
        player.score++;
        foodCanvas.clear(0);
    }
    if (player.x ===254 && player.y === 70 && food.a4 != 0) {
        food.a4 = 0;
        player.score++; 
        foodCanvas.clear(0);
    }
    if (player.x ===300 && player.y === 70 && food.a5 != 0) {
        food.a5 = 0;
        player.score++; 
        foodCanvas.clear(0);
    }
    if (player.x ===346 && player.y === 70 && food.a6 != 0) {
        food.a6 = 0;
        player.score++; 
        foodCanvas.clear(0);
    }
    if (player.x ===392 && player.y === 70 && food.a7 != 0) {
        food.a7 = 0;
        player.score++; 
        foodCanvas.clear(0);
    }
    if (player.x ===438 && player.y === 70 && food.a8 != 0) {
        food.a8 = 0;
        player.score++; 
        foodCanvas.clear(0);
    }
    if (player.x ===484 && player.y === 70 && food.a9 != 0) {
        food.a9 = 0;
        player.score++; 
        foodCanvas.clear(0);
    }
    if (player.x ===530 && player.y === 70 && food.a10 != 0) {
        food.a10 = 0;
        player.score++; 
        foodCanvas.clear(0);
    }
    if (player.x ===530 && player.y === 116 && food.a11 != 0) {
        food.a11 = 0;
        player.score++; 
        foodCanvas.clear(0);
    }
    if (player.x ===530 && player.y === 162 && food.a12 != 0) {
        food.a12 = 0;
         player.score++;
        foodCanvas.clear(0);
    }
    if (player.x ===530 && player.y === 208 && food.a13 != 0) {
        food.a13 = 0 ;
         player.score++;
        foodCanvas.clear(0);
    }
    if (player.x ===530 && player.y === 254 && food.a14 != 0) {
        food.a14 = 0 ;
         player.score++;
        foodCanvas.clear(0);
    }
    if (player.x ===530 && player.y === 300 && food.a15 != 0) {
        food.a15 = 0 ;
         player.score++;
        foodCanvas.clear(0);
    }
    if (player.x ===530 && player.y === 346 && food.a16 != 0) {
        food.a16 = 0 ;
         player.score++;
        foodCanvas.clear(0);
    }
    if (player.x ===530 && player.y === 392 && food.a17 != 0) {
        food.a17 = 0 ;
         player.score++;
        foodCanvas.clear(0);
    }
    if (player.x ===530 && player.y === 438 && food.a18 != 0) {
        food.a18 = 0 ;
         player.score++;
        foodCanvas.clear(0);
    }
    if (player.x ===530 && player.y === 484 && food.a19 != 0) {
        food.a19 = 0 ;
         player.score++;
        foodCanvas.clear(0);
    }
    if (player.x ===530 && player.y === 530 && food.a20 != 0) {
        food.a20 = 0 ;
         player.score++;
        foodCanvas.clear(0);
    }
    if (player.x ===484 && player.y === 530 && food.a21 != 0) {
        food.a21 = 0 ;
         player.score++;
        foodCanvas.clear(0);
    }
    if (player.x ===438 && player.y === 530 && food.a22 != 0) {
        food.a22 = 0 ;
         player.score++;
        foodCanvas.clear(0);
    }
    if (player.x ===392 && player.y === 530 && food.a23 != 0) {
        food.a23 = 0 ;
         player.score++;
        foodCanvas.clear(0);
    }
    if (player.x ===346 && player.y === 530 && food.a24 != 0) {
        food.a24 = 0 ;
         player.score++;
        foodCanvas.clear(0);
    }
    if (player.x ===300 && player.y === 530 && food.a25 != 0) {
        food.a25 = 0 ;
         player.score++;
        foodCanvas.clear(0);
    }
    if (player.x ===254 && player.y === 530 && food.a26 != 0) {
        food.a26 = 0 ;
         player.score++;
        foodCanvas.clear(0);
    }
    if (player.x ===208 && player.y === 530 && food.a27 != 0) {
        food.a27 = 0 ;
         player.score++;
        foodCanvas.clear(0);
    }
    if (player.x ===162 && player.y === 530 && food.a28 != 0) {
        food.a28 = 0 ;
         player.score++;
        foodCanvas.clear(0);
    }
    if (player.x ===116 && player.y === 530 && food.a29 != 0) {
        food.a29 = 0 ;
         player.score++;
        foodCanvas.clear(0);
    }
    if (player.x ===70 && player.y === 530 && food.a30 != 0) {
        food.a30 = 0 ;
         player.score++;
        foodCanvas.clear(0);
    }
    if (player.x ===70 && player.y === 484 && food.a31 != 0) {
        food.a31 = 0 ;
         player.score++;
        foodCanvas.clear(0);
    }
    if (player.x ===70 && player.y === 438 && food.a32 != 0) {
        food.a32 = 0 ;
         player.score++;
        foodCanvas.clear(0);
    }
    if (player.x ===70 && player.y === 392 && food.a33 != 0) {
        food.a33 = 0 ;
         player.score++;
        foodCanvas.clear(0);
    }
    if (player.x ===70 && player.y === 346 && food.a34 != 0) {
        food.a34 = 0 ;
         player.score++;
        foodCanvas.clear(0);
    }
    if (player.x ===70 && player.y === 300 && food.a35 != 0) {
        food.a35 = 0 ;
         player.score++;
        foodCanvas.clear(0);
    }
    if (player.x ===70 && player.y === 256 && food.a36 != 0) {
        food.a36 = 0 ;
         player.score++;
        foodCanvas.clear(0);
    }
    if (player.x ===70 && player.y === 208 && food.a37 != 0) {
        food.a37 = 0 ;
         player.score++;
        foodCanvas.clear(0);
    }
    if (player.x ===70 && player.y === 162 && food.a38 != 0) {
        food.a38 = 0 ;
         player.score++;
        foodCanvas.clear(0);
    }
    if (player.x ===70 && player.y === 118 && food.a39 != 0) {
        food.a39 
         food.a39 = 0 ;
         player.score++;
        foodCanvas.clear(0);
    }
    
}

function foodRespawn() {
    food.a0 = 20; food.a1 = 20; food.a2 = 20; food.a3 = 20; 
    food.a4 = 20; food.a5 = 20; food.a6 = 20; food.a7 = 20;
    food.a8 = 20; food.a9 = 20; food.a10 = 20; food.a11 = 20;
    food.a12 = 20; food.a13 = 20; food.a14 = 20; food.a15 = 20;
    food.a16 = 20; food.a17 = 20; food.a18 = 20; food.a19 = 20;
    food.a20 = 20; food.a21 = 20; food.a22 = 20; food.a23 = 20; 
    food.a24 = 20; food.a25 = 20; food.a26 = 20; food.a27 = 20;
    food.a28 = 20; food.a29 = 20; food.a30 = 20; food.a31 = 20;
    food.a32 = 20; food.a33 = 20; food.a34 = 20; food.a35 = 20;
    food.a36 = 20; food.a37 = 20; food.a38 = 20; food.a39 = 20;
}

function winDisplay() {
    if (player.score === 40) {
        foodCanvas.strokeWeight(5);
        foodCanvas.stroke(150,150,0);
        foodCanvas.line(260,280,270,320);
        foodCanvas.line(270,320,280,280);
        foodCanvas.line(280,280,290,320);
        foodCanvas.line(290,320,300,280);
        foodCanvas.line(310,280,310,320);
        foodCanvas.line(320,280,320,320);
        foodCanvas.line(320,280,340,320);
        foodCanvas.line(340,280,340,320);
        AI.xspeed = 0;
        AI.yspeed = 0;
        gameWon = true;
    }

}