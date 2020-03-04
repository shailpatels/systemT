class Tape{
    constructor(size_){
        this.index = 0;
        this.shift = 0;

        this.left = new Array( size_ );
        this.right = new Array( size_ );
        this.zero = "";

        this.size = this.left.length + this.right.length + 1;
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
        if ( this.index > 0 ){
            //right (0, INF)
            this.right[ this.index ] = string;
        }else if( this.index < 0){
            //left (INF, 0)
            this.left [ Math.abs(this.index) ] = string;
        }else{
            this.zero = string;
        }
    }

    read( string ){
        if ( this.index > 0 )
            return this.right[ this.index ];
        else if (this.index < 0 ) 
            return this.left[ Math.abs(this.index) ]; 
        else
            return this.zero;
    }
}
