function CarromPieceMove()
{
    var that = this;
	var striker;
	var totalCarromMen;	
	var carromMen;
    var wrapper;
    var carromBoard;
    var arrow;

// initialize variables of class.
    this.initialization = function()
    {
        totalCarromMen = 10;
        carromMen = [];

        wrapper = document.createElement("div");
        wrapper.setAttribute("class", "wrapper");      
        document.body.appendChild(wrapper);    

        carromBoard = document.createElement("div");
        carromBoard.setAttribute("class", "carromBoard");
        wrapper.appendChild(carromBoard);
    }
	
    // var hole1 = document.createElement("div");
    // hole1.setAttribute("class", "hole");
    // carromBoard.appendChild(hole1);    

    // var hole2 = document.createElement("div");
    // hole2.setAttribute("class", "hole");
    // hole2.style.top = 0 + 'px';
    // hole2.style.left = 540 + 'px';
    // carromBoard.appendChild(hole2);    

    // var hole3 = document.createElement("div");
    // hole3.setAttribute("class", "hole");
    // hole3.style.top = 540 + 'px';
    // hole3.style.left = 0 + 'px';
    // carromBoard.appendChild(hole3);    

    // var hole4 = document.createElement("div");
    // hole4.setAttribute("class", "hole");
    // hole4.style.left = 540 + 'px';
    // hole4.style.top = 540 + 'px';
    // carromBoard.appendChild(hole4);  
    // console.log("hole4" + parseInt(hole4.style.left));  

    this.initCarromMen = function()
    {
    	for(var i = 0; i < totalCarromMen; i++)
		{
		 	carromMen[i] = new CarromPiece();            
		    carromMen[i].addClass("gotti");
		    carromMen[i].initSpeed(0,0);
		    carromMen[i].appendTo(carromBoard);		      		    		
		}

            carromMen[0].initGottiPos(260,250);        
            carromMen[1].initGottiPos(340,250);
            carromMen[2].initGottiPos(200,250);
            carromMen[3].initGottiPos(160,300);
            carromMen[4].initGottiPos(220,300);
            carromMen[5].initGottiPos(280,300);
            carromMen[6].initGottiPos(160,350);
            carromMen[7].initGottiPos(220,350);
            carromMen[8].initGottiPos(280,350);
            carromMen[9].initGottiPos(340,345);    
    }

    
    this.initstriker = function()
    {
    	striker = new CarromPiece();
    	striker.addClass("gotti striker");
    	striker.appendTo(carromBoard);
    	striker.initGottiPos(280,468);
        striker.radius = 15;
        striker.initSpeed(0,0); 
        striker.angle = 90;        	        
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
            {''
                carromMen[i].detectWall();
                carromMen[i].moveGotti();                 
            }
                //for the striker                                 
                carromMen[totalCarromMen-1].detectWall();                                          
                carromMen[totalCarromMen-1].moveGotti();                                    
            
                carromMen[totalCarromMen-1].velocity = Math.sqrt(carromMen[totalCarromMen-1].dx*
                carromMen[totalCarromMen-1].dx + carromMen[totalCarromMen-1].dy*carromMen[totalCarromMen-1].dy);

                // for the arrow
                var cen_X = carromMen[totalCarromMen-1].radius;
                var cen_Y = carromMen[totalCarromMen-1].radius;

                arrow.setAttribute("style", "transform-origin:" + cen_X + 'px' + cen_Y + 'px' ) ; 
                arrow.style.left = (parseInt(carromMen[totalCarromMen-1].element.style.left) + cen_X) + 'px';
                arrow.style.top = (parseInt(carromMen[totalCarromMen-1].element.style.top) + cen_Y) + 'px' ;
                

                console.log(arrow);
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


