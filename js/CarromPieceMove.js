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

    var hole1 = document.createElement("div");
    hole1.setAttribute("class", "hole");
    carromBoard.appendChild(hole1);    

    var hole2 = document.createElement("div");
    hole2.setAttribute("class", "hole");
    hole2.style.top = 0 + 'px';
    hole2.style.left = 540 + 'px';
    carromBoard.appendChild(hole2);    

    var hole3 = document.createElement("div");
    hole3.setAttribute("class", "hole");
    hole3.style.top = 340 + 'px';
    hole3.style.left = 0 + 'px';
    carromBoard.appendChild(hole3);    

    var hole4 = document.createElement("div");
    hole4.setAttribute("class", "hole");
    hole4.style.left = 540 + 'px';
    hole4.style.top = 340 + 'px';
    carromBoard.appendChild(hole4);  
    console.log("hole4" + parseInt(hole4.style.left));  

    this.initCarromMen = function()
    {
    	for(var i = 0; i < totalCarromMen; i++)
		{
		 	carromMen[i] = new CarromPiece();            
		    carromMen[i].addClass("gotti");
		    carromMen[i].initSpeed(0,0);
		    carromMen[i].appendTo(carromBoard);		      		    		
		}

            carromMen[0].initGottiPos(160,150);        
            carromMen[1].initGottiPos(220,150);
            carromMen[2].initGottiPos(280,150);
            carromMen[3].initGottiPos(160,200);
            carromMen[4].initGottiPos(220,200);
            carromMen[5].initGottiPos(280,200);
            carromMen[6].initGottiPos(160,250);
            carromMen[7].initGottiPos(220,250);
            carromMen[8].initGottiPos(280,250);
            carromMen[9].initGottiPos(340,245);    
    }

    this.initstriker = function()
    {
        // debugger;
    	striker = new CarromPiece();
    	striker.addClass("gotti striker");
    	striker.appendTo(carromBoard);
    	striker.initGottiPos(150,370);
        striker.initSpeed(0,0);
        // striker._velocity = 10;
    	
        // debugger;
        carromMen[totalCarromMen] = striker;
        totalCarromMen++;
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
                carromMen[i].velocity = Math.sqrt(carromMen[i].dx*carromMen[i].dx + carromMen[i].dy*carromMen[i].dy);
            }
                //for the striker                                 
                carromMen[totalCarromMen-1].detectWall();                                          
                carromMen[totalCarromMen-1].moveGotti();                                    
            
                carromMen[totalCarromMen-1].velocity = Math.sqrt(carromMen[totalCarromMen-1].dx*
                carromMen[totalCarromMen-1].dx + carromMen[totalCarromMen-1].dy*carromMen[totalCarromMen-1].dy);
                            
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


