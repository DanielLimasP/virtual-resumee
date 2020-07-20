function Tree(){
    this.root = null;
}

Tree.prototype.addValue = function(val){
    n = new Node(val);
    if(this.root == null) {
        this.root = n;
        this.root.x = width / 2;
        this.root.y = height / 8;
       }else{
           this.root.addNode(n);
       }
}

Tree.prototype.traverse = function(){
    this.root.visit(this.root);
}

Tree.prototype.level = function(){
    this.root.getLevel(this.root, 2, 1);
}

Tree.prototype.search = function(val){
    var found = this.root.search(val, 1);
    return found;
}
