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
