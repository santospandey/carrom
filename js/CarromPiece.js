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
    this.angle = 30;
    this.velocity = 1;

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
	    that.element.style.left = that.x + 'px';
	    that.element.style.top = that.y + 'px';    	    
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

        otherCarrom.element.style.background = 'yellow'; 
        this.element.style.background = 'purple';

        that.dx = -that.dx;
        that.dy = -that.dy;
        otherCarrom.dx = -otherCarrom.dx;
        otherCarrom.dy = -otherCarrom.dy; 

        if(that.dx == 0 && that.dy == 0)
        {
            that.dx = -otherCarrom.dx;
            that.dy = -otherCarrom.dy;
        }

        if(otherCarrom.dx == 0 && otherCarrom.dy == 0)
        {
            otherCarrom.dx = -that.dx;
            otherCarrom.dy = -that.dy;
        }           
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

        if(event.keyCode == 38)
        {
            that.initSpeed(that.velocity*Math.cos(that.angle*Math.PI/180),
                -that.velocity*Math.sin(that.angle*Math.PI/180));
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