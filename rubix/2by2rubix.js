var i = [0,4,0,3,4,0,2,5,0,3,5,0,2,4,1,3,4,1,2,5,1,3,5,1,2];
i[1]=4; i[2]=0; i[3]=3;
i[4]=4; i[5]=0; i[6]=2;
i[7]=5; i[8]=0; i[9]=3;
i[10]=5; i[11]=0; i[12]=2;
i[13]=4; i[14]=1; i[15]=3;
i[16]=4; i[17]=1; i[18]=2;
i[19]=5; i[20]=1; i[21]=3;
i[22]=5; i[23]=1; i[24]=2;
var setNumbers=[0,4,0,3,4,0,2,5,0,3,5,0,2,4,1,3,4,1,2,5,1,3,5,1,2];

//induvidual cube color variables
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
//90degrees turn in radians
var turn = 3.1415926535897932384626/2;

var angleX=0;
var angleY=0;
var angleZ=0;
//function variables
var leftFn=false;
var rightFn=false;
var upFn=false;
var downFn=false;
var backFn=false;
var frontFn=false;
//miscellanious
var bg = 100;
var r = false;
var randomValue;
var a =0;
var l=0;
var matching;
function setup() {
    createCanvas(400,400, WEBGL);
    checkWin();
}

function draw() {
 
    background(bg);
    rotateX(angleX);
    rotateY(angleY);
    rotateZ(angleZ);
    drawCube();

    if (l===50) {l=0}; 
    if(keyIsDown(16)) {shiftIsDown=true; bg = 150;} else  {bg = 100;shiftIsDown=false;}
    if (shiftIsDown===false) {frontFn=false; backFn=false;}
    if (i[1]>5) {i[1]=0;} if (i[2]>5) {i[2]=0;} if (i[3]>5) {i[3]=0;} if (i[4]>5) {i[4]=0;} if (i[5]>5) {i[5]=0;} if (i[6]>5) {i[6]=0;} if (i[7]>5) {i[7]=0;} if (i[8]>5) {i[8]=0;}
    if (i[9]>5) {i[9]=0;} if (i[10]>5) {i[10]=0;} if (i[11]>5) {i[11]=0;} if (i[12]>5) {i[12]=0;} if (i[13]>5) {i[13]=0;} if (i[14]>5) {i[14]=0;} if (i[15]>5) {i[15]=0;} if (i[16]>5) {i[16]=0;}
    if (i[17]>5) {i[17]=0;} if (i[18]>5) {i[18]=0;} if (i[19]>5) {i[19]=0;} if (i[20]>5) {i[20]=0;} if (i[21]>5) {i[21]=0;} if (i[22]>5) {i[22]=0;} if (i[23]>5) {i[23]=0;} if (i[24]>5) {i[24]=0;}  
}

function keyPressed() {
    if (r===true && keyCode===82) {console.log('RANDOM!'); randomize(); } else {r=false;}
    if (keyCode===82 && r===false) {r=true;} //second r press randomizer
    //cubemover buttons (W,A,S,D)
    if (keyCode===87) {angleX+=0.1;}
    if (keyCode===83) {angleX-=0.1;}
    if (keyCode===65) {angleY-=0.1;}
    if (keyCode===68) {angleY+=0.1;}
    if (keyCode===81) {angleZ-=0.1;}
    if (keyCode===69) {angleZ+=0.1;}
    if (keyCode===32) {leftFn=false; rightFn=false; upFn=false; downFn=false;} //pressing space resets selection
    
    if (keyCode===LEFT_ARROW && upFn===false && downFn===false && shiftIsDown === false) {
        leftFn=true;
        rightFn=false;
        upFn=false;
        downFn=false;
    }
    if (keyCode===RIGHT_ARROW && upFn===false && downFn===false && shiftIsDown===false) {
        rightFn=true;
        leftFn=false;
        upFn=false;
        downFn=false;
    }
    if (keyCode===UP_ARROW && leftFn===false && rightFn===false && shiftIsDown===false) {
        upFn=true;
        downFn=false;
        leftFn=false;
        rightFn=false;
    }
    if (keyCode===DOWN_ARROW && leftFn===false && rightFn===false && shiftIsDown===false) {
        downFn=true;
        upFn=false;
        leftFn=false;
        rightFn=false;
    }
    if (keyCode===UP_ARROW && shiftIsDown===true) {
        backFn=true;
        frontFn=false;
        downFn=false;
        upFn=false;
        leftFn=false;
        rightFn=false;
    }
    if (keyCode===DOWN_ARROW && shiftIsDown===true) {
        frontFn=true;
        backFn=false;
        downFn=false;
        upFn=false;
        leftFn=false;
        rightFn=false;
    }
    //turning functions
    if (leftFn===true&&rightFn===false) {
        if (keyCode===UP_ARROW) {
            leftFn=false;
            leftFnUp();
        }
        if (keyCode===DOWN_ARROW) {
            leftFn=false;
            leftFnDown();
        }
    }
    if (rightFn===true  && shiftIsDown===false) {
        if (keyCode===UP_ARROW) {
            rightFn=false;
            rightFnUp();
        }
        if (keyCode===DOWN_ARROW) {
            rightFn=false;
            rightFnDown();
        }
    }
    if (upFn===true && shiftIsDown===false) {
        if (keyCode===LEFT_ARROW) {
            upFn=false;
            upFnLeft();
            
        }
        if (keyCode===RIGHT_ARROW) {
            upFn=false;
            upFnRight();
            
        }
    }
    if (downFn===true) {
        if (keyCode===LEFT_ARROW) {
            downFn=false;
            downFnLeft();
        }
        if (keyCode===RIGHT_ARROW) {
            downFn=false;
            downFnRight();
        }
    }
    if (backFn===true) {
        if (keyCode===RIGHT_ARROW) {
            backFn=false;
            backFnRight();
        }
        if (keyCode===LEFT_ARROW) {
            backFn=false;
            backFnLeft();
        }
    }
    if (frontFn===true) {
        if (keyCode===RIGHT_ARROW) {
            frontFn=false;
            frontFnRight();
        }
        if (keyCode===LEFT_ARROW) {
            frontFn=false;
            frontFnLeft();
        }
    }
}

function checkWin() {
    setInterval(function() {
    for(let a = i.length; a--;) {
        if(i[a] !== setNumbers[a])
            {matching=false}
     else if (matching!=false) {console.log('WIN');} }  
},1000);}
function randomize() {
    if (l<50) {
        setTimeout(function() {
        randomValue=Math.floor(random(1,13));
        if(randomValue===1) {leftFnUp();}
        if(randomValue===2) {leftFnDown();}
        if(randomValue===3) {rightFnUp();}
        if(randomValue===4) {rightFnDown();}
        if(randomValue===5) {upFnLeft();}
        if(randomValue===6) {upFnRight();}
        if(randomValue===7) {downFnLeft();}
        if(randomValue===8) {downFnRight();}
        if(randomValue===9) {backFnLeft();}
        if(randomValue===10) {backFnRight();}
        if(randomValue===11) {frontFnLeft();}
        if(randomValue===12) {frontFnRight();}
        l++;
        randomize(); 
        },30);
    }
}

function drawCube() {
    //arrow type thing above cube
    push();
    stroke(20);
    strokeWeight(1);
    fill(255,0,255);
    translate(0,-150,0);
    cone(10,-20);
    rotateX(-turn);
    translate(0,-20,10);
    cone(10,-20);
    pop();
    
    //drawing the cube itself
    strokeWeight(2);
    stroke(0);
    push();
    translate(-25,-25,50);
    if(leftFn===true || upFn===true || frontFn===true) {stroke(255,0,255); strokeWeight(5);}
    fill(arrayR[i[1]],arrayG[i[1]],arrayB[i[1]]);            //upper frontal left
    box(50,50,0);
    translate(0,-25,-25);
    fill(arrayR[i[2]],arrayG[i[2]],arrayB[i[2]]);
    box(50,0,50);
    translate(-25,25,0);
    fill(arrayR[i[3]],arrayG[i[3]],arrayB[i[3]]);
    box(0,50,50);
    pop();

    strokeWeight(2);
    stroke(0);
    if(rightFn===true || upFn===true || frontFn===true) {stroke(255,0,255); strokeWeight(5);}
    push();
    translate(25,-25,50);
    fill(arrayR[i[4]],arrayG[i[4]],arrayB[i[4]]);            //upper frontal right
    box(50,50,0);
    translate(0,-25,-25);
    fill(arrayR[i[5]],arrayG[i[5]],arrayB[i[5]]);
    box(50,0,50);
    translate(25,25,0);
    fill(arrayR[i[6]],arrayG[i[6]],arrayB[i[6]]);
    box(0,50,50);
    pop()

    strokeWeight(2);
    stroke(0);
    if(leftFn===true || upFn===true || backFn===true) {stroke(255,0,255); strokeWeight(5);}
    push();
    translate(-25,-25,-50);
    fill(arrayR[i[7]],arrayG[i[7]],arrayB[i[7]]);            //upper away left
    box(50,50,0);
    translate(0,-25,25);
    fill(arrayR[i[8]],arrayG[i[8]],arrayB[i[8]]);
    box(50,0,50);
    translate(-25,25,0);
    fill(arrayR[i[9]],arrayG[i[9]],arrayB[i[9]]);
    box(0,50,50);
    pop()

    strokeWeight(2);
    stroke(0);
    if(rightFn===true || upFn===true || backFn===true) {stroke(255,0,255); strokeWeight(5);}
    push();
    translate(25,-25,-50);
    fill(arrayR[i[10]],arrayG[i[10]],arrayB[i[10]]);            //upper away right
    box(50,50,0);
    translate(0,-25,25);
    fill(arrayR[i[11]],arrayG[i[11]],arrayB[i[11]]);
    box(50,0,50);
    translate(25,25,0);
    fill(arrayR[i[12]],arrayG[i[12]],arrayB[i[12]]);
    box(0,50,50);
    pop()

    strokeWeight(2);
    stroke(0);
    if(leftFn===true || downFn===true || frontFn===true) {stroke(255,0,255); strokeWeight(5);}
    push();
    translate(-25,25,50);
    fill(arrayR[i[13]],arrayG[i[13]],arrayB[i[13]]);            //bottom frontal left
    box(50,50,0);
    translate(0,25,-25);
    fill(arrayR[i[14]],arrayG[i[14]],arrayB[i[14]]);
    box(50,0,50);
    translate(-25,-25,0);
    fill(arrayR[i[15]],arrayG[i[15]],arrayB[i[15]]);
    box(0,50,50);
    pop()

    strokeWeight(2);
    stroke(0);
    if(rightFn===true || downFn===true || frontFn===true) {stroke(255,0,255); strokeWeight(5);}
    push();
    translate(25,25,50);
    fill(arrayR[i[16]],arrayG[i[16]],arrayB[i[16]]);            //bottom frontal right
    box(50,50,0);
    translate(0,25,-25);
    fill(arrayR[i[17]],arrayG[i[17]],arrayB[i[17]]);
    box(50,0,50);
    translate(25,-25,0);
    fill(arrayR[i[18]],arrayG[i[18]],arrayB[i[18]]);
    box(0,50,50);
    pop()

    strokeWeight(2);
    stroke(0);
    if(leftFn===true || downFn===true || backFn===true) {stroke(255,0,255); strokeWeight(5);}
    push();
    translate(-25,25,-50);
    fill(arrayR[i[19]],arrayG[i[19]],arrayB[i[19]]);            //bottom away left
    box(50,50,0);
    translate(0,25,25);
    fill(arrayR[i[20]],arrayG[i[20]],arrayB[i[20]]);
    box(50,0,50);
    translate(-25,-25,0);
    fill(arrayR[i[21]],arrayG[i[21]],arrayB[i[21]]);
    box(0,50,50);
    pop()

    strokeWeight(2);
    stroke(0);
    if(rightFn===true || downFn===true || backFn===true) {stroke(255,0,255); strokeWeight(5);}
    push();
    translate(25,25,-50);
    fill(arrayR[i[22]],arrayG[i[22]],arrayB[i[22]]);            //bottom away right
    box(50,50,0);
    translate(0,25,25);
    fill(arrayR[i[23]],arrayG[i[23]],arrayB[i[23]]);
    box(50,0,50);
    translate(25,-25,0);
    fill(arrayR[i[24]],arrayG[i[24]],arrayB[i[24]]);
    box(0,50,50);
    pop()
}

function leftFnUp() {
    i1stored=i[1];
    i2stored=i[2];
    i3stored=i[3];
    i7stored=i[7];
    i8stored=i[8];
    i9stored=i[9];
    i[1]=i[14];
    i[2]=i[13];
    i[3]=i[15];
    i[7]=i2stored;
    i[8]=i1stored;
    i[9]=i3stored;
    i[13]=i[20];
    i[14]=i[19];
    i[15]=i[21];
    i[19]=i8stored;
    i[20]=i7stored;
    i[21]=i9stored;
}

function leftFnDown() {
    i1stored=i[1];
    i2stored=i[2];
    i3stored=i[3];
    i13stored=i[13];
    i14stored=i[14];
    i15stored=i[15];
    i[1]=i[8];
    i[2]=i[7];
    i[3]=i[9];
    i[7]=i[20];
    i[8]=i[19];
    i[9]=i[21];
    i[13]=i2stored;
    i[14]=i1stored;
    i[15]=i3stored;
    i[19]=i14stored;
    i[20]=i13stored;
    i[21]=i15stored;
}

function rightFnUp() {
    i4stored=i[4];
    i5stored=i[5];
    i6stored=i[6];
    i10stored=i[10];
    i11stored=i[11];
    i12stored=i[12];
    i[4]=i[17];
    i[5]=i[16];
    i[6]=i[18];
    i[10]=i5stored;
    i[11]=i4stored;
    i[12]=i6stored;
    i[16]=i[23];
    i[17]=i[22];
    i[18]=i[24];
    i[22]=i11stored;
    i[23]=i10stored;
    i[24]=i12stored;
}

function rightFnDown() {
    i4stored=i[4];
    i5stored=i[5];
    i6stored=i[6];
    i16stored=i[16];
    i17stored=i[17];
    i18stored=i[18];
    i[4]=i[11];
    i[5]=i[10];
    i[6]=i[12];
    i[10]=i[23];
    i[11]=i[22];
    i[12]=i[24];
    i[16]=i5stored;
    i[17]=i4stored;
    i[18]=i6stored;
    i[22]=i17stored;
    i[23]=i16stored;
    i[24]=i18stored;
}

function upFnLeft() {
    i1stored=i[1];
    i2stored=i[2];
    i3stored=i[3];
    i4stored=i[4];
    i5stored=i[5];
    i6stored=i[6];
    i[1]=i[9];
    i[2]=i[8];
    i[3]=i[7];
    i[4]=i3stored;
    i[5]=i2stored;
    i[6]=i1stored;
    i[7]=i[12];
    i[8]=i[11];
    i[9]=i[10];
    i[10]=i6stored;
    i[11]=i5stored;
    i[12]=i4stored;
}

function upFnRight() {
    i1stored=i[1];
    i2stored=i[2];
    i3stored=i[3];
    i7stored=i[7];
    i8stored=i[8];
    i9stored=i[9];
    i[1]=i[6];
    i[2]=i[5];
    i[3]=i[4];
    i[4]=i[12];
    i[5]=i[11];
    i[6]=i[10];
    i[7]=i3stored;
    i[8]=i2stored;
    i[9]=i1stored;
    i[10]=i9stored;
    i[11]=i8stored;
    i[12]=i7stored;
}

function downFnLeft() {
    i13stored=i[13];
    i14stored=i[14];
    i15stored=i[15];
    i16stored=i[16];
    i17stored=i[17];
    i18stored=i[18];
    i[13]=i[21];
    i[14]=i[20];
    i[15]=i[19];
    i[16]=i15stored;
    i[17]=i14stored;
    i[18]=i13stored;
    i[19]=i[24];
    i[20]=i[23];
    i[21]=i[22];
    i[22]=i18stored;
    i[23]=i17stored;
    i[24]=i16stored;
}

function downFnRight() {
    i13stored=i[13];
    i14stored=i[14];
    i15stored=i[15];
    i19stored=i[19];
    i20stored=i[20];
    i21stored=i[21];
    i[13]=i[18];
    i[14]=i[17];
    i[15]=i[16];
    i[16]=i[24];
    i[17]=i[23];
    i[18]=i[22];
    i[19]=i15stored;
    i[20]=i14stored;
    i[21]=i13stored;
    i[22]=i21stored;
    i[23]=i20stored;
    i[24]=i19stored;
}

function backFnRight() {
    i7stored=i[7];
    i8stored=i[8];
    i9stored=i[9];
    i10stored=i[10];
    i11stored=i[11];
    i12stored=i[12];
    i[7]=i[19];
    i[8]=i[21];
    i[9]=i[20];
    i[10]=i7stored;
    i[11]=i9stored;
    i[12]=i8stored;
    i[19]=i[22];
    i[20]=i[24];
    i[21]=i[23];
    i[22]=i10stored;
    i[23]=i12stored;
    i[24]=i11stored;
}

function backFnLeft() {
    i7stored=i[7];
    i8stored=i[8];
    i9stored=i[9];
    i19stored=i[19];
    i20stored=i[20];
    i21stored=i[21];
    i[7]=i[10];
    i[8]=i[12];
    i[9]=i[11];
    i[10]=i[22];
    i[11]=i[24];
    i[12]=i[23];
    i[19]=i7stored;
    i[20]=i9stored;
    i[21]=i8stored;
    i[22]=i19stored;
    i[23]=i21stored;
    i[24]=i20stored;
}

function frontFnRight() {
    i1stored=i[1];
    i2stored=i[2];
    i3stored=i[3];
    i4stored=i[4];
    i5stored=i[5];
    i6stored=i[6];
    i[1]=i[13];
    i[2]=i[15];
    i[3]=i[14];
    i[4]=i1stored;
    i[5]=i3stored;
    i[6]=i2stored;
    i[13]=i[16];
    i[14]=i[18];
    i[15]=i[17];
    i[16]=i4stored;
    i[17]=i6stored;
    i[18]=i5stored;
}

function frontFnLeft() {
    i1stored=i[1];
    i2stored=i[2];
    i3stored=i[3];
    i13stored=i[13];
    i14stored=i[14];
    i15stored=i[15];
    i[1]=i[4];
    i[2]=i[6];
    i[3]=i[5];
    i[4]=i[16];
    i[5]=i[18];
    i[6]=i[17];
    i[13]=i1stored;
    i[14]=i3stored;
    i[15]=i2stored;
    i[16]=i13stored;
    i[17]=i15stored;
    i[18]=i14stored;
}