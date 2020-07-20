//Implementar variables globales
var backcolor1 = 0, backcolor2 = 0, backcolor3 = 0;
var rr = random(255);
var rg = random(255);
var rb = random(255);

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
