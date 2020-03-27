
var level_data = {
    0 : { "string" : "0", "type" : "all", "win" : "1" },
    1 : { "string" : "1", "type" : "all", "win" : "0" },
    2 : { "string" : "1*01*", "type" : "pattern", "win" : "1*1*", "background" : "0" }
};


var level_count = Object.keys(level_data).length;

class LoadLevels{
    constructor(){
        this.drawLevels();
        this.current_level = 0;
        this.random_levels = [];
        this.win_string = "";
    }

    drawLevels(){
        let tgt = document.getElementById("levels");
        for(var i = 0; i < level_count; i++){
            let btn = document.createElement( "button" );
            btn.innerHTML = "Level " + String(i)
            btn.setAttribute("onclick", "levels.loadLev(" + i + ");");
            tgt.appendChild( btn );
        }
    }


    loadLev(lev){
        this.current_level = lev;
        this.rand_nums = [];
        let tgt = level_data[lev];
    
        if ( tgt["type"]  === "all" ){
            tapes[0].setAll( tgt["string"] ); 
            updateTape( tapes[0] );
            this.win_string = tgt["win"];
        }

        if ( tgt["type"] === "pattern" ){
            tapes[0].setAll( tgt["background"] );

            let data = generateRandomLevel( tgt["string"] , tgt["win"] );
            this.win_string = data[1]; 

            tapes[0].setAt( 0, data[0] );
            updateTape( tapes[0] );
        }
    }


    translate( str ){
        return str;
    }


    isAccept(){
        let tgt = this.win_string;
        
        console.log( tapes[0].min, tapes[0].max );
        for ( var i = tapes[0].min; i <= tapes[0].max; i++ )
            console.log( tapes.mem.get( i ) );         
    }
}


function generateRandomLevel(baseString, winString){
    let fin = "";
    let win = "";
    let rands = [];
    for ( var i = 1; i < baseString.length; i++){
        let rand = getRandom(10);
        if ( baseString[i] == "*" ){
            rands.push( rand );

            fin += baseString[i-1].repeat( rand );
        }else if( i + 1 < baseString.length && baseString[i+1] != "*" ){
            fin += baseString[i];
        }else if( i == baseString.length - 1 ){
            fin += baseString[i];
        }
    }

    let rand_index = 0;
    for ( var i = 1; i < winString.length; i++){
        if ( winString[i] == "*" ){
            win += winString[i-1].repeat( rands[rand_index] ); 
            rand_index ++;
        }else if(i + 1 < winString.length && winString[i+1] != "*"){
            win += winString[i];
        }
    }

    return [ fin, win, rands ];
}

