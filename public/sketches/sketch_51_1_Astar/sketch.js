var backcolor1 = 0, backcolor2 = 0, backcolor3 = 0, fade = 150;
var c1 = 0, c2 = 0, c3 = 0, c4 = 0;
var rr, rg, rb;

// Function to delete element from the array
function removeFromArray(arr, elt) {
  // Could use indexOf here instead to be more efficient
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == elt) {
      arr.splice(i, 1);
    }
  }
}

// An educated guess of how far it is between two points
function heuristic(a, b) {
  var d = dist(a.i, a.j, b.i, b.j);
  //var d = abs(a.i - b.i) + abs(a.j - b.j);
  return d;
}

// How many columns and rows?
var cols = 50;
var rows = 50;

// This will be the 2D array
var grid = new Array(cols);

// Open and closed set
var openSet = [];
var closedSet = [];

// Start and end
var start;
var end;

// Width and height of each cell of grid
var w, h;

// The road taken
var path = [];

function setup() {
  createCanvas(600, 600);
  console.log('A*');

  // Grid cell size
  w = width / cols;
  h = height / rows;

  // Making a 2D array
  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }

  // All the neighbors
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }


  // Start and end
  start = grid[0][0];
  end = grid[cols - 1][rows - 1];
    
    start.wall = false;
    end.wall = false;
    
  // openSet starts with beginning only
  openSet.push(start);
}

function draw() {

  // Am I still searching?
  if (openSet.length > 0) {

    // Best next option
    var winner = 0;
    for (var i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }
    var current = openSet[winner];

    // Done?
    if (current === end) {
      noLoop();
      console.log("DONE!");
    }

    // Best option moves from openSet to closedSet
    removeFromArray(openSet, current);
    closedSet.push(current);

    // Check all the neighbors
    var neighbors = current.neighbors;
    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];

      // Valid next spot?
      if (!closedSet.includes(neighbor) && !neighbor.wall) {
        var tempG = current.g + 1;

        var newPath = false;
        // Better path than before?
        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
            newPath = true;
          }
        } else {
          neighbor.g = tempG;
          newPath = true;
          openSet.push(neighbor);
        }

        // Better path
        if(newPath){
             neighbor.h = heuristic(neighbor, end);
             neighbor.f = neighbor.g + neighbor.h;
             neighbor.previous = current;
        }
          
      }

    }
  // No solution
  } else {
    console.log('no solution');
    noLoop();
    return;
  }

  // Draw current state of everything
  background(255);

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }

  for (var i = 0; i < closedSet.length; i++) {
    closedSet[i].show(color(255, 0, 0, 10));
  }

  for (var i = 0; i < openSet.length; i++) {
    openSet[i].show(color(0, 255, 0, 10));
  }


  // Find the path by working backwards
  path = [];
  var temp = current;
  path.push(temp);
  while (temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }
    noFill();
    stroke(255, 0, 200);
    strokeWeight(w / 2);
    beginShape();
   for (var i = 0; i < path.length; i++) {
    vertex(path[i].i*w + w / 2, path[i].j*h + h / 2);
       //path[i].show(color(0, 0, 255, 200));
   }
    endShape();
}


//Implementar la función en el loop draw
function color_loop(){
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
}
