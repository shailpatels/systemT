var main_input, html_tape,
    tape, tapes = [],
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

    tape = new Tape( (init_size-1) / 2  ); 
    tapes.push( tape );

    getRelativeCell( tape )
}


function getRelativeCell( tape ){
    //box 10 is the middle box
    let tgt = 10 //index 0


    tgt --; //computers start at 0
    return document.getElementById("cell_" + tgt);
//    document.getElementById( "cell_" + tgt ).style.backgroundColor = "green";
}

function render(tape){
    for( var i = 0; i < tape.size; i++){
        
    }
}

function step(first, second, tape){
    console.log( first, second );
    let cell = getRelativeCell(tape);
    
    if ( first == "wr" )
        tape.write( second );
}

function readInput(){
    let input = main_input.value;
    
    input = input.trim();
    input = input.toLowerCase();

    words = input.split("\n").join(" ").split(" ");
    words = words.filter( function(x){
        return x !== "";
    });
    
    if (words.length == 0)
        return;

    let first = words[0];
    let second = "";
    if ( words.length > 1){
        second = words[1];
        words.shift();
    } 
    words.shift();

    step(first,second,tape);
}

function main(){

}
