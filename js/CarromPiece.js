function CarromPiece()
{
	var that = this;	
	this.element = document.createElement("div");
    
    this.queen = false;
    this.white;
    this.mass;
    this.velocity = 10;
    that._velocity; 
    this.angle = 15;    
	this.dx = 0;
	this.dy = 0;
	this.x  = 0;
	this.y = 0;
    this.radius = 10;    
    this.distanceTravelled = 0;
    this.times = 0;
    this.boardWidth = 600;
    this.boardBorder = 52;
    this.getVelo = 0;
    this.holeRadius = 16;
    var sound = new Audio("C:/Users/Santosh/Desktop/crm-backup/carrom/sound/tictic.wav");    

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

    this.calculateDistance = function(otherObj)
    {
        return (Math.sqrt(Math.pow((otherCarrom.x - that.x),2) + Math.pow((otherCarrom.y - that.y), 2)));
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
            // console.log(that.x + "  " + that.y);
            // that.element.style.background = 'transparent';
        }

        if(that.x<(that.boardBorder+that.holeRadius) && 
            that.y > (that.boardWidth - that.boardBorder - that.holeRadius - 1.5*that.radius))
        {
            return true; 
            // console.log(that.x + "  " + that.y);
            // that.element.style.background = 'transparent';
        }

        if(that.x > (that.boardWidth - that.boardBorder - that.holeRadius - 1.5*that.radius) && 
            that.y < (that.boardBorder+that.holeRadius))
        {
            return true;            
            // that.element.style.background = 'transparent';
        }

        if(that.x > (that.boardWidth - that.boardBorder - that.holeRadius - 1.5*that.radius) && 
            that.y > (that.boardWidth - that.boardBorder - that.holeRadius - 1.5*that.radius))
        {
            return true;            
            // that.element.style.background = 'transparent';
        }

        else
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

    this.hitTest = function(otherCarrom)
    {
        if(Math.sqrt((that.x - otherCarrom.x)*(that.x - otherCarrom.x) + 
            (that.y - otherCarrom.y)*(that.y - otherCarrom.y)) < (that.radius + otherCarrom.radius))
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
        var v2X = otherCarrom.x - that.x;
        var v2Y = otherCarrom.y - that.y;
        var distance = Math.sqrt(Math.pow((otherCarrom.x - that.x),2) + Math.pow((otherCarrom.y - that.y), 2));        

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
        if(that.x<70)
        {
            that.x += 1;                
        }        
            that.x -= 1;
            that.moveGotti();   
    }

    this.slideRight = function()
    {
        if(that.x > 490)
        {
           that.x -= 1;    
        }

        that.x += 1; 
        that.moveGotti();       
    }

    this.slideup = function()
    {
        that.y -= 1;
        that.moveGotti();
    }

    this.slidedown = function()
    {
        that.y += 1;
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
            //var getVelo;
            // that.vleo = getVelo
            that.getVelo +=4;
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
        }

        if(event.keyCode == 68)
        {
            if(Math.abs(that.dx) <= 0.05 && Math.abs(that.dy) <= 0.05)
            {
                that.initGottiPos(280, 468);
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