import {Tape} from './tape.js';
import {updateTape} from './renderer.js';
import {LevelLoader} from './levelLoader.js';
import {InputFactory} from './userInput.js';

import {API} from './FSS/src/api.js';
import {step as stepFSS} from './FSS/src/simulate.js';
import {toggleDarkMode} from './FSS/src/renderer.js';

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


API.is_external = true;
window.addEventListener("load", start);
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
    
    levels = new LevelLoader(); 
    InputFactory.getInstance();

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
    console.log("!");
    API.addFunc("request_input", () => {return "A"});
    stepFSS();
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


export {
    tapes,
    step
}

