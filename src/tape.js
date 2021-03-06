class Tape{

    /**
    * @param {Number} size_ the size of the tape to visually display, 
    *   this is number of blocks to render, the tape is technically unbounded
    *   cannot be an even number
    */
    constructor(size_){
        this.size = size_;
        this.half_size = (size_ - 1)/2;
        this.index = 0;
        this.mem = new Map();

        this.max = 0;
        this.min = 0;
    }


    serialize(){
        function replacer (key,value){
            if (key == "mem"){
                return { 
                    dataType : 'Map',
                    value : Array.from(this.mem.entries())
                };
            }

            return value;
        }
    
        return JSON.stringify(this, replacer);
    }


    moveLeft(){
        this.index ++;

        if ( this.index > this.max )
            this.max ++;
    }


    moveRight(){
        this.index --;
    
        if ( this.index < this.min )
            this.min --;
    }


    write( string ){
        this.mem.set( this.index, string);
    }


    read( ){
        return this.readAt( this.index ); 
    }


    readAt( index ){
        let tmp = this.mem.get( index );
        if ( typeof tmp === "undefined" )
            return "";

        return tmp;
    }
    
    //TODO: let tapes know the background and set it dynamically when we go out of bounds
    setAll( val ){
        for ( var i = -100; i < 100; i++ )
            this.mem.set( i, val );
    
    }

    setAt( index, string ){
        for ( var i = 0; i < string.length; i++ )
            this.mem.set( index + i, string[i] );
    } 

}


export {
    Tape
}

