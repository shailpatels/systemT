class Tape{
    constructor(size_){
        this.size = size_;
        this.index = 0;

        this.left = new Array( size_ );
        this.right = new Array( size_ );
    }


    moveLeft(){
        if ( Math.abs(this.index) + 1 >= this.size )
            return;

        this.index --; 
    }

    moveRight(){
        if ( this.index + 1 >= this.size )
            return;

        this.index ++;
    }

    write( string ){
        if ( this.index >= 0 ){
            //right [0, INF)
            this.right[ this.index ] = string;
        }else{
            //left (INF, 0)
            this.left [ Math.abs(this.index) ] = string;
        }
    }

    read( string ){
        if ( this.index >= 0 )
            return this.right[ this.index ];
        
        return this.left[ Math.abs(this.index) ]; 
    }
}
