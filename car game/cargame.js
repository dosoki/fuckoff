var player = {
    x: 200,
    y: 500,
    xdir: 0,
    ydir: 0,
    width: 70,
    height: 120,
    score: 0,
    flew: 0,
    leftSide: 0,
    rightSide: 0,
    downSide: 0,
    upSide: 0,
    dead: false
};
var lane1l = {
    y: 183
}
var lane2l = {
    y: 416
}
var lane3l = {
    y: 649
}

var lane1r = {
    y: 83
}
var lane2r = {
    y: 316
}
var lane3r = {
    y: 549
}

var blueCarpm = {
    x: 200,
    y: 1000,
    leftSide: 0,
    rightSide: 0,
    downSide: 0,
    upSide: 0,
    addPoint: true,
    level1speed: 3,
    level2speed: 4,
    level3speed: 5,
    level4speed: 6
}
var redCarpm = {
    x: 200,
    y: 1000,
    leftSide: 0,
    rightSide: 0,
    downSide: 0,
    upSide: 0,
    addPoint: true,
    level1speed: 6,
    level2speed: 7,
    level3speed: 8,
    level4speed: 9
}
var greenCarpm = {
    x: 200,
    y: 1000,
    leftSide: 0,
    rightSide: 0,
    downSide: 0,
    upSide: 0,
    addPoint: true,
    level1speed: 2.2,
    level2speed: 3,
    level3speed: 4,
    level4speed: 5
}

var indicatorBox = false;
var level;
var hud;
var decider;
var choose = true;
var i1 = 0;
var fly = 0;

function setup() {
    createCanvas(600,600);
    hud = createGraphics(200,600);
    player.score -= 15;
}
function draw() {
    background(51);
    leftLane1();
    leftLane2();
    leftLane3();
    rightLane1();
    rightLane2();
    rightLane3();
    blueCar();
    redCar();
    greenCar();
    car();
    carcontrols();
    laneDecider();
    indicator();
    hud.background(100,50,50);
    scoreBoard();
    flyBoard();
    levelBoard();
    logo();
    checkBox();
    image(hud, 400,0);
    collisionCheck();
    levelCheck();
}

function car () {
    fill(200,200,0);
    stroke(200,100,0);
    strokeWeight(5);
    rect(player.x, player.y,player.width,player.height,20);
    rectMode(CENTER);
    fly = Math.floor(player.score/25-player.flew); 
    player.leftSide = player.x - 35;
    player.rightSide = player.x + 35;
    player.downSide = player.y + 60;
    player.upSide = player.y - 60;
}

function collisionCheck() {
    if (((player.leftSide-blueCarpm.rightSide)<1 && (player.leftSide-blueCarpm.rightSide)>-1    
        || (player.rightSide-blueCarpm.leftSide)<1 && (player.rightSide-blueCarpm.leftSide)>-1) 
        && (player.upSide<= blueCarpm.downSide && player.downSide >= blueCarpm.upSide)) {
            if (player.width === 70) {
                gameOver();
            }
        }
    if (((player.upSide-blueCarpm.downSide)<1 && (player.upSide-blueCarpm.downSide)>-5
    || (player.downSide-blueCarpm.upSide)<1 && (player.downSide-blueCarpm.upSide)>-5) 
    && (player.leftSide - 2<= blueCarpm.rightSide && player.rightSide >= blueCarpm.leftSide)) {
        if (player.width === 70) {
            gameOver();
        }
    }

    if (((player.leftSide-redCarpm.rightSide)<1 && (player.leftSide-redCarpm.rightSide)>-1
    || (player.rightSide-redCarpm.leftSide)<1 && (player.rightSide-redCarpm.leftSide)>-1) 
    && (player.upSide<= redCarpm.downSide && player.downSide >= redCarpm.upSide)) {
        if (player.width === 70) {
            gameOver();
        }
    }
    if (((player.upSide-redCarpm.downSide)<1 && (player.upSide-redCarpm.downSide)>-10
    || (player.downSide-redCarpm.upSide)<1 && (player.downSide-redCarpm.upSide)>-10) 
    && (player.leftSide<= redCarpm.rightSide && player.rightSide >= redCarpm.leftSide)) {
        if (player.width === 70) {
            gameOver();
        }
    }

    if (((player.leftSide-greenCarpm.rightSide)<1 && (player.leftSide-greenCarpm.rightSide)>-1
    || (player.rightSide-greenCarpm.leftSide)<1 && (player.rightSide-greenCarpm.leftSide)>-1) 
    && (player.upSide<= greenCarpm.downSide && player.downSide >= greenCarpm.upSide)) {
        if (player.width === 70) {
            gameOver();
        }
    }
    if (((player.upSide-greenCarpm.downSide)<1 && (player.upSide-greenCarpm.downSide)>-5
    || (player.downSide-greenCarpm.upSide)<1 && (player.downSide-greenCarpm.upSide)>-5) 
    && (player.leftSide<= greenCarpm.rightSide && player.rightSide >= greenCarpm.leftSide)) {
        if (player.width === 70) {
        gameOver();
        }
    }
}

function gameOver() {
    setTimeout(function() {player.score = 0;}, 2000)
    player.flew = 0;
    fly = 0;
    player.dead = true;
}

function gameRestart() {
    player.dead = false;
    blueCarpm.y = 700;
    redCarpm.y = 700;
    greenCarpm.y = 700;
    player.score -= 10;
}

function carcontrols() {
    if (keyIsDown(LEFT_ARROW) && player.x > player.width/2+5 && player.dead === false) {
        player.xdir = -3.5;
        player.x = player.x + player.xdir;
    } 
    else if (keyIsDown(RIGHT_ARROW) && player.x < (width - 200 - player.width/2-5) && player.dead === false) {
        player.xdir = 3.5;
        player.x = player.x + player.xdir;
    }
    if (keyIsDown(UP_ARROW) && player.y > player.height/2+5 && player.dead === false) {
        player.ydir = -3.5;
        player.y = player.y + player.ydir;
    }
    else if (keyIsDown(DOWN_ARROW) && player.y < (height - (player.height/2)-5) && player.dead === false) {
        player.ydir = 3.5;
        player.y = player.y + player.ydir;
    }
}

function keyPressed() {
    if (key === ' ' && fly > 0 && player.width === 70 && player.dead === false) {
        player.flew++;
        console.log('hey');
        loopedJumpUp();
    }
    if (keyCode === 82) {
        gameRestart();
    }
}

var maxSize = false;
function loopedJumpUp() {
    if (maxSize === false) {
        setTimeout(function () {
            player.width++; 
            player.height++;
                i1++;
                if (i1 < 25) {
                    loopedJumpUp();
                } else {setTimeout(function(){maxSize=true; loopedJumpDown();},1000)}
        },15)
    }
}

function loopedJumpDown() {
    if (maxSize === true) {
        setTimeout(function () {
            player.width--; 
            player.height--;
             i1--;
             if (i1 > 0) {
                 loopedJumpDown();
            } else {maxSize=false;}
        },15)
    }
}

function leftLane1() {
    fill(255); noStroke(); rect(133,lane1l.y,20,100); rectMode(CENTER); if (player.dead === false) {lane1l.y= lane1l.y + 2;}
    if (lane1l.y > 650) {lane1l.y = -50;}
}
function leftLane2() {
    fill(255); noStroke(); rect(133,lane2l.y,20,100); rectMode(CENTER); if (player.dead === false) {lane2l.y= lane2l.y + 2;}
    if (lane2l.y > 650) {lane2l.y = -50;}
}
function leftLane3() {
    fill(255); noStroke(); rect(133,lane3l.y,20,100); rectMode(CENTER); if (player.dead === false) {lane3l.y= lane3l.y + 2;}
    if (lane3l.y > 650) {lane3l.y = -50;}
}
function rightLane1() {
    fill(255); noStroke(); rect(266,lane1r.y,20,100); rectMode(CENTER); if (player.dead === false) {lane1r.y= lane1r.y + 2;}
    if (lane1r.y > 650) {lane1r.y = -50;}
}
function rightLane2() {
    fill(255); noStroke(); rect(266,lane2r.y,20,100); rectMode(CENTER); if (player.dead === false) {lane2r.y= lane2r.y + 2;}
    if (lane2r.y > 650) {lane2r.y = -50;}
}
function rightLane3() {
    fill(255); noStroke(); rect(266,lane3r.y,20,100); rectMode(CENTER); if (player.dead === false) {lane3r.y= lane3r.y + 2;}
    if (lane3r.y > 650) {lane3r.y = -50;}
}

function laneDecider() {
    if(choose===true) {
        choose=false;
    setTimeout(function() {decider = Math.round(random(1,3)); choose=true;},500)
    }
}

function blueCar() {
    blueCarpm.leftSide = blueCarpm.x - 35;
    blueCarpm.rightSide = blueCarpm.x + 35;
    blueCarpm.downSide = blueCarpm.y + 60;
    blueCarpm.upSide = blueCarpm.y - 60;
    fill(50,50,255),
    stroke(10,10,40);
    rect(blueCarpm.x,blueCarpm.y, 70, 120, 10, 10, 10, 10);
    rectMode(CENTER);
    if (player.dead === false)
        if (level === 1) {blueCarpm.y += blueCarpm.level1speed;}
        else if (level === 2) {blueCarpm.y += blueCarpm.level2speed;}
        else if (level === 3) {blueCarpm.y += blueCarpm.level3speed;}
        else if (level === 4) {blueCarpm.y += blueCarpm.level4speed;}
    if (blueCarpm.y > Math.round(random(1500,4000))) {
        if (decider === 1 && (redCarpm.x != 60 || redCarpm.y > 500) && (greenCarpm.x != 60 || greenCarpm.y > 500)) {
            blueCarpm.x = 60;
            blueCarpm.y = -250;
        } else if (decider === 2 && (redCarpm.x != 200 || redCarpm.y > 500) && (greenCarpm.x != 200 || greenCarpm.y > 500)) {
            blueCarpm.x = 200;
            blueCarpm.y = -250;
        } else if (decider === 3 && (redCarpm.x != 340 || redCarpm.y > 500) && (greenCarpm.x != 340 || greenCarpm.y > 500)) {
            blueCarpm.x = 340;
            blueCarpm.y = -250;
        }
    }
    if (blueCarpm.y > 600) {
        if (blueCarpm.addPoint === true) {
        player.score+=5;
        blueCarpm.addPoint = false}
    } else {blueCarpm.addPoint = true;}
}

function redCar() {
    redCarpm.leftSide = redCarpm.x - 30;
    redCarpm.rightSide = redCarpm.x + 30;
    redCarpm.downSide = redCarpm.y + 60;
    redCarpm.upSide = redCarpm.y - 60;
    fill(255,50,50),
    stroke(200,100,100);
    strokeWeight(4);
    rect(redCarpm.x,redCarpm.y, 60, 120, 10, 10, 50, 50);
    rectMode(CENTER);
    if (player.dead === false) {
        if (level === 1) {redCarpm.y += redCarpm.level1speed;}
        else if (level === 2) {redCarpm.y += redCarpm.level2speed;}
        else if (level === 3) {redCarpm.y += redCarpm.level3speed;}
        else if (level === 4) {redCarpm.y += redCarpm.level4speed;}
    }
    if (redCarpm.y > Math.round(random(1500,4000))) {
        if (decider === 1 && (blueCarpm.x != 60 || blueCarpm.y > 500) && (greenCarpm.x != 60 || greenCarpm.y > 500)) {
            redCarpm.x = 60;
            redCarpm.y = -250;
        } else if (decider === 2 && (blueCarpm.x != 200 || blueCarpm.y > 500) && (greenCarpm.x != 200 || greenCarpm.y > 500)) {
            redCarpm.x = 200;
            redCarpm.y = -250;
        } else if (decider === 3 && (blueCarpm.x != 340 || blueCarpm.y > 500) && (greenCarpm.x != 340 || greenCarpm.y > 500)) {
            redCarpm.x = 340;
            redCarpm.y = -250;
        }  
    }
    if (redCarpm.y > 600) {
        if (redCarpm.addPoint === true) {
        player.score+=5;
        redCarpm.addPoint = false}
    } else {redCarpm.addPoint = true;}
}

function greenCar() {
    greenCarpm.leftSide = greenCarpm.x - 45;
    greenCarpm.rightSide = greenCarpm.x + 45;
    greenCarpm.downSide = greenCarpm.y + 70;
    greenCarpm.upSide = greenCarpm.y - 70;
    fill(20,100,20),
    stroke(0,20,0);
    strokeWeight(10);
    rect(greenCarpm.x,greenCarpm.y, 90, 140, 5, 5, 20, 20);
    rectMode(CENTER);
    if (player.dead === false) {
        if (level === 1) {greenCarpm.y += greenCarpm.level1speed;}
        else if (level === 2) {greenCarpm.y += greenCarpm.level2speed;}
        else if (level === 3) {greenCarpm.y += greenCarpm.level3speed;}
        else if (level === 4) {greenCarpm.y += greenCarpm.level4speed;}
    }
    if (greenCarpm.y > Math.round(random(1500,4000))) {
        if (decider === 1 && (blueCarpm.x != 60 || blueCarpm.y > 500) && (redCarpm.x != 60 || redCarpm.y > 500)) {
            greenCarpm.x = 60;
            greenCarpm.y = -200;
        } else if (decider === 2 && (blueCarpm.x != 200 || blueCarpm.y > 500) && (redCarpm.x != 200 || redCarpm.y > 500)) {
            greenCarpm.x = 200;
            greenCarpm.y = -200;
        } else if (decider === 3 && (blueCarpm.x != 340 || blueCarpm.y > 500) && (redCarpm.x != 340 || redCarpm.y > 500)) {
            greenCarpm.x = 340;
            greenCarpm.y = -200;
        }
    }
    if (greenCarpm.y > 600) {
        if (greenCarpm.addPoint === true) {
        player.score+=5;
        greenCarpm.addPoint = false}
    } else {greenCarpm.addPoint = true;}
}

function scoreBoard() {
    hud.fill(100,100,100);
    hud.textSize(32);
    hud.textAlign(CENTER);
    hud.text('SCORE:',100,250);
    hud.fill(255);
    hud.stroke(255,0,0);
    hud.rectMode(CENTER);
    hud.rect(100,268,100,20);
    hud.textSize(20);
    hud.fill(0);
    hud.text(player.score, 100, 275);
}

function flyBoard() {
    hud.fill(100,100,100);
    hud.textSize(32);
    hud.textAlign(CENTER);
    hud.text('FLY:', 100, 350);
    hud.fill(255);
    hud.stroke(255,0,0);
    hud.rectMode(CENTER);
    hud.rect(100,368,100,20);
    hud.textSize(20);
    hud.fill(0);
    hud.text(fly, 100, 375);
}

function levelBoard() {
    hud.fill(100,100,100);
    hud.textSize(32);
    hud.textAlign(CENTER);
    hud.text('LEVEL:', 100, 450);
    hud.fill(255);
    hud.stroke(255,0,0);
    hud.rectMode(CENTER);
    hud.rect(100,468,100,20);
    hud.textSize(20);
    hud.fill(0);
    hud.text(level, 100, 475);
}

function logo() {
    hud.fill(50,200,50);
    hud.rectMode(CENTER);
    hud.rect(100,115,150,150,20);
    hud.fill(20,40,20);
    hud.textSize(96);
    hud.textAlign(CENTER);
    hud.text('BD', 100,150);

}

function levelCheck() {
    if (player.score < 50) { 
        level = 1;
    } else
    if (player.score > 50 && player.score < 100) {
        level = 2;
    } else 
    if (player.score > 100 && player.score < 200) {
        level = 3;
    } else 
    if (player.score > 200 && player.score < 350) {
        level = 4;
    } else 
    if (player.score > 350) {
        level = 5
    }
}

function checkBox() {
    hud.textSize(24);
    hud.textAlign(CENTER);
    hud.fill(100);
    hud.text('INDICATORS',100,520);
    if (indicatorBox === false) {
        hud.fill(255);
    } else if (indicatorBox === true) {
        hud.fill(150,150,0);
    }
    hud.rectMode(CENTER);
    hud.rect(100,550,50,50);
    
}
function mousePressed() {
    if (mouseX > 475 && mouseX < 525 && mouseY > 525 && mouseY < 575 && indicatorBox === false) {
        indicatorBox = true;
    } else if (mouseX > 475 && mouseX < 525 && mouseY > 525 && mouseY < 575 && indicatorBox === true) {
        indicatorBox = false;
    }
}
function indicator() {
    if (indicatorBox === true) {
        if ((blueCarpm.y < 0 && blueCarpm.x === 60) ||
            (redCarpm.y < 0 && redCarpm.x === 60) ||
            (greenCarpm.y < 0 && greenCarpm.x === 60)) {
                leftLaneIndicator();
            }
        if ((blueCarpm.y < 0 && blueCarpm.x === 200) ||
            (redCarpm.y < 0 && redCarpm.x === 200) ||
            (greenCarpm.y < 0 && greenCarpm.x === 200)) {
                midLaneIndicator();
            }
        if ((blueCarpm.y < 0 && blueCarpm.x === 340) ||
            (redCarpm.y < 0 && redCarpm.x === 340) ||
            (greenCarpm.y < 0 && greenCarpm.x === 340)) {
                rightLaneIndicator();
            }
        }
}

function leftLaneIndicator() {
    line(30,30,60,10);
    line(60,10,90,30);
}

function midLaneIndicator() {
    line(170,30,200,10);
    line(200,10,230,30);
}

function rightLaneIndicator() {
    line(310,30,340,10);
    line(340,10,370,30);
}