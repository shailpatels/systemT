var main_input, html_tape,
    tapes = [],
    init_size = 19;

window.onload = function init(){
    main_input = document.getElementById("main_input"); 
    main_input.focus(); 
    
    html_tape = document.getElementById("tape");
    
    for ( var i = 0; i < init_size; ++i){
        let tmp = document.createElement("div");
        tmp.className= "cell";
        tmp.id = "cell_" + i;
        html_tape.appendChild ( tmp );
    }

    let tape = new Tape( init_size ); 
    tapes.push( tape );

}


function step(){
    pushInput(user_input);
}

function getRelativeCell(t){
    return document.getElementById(t.index);
}


function stepHelper(first, second, t){
    let cell = getRelativeCell(tape);
    
    if ( first == "wr" ){
        t.write( second );
        updateCurrentCell(t);
    }

    if ( first == "mov" && second == "l" ){
        t.moveLeft();
        updateTape(t);
    }
    
    if ( first == "mov" && second == "r" ){
        t.moveRight();
        updateTape(t);
    }
}

function pushInput(words){
    if (words.length == 0 )
        return;

    let first = words[0];
    let second = "";
    if ( words.length > 1){
        second = words[1];
        words.shift();
    } 
    words.shift();
    stepHelper(first,second,tapes[0]);
}

var user_input = [];

function readInput(){
    let input = main_input.value;
    
    input = input.trim();
    input = input.toLowerCase();

    words = input.split("\n").join(" ").split(" ");
    words = words.filter( function(x){
        return x !== "";
    });
    
    words.forEach( x => user_input.push(x));    
}


function main(){

}
