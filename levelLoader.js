
var levels = {
    0 : { "string" : "0", "type" : "all", "win" : "1" }
};

class LoadLevels{
    constructor(lev){
        this.current_level = lev;
        this.loadLev(lev);
    }


    loadLev(lev){
        let tgt = levels[lev];
    
        console.log(tgt["string"]);
        if ( tgt["type"]  === "all" ){
            tapes[0].setAll( tgt["string"] ); 
            console.log( tapes[0].readAt(-9));
            updateTape( tapes[0] );
        }
    }

    translate( str ){
        return str;
    }

    isAccept(){
        let tgt = this.translate(levels[this.current_level]["win"]);
        
        for ( var i = tapes[0].min; i <= tapes[0].max; i++ )
            console.log( tapes.mem.get( i ) );         
    }
}
