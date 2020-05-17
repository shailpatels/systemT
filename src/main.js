var main_input, html_tape,
    tapes = [],
    init_size = 19,
    levels;


window.onload = function init(){
    main_input = document.getElementById("main_input"); 
    html_tape = document.getElementById("tape");

    main_input.focus(); 
    
    for ( var i = 0; i < init_size; ++i ){
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
    
    levels = new LoadLevels(); 
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

    first = first.toLowerCase().trim();
    second = second.trim();
    
    if ( first == "wrt" ){
        t.write( second );
        updateTape(t);
    }

    if ( first == "stp" ){
        if ( levels.isAccept() ){
            showWinState();
        }else{
            alert("TM not in Accept State");
        }
        return;
    }

    if ( first == "mov" && second.toLowerCase() == "l" ){
        t.moveLeft();
        updateTape(t);
    }
    
    if ( first == "mov" && second.toLowerCase() == "r" ){
        t.moveRight();
        updateTape(t);
    }

    if ( first == "red" && ln.length <= 2 ){
        //NOP
    }
        
    // RED <PTN> MOV [L|R]
    // RED <PTN> WRT <VAL>
    // RED <PTN> STP
    let match = ( t.read() === second );
    if ( first == "red" && ln.length >= 2 && match ){
        ln[2] = ln[2].toLowerCase();
        if ( ln[2] == "mov" && ln.length > 3){

            if ( ln[3] == "l" ){
                t.moveLeft();
                updateTape(t);
            }else if ( ln[3] == "r" ){
                t.moveRight();
                updateTape(t);
            }            
            
        }else if ( ln[2] == "wrt" ){
            let third = ln.length > 3 ? ln[3] : "";
            t.write( third );
            updateTape( t );  
        }else{
            let third = ln.length > 3 ? ln[3] : "";
            t.isAccept();
        }
    } 
    
    IN.current_line ++; 
    
    //wrap around to line 0
    if ( IN.current_line === IN.length() )
        IN.current_line = 0;
}


function pushInput(){
    if (typeof IN === "undefined")
        readInput();

    if (IN.length == 0 )
        return;
    
    stepHelper( tapes[0] );
}


var IN;


function readInput(){
    let input = main_input.value;
    
    input = input.trim();

    words = input.split("\n");
    words = words.filter( function(x){
        return x !== "";
    });
    
    IN = new Input( words );
    levels.loadLev( levels.current_level );
    
}


function getRandom(max){
    return Math.floor(Math.random() * Math.floor(max));
}


function showWinState(){
    alert("You win!");
}
