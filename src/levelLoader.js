import {level_descriptor} from '../levels/levels.js';
import {Tape} from '../src/tape.js';
import {stateManager} from './stateManager.js';
import {updateTape} from './renderer.js';
import {getRandom} from './main.js';


class LevelLoader{
    constructor(){
        this.current_level = 0;
        this.random_levels = [];
        this.win_string = "";
        this.level_count = Object.keys(level_descriptor).length;
        this.drawLevels();
    }

    drawLevels(){
        let tgt = document.getElementById("levels");

        if ( !tgt ){
            return;
        }

        for(let i = 0; i < this.level_count; i++){
            let btn = document.createElement( "button" );
            btn.innerHTML = "Level " + String(i);
            btn.addEventListener('click', () => {this.loadLevel(i)} );
            tgt.appendChild( btn );
        }
    }


    /** 
    * load a level from JSON data
    * @param {Number} lev the index of the data source to load
    */
    loadLevel(lev){
        let SM = stateManager.getInstance();

        this.current_level = lev;
        this.rand_nums = [];
        let tgt = level_descriptor[lev.toString()];
        SM.tapes[0] = new Tape( SM.tapes[0].size );

        for(let key in tgt){
            if(key === "background"){
                SM.tapes[0].setAll(tgt[key]);
            }
            if(key === "win"){
                this.win_string = tgt[key];
            }
            if(key === "string"){
                let data = tgt[key];
                if(data["type"] === "pattern"){
                    SM.tapes[0].setAt(
                        0,generateRandomString(data["initial"], data["alphabet"]));
                }
            }
        }

        updateTape(SM.tapes[0]);
    }


    translate( str ){
        return str;
    }


    isAccept(){
        let tgt = this.win_string;
        let player_str = "";
        
        for ( let i = SM.tapes[0].min; i <= SM.tapes[0].max; i++ ){
            player_str += SM.tapes[0].readAt( i );    
        }

        player_str = player_str.trim()
        console.log( player_str, this.win_string );
        return player_str == this.win_string;
    }
}


function generateRandomString(baseString, alphabet){
    let ret = "";
    let randoms = [];
    let index = 0;
    for(let x of baseString){
        if(x != "*"){
            ret += x;
        }else{
            let r = alphabet[Math.floor(Math.random() * alphabet.length)];
            ret += r;
            randoms.push({index : r});
        }

        index ++;
    }

    return ret 
}

export{
    LevelLoader
}

