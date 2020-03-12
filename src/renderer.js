

function updateCurrentCell(t){
    let cell = document.getElementById("cell_" + (t.index+t.half_size));
    cell.innerText = t.read( ); 
}

function updateTape(t){
    for(var i = 0; i < t.size; i++){    
        let tgt = (i - t.half_size) + t.index;
        
        document.getElementById("cell_" + i).innerText = t.readAt( tgt );
    }
}

