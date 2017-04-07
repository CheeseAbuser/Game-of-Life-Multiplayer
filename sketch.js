var rule0;
var rule1;
var rule2; 
var rule3; 
var rule4;
var gamePlayRule0;
var gamePlayRule1;
var gamePlayRule2;
var gamePlayRule3;
var gamePlayRule4;
var gamePlayRule5;
var gamePlayRule6;
var gamePlayRule7;
var sliderX;
var checkboxHostile;
var radioSizeOfBoard;

var widthOfWorld;
var heightOfWorld;
var sizeOfWorldInPixels;
var drawSize;
var myCanvas;
var bottomBorderHeight;
var sideBorderWidth;

var worldArray;
var individualsToUpdate;
var teamArray;
var redArray;
var blueArray;	
var whatIsGoingToChange;
var chosenSquareMark = {x : -1, y : -1};			
var buttonCycleOneStep;
var buttonstartPlayUntilFinished;
var buttonRestart;

var playUntilFinished;


var futureSizeOfWorld = 10;
var firstTime = true;

var isItRedsTurn;
var hasPicked;
var chosenPos = {x : -1, y : -1};
var setupPhase;
var gameOver;
var hostileMode;
var hostileModeFuture;

var message;
var gameIsADraw; 
var drawErrorMessage;
var frameCounter;
var startFrameCounter;

function setup() {
	frameRate(30);
	frameCounter = 0;
	startFrameCounter = false;
	setupPhase = true;
	gameOver = false;
	widthOfWorld = futureSizeOfWorld;
	heightOfWorld = futureSizeOfWorld;
	drawSize = 600/widthOfWorld;
	sizeOfWorldInPixels = futureSizeOfWorld*drawSize;
	bottomBorderHeight = 100;
	hostileMode = hostileModeFuture;
	//sideBorderWidth = 200;
	chosenPos.x = -1;
	chosenPos.y = -1;
	worldArray = [];
	individualsToUpdate = [];
	teamArray = [];
	whatIsGoingToChange = [];
	isItRedsTurn = true;
	hasPicked = false;
	playUntilFinished = false;
	gameOver = false;
	message = "";
	gameIsADraw = false;
	drawErrorMessage = false;
	chosenSquareMark
	if(firstTime)
	{	myCanvas = createCanvas(sizeOfWorldInPixels+1, sizeOfWorldInPixels+bottomBorderHeight+1);
		rectMode(CENTER);
		textSize(32);
		textAlign(CENTER);
		textFont("Georgia");
   		textStyle(BOLD);
		createAllDOMElements();

		firstTime = false;
	}
	else if(!firstTime) 
		myCanvas.size(sizeOfWorldInPixels+1, sizeOfWorldInPixels+bottomBorderHeight+1);
	myCanvas.position(windowWidth/2-sizeOfWorldInPixels/2, 25);

//Fyller worldArray med individer:
	worldArray = teamSeed(worldArray, widthOfWorld, heightOfWorld)
	updateFutureTeam();
}

function activateHostileMode() {
  if (this.checked()) {
	hostileModeFuture = true;
  } else {
    hostileModeFuture = false;
  }
}

function changeStateOfIndividual () {  

	if(!playUntilFinished)
	{
		if(mouseX>0 && mouseX<sizeOfWorldInPixels+1 && mouseY>0 && mouseY<sizeOfWorldInPixels+1){
			var tempMouseX = floor(mouseX/drawSize);
			var tempMouseY = floor(mouseY/drawSize);
			var currentTeam = "";
			var opposingTeam = "";
			
			if(!hostileMode) {
				if(isItRedsTurn) {
					currentTeam = "Red";
					opposingTeam = "Blue";
				}
				else {
					currentTeam = "Blue";
					opposingTeam = "Red";
				}					
			}
		
			drawErrorMessage = false;
			if(worldArray[tempMouseX][tempMouseY].doAnimation == false && worldArray[tempMouseX][tempMouseY].canChange == true && hasPicked == false && worldArray[tempMouseX][tempMouseY].team != opposingTeam)
			{
				hasPicked = true;
				worldArray[tempMouseX][tempMouseY].mouseIsOver();
				append(individualsToUpdate, worldArray[tempMouseX][tempMouseY]); 
				chosenPos.x = tempMouseX;
				chosenPos.y = tempMouseY;
			}
			else if (worldArray[tempMouseX][tempMouseY].doAnimation == false && chosenPos.x == tempMouseX && chosenPos.y == tempMouseY && worldArray[tempMouseX][tempMouseY].canChange == true  && hasPicked == true ) {
				hasPicked = false;
				worldArray[tempMouseX][tempMouseY].mouseIsOver();
				worldArray[tempMouseX][tempMouseY].revertTeam();
				append(individualsToUpdate, worldArray[tempMouseX][tempMouseY]); 
				chosenPos.x = -1;
				chosenPos.y = -1;
			}
			else if(worldArray[tempMouseX][tempMouseY].doAnimation == false && worldArray[tempMouseX][tempMouseY].canChange == true && hasPicked == false && worldArray[tempMouseX][tempMouseY].team == opposingTeam && !hostileMode) {
				textSize(16);
				drawErrorMessage = true;
				message = "You can't target-kill your opponents individuals.";
			}			
			else
			{
				textSize(16);
				drawErrorMessage = true;
				message = "You can only pick one individual square to change each turn";
			}
		}
	}

}
function mousePressed() {
	if(gameOver ==  false && individualsToUpdate.length == 0) {
			changeStateOfIndividual();
	}
}

function startPlayUntilFinished() {
	playUntilFinished = !playUntilFinished;
}

function revertErrorMessage() {
	if (startFrameCounter == false) {
		message = "";
		drawErrorMessage = false;  
		textSize(50); 
	}																
}

function checkForWin() {
	var doesRedExist = false;
	var doesBlueExist = false;

	for (var i = 0; i < widthOfWorld; i++) {
		for (var j = 0; j < heightOfWorld; j++) {
			if(worldArray[i][j].team == "Red")
				doesRedExist = true;
			else if (worldArray[i][j].team == "Blue")
				doesBlueExist = true;
		}
	}
	if(!doesRedExist && doesBlueExist) {
		message = "Blue wins!";
		print("Blue Wins!");
		gameOver = true;
	}
		
	else if (!doesBlueExist && doesRedExist) {
		message = "Red wins!";
		print("Red wins!");
		gameOver = true;
	}
	else if(!doesRedExist && !doesRedExist) {
		message = "Draw!"
		print("Draw!");
		gameOver = true;
		gameIsADraw = true;
	}
		
}

function updateFutureTeam () {
	whatIsGoingToChange = life(widthOfWorld, heightOfWorld, worldArray);
}

function playOneStep() { 
	if(gameOver == false && individualsToUpdate.length == 0) {
		if(hasPicked == false) {
			textSize(16);
			message = "You need to change one individual square before you can end your turn!";
			drawErrorMessage = true;
		}
		else if(hasPicked == true) {
			if(individualsToUpdate.length == 0){
				drawErrorMessage = false;
				whatIsGoingToChange=[];
				individualsToUpdate = life(widthOfWorld, heightOfWorld, worldArray);
				isItRedsTurn = !isItRedsTurn;

			for (var i = 0; i < individualsToUpdate.length; i++) {
			//BACKUP individualsToUpdate[i].changeLife();
				individualsToUpdate[i].team = individualsToUpdate[i].futureTeam;
				individualsToUpdate[i].oldTeam = individualsToUpdate[i].team;
				individualsToUpdate[i].doAnimation = true;
				individualsToUpdate[i].canChange = false;  
				individualsToUpdate[i].changeLife();
				}

			}
			hasPicked = false;
			chosenPos.x = -1;
			chosenPos.y = -1;
			updateFutureTeam();

		}
		checkForWin();	
	}	
}


//function mouseIsOver() {

//}

function draw() {
	if(startFrameCounter == true)
	{
		textSize(16);
		frameCounter++;
		if(frameCounter >= 120 || drawErrorMessage == false) {
			startFrameCounter = false;
			frameCounter = 0;
			revertErrorMessage();
		}
			
	}

	//Bakgrund: 
	clear();
	rectMode(CORNER);
	fill(0);
	rect(0, 0, sizeOfWorldInPixels+1, sizeOfWorldInPixels+1);
	strokeWeight(0);
	fill(255);
	rect(0, sizeOfWorldInPixels+1, sizeOfWorldInPixels+1, bottomBorderHeight);
	strokeWeight(1);
	rectMode(CENTER);

	if(individualsToUpdate.length > 0)
	{
		for (var i = 0; i < individualsToUpdate.length; i++) {
			individualsToUpdate[i].updateAnimation(i);

		}
	}

	for (var i = 0; i < widthOfWorld; i++) {
		for (var j = 0; j < heightOfWorld; j++) {
			worldArray[i][j].updateColor();
			fill(worldArray[i][j].color);
			rect((worldArray[i][j].x-1)*drawSize+drawSize/2, (worldArray[i][j].y-1)*drawSize+drawSize/2, drawSize*worldArray[i][j].animationStatus, drawSize*worldArray[i][j].animationStatus);
		}
	}
	if(whatIsGoingToChange.length > 0 && individualsToUpdate.length == 0 )
	{
		for (var i = 0; i < whatIsGoingToChange.length; i++) {
			if((whatIsGoingToChange[i].team == "Red" || whatIsGoingToChange[i].team == "Blue")) {
				fill(0,0,0);
				rect((whatIsGoingToChange[i].x-1)*drawSize+drawSize/2, (whatIsGoingToChange[i].y-1)*drawSize+drawSize/2, drawSize/4, drawSize/4);			
			}
			else if (whatIsGoingToChange[i].team = "Dead") {
				fill(whatIsGoingToChange[i].futureTeam);	
				rect((whatIsGoingToChange[i].x-1)*drawSize+drawSize/2, (whatIsGoingToChange[i].y-1)*drawSize+drawSize/2, drawSize/4, drawSize/4);			
			}
		}
	}

	if(playUntilFinished && !mouseIsPressed)
		playOneStep();


	
	fill(0, 255, 0);

	if(gameOver == true)
		textSize(50);
	else if(drawErrorMessage == true) {
		startFrameCounter = true;
	}
	if(gameOver == false && chosenPos.x != -1)
	{
		strokeWeight(1);
		stroke(255);
		line(chosenPos.x*drawSize, chosenPos.y*drawSize, chosenPos.x*drawSize+drawSize, chosenPos.y*drawSize);
		line(chosenPos.x*drawSize, chosenPos.y*drawSize, chosenPos.x*drawSize, chosenPos.y*drawSize+drawSize);
		line(chosenPos.x*drawSize+drawSize, chosenPos.y*drawSize, chosenPos.x*drawSize+drawSize, chosenPos.y*drawSize+drawSize);
		line(chosenPos.x*drawSize, chosenPos.y*drawSize+drawSize, chosenPos.x*drawSize+drawSize, chosenPos.y*drawSize+drawSize);
		strokeWeight(1);
		stroke(0);
	}
	text(message, sizeOfWorldInPixels/2, 100+sizeOfWorldInPixels/2, 400, 300);

}

//BYGG ETT MER HÅLLBART SYSTEM FÖR ATT UPPDATERA INGAME-TEXT


//Lägg mindre använda felsökningsfunktioner här nedan: 

function showBoardColors() {
	for (var i = 0; i < widthOfWorld; i++) {
		var tempString = "";
		//print("RAD");

		for (var j = 0; j < heightOfWorld; j++) {
			if(worldArray[j][i].team == "Dead")
				tempString += " X ";
			else {
				tempString += worldArray[j][i].team; //Print sker en rad i taget, till skillnad från grafiken, som skrivs ut en kolumn i taget. Så j och i byter plats här.
				if(worldArray[j][i].team == "Red")
					tempString += " ";
				}
		}
		print(tempString);

	}
}

function showBoard() {
	for (var i = 0; i < widthOfWorld; i++) {
		var tempString = "";

		for (var j = 0; j < heightOfWorld; j++) {
			tempString += worldArray[j][i].life; //Print sker en rad i taget, till skillnad från grafiken, som skrivs ut en kolumn i taget. Så j och i byter plats här.
			tempString += " ";
		}
		tempString += " Row: " + i;
		print(tempString);

	}
}

function restart() {
	futureSizeOfWorld = floor(sliderX.value())*5;
	//futureSizeOfWorld = radioSizeOfBoard.value();
	setup();
}

function createAllDOMElements() {
		buttonCycleOneStep = createButton("End your turn");
		buttonCycleOneStep.position(windowWidth/2-550, 100);
		buttonCycleOneStep.size(200, 100);
		buttonCycleOneStep.mousePressed(playOneStep);	

		buttonRestart = createButton("Restart");
		buttonRestart.position(windowWidth/2-550, 250);
		buttonRestart.size(200, 100);
		buttonRestart.mousePressed(restart);

	/*	
		buttonstartPlayUntilFinished = createButton("Start non-stop cycling (click again to stop)");
		buttonstartPlayUntilFinished.position(windowWidth/2-550, 400);
		buttonstartPlayUntilFinished.size(200, 100);
		buttonstartPlayUntilFinished.mousePressed(startPlayUntilFinished);
	*/	

		gamePlayRule0 = createP("Gameplay rules:  ");
		gamePlayRule0.position(windowWidth/2+320, 325-320);
		gamePlayRule1 = createP("On each turn, you have to perform either of the following two actions: ");
		gamePlayRule1.position(windowWidth/2+340, 350-320);
		gamePlayRule2 = createP("Click on any alive individual (large colored square) to kill it.");
		gamePlayRule2.position(windowWidth/2+370, 400-320);		
		gamePlayRule3 = createP("or");
		gamePlayRule3.position(windowWidth/2+400, 425-320);	
		gamePlayRule4 = createP("Click on any dead area (large black squares) to create a new alive individual of your color.");
		gamePlayRule4.position(windowWidth/2+370, 450-320);	
		gamePlayRule5 = createP("Can can cancel your selection by clicking on the same square a second time.");
		gamePlayRule5.position(windowWidth/2+340, 525-320);	
		gamePlayRule6 = createP("When you have decided on what square to change, hit 'END TURN' to progress the world and pass the turn.");
		gamePlayRule6.position(windowWidth/2+340, 575-320);	
		gamePlayRule7 = createP("HINT: Smaller squares shows the future. If Hostile Mode is activated, you will also be able to kill your opponents individuals.");
		gamePlayRule7.position(windowWidth/2+340, 625-320);	

		rule0 = createP("Rules of the future:");
		rule0.position(windowWidth/2+320, 0+375)
		rule1 = createP("First rule: Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.");
		rule1.position(windowWidth/2+320, 50+375)
		rule2 = createP("Second rule: Any live cell with two or three live neighbours lives on to the next generation.");
		rule2.position(windowWidth/2+320, 100+375)
		rule3 = createP("Third rule: Any live cell with more than three live neighbours dies, as if by overpopulation.");
		rule3.position(windowWidth/2+320, 150+375)
		rule4 = createP("Fourth rule: Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.");
		rule4.position(windowWidth/2+320, 200+375);
	
		sliderX = createSlider(1, 3, futureSizeOfWorld/5);
		sliderX.position(windowWidth/2-550, 550);
		sliderX.style('width', '200px');
		sliderText = createP("Size of board (5x5, 10x10 or 15x15):");
		sliderText.position(windowWidth/2-550, 500);
	
		checkboxHostile = createCheckbox('Hostile Mode', false);
  		checkboxHostile.changed(activateHostileMode);
		checkboxHostile.position(windowWidth/2-550, 450);
/*
		radioSizeOfBoard = createRadio();
  		radioSizeOfBoard.option("5x5", 5);
 		radioSizeOfBoard.option("10x10", 10);
 	 	radioSizeOfBoard.option("15x15", 15);
  		radioSizeOfBoard.style('height', '60px');
  		radioSizeOfBoard.position(windowWidth/2-550, 500);
 */
}