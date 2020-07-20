var offsetL = 200;
var offsetR = 200;
var offset = 100;
var cont = 0;

function Node(val, x, y){
    this.value = val;
    this.left = null;
    this.right = null;
    this.x = x;
    this.y = y;
}

Node.prototype.search = function(val, level){
    if(this.value == val){
        console.log("Found " +val);
        //return this;
        return level;
       }else if(val < this.value && this.left != null){
            return this.left.search(val, level+1);
        }else if(val > this.value && this.right != null){
            return this.right.search(val, level +1);
        }
        return null;
}

Node.prototype.show = function(parent){
        fill(255);
        textSize(20);
        noStroke();
        textAlign(CENTER);
        stroke(random(100, 150), random(250, 255), random(110, 150));
        noFill();
        ellipse(this.x, this.y, 40, 40);
        line(parent.x, parent.y, this.x, this.y);
        text(this.value, this.x, this.y);
}

Node.prototype.visit = function(parent){
    if(this.left != null){
        this.left.visit(this);
    }
        //console.log(this.value);
        this.show(parent);
    if(this.right != null){
        this.right.visit(this);
    }
}

Node.prototype.addNode = function(n){
    cont++;
    if(cont % 2 == 0){
       offset = offset * 0.9;
       }
    if(n.value < this.value){
        if(this.left == null){
            this.left = n;
            this.left.x = this.x - offset;
            this.left.y = this.y + 60;
            //offsetL = offsetL / 2;
        }else{
            this.left.addNode(n);
        }
       }else if(n.value > this.value){
            if(this.right == null){
               this.right = n;
               this.right.x = this.x + offset;
               this.right.y = this.y + 60;
               //offsetR = offsetR / 2;
            }else{
                this.right.addNode(n);
            }
        }
}
