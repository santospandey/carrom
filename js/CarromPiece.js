function CarromPiece()
{
	var that = this;	
	this.element = document.createElement("div");
    console.log(this.element);    
    
    this.velocity = 0;
    that._velocity; 
    this.angle = 15;    
	this.dx = 0;
	this.dy = 0;
	this.x  = 0;
	this.y = 0;
    this.radius = 20;    
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
        that.dx *= 0.98;
        that.dy *= 0.98;        
	    that.x += that.dx;
	    that.y += that.dy; 

        var dist = Math.sqrt(that.dx*that.dx + that.dy*that.dy);
        that.distanceTravelled += dist;        
                
	    that.element.style.left = that.x + 'px';
	    that.element.style.top = that.y + 'px';   

        // condition to check if gotti will be inside the hole
        if(that.x < 20 && that.y < 20)
        {            
            that.element.style.background = 'transparent';
        }

        if(that.x < 20 && that.y > 340)
        {            
            that.element.style.background = 'transparent';
        }

        if(that.x > 540 && that.y < 20)
        {            
            that.element.style.background = 'transparent';
        }

        if(that.x > 540 && that.y > 340)
        {            
            that.element.style.background = 'transparent';
        }
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
        
        // // for color change 
        // if(otherCarrom.element.style.background == 'purple')
        // {
        //     otherCarrom.element.style.background = 'yellow';                 
        // }
        // else{
        //     otherCarrom.element.style.background = 'purple';                 
        // }   

        // if(that.element.style.background == 'yellow')
        // {
        //     that.element.style.background = 'purple';
        // }
        // else{
        //     that.element.style.background = 'yellow';
        // }

        // for unit vector calculation
        var v2X = otherCarrom.x - that.x;
        var v2Y = otherCarrom.y - that.y;
        var distance = Math.sqrt(Math.pow((otherCarrom.x - that.x),2) + Math.pow((otherCarrom.y - that.y), 2));

        // for reducing divide by zero problem
        if(v2Y == 0 && v2Y == 0)
        {
            v2Y = 1;
            v2X = 1;
        }

        otherCarrom.dx = that.velocity*v2X/(distance);
        otherCarrom.dy = that.velocity*v2Y/(distance);                
        that.dx = -otherCarrom.velocity*v2X/(distance);
        that.dy = -otherCarrom.velocity*v2Y/(distance);
                
        console.log("other carrom: ");
        console.log(otherCarrom.dx);
        console.log(otherCarrom.dy);

        console.log("this carrom: ");
        console.log(that.dx);
        console.log(that.dy); 
    }

    this.slideLeft = function()
    {   
        // checking the boundry of the hole   
        if(that.x<70)
        {
            that.x += 7;                
        }        
            that.x -= 7;
            that.moveGotti();                            
    }

    this.slideRight = function()
    {
         if(that.x > 490)
         {
            console.log("right slide");
            that.x -= 7;    
         }

         that.x += 7; 
         that.moveGotti();       
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
            that.velocity = 15;             
            that.dx = that.velocity*Math.cos(that.angle*Math.PI/180);
            that.dy = that.velocity*Math.sin(that.angle*Math.PI/180);             
            that.initSpeed(that.dx, -that.dy);            
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
            // that.dx = that.velocity*Math.cos(that.angle);
            // that.dy = that.velocity*Math.sin(that.angle);
            // console.log(that.velocity);
            // console.log("dx : "+ that.dx);
            // console.log("dy : "+ that.dy);
        }

        if(event.keyCode == 67)
        {
            that.velocity--;
            // that.dx = that.velocity*Math.cos(that.angle);
            // that.dy = that.velocity*Math.sin(that.angle);
            // console.log(that.velocity);
            // console.log("dx : "+ that.dx);
            // console.log("dy : "+ that.dy);
            console.log(that.velocity);
        }

        if(event.keyCode == 68)
        {
            if(Math.abs(that.dx) <= 0.05 && Math.abs(that.dy) <= 0.05)
            {
                that.initGottiPos(150, 370);
            }
        }
    }        
}