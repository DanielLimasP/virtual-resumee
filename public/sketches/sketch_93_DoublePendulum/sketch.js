//Double Pendulum simulation
// Variables de control para la función de colores
var backcolor1 = 0, backcolor2 = 0, backcolor3 = 0, fade = 150;
var c1 = 0, c2 = 0, c3 = 0, c4 = 0;
var rr, rg, rb;
// Variables de control para los offsets de los canvas
var offx = 200;
var offy = 150;
// Variable de longitud de los dos péndulos
var r1 = 50;
var r2 = 100;
// Masas de los péndulos
var m1 = 40;
var m2 = 40;
// Velocidad de los péndulos
var a1_v = 0;
var a2_v = 0;
// Aceleración de los péndulos
var a1, a2;
// Variable global de la gravedad
var g = 1;

function setup(){
   a1 = PI/2;
   a2 = PI/2;
   rr = random(0, 255);
   rg = random(0, 255);
   rb = random(0, 255)
  createCanvas(400, 500);
  cv = createGraphics(400, 500);
  cv.background(255);
}

function draw(){

  var num1 = -g * (2 * m1 + m2) * sin(a1);
  var num2 = -m2 * g * sin(a1 - 2 * a2);
  var num3 = -2 * sin(a1-a2) * m2;
  var num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * cos(a1 - a2);
  var den1 = r1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));

  var a1_a = (num1 + num2 + num3 * num4) / den1;

  var num5 = 2 * sin(a1-a2);
  var num6 = (a1_v * a1_v * r1 * (m1 + m2));
  var num7 = g * (m1 + m2) * cos(a1);
  var num8 = a2_v * a2_v * r2 * m2 * cos(a1-a2);
  var den2 = r2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));

  var a2_a = (num5 * (num6 + num7 + num8)) / den2;

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

  a1_v += a1_a;
  a2_v += a2_a;
  a1 += a1_v;
  a2 += a2_v;

push();
  cv.strokeWeight(10);
  cv.stroke(backcolor1, backcolor2, backcolor3, fade);
  if(frameCount > 1){
    cv.point(x2 + offx, y2 + offy);
  }
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
    fade = 150;
  }
}
