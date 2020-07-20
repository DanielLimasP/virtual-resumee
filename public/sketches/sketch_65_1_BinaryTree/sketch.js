var tree;

function setup(){
    createCanvas(1200, 700);
    background(51);
    frameRate(30);
    textSize(30);
    tree = new Tree();
    tree.addValue(floor(random(0, 100)));
    //for(var i = 0; i <= 10; i++){
        //tree.addValue(floor(random(0, 100)));
        //tree.addValue(i);
    //}
    console.log(tree);
    //tree.traverse();
}

function draw(){
    background(51);
    if(frameCount < 10){
       tree.addValue(floor(random(0, 100)));
    }
    tree.traverse();
    
}

