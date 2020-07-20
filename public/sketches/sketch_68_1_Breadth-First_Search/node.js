function Node(value, type) {
  this.value = value;
  this.edges = [];
  this.searched = false;
  this.parent = null;
  this.type = type;
}

Node.prototype.addEdge = function(neighbor) {
  this.edges.push(neighbor);
  neighbor.edges.push(this);
}
Node.prototype.show = function(x, y){
    switch(this.type){
        case 1:
            // Círculo
            fill(255);
            stroke(0);
            ellipse(x, y, 150, 150);
            //line(neighbor.x, neighbor.y, this.x, this.y);
            // Texto
            fill(0);
            stroke(255);
            textSize(20);
            textAlign(CENTER);
            text(this.value, x, y);
            break;
        case 2:
            // Círculo
            fill(0);
            stroke(255);
            ellipse(x, y, 150, 150);
            //line(neighbor.x, neighbor.y, this.x, this.y);
            // Texto
            fill(255);
            stroke(0);
            textSize(20);
            textAlign(CENTER);
            text(this.value, x, y);
            break;
    }
    
        
}

