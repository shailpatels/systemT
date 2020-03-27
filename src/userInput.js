
class Input{
    constructor(data){
        this.lines = new Map();
        this.current_line = 0;
        this.raw_input = main_input.value;
        
        for ( var i = 0; i < data.length; i++ )
            this.lines.set( i, data[i].split(" ") );

    }

    printData(){
        for ( var i = 0; i < this.lines.length; i++)
            console.log( i, this.lines.get( i ) );
    }

    length() { return this.lines.size; }

    getCurrentLine() {
        let test = this.current_line;
        if ( typeof this.lines.get( test ) === "undefined" )
            return [ "" ];

        return this.lines.get( test );
    }

    reset(){
        this.lines = new Map();
        this.current_line = 0;
    }
}

function save(){
    if ( typeof IN === "undefined")
        return;

    let user_input = JSON.stringify( IN );
    let tape_state = [];
    for ( u of tapes ){
        console.log(u.serialize());
        tape_state.push( u.serialize() );
    }

    let data = { user_input, tape_state };
    localStorage.setItem("save", JSON.stringify(data));
}

function rebuildTape(data){
    let ret = new Tape(0);
    for( var prop in data){
        if (prop == "mem"){
            ret[prop] = new Map(data[prop].value);
            continue;
        }
        ret[prop] = data[prop];
    }
    return ret;
}


function load(){
    tapes = [];
    let tgt = JSON.parse(localStorage.getItem("save"));
    IN = new Input([]);
    let in_tmp = JSON.parse( tgt["user_input"] );

    document.getElementById("main_input").value = IN.raw_input;

    let tmp = tgt["tape_state"]; 
    for ( t of tmp ){
        //console.log(JSON.parse(t));
        tapes.push( rebuildTape( JSON.parse(t) ) );
    } 
    
    for ( t of tapes )
        updateTape( t );
}
