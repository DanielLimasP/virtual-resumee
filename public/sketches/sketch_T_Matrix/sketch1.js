var symbolSize = 16;
var streams = [];
var fadeInterval = 1.6;
var cw = window.innerWidth;     
var ch = window.innerHeight;   

var largeHeader;
window.addEventListener('resize', resize);

function setup(){

    createCanvas(cw, ch);
    largeHeader = document.getElementById('large-header');
    largeHeader.style.height = ch+'px';
   
    var x = 0;
    
    for(var i = 0; i <= width/symbolSize; i++){
        stream = new Stream();
        stream.generateSymbols(x, random(-1000, 0));
        streams.push(stream);
        x += symbolSize;
    }
    
    textFont('Consolas');
    textSize(symbolSize);
}

function draw(){
    window.addEventListener('resize', resize);
    background(0, 100);
    streams.forEach(function(stream){
        stream.render();
    });
    
    
    
}

function Symbol(x, y, speed, first, opacity){
    this.x = x;
    this.y = y;
    this.value;
    this.speed = speed;
    this.switchInterval = round(random(2, 20));
    this.first = first;
    this.opacity = opacity;
    
    this.setToRandomSymbol = function(){
        var charType = round(random(0, 5));
        if(frameCount % this.switchInterval == 0){
            if(charType > 1){
                this.value = String.fromCharCode(
                0x30A0+ round(random(0, 96))
            );
                }else{
                    this.value = round(random(0, 9)); 
        }                          
    }
            
    }
    
    this.rain = function(){
        this.y = (this.y >= height) ? 0 : this.y += this.speed;
        
    }  
}

function Stream(){
    this.symbols = [];
    this.totalSymbols = round(random(5, 25));
    this.speed = random(5, 7);

    this.generateSymbols = function(x, y){
        var opacity = 255;
        var first = round(random(0, 4)) == 1;
        for(var i = 0; i <= this.totalSymbols; i++){
            symbol = new Symbol(x, y, this.speed, first, opacity);
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            opacity -= (255 / this.totalSymbols) / fadeInterval;
            y -= symbolSize;
            first = false;
            
        }
    }
    
    this.render = function(){
        this.symbols.forEach(function(symbol){
            
             if(symbol.first){
                    fill(200, 255, 200, symbol.opacity); 
                }else{
                    fill(0, 255, 200, symbol.opacity);   
                }
            
            
            text(symbol.value, symbol.x, symbol.y);
            symbol.rain();
            symbol.setToRandomSymbol();
        });
    }
}
function resize() {
        cw = window.innerWidth;
        ch = window.innerHeight;
        largeHeader.style.height = ch+'px';
        resizeCanvas(cw, ch);
    
    }


