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

    main_input.onchange = function(){
        if ( typeof IN !== "undefined")
            IN.reset();
    }
   
}

function step(){
    pushInput();
}

function getRelativeCell(t){
    return document.getElementById(t.index);
}


function stepHelper(t){
    let cell = getRelativeCell(t);

    let ln = IN.getCurrentLine();
    let first, second = "";
    if ( ln.length == 0 )
        first = second = "";

    if ( ln.length == 1 ){
        first = ln[0];  
    }else{
        first = ln[0];
        second = ln[1];
    }

    console.log(first, second);
    
    if ( first == "wrt" ){
        t.write( second );
        updateTape(t);
    }

    if ( first == "mov" && second == "l" ){
        t.moveLeft();
        updateTape(t);
    }
    
    if ( first == "mov" && second == "r" ){
        t.moveRight();
        updateTape(t);
    }

    if ( first == "red" && ln.length <= 2 ){
        //NOP
    }

    // rd <PRN> <TGT>
    if ( first == "red" && ln[2] == "jmp" && ln.length >= 4){
        let match = second;
        
        let tgt = parseInt( ln[3] ); 
        if ( Number.isNaN( tgt ) )
            tgt = Math.floor( Math.random() * (IN.length - 1) );

        console.log(match, tgt);
        IN.current_line = (tgt);
    }else{
        IN.current_line ++; 
    }
}

function pushInput(){
    if (IN.length == 0 )
        return;
    

    stepHelper( tapes[0] );
}

var IN;

function readInput(){
    let input = main_input.value;
    
    input = input.trim();
    input = input.toLowerCase();

    words = input.split("\n");
    words = words.filter( function(x){
        return x !== "";
    });
    
    IN = new Input( words );
}


function main(){

}
