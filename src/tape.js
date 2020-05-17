class Tape{
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
    

    setAll( val ){
        for ( var i = -100; i < 100; i++ )
            this.mem.set( i, val );
    
    }


    setAt( index, string ){
        for ( var i = 0; i < string.length; i++ )
            this.mem.set( index + i, string[i] );
    } 
}

if (typeof module !== 'undefined' )
    module.exports = {Tape};

