import {Tape} from './tape.js';
import {updateTape} from './renderer.js';

var stateManager = (function(){
	var instance;
	return {
		clear(){
			instance = null;
		},

		init(){
			getInstance();
		},

		getInstance: function(){
			if (!instance) {
				instance = new __STATE_MANAGER_();
			}
			return instance;
		}
	};
})();

class __STATE_MANAGER_{
	constructor(){
		this.init_size = 19;
		this.tapes = [];
	}

	loadTape(new_tape = null){
		if (new_tape === null){
			new_tape = new Tape( this.init_size ); 
    		new_tape.setAll("0");
    		updateTape(new_tape);
    	}

    	this.tapes.push( new_tape );
	}
}


export{
	stateManager
}