var main_input, html_tape,
    tape,
    init_size = 10;

window.onload = function init(){
    main_input = document.getElementById("main_input"); 
    main_input.focus(); 
    
    html_tape = document.getElementById("tape");
    
    for ( var i = 0; i < init_size; ++i){
        let tmp = document.createElement("div");
        tmp.className= "cell";
        html_tape.appendChild ( tmp );
    }

    tape = new Tape(init_size/2); 
}

function readInput(){
    let input = main_input.value;
    
    input = input.trim();
    input = input.toLowerCase();

    words = input.split(' ');
    words = words.filter( function(x){
        return x !== "";
    });
    
    console.log(words);
    if (words.length > 1 && words[0] === "wr" )
        tape.write( words[1] );
}

function main(){

}
