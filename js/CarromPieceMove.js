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
    var rotateBoardAngle;
    var noOfBoardRotation;
    var instructionBoard;

// initialize variables of class.
    this.initialization = function()
    {
        totalCarromMen= 19;
        totalblack = 9;
        totalwhite = 9;
        rotateBoardAngle = 180;
        noOfBoardRotation = 0;
        carromMen = [];

        wrapper = document.createElement("div");
        wrapper.setAttribute("class", "wrapper");
        document.body.appendChild(wrapper);

        carromBoard = document.createElement("div");
        carromBoard.setAttribute("class", "carromBoard");
        wrapper.appendChild(carromBoard);

        instructionBoard = document.createElement("div");
        instructionBoard.setAttribute("class", "instruction");
        instructionBoard.innerHTML =
        `<p>Left Arrow = Slide Left</p>
        <p>Right Arrow = Slide Right</p>
        <p>Button 'D' = Initialize stick</p>
        <p>Arrow Up = Change Angle</p>
        <p>Arrow Down = Change Angle</p>
        <p>Button 'B' = Increase force to Striker</p>
        <p>Button 'C' = Decrease force to Striker</p>
        <p>Button 'A' = Release Striker</p>`;

        document.body.appendChild(instructionBoard);
    }

    this.initCarromMen = function()
    {
    	for(var i = 0; i < totalCarromMen; i++)
		{
		 	carromMen[i] = new CarromPiece();
            carromMen[i].initialization();
		    carromMen[i].addClass("gotti");
		    carromMen[i].initSpeed(0,0);
		    carromMen[i].appendTo(carromBoard);
            carromMen[i].mass = 1;
		}

        for(var i = 0; i < totalCarromMen; i++)
        {
            if(i < totalwhite)
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
        striker.initialization();
    	striker.addClass("gotti striker");
    	striker.appendTo(carromBoard);
    	striker.initGottiPos(300,468);
        striker.element.style.backgroundImage = "url('images/striker.png')";
        striker.radius = 15;
        striker.initSpeed(0,0);
        striker.angle = 90;
        striker.mass = 2;
        striker.unitSlide = 5;
        striker.carromBoard = carromBoard;
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

    this.rotateBoard = function()
    {
        carromBoard.style.webkitTransform = 'rotate(' + rotateBoardAngle + 'deg)';
        carromBoard.style.oTransform      = 'rotate(' + rotateBoardAngle + 'deg)';
        carromBoard.style.msTransform     = 'rotate(' + rotateBoardAngle + 'deg)';
        carromBoard.style.transform       = 'rotate(' + rotateBoardAngle + 'deg)';

        if(noOfBoardRotation%2 == 1)
        {
            carromMen[totalCarromMen - 1].initGottiPos(300, 468);
            carromMen[totalCarromMen-1].angle = 90;
            carromMen[totalCarromMen-1].rotation = false;
            console.log("player2");
        }
        else
        {
            carromMen[totalCarromMen - 1].initGottiPos(300, 132);
            carromMen[totalCarromMen-1].angle = 270;
            carromMen[totalCarromMen-1].rotation = true;
            console.log("player1");
        }

        carromMen[totalCarromMen - 1].initSpeed(0, 0);
        rotateBoardAngle += 180;
        noOfBoardRotation++;
    }

    this.eventHandling = function(event)
    {
        if(event.keyCode == 71)
        {
            that.rotateBoard();
        }
    }

    this.animate = function()
    {
        window.addEventListener("keydown", carromMen[totalCarromMen-1].eventHandling, false);
        window.addEventListener("keydown", that.eventHandling, false);
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
                    if(carromMen[i].white = false)
                    {
                        totalblack--;
                        console.log("black  " + totalblack);
                    }

                    if(carromMen[i].queen == true && totalwhite > 1 && totalblack > 1)
                    {
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
                    carromMen[totalCarromMen - 1].initGottiPos(300, 468);
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
                if(carromMen[totalCarromMen-1].checkArrow == true)
                {
                    arrow.style.backgroundColor = "red";
                }
                else
                {
                    arrow.style.backgroundColor = "transparent";
                }

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
            setInterval(move, 1000/50);
    }
}


