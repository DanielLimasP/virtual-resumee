/*
Script para programación web 
*/
var ch = window.innerHeight;
var cw = window.innerWidth;
var dots = [];
var fadeInterval = 0.8;
var largeHeader;
window.addEventListener('resize', resize);

function setup(){
    largeHeader = document.getElementById('large-header');
    largeHeader.style.height = ch+'px';
    createCanvas(cw, ch);
    for(var i = 0; i < 3; i++){
        dot = new points();
        dot.generatePoints();
        dots.push(dot);
    }
}
function draw(){
    background(random(0));
    //background(random(140, 150),random(230, 250),random(0, 50));
    //translate(innerWidth/2-300, innerHeight/2-300);
    dots.forEach(function(dot){
        dot.render();
    });
}
function p(x, y, r, opacity){
    this.opacity = opacity;
    this.r = r;
    this.x = x;
    this.y = y;
}
function points(){
    var cont = 0;
    this.ps = [];
    this.totalPoints = round(random(50, 60));
    this.generatePoints = function(){
        var opacity = 255;
        for(var i = 0; i <= this.totalPoints; i++){
            pp = new p(random(width), random(height), random(5, 10), opacity);
            this.ps.push(pp);
        }  
    }
    this.render = function(){
        this.ps.forEach(function(pp){
            noStroke();
            fill(random(100, 250), 0, random(0, 250), pp.opacity);  
            circle(pp.x, pp.y, pp.r);  
            if(cont == 20){
                pp.x = random(width);
                pp.y = random(height);
                pp.r = random(5, 10);
                cont = 0;
            }
        cont++;
        });
    }
}
function resize() {
        cw = window.innerWidth;
        ch = window.innerHeight;
        largeHeader.style.height = ch+'px';
        resizeCanvas(cw, ch);
    }




