function Collision(){
	var object1;
	var object2;

	this.collision = function(carrom1, carrom2)
    {
    	var distance = Math.sqrt(Math.pow((carrom1.x-carrom2.x),2) + 
    		Math.pow((carrom1.y-carrom2.y),2));
    	         
    	if(distance < 40)
    	{
            otherCarrom.dx = -otherCarrom.dx + 1;
            otherCarrom.dy = -otherCarrom.dy + 1;    

            that.dx = -that.dx;
            that.dy = -that.dy;                                          
    	}    	
    }
}