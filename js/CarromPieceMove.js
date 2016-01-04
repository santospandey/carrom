function CarromPieceMove()
{
    var that = this;
	var striker;
	var totalCarromMen;
    var totalwhite;
    var totalblack;	
	var carromMen;
    var wrapper;
    var carromBoard;
    var arrow;

// initialize variables of class.
    this.initialization = function()
    {
        totalCarromMen= 19;
        totalblack = 9;
        totalwhite = 9;
        carromMen = [];

        wrapper = document.createElement("div");
        wrapper.setAttribute("class", "wrapper");      
        document.body.appendChild(wrapper);    

        carromBoard = document.createElement("div");
        carromBoard.setAttribute("class", "carromBoard");
        wrapper.appendChild(carromBoard);
    }
	
    this.initCarromMen = function()
    {
    	for(var i = 0; i < totalCarromMen; i++)
		{
		 	carromMen[i] = new CarromPiece();            
		    carromMen[i].addClass("gotti");
		    carromMen[i].initSpeed(0,0);
		    carromMen[i].appendTo(carromBoard);	
            carromMen[i].mass = 1;	      		    		
		}

        for(var i = 0; i < totalCarromMen; i++)
        {
            if(i < 9)
            {
                carromMen[i].white = true;
            }
            else if(i< totalCarromMen-1)
            {
                carromMen[i].white = false;
                carromMen[i].element.style.backgroundColor = "#01010b";                    
            }
            else
            {
                carromMen[i].queen = true;
                carromMen[i].element.style.backgroundColor = "red";                    
            }                    
        }

        carromMen[0].initGottiPos(240,300);
        carromMen[1].initGottiPos(260,300); 
        carromMen[2].initGottiPos(280,300);
        carromMen[3].initGottiPos(260,280);   
        carromMen[4].initGottiPos(320,300);
        carromMen[5].initGottiPos(340,300);
        carromMen[6].initGottiPos(360,300);
        carromMen[7].initGottiPos(240,320);
        carromMen[8].initGottiPos(260,320); 
        carromMen[9].initGottiPos(280,320);
        carromMen[10].initGottiPos(300,320);
        carromMen[11].initGottiPos(320,320);
        carromMen[12].initGottiPos(340,320);
        carromMen[13].initGottiPos(360,320);
        carromMen[14].initGottiPos(280,280);
        carromMen[15].initGottiPos(300,280);
        carromMen[16].initGottiPos(320,280); 
        carromMen[17].initGottiPos(340,280);
        carromMen[18].initGottiPos(300,300);
    
    }


    this.initstriker = function()
    {
    	striker = new CarromPiece();
    	striker.addClass("gotti striker");
    	striker.appendTo(carromBoard);
    	striker.initGottiPos(280,468);
        striker.element.style.backgroundImage = "url('images/striker.png')";
        striker.radius = 15;
        striker.initSpeed(0,0); 
        striker.angle = 90;  
        striker.mass = 2;      
        carromMen[totalCarromMen] = striker;
        totalCarromMen++;
        that.initarrow();
    }

    this.initarrow = function()
    {        
        arrow = document.createElement("div");
        arrow.setAttribute("class", "arrow");
        carromBoard.appendChild(arrow);
    }       

    this.animate = function()
    { 
        window.addEventListener("keydown", carromMen[totalCarromMen-1].eventHandling, false);                               
        function move()
        {            
            for(var i = 0; i < totalCarromMen-1; i++)
            {
                carromMen[i].detectWall();
                carromMen[i].moveGotti();   

                var a = carromMen[i].checkhole();
                if(a == true)
                {
                    if(carromMen[i].white == true)
                    {
                        totalwhite--;
                        console.log("white  " + totalwhite);
                    }
                    else if(carromMen[i].white = false)
                    {
                        totalblack--;
                        console.log("black  " + totalblack);
                    }

                    if(carromMen[i].queen == true && totalblack > 1 && totalwhite > 1)
                    {  
                        console.log("black  " + totalblack);
                        console.log("white  " + totalblack);  
                        carromMen[i].initGottiPos(300, 300);
                        carromMen[i].initSpeed(0, 0);
                    }

                    else
                    {
                        carromMen[i].element.style.background = "transparent";
                        carromMen.splice(i, 1);
                        console.log(carromMen.length);
                        totalCarromMen = carromMen.length;
                    } 
                }

                if(carromMen.length == 1){
                    console.log("game over");
                }              
            }
                //for the striker                                 
                carromMen[totalCarromMen-1].detectWall();                                          
                carromMen[totalCarromMen-1].moveGotti();  
                var b = carromMen[totalCarromMen - 1].checkhole(); 
                if(b == true)
                {                    
                    carromMen[totalCarromMen - 1].initGottiPos(280, 468);
                    carromMen[totalCarromMen - 1].initSpeed(0, 0);
                }                                 
            
                carromMen[totalCarromMen-1].velocity = Math.sqrt(carromMen[totalCarromMen-1].dx*
                carromMen[totalCarromMen-1].dx + carromMen[totalCarromMen-1].dy*carromMen[totalCarromMen-1].dy);

                // for the arrow
                var cen_X = carromMen[totalCarromMen-1].radius;
                var cen_Y = carromMen[totalCarromMen-1].radius;

                arrow.setAttribute("style", "transform-origin:" + cen_X + 'px' + cen_Y + 'px' ) ; 
                arrow.style.left = (parseInt(carromMen[totalCarromMen-1].element.style.left) + cen_X - 1) + 'px';
                arrow.style.top = (parseInt(carromMen[totalCarromMen-1].element.style.top) + cen_Y) + 'px' ;
                
                var a = -(carromMen[totalCarromMen-1].angle);
                arrow.style.webkitTransform = 'rotate(' + a + 'deg)';
                arrow.style.oTransform      = 'rotate(' + a + 'deg)';
                arrow.style.msTransform     = 'rotate(' + a + 'deg)';
                arrow.style.transform       = 'rotate(' + a + 'deg)';        
                            
            for(var i = 0; i < totalCarromMen - 1; i++)
            {
                for(var j = i+1; j < totalCarromMen; j++)
                {
                    if(i!=j && carromMen[i].hitTest(carromMen[j]) == true)
                    {                            
                        carromMen[i].collision(carromMen[j]);
                    }                        
                }
            }            
        }
            setInterval(move, 1000/30);                            	        	
    }
}


