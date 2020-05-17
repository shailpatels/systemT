


/**
* There should only ever be only 1 input object
* https://www.dofactory.com/javascript/singleton-design-pattern
*/
var InputFactory = (function(){
    var instance = null;

    function createInstance(data) {
        return new Input(data);
    }
 
    return {
        clear : function(){
            instance = null;
        },

        getInstance: function (data = "") {
            if (!instance) {
                instance = createInstance(data);
            }
            return instance;
        }
    };
})();


class Input{
    constructor(data){
    
        let input = data.trim();
        let words = input.split("\n");

        words = words.filter( function(x){
            return x !== "";
        });

        this.lines = new Map();
        this.labels = new Map();
        this.current_line = 0;
        this.raw_input = data;
        
        for ( var i = 0; i < words.length; i++ )
            this.lines.set( i, words[i].split(" ") );

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


    addLabel(value, line_number){
        this.labels.set(value, line_number);
    }


    getLabel(tgt){
        let tmp = this.labels.get(tgt);
        if ( typeof tmp === "undefined" )
            return this.current_line;

        return tmp;
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


if ( typeof module !== "undefined" ){
    module.exports = {
        Input,
        InputFactory
    };
}
