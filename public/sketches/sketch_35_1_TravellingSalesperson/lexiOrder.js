//Cómo iterar las permutaciones de un arreglo en orden
//https://www.quora.com/How-would-you-explain-an-algorithm-that-generates-permutations-using-lexicographic-ordering
var vals = [0, 1, 2, 3, 4, 5];

function setup(){
  createCanvas(400, 300);
}

function draw(){
  background(0);
  console.log(vals);

//Paso 1:
  var largestI = -1;
  for(var i = 0; i < vals.length; i++){
    if(vals[i] < vals[i+1]){
      largestI = i;
    }
  }
  if(largestI == -1){
    noLoop();
    console.log('finished');
  }

//Paso 2:
  var largestJ = -1;
  for(var j = 0; j < vals.length; j++){
    if(vals[largestI] < vals[j]){
      largestJ = j;
    }
  }

//Paso 3:
  swap(vals, largestI, largestJ);

//Paso 4:
  var endArray = vals.splice(largestI+1);
  endArray.reverse();
  vals = vals.concat(endArray);

  textSize(64);
  var s = '';
  for(var i = 0; i < vals.length; i++){
    s += vals[i];
  }
  fill(255);
  text(s, 20, height/2);

}


function swap(a, i, j){
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}
