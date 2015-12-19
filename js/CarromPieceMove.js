function CarromPieceMove()
{
    var that = this;
	var striker;
	var totalCarromMen = 10;	
	var carromMen = [];

	var wrapper = document.createElement("div");
    wrapper.setAttribute("class", "wrapper");      
    document.body.appendChild(wrapper);    
      
    var carromBoard = document.createElement("div");
    carromBoard.setAttribute("class", "carromBoard");
    wrapper.appendChild(carromBoard);    

    this.initCarromMen = function()
    {
    	for(var i = 0; i < totalCarromMen; i++)
		{
		 	carromMen[i] = new CarromPiece();            
		    carromMen[i].addClass("gotti");
		    carromMen[i].initSpeed(0,0);
		    carromMen[i].appendTo(carromBoard);		      		    		
		}

            carromMen[0].initGottiPos(200,200);        
            carromMen[1].initGottiPos(250,250);
            carromMen[2].initGottiPos(300,300);
            carromMen[3].initGottiPos(350,350);
            carromMen[4].initGottiPos(400,300);
            carromMen[5].initGottiPos(200,340);
            carromMen[6].initGottiPos(40,300);
            carromMen[7].initGottiPos(300,150);
            carromMen[8].initGottiPos(80,100);
            carromMen[9].initGottiPos(350,40);    
    }

    this.initstriker = function()
    {
    	striker = new CarromPiece();
    	striker.addClass("gotti striker");
    	striker.appendTo(carromBoard);
    	striker.initGottiPos(30,370);
    	striker.initSpeed(0,0);        

        // debugger;
        carromMen[totalCarromMen] = striker;
        totalCarromMen++;
    }       

    this.animate = function()
    {                
        function move()
        {            
            for(var i = 0; i < totalCarromMen; i++)
            {
                carromMen[i].detectWall();
                carromMen[i].moveGotti(); 
                window.addEventListener("keydown", carromMen[totalCarromMen-1].eventHandling, false);                                       
            }

            for(var i = 0; i < totalCarromMen; i++)
            {
                for(var j = i+1; j < totalCarromMen; j++)
                {
                    if( i!=j && carromMen[i].hitTest(carromMen[j]) == true)
                    {                            
                        carromMen[i].collision(carromMen[j]);
                    }                        
                }
            }            
        }
            setInterval(move, 1000/60);                            	        	
    }
}


