
var level_data = {
    0 : { "string" : "0", "type" : "all", "win" : "1" },
    1 : { "string" : "1", "type" : "all", "win" : "0" }
};

var level_count = 2;

class LoadLevels{
    constructor(){
        this.drawLevels();
        this.current_level = 0;
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
        //        console.trace();
        this.current_level = lev;
        let tgt = level_data[lev];
    
        if ( tgt["type"]  === "all" ){
            tapes[0].setAll( tgt["string"] ); 
            updateTape( tapes[0] );
        }
    }


    translate( str ){
        return str;
    }


    isAccept(){
        console.log( levels );
        let tgt = this.translate(levels[this.current_level]["win"]);
        
        console.log( tapes[0].min, tapes[0].max );
        for ( var i = tapes[0].min; i <= tapes[0].max; i++ )
            console.log( tapes.mem.get( i ) );         
    }
}
