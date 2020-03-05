class Tape{
    constructor(size_){
        this.size = size_;
        this.half_size = (size_ - 1)/2;
        this.index = 0;
        this.mem = new Map();
    }

    serialize(){
    function replacer (key,value){
        if (key == "mem"){
            return { dataType : 'Map',
                     value : Array.from(this.mem.entries())
            };
        }

        return value;
    }
    
    return JSON.stringify(this, replacer);
    }

    moveLeft(){
        this.index ++;
    }

    moveRight(){
        this.index --;
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

}
