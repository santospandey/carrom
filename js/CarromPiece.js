function CarromPiece()
{
	var that = this;	
	this.element = document.createElement("div");
    console.log(this.element);

	this.dx = 0;
	this.dy = 0;
	this.x  = 0;
	this.y = 0;
    this.radius = 20;
    this.angle = 15;
    this.velocity = 5;
    this.totalDistance = 1000;
    this.distanceTravelled = 0;
    this.times = 0;
    
    this.boardHeight = 400;
    this.boardWidth = 600;

	this.appendTo = function(parentElement) 
	{
		parentElement.appendChild(this.element);		
	}
	 
	this.initGottiPos = function(posLeft,posTop)
	{  
        var left = posLeft - that.radius;
        var top = posTop - that.radius;
	    that.element.style.left = left + 'px';
	    that.element.style.top = top + 'px';
		that.x = parseInt(window.getComputedStyle(that.element).getPropertyValue('left')); 
	    that.y = parseInt(window.getComputedStyle(that.element).getPropertyValue('top'));	       	    
	}

    this.initSpeed = function(speedX,speedY)
    {
	    that.dx = speedX;
	    that.dy = speedY;        	    
    }    

	this.moveGotti = function()
	{	
	    that.x += that.dx;
	    that.y += that.dy; 

        var dist = Math.sqrt(that.dx*that.dx + that.dy*that.dy);
        that.distanceTravelled += dist;        
        
        if(that.distanceTravelled >= that.totalDistance)
        {
            that.dx = 0;
            that.dy = 0;
        }       

	    that.element.style.left = that.x + 'px';
	    that.element.style.top = that.y + 'px'; 
        console.log("that.dx" + that.dx + 
            "  that.dy" + that.dy);        
    }

    this.addClass = function(className) 
    {
    	that.element.setAttribute("class", className);
    }

    this.detectWall = function()
    {    	
    	if(that.x>(that.boardWidth - 2*that.radius) || that.x<0)
    	{    		
    		that.dx = -that.dx;    		
    	}

    	if(that.y>(that.boardHeight - 2*that.radius) || that.y<0)
    	{    	
    		that.dy = -that.dy;
    	}    	
    }

    this.hitTest = function(otherCarrom)
    {
        if(Math.sqrt((that.x - otherCarrom.x)*(that.x - otherCarrom.x) + 
            (that.y - otherCarrom.y)*(that.y - otherCarrom.y)) < 2*that.radius)
        {
            return true;
        }
        else 
        {
            return false;
        }            
    }

    this.collision = function(otherCarrom)
    {
        console.log("that dx = " + that.dx + "  that dy = " + that.dy);        
        console.log("other dx = " + otherCarrom.dx + " other dy = " + otherCarrom.dy); 
        
        // for color change 
        if(otherCarrom.element.style.background == 'purple')
        {
            otherCarrom.element.style.background = 'yellow';                 
        }
        else{
            otherCarrom.element.style.background = 'purple';                 
        }   

        if(that.element.style.background == 'yellow')
        {
            that.element.style.background = 'purple';
        }
        else{
            that.element.style.background = 'yellow';
        }
                 
        // for unit vector calculation
        var v2X = otherCarrom.x - that.x;
        var v2Y = otherCarrom.y - that.y;

        // for reducing divide by zero problem
        if(v2Y == 0)
        {
            v2Y = 1;
        }

        if(v2X == 0)
        {
            v2X = 1;
        }
                    
        otherCarrom.dx = that.velocity*v2X/(Math.abs(v2X));
        otherCarrom.dy = that.velocity*v2Y/(Math.abs(v2Y));                
        that.dx = -otherCarrom.dx;
        that.dy = -otherCarrom.dy;
    
        
        console.log("other carrom: ");
        console.log(otherCarrom.dx);
        console.log(otherCarrom.dy); 
    }

    this.eventHandling = function(event)
    {
        if(event.keyCode == 37)
        {
            that.slideLeft();            
        }

        else if(event.keyCode == 39)
        {
            that.slideRight();
        }

        if(event.keyCode == 65)
        {
            that.initSpeed(that.velocity*Math.cos(that.angle*Math.PI/180),
                -that.velocity*Math.sin(that.angle*Math.PI/180));
        }

        if(event.keyCode == 40)
        {
            that.angle++;
            console.log(that.angle);
        }

        if(event.keyCode == 38)
        {
            that.angle--;
            console.log(that.angle);
        }

        if(event.keyCode == 66)
        {
            that.velocity++;
            console.log(that.velocity);
        }

        if(event.keyCode == 67)
        {
            that.velocity--;
            console.log(that.velocity);
        }        
    }

    this.slideLeft = function()
    {        
        that.x -= 3;                
    }

    this.slideRight = function()
    {
        that.x += 3;    
    }    
}