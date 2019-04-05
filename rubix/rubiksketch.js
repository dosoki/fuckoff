
 var i = [0, 2,0,4, 2,0, 2,0,5, 0,4, 0, 0,5, 3,0,4, 3,0, 3,0,5, 
          2,4, 2, 2,5, 4, 5, 3,4, 3, 3,5, 
          2,1,4, 2,1, 2,1,5, 1,4, 1, 1,5, 3,1,4, 3,1, 3,1,5];
var i1stored=i[1]; var i2stored=i[2]; var i3stored=i[3];  
var i4stored=i[4]; var i5stored=i[5]; var i6stored=i[6];
var i7stored=i[7]; var i8stored=i[8]; var i9stored=i[9];
var i10stored=i[10]; var i11stored=i[11]; var i12stored=i[12];
var i13stored=i[13]; var i14stored=i[14]; var i15stored=i[15];
var i16stored=i[16]; var i17stored=i[17]; var i18stored=i[18];
var i19stored=i[19]; var i20stored=i[20]; var i21stored=i[21];
var i22stored=i[22]; var i23stored=i[23]; var i24stored=i[24];
// 0=white, 1=yellow, 2=red 3=orange, 4=green, 5=blue
var arrayR = [255,255,255,255,0,0,0];
var arrayG = [255,255,0,150,255,0,0];
var arrayB = [255,0,0,0,0,255,0];
var angleX = 0;
var angleY = 0;
var angleZ = 0;
var rotation1a = false;
var rotation1b = false;
var rotation1c = false;
var roteX1a = 0;
var roteX1b = 0;
var roteY1a = 0;
var turn = 3.1415926535897932384626/2;

function setup() {
    createCanvas(600,600, WEBGL);
    console.log(i.length);
}


function draw() {

    background(50);
    stroke(0);
    strokeWeight(2);
    rectMode(CENTER);
    translate(0,0,-75);
    rotateX(angleX);
    rotateY(angleY);
    rotateZ(angleZ);


    drawCube();
    
console.log(angleX,angleY);

if (keyIsDown(87)) {angleX+=0.05;}
if (keyIsDown(83)) {angleX-=0.05;}
if (keyIsDown(65)) {angleY-=0.05;}
if (keyIsDown(68)) {angleY+=0.05;}
if (keyIsDown(81)) {angleZ-=0.05;}
if (keyIsDown(69)) {angleZ+=0.05;}
}

 


function rotate1a() {
    rotation1a = true;
    roteX1a += turn;
}
function rotate1b() {
    rotation1b = true;
    roteX1b += turn;
}
function rotate1c() {
    rotation1c = true;
    roteY1a += turn;
}

function drawCube() {

    push();
    translate(-50,-50,75);
    fill(arrayR[i[1]],arrayG[i[1]],arrayB[i[1]]);
    box(50,50,0); //upper left  frontal side corner piece
    translate(-25,0,-25);
    fill(arrayR[i[3]],arrayG[i[3]],arrayB[i[3]]);
    box(0,50,50);
    translate(25,-25,0);
    fill(arrayR[i[2]],arrayG[i[2]],arrayB[i[2]]);
    box(50,0,50);
    pop();

    push();
    translate(0,-50,75);
    fill(arrayR[i[4]],arrayG[i[4]],arrayB[i[4]]);
    box(50,50,0); //upper frontal side edge piece
    translate(0,-25,-25);
    fill(arrayR[i[5]],arrayG[i[5]],arrayB[i[5]]);
    box(50,0,50);
    pop();

    push();
    translate(50,-50,75);
    fill(arrayR[i[6]],arrayG[i[6]],arrayB[i[6]]);
    box(50,50,0); //upper frontal right corner piece
    translate(25,0,-25);
    fill(arrayR[i[8]],arrayG[i[8]],arrayB[i[8]]);
    box(0,50,50);
    translate(-25,-25,0);
    fill(arrayR[i[7]],arrayG[i[7]],arrayB[i[7]]);
    box(50,0,50);
    pop();

    push();
    translate(-50,-75,0);
    fill(arrayR[i[9]],arrayG[i[9]],arrayB[i[9]]);
    box(50,0,50);           //upper side left edge piece
    translate(-25,25,0);
    fill(arrayR[i[10]],arrayG[i[10]],arrayB[i[10]]);
    box(0,50,50);
    pop();

    push();
    translate(0,-75,0);
    fill(arrayR[i[11]],arrayG[i[11]],arrayB[i[11]]);        //upper side middle piece
    box(50,0,50);
    pop();

    push();
    translate(50, -75, 0);
    fill(arrayR[i[12]],arrayG[i[12]],arrayB[i[12]]);
    box(50,0,50);       //upper side right edge piece
    translate(25,25,0);
    fill(arrayR[i[13]],arrayG[i[13]],arrayB[i[13]]);
    box(0,50,50);
    pop();

    push();
    translate(-50,-50,-75);
    fill(255,255,0);
    box(50,50,0);
    translate(-25,0,25);        //upper side away left corner piece
    fill(0,255,0);
    box(0,50,50);
    translate(25,-25,0);
    fill(255,150,0);
    box(50,0,50);
    pop();

    push();
    translate(0,-50,-75);
    fill(255,255,0);
    box(50,50,0);       //upper side away side piece
    translate(0,-25,25);
    fill(255,150,0);
    box(50,0,50);
    pop();

    push();
    translate(50,-50,-75);
    fill(255,255,0);
    box(50,50,0);       //upper side away right corner piece
    translate(25,0,25);
    fill(0,0,255);
    box(0,50,50);
    translate(-25,-25,0);
    fill(255,150,0);
    box(50,0,50);
    pop();

    push();
    translate(-50,0,75);
    fill(i[22]);
    box(50,50,0); //frontal side left edge piece
    translate(-25,0,-25);
    fill(i[23]);
    box(0,50,50);
    pop();

    push();
    translate(0,0,75);
    fill(arrayR[i[24]],arrayG[i[24]],arrayB[i[24]]);
    box(50,50,0); //frontal side center piece
    pop(); 

    push();
    translate(50,0,75);
    fill(i[25]);
    box(50,50,0); //right frontal side edge piece
    translate(25,0,-25);
    fill(i[26]);
    box(0,50,50);
    pop();

    push();
    translate(-75,0,0);
    fill(0,255,0);      //left side center piece
    box(0,50,50);
    pop();

    push();
    translate(75,0,0);
    fill(0,0,255);      //right side center piece
    box(0,50,50);
    pop();

    push();
    translate(-50,0,-75);
    fill(255,255,0);        //back side  left edge piece
    box(50,50,0);
    translate(-25,0,25);
    fill(0,255,0);
    box(0,50,50);
    pop();

    push();
    translate(0,0,-75);     //back side center piece
    fill(255,255,0);
    box(50,50,0);
    pop();

    push();
    translate(50,0,-75);
    fill(255,255,0);        //back side right edge piece
    box(50,50,0);
    translate(25,0,25);
    fill(0,0,255);
    box(0,50,50);
    pop();

    push()
    translate(-50,50,75);
    fill(255);
    box(50,50,0); //bottom left frontal corner piece
    translate(-25,0,-25);
    fill(0,255,0);
    box(0,50,50);
    translate(25,25,0);
    fill(255,0,0);
    box(50,0,50);
    pop();

    push();
    translate(0,50,75);
    fill(i[45]);
    box(50,50,0); //bottom frontal side edge piece
    translate(0,25,-25);
    fill(i[46]);
    box(50,0,50);
    pop();

    push();
    translate(50,50,75);
    fill(255);
    box(50,50,0); //bottom right frontal corner piece
    translate(25,0,-25);
    fill(0,0,255);
    box(0,50,50);
    translate(-25,25,0);
    fill(255,0,0);
    box(50,0,50);
    pop();

    push();
    translate(-50,75,0);
    fill(255,0,0);
    box(50,0,50);           //bottom side left edge piece
    translate(-25,-25,0);
    fill(0,255,0);
    box(0,50,50);
    pop();
    
    push();
    translate(0,75,0); 
    fill(255,0,0);
    box(50,0,50); //bottom side center piece
    pop();

    push();
    translate(50,75,0);
    fill(255,0,0);
    box(50,0,50);           //bottom side right edge piece
    translate(25,-25,0);
    fill(0,0,255);
    box(0,50,50);
    pop();

    push();
    translate(-50,50,-75);
    fill(255,255,0);
    box(50,50,0);           //back side left bottom corner piece
    translate(-25,0,25);
    fill(0,255,0);
    box(0,50,50);
    translate(25,25,0);
    fill(255,0,0);
    box(50,0,50);
    pop();

    push();
    translate(0,75,-50);
    fill(255,0,0);
    box(50,0,50);           //bottom side away edge piece
    translate(0,-25,-25);
    fill(255,255,0);
    box(50,50,0);
    pop();

    push();
    translate(50,50,-75);
    fill(255,255,0);
    box(50,50,0);       //back side right bottom corner piece
    translate(25,0,25);
    fill(0,0,255);
    box(0,50,50);
    translate(-25,25,0);
    fill(255,0,0);
    box(50,0,50);
    pop();





 













}