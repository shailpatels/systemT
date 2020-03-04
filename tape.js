class Tape{
    constructor(size_){
        this.size = size_;
        this.half_size = (size_ - 1)/2;
        this.index = 0;
        this.mem = new Map();
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
