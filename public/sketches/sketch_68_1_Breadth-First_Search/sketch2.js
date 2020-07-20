var data;
var graph;
var dropdown;

function preload() {
  data = loadJSON('kevinbacon.json');
}

function setup() {
  createCanvas(1200, 900);
  background(51);
  graph = new Graph();
  dropdown = createSelect();
  
  //console.log(data);

  var movies = data.movies;

  for (var i = 0; i < movies.length; i++) {
    var movie = movies[i].title;
    var cast = movies[i].cast;
    var movieNode = new Node(movie, 1);
    graph.addNode(movieNode);
    for (var j = 0; j < cast.length; j++) {
      var actor = cast[j];
      var actorNode = graph.getNode(actor);
      if (actorNode == undefined) {
        actorNode = new Node(actor, 2);
        dropdown.option(actor);
      }
      graph.addNode(actorNode);
      movieNode.addEdge(actorNode);
    }
  }
}

function bfs() {
var x = 100;
var y = height/2;
  graph.reset();
  var start = graph.setStart(dropdown.value());
  // var start = graph.setStart("Kevin Bacon");
  var end = graph.setEnd("Kevin \nBacon");

  console.log(graph);

  var queue = [];
    
  start.searched = true;
  queue.push(start);

  while (queue.length > 0) {
    var current = queue.shift();
    if (current == end) {
      console.log("Found " + current.value);
      break;
    }
    var edges = current.edges;
    for (var i = 0; i < edges.length; i++) {
      var neighbor = edges[i];
      if (!neighbor.searched) {
        neighbor.searched = true;
        neighbor.parent = current;
        queue.push(neighbor);
      }
    }
  }
  var path = [];
  path.push(end);
  var next = end.parent;
  while (next != null) {
    path.push(next);
    next = next.parent;
  }
  var txt = '';
  for (var i = path.length - 1; i >= 0; i--) {
    var n = path[i];
    n.show(x, y);
    txt += n.value
    if (i != 0) {
      txt += ' --> '
    };
    x += 170;
      
  }
  createP(txt);
    y += 120;
}

function draw(){
    dropdown.changed(bfs);
}