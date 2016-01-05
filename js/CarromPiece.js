function CarromPiece()
{
	var that = this;
    var sound;     
	this.element;    
    this.queen;
    this.white;
    this.mass;
    this.velocity;
    this.angle;    
	this.dx;
	this.dy;
	this.x;
	this.y;
    this.radius;        
    this.getVelo;
    this.holeRadius;
    this.unitSlide;   // for striker 
    this.rotation;    // flag to check whether the board has rotated or not.
    this.checkArrow;


    this.initialization = function()
    {
        that.element = document.createElement("div");
        that.mass = 1;
        that.radius = 10;
        that.boardWidth = 600;
        that.boardBorder = 52;
        that.getVelo = 0;
        that.holeRadius = 16;        
        sound = new Audio("sound/tictic.wav");
    }
    
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

    this.addClass = function(className) 
    {
        that.element.setAttribute("class", className);
    }

    this.initSpeed = function(speedX,speedY)
    {
	    that.dx = speedX;
	    that.dy = speedY;
        that.velocity = Math.sqrt(that.dx*that.dx + that.dy*that.dy);
    }
    
	this.moveGotti = function()
	{
        that.dx -= that.dx*0.02;
        that.dy -= that.dy*0.02;        
	    that.x += that.dx;
	    that.y += that.dy; 

        if(Math.abs(that.dx) <= 0.4 && Math.abs(that.dy) <= 0.4)
        {
            that.dx = 0;
            that.dy = 0;
        }

        that.velocity = Math.sqrt(that.dx*that.dx + that.dy*that.dy);
        that.distanceTravelled += that.velocity;        
                
	    that.element.style.left = that.x + 'px';
	    that.element.style.top = that.y + 'px';   
    }

    this.checkhole = function()
    {
        // condition to check if gotti will be inside the hole
        if((that.x<(that.boardBorder+that.holeRadius)) && 
            (that.y < (that.boardBorder+that.holeRadius)))
        { 
            return true;
        }

        if(that.x<(that.boardBorder+that.holeRadius) && 
            that.y > (that.boardWidth - that.boardBorder - that.holeRadius - 1.5*that.radius))
        {
            return true; 
        }

        if(that.x > (that.boardWidth - that.boardBorder - that.holeRadius - 1.5*that.radius) && 
            that.y < (that.boardBorder+that.holeRadius))
        {
            return true;            
        }

        if(that.x > (that.boardWidth - that.boardBorder - that.holeRadius - 1.5*that.radius) && 
            that.y > (that.boardWidth - that.boardBorder - that.holeRadius - 1.5*that.radius))
        {
            return true;            
        }

            return false;
    }

    this.detectWall = function()
    {
    	if(that.x>(that.boardWidth - that.boardBorder - 2*that.radius))
    	{   
    		that.dx = -Math.abs(that.dx);   
            sound.play();            
    	}        
        else if( that.x < (that.boardBorder))
        {
            that.dx = Math.abs(that.dx);
            sound.play();            
        }

    	if(that.y>(that.boardWidth - that.boardBorder - 2*that.radius)) 
    	{    	
    		that.dy = -Math.abs(that.dy);
            sound.play();                        
    	}
        else if(that.y < that.boardBorder)
        {
            that.dy = Math.abs(that.dy);
            sound.play();                        
        }            
    }

    this.calculateDistance = function(otherObj)
    {
        return (Math.sqrt(Math.pow((otherObj.x - that.x),2) + Math.pow((otherObj.y - that.y), 2)));
    }

    this.hitTest = function(otherCarrom)
    {
        if(that.calculateDistance(otherCarrom) < (that.radius + otherCarrom.radius))
        {
            sound.play();
            return true;
        }
        else 
        {
            return false;
        }            
    }

    this.collision = function(otherCarrom)
    {                                      
        // for unit vector calculation
        var v2X = otherCarrom.x - that.x + 2;
        var v2Y = otherCarrom.y - that.y;
        var distance = that.calculateDistance(otherCarrom);        

        if(distance == 0)
        {
            distance = 1;
        }

        otherCarrom.dx = (that.velocity*v2X/(distance))/otherCarrom.mass;
        otherCarrom.dy = (that.velocity*v2Y/(distance))/otherCarrom.mass;                
        that.dx = -(otherCarrom.velocity*v2X/(distance))/that.mass;
        that.dy = -(otherCarrom.velocity*v2Y/(distance))/that.mass;                
    }

    this.slideLeft = function()
    {   
        // checking the boundry of the hole   
        if(that.x < 140)
        {
            that.x += 5;                
        }        
            that.x -= 5;
            that.moveGotti();   
    }

    this.slideRight = function()
    {
        if(that.x > 440)
        {
           that.x -= that.unitSlide;    
        }

        that.x += that.unitSlide; 
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
            that.velocity = that.getVelo;             
            that.dx = that.velocity*Math.cos(that.angle*Math.PI/180);
            that.dy = that.velocity*Math.sin(that.angle*Math.PI/180); 
            that.getVelo = 0;            
            that.initSpeed(that.dx, -that.dy);
            that.checkArrow = false;

        }

        if(event.keyCode == 40)
        {
            that.angle++;
        }

        if(event.keyCode == 38)
        {
            that.angle--;
        }

        if(event.keyCode == 66)
        {
            that.getVelo += 4;
        }

        if(event.keyCode == 67)
        {
            that.velocity--;
        }

        if(event.keyCode == 68)
        {
            if(Math.abs(that.dx) <= 0.05 && Math.abs(that.dy) <= 0.05)
            {
                if(that.rotation == true)
                {
                    that.initGottiPos(300, 132);
                }
                else
                {
                    that.initGottiPos(300, 468);                    
                }
                that.checkArrow = true;
            }
        }

        // if(event.keyCode == 69)
        // {
        //     that.slideup();
        // }

        // if(event.keyCode == 70)
        // {
        //     that.slidedown();            
        // }
    }        
}