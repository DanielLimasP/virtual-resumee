var backcolor1 = 0, backcolor2 = 0, backcolor3 = 0, fade = 150;
var c1 = 0, c2 = 0, c3 = 0, c4 = 0;
var rr, rg, rb;

var cities = [];
var totalCities = 7;
var order = [];

var totalPermutations;
var count = 0;

var recordDistance;
var bestEver;

function setup(){
  //frameRate(5);
  createCanvas(400, 600);
  for(var i = 0; i < totalCities; i++){
    var v = createVector(random(width), random(height/2));
    cities[i] = v;
    order[i] = i;
  }
  var d = calcDistance(cities, order);
  recordDistance = d;
  bestEver = order.slice();

  totalPermutations = factorial(totalCities);
  console.log(totalPermutations);
}

function draw(){
  background(0);
  fill(backcolor1, backcolor2, backcolor3);
  for(var i = 0; i < cities.length; i++){
    ellipse(cities[i].x, cities[i].y, 8, 8);
  }
  //Mejor camino
  stroke(backcolor1, backcolor2, backcolor3);
  strokeWeight(4);
  noFill()
  beginShape();
  for(var i = 0; i < order.length; i++){
    var n = bestEver[i];
    vertex(cities[n].x, cities[n].y);
  }
  endShape();

  // Probando caminos
  translate(0, height/2);
  stroke(255);
  strokeWeight(2);
  noFill();
  beginShape();
  for(var i = 0; i < order.length; i++){
    var n = order[i];
    vertex(cities[n].x, cities[n].y);
  }
  endShape();
/*
  var i = floor(random(cities.length));
  var j = floor(random(cities.length));
  swap(cities, i, j);
*/

  var d = calcDistance(cities, order);

  if(d < recordDistance){
    recordDistance = d;
    bestEver = order.slice();
    console.log(recordDistance);
  }

  textSize(32);
/*
  var s = '';
  for(var i = 0; i < order.length; i++){
    s += order[i];
  }
*/
/*
  fill(255);
  text(s, 20, height - 50);
*/
  var percent = 100 * (count / totalPermutations);
  text(nf(percent, 0, 2) + "% completed", 20, height / 2 - 5);
  nextOrder();
  color_loop();
}

function swap(a, i, j){
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

function calcDistance(points, order){
  var sum = 0;
  for(var i = 0; i < order.length-1; i++){
    var cityAIndex = order[i];
    var cityA = points[cityAIndex];
    var cityBIndex = order[i+1];
    var cityB = points[cityBIndex];
    var d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
    sum += d;
  }
  return sum;
}

function nextOrder(){
  count++;
  //Paso 1:
    var largestI = -1;
    for(var i = 0; i < order.length; i++){
      if(order[i] < order[i+1]){
        largestI = i;
      }
    }
    if(largestI == -1){
      noLoop();
      console.log('finished');
    }

  //Paso 2:
    var largestJ = -1;
    for(var j = 0; j < order.length; j++){
      if(order[largestI] < order[j]){
        largestJ = j;
      }
    }

  //Paso 3:
    swap(order, largestI, largestJ);

  //Paso 4:
    var endArray = order.splice(largestI+1);
    endArray.reverse();
    order = order.concat(endArray);
}

function factorial(n){
  if(n === 1){
    return 1;
  }else{
    return n * factorial(n-1);
  }
}

function color_loop(){
  // Rojo
  if(backcolor1 < rr){
  backcolor1+=10;
  c1+=10;
  }else{
   backcolor1-=10;
   c1+=10;
  }
  if(c1 == 200){
    c1 = 0;
    rr = random(255);
    // Verde
  }if(backcolor2 < rg){
  backcolor2+=10;
  c2+=10;
  }else{
   backcolor2-=10;
   c2+=10;
  }
  if(c2 == 200){
    c2 = 0;
    rg = random(255);
  }
  // Azul
  if(backcolor3 < rb){
  backcolor3+=10;
  c3+=10;
  }else{
   backcolor3-=10;
   c3+=10;
  }
  if(c3 == 200){
    c3 = 0;
    rb = random(255);
  }
}
