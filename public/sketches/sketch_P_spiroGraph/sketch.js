var backcolor1 = 0, backcolor2 = 0, backcolor3 = 0, fade = 150;
var c1 = 0, c2 = 0, c3 = 0, c4 = 0;
var rr, rg, rb;

var offx = 175;
var offy = 185;

var r1 = 90;
var r2 = 90;
var m1 = 10;
var m2 = 10;
var a1 = 0;
var a2 = 0;
var a1_v = 1;
var a2_v = 7;
var a1_a = 0.000;
var a2_a = -0.000;

function setup(){
   rr = random(0, 255);
   rg = random(0, 255);
   rb = random(0, 255)
  createCanvas(350, 370);
  cv = createGraphics(350, 370);
  cv.background(255);
}

function draw(){
  frameRate(15);
  background(0);
  image(cv, 0, 0);
  stroke(0);
  strokeWeight(2);

  translate(offx, offy);

  var x1 = r1 * sin(a1);
  var y1 = r1 * cos(a1);

  var x2 = x1 + r2 * sin(a2);
  var y2 = y1 + r2 * cos(a2);

  fill(backcolor1, backcolor2, backcolor3, fade);
  line(0, 0, x1, y1);
  ellipse(x1, y1, m1, m1);

  line(x1, y1, x2, y2);
  ellipse(x2, y2, m2, m2);

  a1 += a1_v;
  a2 -= a2_v;

  a1_v += a1_a;
  a2_v += a2_a;

push();
  cv.strokeWeight(5);
  cv.stroke(backcolor1, backcolor2, backcolor3, fade);
  cv.point(x2 + offx, y2 + offy);
pop();

color_loop_fade();
}

function color_loop_fade(){
  // Rojo
  if(backcolor1 < rr){
  backcolor1++;
  c1++;
  }else{
   backcolor1--;
   c1++;
  }
  if(c1 == 200){
    c1 = 0;
    rr = random(255);
    // Verde
  }if(backcolor2 < rg){
  backcolor2++;
  c2++;
  }else{
   backcolor2--;
   c2++;
  }
  if(c2 == 200){
    c2 = 0;
    rg = random(255);
  }
  // Azul
  if(backcolor3 < rb){
  backcolor3++;
  c3++;
  }else{
   backcolor3--;
   c3++;
  }
  if(c3 == 200){
    c3 = 0;
    rb = random(255);
  }
  if(fade > c4){
    fade--;
  }else{
    fade = 150
  }
}
