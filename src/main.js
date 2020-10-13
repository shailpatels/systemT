import {Tape} from './tape.js';
import {updateTape} from './renderer.js';
import {LevelLoader} from './levelLoader.js';
import {
    InputFactory, 
    updateArrowMoveDirection,
    updateArrowMenuDirection
} from './userInput.js';
import {stateManager} from './stateManager.js';

import {API} from './FSS/src/api.js';
import {step as stepFSS} from './FSS/src/simulate.js';
import {toggleDarkMode} from './FSS/src/renderer.js';

var main_input, html_tape,
    levels;


API.is_external = true;
window.addEventListener("load", start);
function start() {

    document.getElementById("canvas").oncontextmenu = (e) => { e.preventDefault(); }
    html_tape = document.getElementById("tape");
    const SM = stateManager.getInstance();
    
    for ( let i = 0; i < SM.init_size; ++i ){
        let tmp = document.createElement("div");
        tmp.className= "cell";

        let p = document.createElement("p");
        p.id = "cell_" + i;
        p.className = "itm-cell";
        tmp.appendChild(p);

        html_tape.appendChild ( tmp );
    }
    
    SM.loadTape();
    levels = new LevelLoader(); 
    InputFactory.getInstance();


    /**
    * @returns {String} current symbol on tape
    */
    const requestInput = () => {
        return SM.tapes[0].read();
    };

    let move_q = [];

    const simulateWrite = (output) => {
        if(output === ""){
            return;
        }
        SM.tapes[0].write(output);

        for(let x of move_q){
            if(x === "left"){
                SM.tapes[0].moveLeft();
            }else if(x === "right"){
                SM.tapes[0].moveRight();
            }
        }

        move_q = [];

        updateTape(SM.tapes[0]);
    }

    API.addFunc("request_input", requestInput);
    API.addFunc("simulate_write", simulateWrite);
    API.addFunc("update_selected_arrow", updateArrowMoveDirection);
    API.addFunc("update_arrow_menu", updateArrowMenuDirection);
    API.addFunc("arrow_accepted", (data) => {
        console.log(data);
        console.log(data["move_direction"] === "left");
       if(typeof data["move_direction"] !== undefined){

           move_q.push(data["move_direction"]);

           
       } 
    });

    toggleDarkMode();

}


function getRelativeCell(t){
    return document.getElementById(t.index);
}

function updateLine(n){
    document.getElementById("line").innerHTML = n.toString();
}


function step(){
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
    step,
    getRandom
}

