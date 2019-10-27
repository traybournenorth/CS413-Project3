var gameport = document.getElementById("gameport");


var requestAnimationFrame = window.requestAnimationFrame ||
							window.mozRequestAnimationFrame ||
							window.webkitRequestAnimationFrame ||
							window.msRequestAnimationFrame;
							
var cancelAnimationFrame = window.cancelAnimationFrame ||
							window.mozCancelAnimationFrame ||
							window.webkitCancelAnimationFrame ||
							window.msCancelAnimationFrame;
						






/*game textures*/					
var backgroundImg = PIXI.Texture.fromImage();


var renderer = PIXI.autoDetectRenderer({width:1080, height:400, backgroundColor: 0x330033});

gameport.appendChild(renderer.view);








/*stage is parent container*/
var stage = new PIXI.Container();

/*child containers*/
var game = new PIXI.Container();

var titleScreen = new PIXI.Container();

var creditsScreen = new PIXI.Container();

var instructionScreen = new PIXI.Container();

var endScreen = new PIXI.Container();








/*initially have all screens except title screen not visible */
game.visible = false;

endScreen.visible = false;

creditsScreen.visible = false;

instructionScreen.visible = false;

titleScreen.visible = true;

//array that holds containers
var containerArr = [];

containerArr = [game, endScreen, creditsScreen, instructionScreen, titleScreen];
				
var containerIterator;

// iterate through array and add to stage container(the parent container)
for( containerIterator = 0; containerIterator < containerArr.length; containerIterator++)
{
	stage.addChild( containerArr[containerIterator] );
}





/* create sprites */
var background = new PIXI.Sprite(backgroundImg);




function resetPuzzleRoom1()
{
	
}

function resetPuzzleRoom2()
{

}





/* buttons for navigating main screens*/
var playBtn = new PIXI.Sprite(playTexture);
		playBtn.interactive = true;
		playBtn.buttonMode = true;
		playBtn.on("mousedown", playGame);
		
		
		
var creditsBtn = new PIXI.Sprite(creditsTexture);
		creditsBtn.interactive = true;
		creditsBtn.buttonMode = true;
		creditsBtn.on("mousedown", displayCredits);
		
		
		
var instrBtn = new PIXI.Sprite(instTexture);
		instrBtn.interactive = true;
		instrBtn.buttonMode = true;
		instrBtn.on("mousedown", displayInstructions);
		
		
		
var backBtn = new PIXI.Sprite(backTextrue);
		backBtn.interactive = true;
		backBtn.buttonMode = true;
		backBtn.on("mousedown", displayTitle);
		





/*add sprites too containers*/
endScreen.addChild(endScreenBack);

var puzzleRoom2Sprites = [];
puzzleRoom2Sprites = [ secondRoomBack, tableGuide2, neg, zero, one, two, three,
						four, five, six, seven, eight, nine, reset ];
						
addChildToContainer(puzzleRoom2, puzzleRoom2Sprites);



var puzzleRoom1Sprites = [];
puzzleRoom1Sprites = [ roomBack, tableGuide1, switch1, switch2, switch3 ];
addChildToContainer( puzzleRoom1, puzzleRoom1Sprites );



var gameSprites = [];
gameSprites = [ background, topDoor1, topDoor2, botDoor1, botDoor2 ];
addChildToContainer( game, gameSprites );



function addChildToContainer( container, childArr )
{
	var iter;
	
	for( iter = 0; iter < childArr.length; iter++)
	{
		container.addChild( childArr[ iter ] );
	}
}

/*add title screen sprites*/
var titleScreenSprites = [];
titleScreenSprites = [];
addChildToContainer( titleScreen , titleScreenSprites );


/*StandingStillImages*/
var frontSide = PIXI.Texture.fromFrame("sprites/finalGuyInSuit12upscale1.png");

var leftSide = PIXI.Texture.fromFrame("sprites/finalGuyInSuit12upscale4.png");

var backSide = PIXI.Texture.fromFrame("sprites/finalGuyInSuit12upscale7.png");

var rightSide = PIXI.Texture.fromFrame("sprites/finalGuyInSuit12upscale10.png");



/*Movement Images*/
var upFirstStep = PIXI.Texture.fromFrame("sprites/finalGuyInSuit12upscale8.png");

var upSecondStep = PIXI.Texture.fromFrame("sprites/finalGuyInSuit12upscale9.png");

var downFirstStep = PIXI.Texture.fromFrame("sprites/finalGuyInSuit12upscale2.png");

var downSecondStep = PIXI.Texture.fromFrame("sprites/finalGuyInSuit12upscale3.png");

var leftFirstStep = PIXI.Texture.fromFrame("sprites/finalGuyInSuit12upscale5.png");

var leftSecondStep = PIXI.Texture.fromFrame("sprites/finalGuyInSuit12upscale6.png");

var rightFirstStep = PIXI.Texture.fromFrame("sprites/finalGuyInSuit12upscale11.png");

var rightSecondStep = PIXI.Texture.fromFrame("sprites/finalGuyInSuit12upscale12.png");



// array defaulted to single image of player facing you
var frames = [frontSide];


PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;


/*add and load assets to be used in the game*/
PIXI.loader
  .add("sprites/assets.json","sprites/assets2.json")
  .load(ready);

// variables in which the switches need to match
var switch1Result = 10,switch2Result = 10,switch3Result = 10;

// variables that show the switches current state
var switch1State = 0,switch2State = 0,switch3State = 0;

// saves the key pressed to put a still image in the correctly faced direction
var key = 0;

// the x and y position of the player
var xOrg = 50;
var yOrg = 200;
var xPos = xOrg;
var yPos = yOrg;

// stores a boolean if the frames have been removed
// 		so that frames don't keep getting removed when not needed
var framesRemoved = false;

// if frames have been added set to true so frames
// 		won't continually be added
var framesAdded = false;

// the state of completion of the puzzles (only 1 & 2 have
// 		been implemented)
var puzzle1Solved = false, puzzle2Solved = false;

// the state in which room the player is in
var inRoom1 = false, inMainRoom = true, inRoom2 = false;

// puzzle2String is what the player inputs and is compared
// 		to the correct string that receives its data from
//		the method create equation
var puzzle2String = '';
var correctString = '';

// function that returns a random number including the min and max
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}



// sets game screen visible
function playGame()
{
	titleScreen.visible = false;
	
	creditsScreen.visible = false;
	
	endScreen.visible = false;
	
	game.visible = true;
}



// sets credit screen visible
function displayCredits()
{
	titleScreen.visible = false;
	
	endScreen.visible = false;
	
	creditsScreen.addChild(backBtn);
	
	creditsScreen.visible = true;
	
	game.visible = false;
}



// sets instruction screen visible
function displayInstructions()
{
	var text = new PIXI.Text('WASD to move around\n\r To get back to the main menu press esc(this also restarts your game)\n\r Tables with note pages give a hint for the puzzle\n\r'
						,{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
	
	titleScreen.visible = false;
	
	creditsScreen.visible = false;
	
	game.visible = false;
	
	endScreen.visible = false;
	
	instructionScreen.addChild(backBtn);
	
	instructionScreen.addChild(text);
	
	instructionScreen.visible = true;
}


// set title screen visible
function displayTitle()
{
	titleScreen.visible = true;
	
	creditsScreen.visible = false;
	
	endScreen.visible = false;
	
	game.visible = false;
	
	instructionScreen.visible = false;
}



// randomizes the state in which the switches should be
// 		to complete the puzzle
function randomizeSwitchResult()
{
	switch1Result = getRndInteger(1,2);
	
	switch2Result = getRndInteger(1,2);
	
	switch3Result = getRndInteger(1,2);
}



// checks if the state of the switches matches the expected
//		result
function checkSwitchState()
{
	if((switch1State == switch1Result && switch2State == switch2Result) 
		&& switch3State == switch3Result)
		{
			puzzleRoom1.addChild(leaveRoomDoor);
			
			puzzle1Solved = true;
		}
	else{
		try{
			puzzleRoom1.removeChild(leaveRoomDoor);
			puzzle1Solved = false;
		} catch(err){}
	}
	
}



// checks if the inputed result from puzzle 2 
//		matches the expected result of the equation
function checkEqSolved()
{
	if(puzzle2String == correctString)
	{
		puzzle2Solved = true;
		
		puzzleRoom2.addChild(exitDoor2);
	}
}



// creates a random addition or subtraction equation
//		using the random number generator(getRndInteger)
function createEquation()
{
	var firstInt = getRndInteger(1, 1000);
	
	var secondInt = getRndInteger(1, 1000);
	
	var result;
	
	var sign = getRndInteger(0,1);
	
	var str = '';
	
	// displays equation as a text using +
	if( sign == 0 )
	{
		str = ""+firstInt+" + "+ secondInt + " = ?"
		
		result = firstInt + secondInt;
		
		correctString = ''+result;
		
		return str;
	}
	
	// displays equation as a text using -
	else{
		str = ""+firstInt+" - "+ secondInt + " = ?"
		
		result = firstInt - secondInt;
		
		correctString = ''+result;
		
		return str;
	}
}

var footsteps;

// loads the sounds files
PIXI.loader
  .add("sprites/Footstep.mp3")
  .load(soundReady);
  
  
  
// assigns footsteps the sound aquired
function soundReady()
{
	footsteps = PIXI.audioManager.getAudio('sprites/Footstep.mp3');
}



// loads the files the have sprite sheets
function ready(){
	
	// creates a moving sprites by rotating through frames array
	player = new PIXI.AnimatedSprite(frames);
	
	player.scale.x = 1;
	
	player.scale.y = 1;
	
	player.animationSpeed = .1;
	
	
	player.position.x = xPos;
	
	player.position.y = yPos;
	
	player.play();
	
	game.addChild(player);
	
	
	// acts as a collision detector
	function checkPlayerPosition()
	{
		if(inMainRoom)
		{
			if((player.x >= 50 && player.x <= 300) && (player.y <= 0 && !puzzle1Solved))
			{
				randomizeSwitchResult();
				
				game.visible = false;
				
				puzzleRoom1.addChild(player);
				
				puzzleRoom1.visible = true;
				
				inMainRoom = false;
				
				inRoom1 = true;
			}
			
			if((player.x >= 50 && player.x <= 300) && (player.y >= 330 && !puzzle2Solved))
			{
				game.visible = false;
				
				stringMade = createEquation();
				
				puzzleRoom2.addChild(player);
				
				puzzleRoom2.visible = true;
				
				inMainRoom = false;
				
				inRoom1 = false;
				
				inRoom2 = true;
			}
			
			if(puzzle1Solved && puzzle2Solved)
			{
				game.addChild(exitDoor);
				
				if((player.y >= 50 && player.y <= 300) && player.x >= 1030)
				{
					endScreen.visible = true;
					
					game.visible = false;
					
					puzzleRoom1.visible = false;
					
					inMainRoom = true;
					
					inRoom1 = false;
					
					inRoom2 = false;
				}
			}
			
			
		}
		
		if(inRoom1 && puzzle1Solved)
		{
			if((player.y >= 50 && player.y <= 300) && player.x <= 0)
			{
				game.addChild(player);
				
				game.visible = true;
				
				puzzleRoom1.visible = false;
				
				inMainRoom = true;
				
				inRoom1 = false;
			}
		}
		
		if(inRoom2 && puzzle2Solved)
		{
			if((player.x >= 50 && player.x <= 300) && player.y >= 330)
			{
				game.addChild(player);
				
				game.visible = true;
				
				puzzleRoom2.visible = false;
				
				inMainRoom = true;
				
				inRoom2 = false;
			}
		}
		
	}
	
	
	
	// removes images from array
	function removeFrames(){
		while( frames.length != 0 )
		{
			frames.pop();
		}
       framesRemoved = true;
	}
	
	
	
	// gets keyboard input
	function keydownEventHandler(e)
	{
		if(e.keyCode == 87 /*key w*/)
		{
			key = 87;
			walkUp();
		}
		
		// this returns you to the main menu and restarts the game	
		if(e.keyCode == 27 /*key esc*/)
		{
			key = 27;
			try{
				game.removeChild(exitDoor);
				
				endScreen.visible = false;
			}
			catch(err)
			{
				
			}
			
			if(inRoom1)
			{
				inRoom1 = false;
				
				xPos = xOrg;
				
				yPos = yOrg;
				
				puzzleRoom1.removeChild(player);
				
				puzzleRoom1.visible = false;
				
				resetPuzzleRoom1();
				
				resetPuzzleRoom2();
				
				game.addChild(player);
				
				player.x = xPos;
				
				player.y = yPos;
				
				titleScreen.visible = true;
				
				inMainRoom = true;
			}
			
			if( inMainRoom )
			{
				xPos = xOrg;
				
				yPos = yOrg;
				
				game.removeChild(player);
				
				game.visible = false;
				
				resetPuzzleRoom1();
				
				resetPuzzleRoom2();
				
				game.addChild(player);
				
				player.x = xPos;
				
				player.y = yPos;
				
				titleScreen.visible = true;
			}
			
			if( inRoom2 )
			{
				inRoom1 = false;
				
				xPos = xOrg;
				
				yPos = yOrg;
				
				puzzleRoom2.removeChild(player);
				
				puzzleRoom2.visible = false;
				
				resetPuzzleRoom1();
				
				resetPuzzleRoom2();
				
				game.addChild(player);
				
				player.x = xPos;
				
				player.y = yPos;
				
				titleScreen.visible = true;
				
				inMainRoom = true;
			}
		}
		
		if(e.keyCode == 83 /*key s*/)
		{
			key = 83;
			walkDown();
		}
		
		if(e.keyCode == 65 /*key a*/)
		{
			key = 65;
			walkLeft();
		}
		
		if(e.keyCode == 68/*key d*/)
		{
			key = 68;
			walkRight();
		}
	}
	
	
	
	/*moves the player up
		it also removes the current frames and adds 2 new images for
		the frames array to cycle through
	*/
	function walkUp()
	{
		if(!framesRemoved)
		{
			removeFrames();
		}
		if(!framesAdded)
		{
			frames.push(upFirstStep, upSecondStep);
			
			framesAdded = true;
		}
		
		checkPlayerPosition();
		
		// prevents the player from leaving screen
		if( yPos - 12 > -30 )
		{
			yPos -= 12;
			
			createjs.Tween.get(player.position).to({y: yPos}, 100 , createjs.Ease.linear);
			
			footsteps.play();	
		}
		
	}
	
	
	
	/*moves the player down
		it also removes the current frames and adds 2 new images for
		the frames array to cycle through
	*/
	function walkDown()
	{
		if(!framesRemoved)
		{
			removeFrames();
		}
		if(!framesAdded)
		{
			frames.push(downFirstStep, downSecondStep);
			
			framesAdded = true;
		}
		checkPlayerPosition();
		
		// prevents the player from leaving screen
		if( yPos + 12 < 350 )
		{
			yPos += 12;	
			
			createjs.Tween.get(player.position).to({y: yPos}, 100 , createjs.Ease.linear);
			
			footsteps.play();
		}
	}
	
	
	
	/*moves the player left
		it also removes the current frames and adds 2 new images for
		the frames array to cycle through
	*/
	function walkLeft()
	{
		if(!framesRemoved)
		{
			removeFrames();
		}
		if(!framesAdded)
		{
			frames.push(leftFirstStep, leftSecondStep);
			
			framesAdded = true;
		}
		checkPlayerPosition();
		
		// prevents the player from leaving screen
		if(xPos - 12 > -30)
		{
			xPos -= 12;	
			
			createjs.Tween.get(player.position).to({x: xPos}, 100 , createjs.Ease.linear);
			
			footsteps.play();
		}
	}
	
	
	
	/*moves the player right
		it also removes the current frames and adds 2 new images for
		the frames array to cycle through
	*/
	function walkRight()
	{
		if(!framesRemoved)
		{
			removeFrames();
		}
		if(!framesAdded)
		{
			frames.push(rightFirstStep, rightSecondStep);
			
			framesAdded = true;
		}
		checkPlayerPosition();
		
		// prevents the player from leaving screen
		if(xPos + 12 < 1080 )
		{
			xPos += 12;		
			
			createjs.Tween.get(player.position).to({x: xPos}, 100 , createjs.Ease.linear);
			
			footsteps.play();
		}
		
	}
	
	/* removes frames when not moving so the player looks like they are 
		no longer in motion
	*/
	function keyupEventHandler()
	{
		if(key == 87)
		{
			if(framesRemoved)
			{
				removeFrames();
				
				framesRemoved = false;
			}
			if(framesAdded)
			{
				frames.push(backSide);
				
				framesAdded = false;
			}
		}
		
		if(key == 83)
		{
			if(framesRemoved)
			{
				removeFrames();
				
				framesRemoved = false;
			}
			if(framesAdded)
			{
				frames.push(frontSide);
				
				framesAdded = false;
			}
		}
		
		if(key == 65)
		{
			if(framesRemoved)
			{
				removeFrames();
				
				framesRemoved = false;
			}
			if(framesAdded)
			{
				frames.push(leftSide);
				
				framesAdded = false;
			}
		}
		
		if(key == 68)
		{
			if(framesRemoved)
			{
				removeFrames();
				
				framesRemoved = false;
			}
			if(framesAdded)
			{
				frames.push(rightSide);
				
				framesAdded = false;
			}
		}
	}
	
	function animate()
	{
		document.addEventListener('keydown', keydownEventHandler);
		
		document.addEventListener('keyup', keyupEventHandler);
		
		requestAnimationFrame(animate);
		
		renderer.render(stage);
	}
	animate();
}

