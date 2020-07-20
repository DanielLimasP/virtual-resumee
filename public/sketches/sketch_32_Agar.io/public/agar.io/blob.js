function Blob(r, x, y, name){
  //Variables de la masa
  this.pos = createVector(x, y);
  this.r = r;
  this.vel = createVector(0, 0);
  this.alive = true;

  this.update = function(){
    var newvel = createVector(mouseX-width/2, mouseY-height/2)
    newvel.setMag(3);
    this.vel.lerp(newvel, 0.1);
    this.pos.add(this.vel);
  }

  this.eats = function(other){
    var d = p5.Vector.dist(this.pos, other.pos);
    if(d < this.r + other.r){
      //this.r += other.r/10;
      var sum = PI * this.r * this.r + PI * other.r * other.r;
      this.r = sqrt(sum / PI);
      return true;
    }else{
      return false;
    }
  }

  this.show = function(){
    stroke(0);
    strokeWeight(0.5);
    fill(73, 186, 110);
    ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
  }

  this.constrain = function(){
    blob.pos.x = constrain(blob.pos.x, -width, width);
    blob.pos.y = constrain(blob.pos.y, -height, height);
  }

  this.multipleBlobs = function(blobs){
    for(var i = blobs.length-1; i >= 0; i--){
      var id = blobs[i].id;
      if(id !== socket.id){
        fill(255);
        ellipse(blobs[i].x, blobs[i].y, blobs[i].r*2, blobs[i].r*2);
        fill(0);
        textAlign(CENTER);
        textSize(4);
        text(blobs[i].id, blobs[i].x, blobs[i].y + blobs[i].r*1.40);
      }
    }
  }
}
