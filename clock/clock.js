var hours;
var minutes;
var seconds;

function setup() {
    createCanvas(600,600);
}

function draw() {
    hours = hour();
    background(51);
    minutes = minute();
    seconds = second();
    console.log(hours, minutes, seconds);
    clockCover();
    ampm();
    secondsDraw();
    minutesDraw();
    hoursDraw();
    
}

function clockCover() {
    ellipseMode(CENTER);
    noFill();
    stroke(0);
    strokeWeight(10);
    ellipse(300, 300, 312,312);
    console.log(mouseX, mouseY);
}

function secondsDraw() {
    let secondsr = map(seconds, 0, 60, -89, 270);
    angleMode(DEGREES);
    noFill();
    stroke(100,25,0);
    strokeWeight(10);
    arc(300,300,300,300,270, secondsr, OPEN);
    
    console.log(secondsr);

}

function minutesDraw() {
    let minutesr = map(minutes, 0, 60, -89, 270);
    angleMode(DEGREES);
    noFill();
    stroke(75,50,0);
    strokeWeight(12);
    arc(300,300,275,275,270, minutesr, OPEN);
    console.log(minutesr);

}

function hoursDraw() {
    let hoursr = map(hours, 0, 24, -89, 630);
    angleMode(DEGREES);
    fill(50,75,0);
    stroke(50,75,0);
    strokeWeight(14);
    arc(300,300,250,250,270, hoursr, PIE);
    rotate(270);
    console.log(hoursr);
}

function ampm() {
    fill(100,0,100);
    if (hours >= 12) {
        console.log('pm');
        textSize(72);
        textAlign(CENTER);
        text('PM',500,550);
    } else {
        console.log('am');
        textSize(72);
        textAlign(CENTER);
        text('AM',500,550);
    }
}