var pacman = {
    x: 20,
    y: 300,
    yspeed: 0,
    xspeed: 0
}

function setup() {
    var myCanvas = createCanvas(600, 600);
    myCanvas.parent("screen");
    frameRate(60);
}


function draw() {
    background(0);
    walls();    
    fill(255);
    goaround();
    pacmancontrol();
    pacmanmove(); 
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

function pacmancontrol() {
    if (keyCode === UP_ARROW && pacman.x === 70 //left column 
        || keyCode === UP_ARROW && pacman.x === 530 //right column
        || keyCode === UP_ARROW && pacman.x === 170 && pacman.y < 435 && pacman.y > 165  //mid-left column
        || keyCode === UP_ARROW && pacman.x === 430 && pacman.y < 435 && pacman.y > 165) //mid right column
        {   pacman.yspeed = -1;
            pacman.xspeed = 0;
        } else if (keyCode === DOWN_ARROW && pacman.x === 70 //left column
                || keyCode === DOWN_ARROW && pacman.x === 530 //right column
                || keyCode === DOWN_ARROW && pacman.x === 170 && pacman.y < 435 && pacman.y > 165 //mid-left column
                || keyCode === DOWN_ARROW && pacman.x === 430 && pacman.y < 435 && pacman.y > 165) //mid-right column
        {   pacman.yspeed = 1;
            pacman.xspeed = 0;
        } else if (keyCode === RIGHT_ARROW && pacman.y === 70 //top row
                || keyCode === RIGHT_ARROW && pacman.y === 300 //mid row
                || keyCode === RIGHT_ARROW && pacman.y === 530 //bottom row
                || keyCode === RIGHT_ARROW && pacman.y === 200 && pacman.x > 165 && pacman.x < 435  //mid-top section
                || keyCode === RIGHT_ARROW && pacman.y === 400 && pacman.x > 165 && pacman.x < 435) //mid-bottom section
        {   pacman.xspeed = 1;
            pacman.yspeed = 0;
        } else if (keyCode === LEFT_ARROW && pacman.y === 70 
                || keyCode === LEFT_ARROW && pacman.y === 300 //mid row
                || keyCode === LEFT_ARROW && pacman.y === 530 //bottom row
                || keyCode === LEFT_ARROW && pacman.y === 200 && pacman.x > 165 && pacman.x < 435  //mid-top section
                || keyCode === LEFT_ARROW && pacman.y === 400 && pacman.x > 165 && pacman.x < 435) //mid top section
        {   pacman.xspeed = -1;
            pacman.yspeed = 0;
        } 
}

function pacmanmove() {
    if (pacman.xspeed === 1 && pacman.xspeed != 0) {  
        if ((pacman.y > 300 || pacman.y < 300) && pacman.x === 530
        || (pacman.y === 400 && pacman.x === 430) || pacman.y === 200 && pacman.x === 430) { 
            arc(pacman.x, pacman.y, 55, 55, 0.5, 5.5); 
        } else {
            pacman.x += 2; 
            arc(pacman.x, pacman.y, 55, 55, 0.5, 5.5);
        }
    } else if (pacman.xspeed === -1 && pacman.xspeed != 0) {
        if ((pacman.y > 300 || pacman.y < 300) && pacman.x === 70
        || (pacman.y === 400 && pacman.x === 170) || pacman.y === 200 && pacman.x === 170) {
            arc(pacman.x, pacman.y, 55, 55, 3.5, 2.5);
    } else {
            pacman.x -= 2;
            arc(pacman.x, pacman.y, 55, 55, 3.5, 2.5);
        }
    } else if (pacman.yspeed === -1 && pacman.yspeed != 0) {
        if (pacman.y === 70 || (pacman.y === 200 && pacman.x > 165 && pacman.x < 435)) {
            arc(pacman.x, pacman.y, 55, 55, 5, 4);
        } else {
            pacman.y -= 2;
            arc(pacman.x, pacman.y, 55, 55, 5, 4);
        }
    } else if (pacman.yspeed === 1 && pacman.yspeed != 0) {
        if (pacman.y === 530 || pacman.y === 400 && pacman.x > 165 && pacman.x < 435) {
            arc(pacman.x, pacman.y, 55, 55, 2, 1);
        } else {
            pacman.y += 2;
            arc(pacman.x, pacman.y, 55, 55, 2, 1);        
        }
    } else {
        arc(pacman.x, pacman.y, 55, 55, 0.5, 5.5);
    }
}

function goaround() {
    if (pacman.x < 10) {         
        pacman.x = 588
    } else if (pacman.x > 590) {
        pacman.x = 12
    }
}
