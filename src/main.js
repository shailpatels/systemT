import {Tape} from './tape.js';
import {updateTape} from './renderer.js';
import {LoadLevels} from './levelLoader.js';

import {API} from './FSS/src/api.js';

var main_input, html_tape,
    tapes = [],
    init_size = 19,
    levels;

/**
* @returns {String} current symbol on tape
*/
const requestInput = () => {
    let mrk = tapes[0].read();
    return mrk;
};

const simulateWrite = (output) => {
    tapes[0].write(output);
    updateTape(tapes[0]);
}


window.onload = start();
function start() {

    html_tape = document.getElementById("tape");
    
    for ( let i = 0; i < init_size; ++i ){
        let tmp = document.createElement("div");
        tmp.className= "cell";

        let p = document.createElement("p");
        p.id = "cell_" + i;
        p.className = "itm-cell";
        tmp.appendChild(p);

        html_tape.appendChild ( tmp );
    }

    let tape = new Tape( init_size ); 
    tape.setAll("0");
    updateTape(tape);
    tapes.push( tape );

    // main_input.onchange = function(){
    //     InputFactory.clear();
    // }
    
    levels = new LoadLevels(); 
    API.addFunc("request_input", requestInput);
    API.addFunc("simulate_write", simulateWrite);

}


function getRelativeCell(t){
    return document.getElementById(t.index);
}

function updateLine(n){
    document.getElementById("line").innerHTML = n.toString();
}

/**
* Parses the current line we're currently on
* @param {Input} IN user input object
* @param {Tape} t tape to operate on
*/
function parseNext(IN, t){
    let cell = getRelativeCell(t);
    let ln = IN.getCurrentLine();
    let first, second = "";
    updateLine(IN.current_line);

    let prep = function(x){
        return x.trim().toLowerCase();
    }

    if ( ln.length == 0 )
        first = second = "";

    if ( ln.length == 1 ){
        first = ln[0];  
    }else{
        first = ln[0];
        second = ln[1];
    }

    first = prep(first);
    second = second.trim();
    console.log(first, second, IN.current_line);

    let is_label = false;
    if (first.slice(-1) === ":"){
        is_label = true;
        first = first.slice(0,-1);
    }

    if ( second === ":" ){
        is_label = true;
    }

    if ( is_label ){
        IN.addLabel(first, IN.current_line);
    }


    if ( first === "jmp"){
        IN.current_line = IN.getLabel(second);
        updateLine(IN.current_line);
        return;
    }

    
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

    if ( first == "mov" && prep(second) == "l" ){
        t.moveLeft();
        updateTape(t);
    }
    
    if ( first == "mov" && prep(second) == "r" ){
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
        if ( prep(ln[2]) == "mov" && ln.length > 3){

            if ( prep(ln[3]) == "l" ){
                t.moveLeft();
                updateTape(t);
            }else if ( prep(ln[3]) == "r" ){
                t.moveRight();
                updateTape(t);
            }            
            
        }else if ( prep(ln[2]) == "wrt" ){
            let third = ln.length > 3 ? ln[3] : "";
            t.write( third );
            updateTape( t );  
        }else{
            let third = ln.length > 3 ? ln[3] : "";
            levels.isAccept();
        }
    } 


    IN.current_line ++; 

    //wrap around to line 0
    if ( IN.current_line === IN.length() )
        IN.current_line = 0;
 
}


function step(){
    let IN = InputFactory.getInstance();
    parseNext(IN, tapes[0] );
}


/**
* Read the data container in the main text field and update
* the user input object
*/
function submit(){
    let words = main_input.value;
    InputFactory.clear();
    InputFactory.getInstance(words);

    levels.loadLev( levels.current_level );
}


function getRandom(max){
    return Math.floor(Math.random() * Math.floor(max));
}


function showWinState(){
    alert("You win!");
}


/** setup for testing */
if (typeof module !== "undefined"){
    module.exports = {
        parseNext, 
        getRelativeCell,
    }

    updateTape = function(t){}
}
