function life(widthOfWorld, heightOfWorld, worldArray) {
	
	
	var aliveRedNeighbours;
	var aliveBlueNeighbours; 
	var aliveNeighbours;
	var arrayFilledWithIndividualsToUpdate = [];
	var indexCounter = 0;
	for (var i = 0; i < widthOfWorld; i++) {
		for (var j = 0; j < heightOfWorld; j++) {
		var aliveRedNeighbours = 0;
			var aliveBlueNeighbours = 0; 
			var aliveNeighbours = 0;
			//Alla positioners levande grannar behöver beräknas, oavsett om levande eller död. Beräkningen av antalet levande grannar utförs först och sedan kontrolleras om positionen i fråga är levande eller död. 
			//Hörn 0.0
			if (i == 0 && j == 0) {
				if(worldArray[i+1][j].life == 1 && worldArray[i+1][j].team == "Red") 
					aliveRedNeighbours += 1;
				if(worldArray[i][j+1].life == 1 && worldArray[i][j+1].team == "Red")
					aliveRedNeighbours += 1;
				if(worldArray[i+1][j+1].life == 1 && worldArray[i+1][j+1].team == "Red")
					aliveRedNeighbours += 1;

				if(worldArray[i+1][j].life == 1 && worldArray[i+1][j].team == "Blue") 
					aliveBlueNeighbours += 1;
				if(worldArray[i][j+1].life == 1 && worldArray[i][j+1].team == "Blue")
					aliveBlueNeighbours += 1;
				if(worldArray[i+1][j+1].life == 1 && worldArray[i+1][j+1].team == "Blue")
					aliveBlueNeighbours += 1;
			}
			//Hörn 0.max
			else if (i == 0 && j == heightOfWorld-1) {
				if(worldArray[i+1][j].life == 1 && worldArray[i+1][j].team == "Red") 
					aliveRedNeighbours += 1;
				if(worldArray[i][j-1].life == 1 && worldArray[i][j-1].team == "Red")
					aliveRedNeighbours += 1;
				if(worldArray[i+1][j-1].life == 1 && worldArray[i+1][j-1].team == "Red")
					aliveRedNeighbours += 1;		

				if(worldArray[i+1][j].life == 1 && worldArray[i+1][j].team == "Blue") 
					aliveBlueNeighbours += 1;
				if(worldArray[i][j-1].life == 1 && worldArray[i][j-1].team == "Blue")
					aliveBlueNeighbours += 1;
				if(worldArray[i+1][j-1].life == 1 && worldArray[i+1][j-1].team == "Blue")
					aliveBlueNeighbours += 1;		

			}
			//Hörn max.0
			else if (i == widthOfWorld-1 && j == 0) {
				if(worldArray[i-1][j].life == 1 && worldArray[i-1][j].team == "Red") 
					aliveRedNeighbours += 1;
				if(worldArray[i][j+1].life == 1 && worldArray[i][j+1].team == "Red")
					aliveRedNeighbours += 1;
				if(worldArray[i-1][j+1].life == 1 && worldArray[i-1][j+1].team == "Red")
					aliveRedNeighbours += 1;	

				if(worldArray[i-1][j].life == 1 && worldArray[i-1][j].team == "Blue") 
					aliveBlueNeighbours += 1;
				if(worldArray[i][j+1].life == 1 && worldArray[i][j+1].team == "Blue")
					aliveBlueNeighbours += 1;
				if(worldArray[i-1][j+1].life == 1 && worldArray[i-1][j+1].team == "Blue")
					aliveBlueNeighbours += 1;

			}
			//Hörn max.max
			else if (i == widthOfWorld-1 && j == heightOfWorld-1) {
				if(worldArray[i-1][j].life == 1 && worldArray[i-1][j].life.team == "Red") 
					aliveRedNeighbours += 1;
				if(worldArray[i][j-1].life == 1 && worldArray[i][j-1].team == "Red")
					aliveRedNeighbours += 1;
				if(worldArray[i-1][j-1].life == 1 && worldArray[i-1][j-1].team == "Red")
					aliveRedNeighbours += 1;	

				if(worldArray[i-1][j].life == 1 && worldArray[i-1][j].life.team == "Blue") 
					aliveBlueNeighbours += 1;
				if(worldArray[i][j-1].life == 1 && worldArray[i][j-1].team == "Blue")
					aliveBlueNeighbours += 1;
				if(worldArray[i-1][j-1].life == 1 && worldArray[i-1][j-1].team == "Blue")
					aliveBlueNeighbours += 1;	
			}
			//Första kolumnen från vänster:
			else if(i == 0) {
				if(worldArray[i][j-1].life == 1 && worldArray[i][j-1].team == "Red")
					aliveRedNeighbours += 1;
				if(worldArray[i+1][j].life == 1 && worldArray[i+1][j].team == "Red")
					aliveRedNeighbours += 1;
				if(worldArray[i][j+1].life == 1 && worldArray[i][j+1].team == "Red")
					aliveRedNeighbours += 1;
				if(worldArray[i+1][j+1].life == 1 && worldArray[i+1][j+1].team == "Red")
					aliveRedNeighbours += 1;
				if(worldArray[i+1][j-1].life == 1 && worldArray[i+1][j-1].team == "Red")
					aliveRedNeighbours += 1;

				if(worldArray[i][j-1].life == 1 && worldArray[i][j-1].team == "Blue")
					aliveBlueNeighbours += 1;
				if(worldArray[i+1][j].life == 1 && worldArray[i+1][j].team == "Blue")
					aliveBlueNeighbours += 1;
				if(worldArray[i][j+1].life == 1 && worldArray[i][j+1].team == "Blue")
					aliveBlueNeighbours += 1;
				if(worldArray[i+1][j+1].life == 1 && worldArray[i+1][j+1].team == "Blue")
					aliveBlueNeighbours += 1;
				if(worldArray[i+1][j-1].life == 1 && worldArray[i+1][j-1].team == "Blue")
					aliveBlueNeighbours += 1;
			}	
			//Sista kolumnen, längst till höger:
			else if (i == widthOfWorld-1) {
				if(worldArray[i][j-1].life == 1 && worldArray[i][j-1].team == "Red")
					aliveRedNeighbours += 1;
				if(worldArray[i-1][j].life == 1 && worldArray[i-1][j].team == "Red")
					aliveRedNeighbours += 1;
				if(worldArray[i][j+1].life == 1 && worldArray[i][j+1].team == "Red")
					aliveRedNeighbours += 1;
				if(worldArray[i-1][j-1].life == 1 && worldArray[i-1][j-1].team == "Red")
					aliveRedNeighbours += 1;
				if(worldArray[i-1][j+1].life == 1 && worldArray[i-1][j+1].team == "Red")
					aliveRedNeighbours += 1;

				if(worldArray[i][j-1].life == 1 && worldArray[i][j-1].team == "Blue")
					aliveBlueNeighbours += 1;
				if(worldArray[i-1][j].life == 1 && worldArray[i-1][j].team == "Blue")
					aliveBlueNeighbours += 1;
				if(worldArray[i][j+1].life == 1 && worldArray[i][j+1].team == "Blue")
					aliveBlueNeighbours += 1;
				if(worldArray[i-1][j-1].life == 1 && worldArray[i-1][j-1].team == "Blue")
					aliveBlueNeighbours += 1;
				if(worldArray[i-1][j+1].life == 1 && worldArray[i-1][j+1].team == "Blue")
					aliveBlueNeighbours += 1;
			}
			//Översta raden:
			else if (j == 0) {
				if(worldArray[i-1][j].life == 1 && worldArray[i-1][j].team == "Red")
					aliveRedNeighbours += 1;
				if(worldArray[i][j+1].life == 1 && worldArray[i][j+1].team == "Red")
					aliveRedNeighbours += 1;
				if(worldArray[i+1][j].life == 1 && worldArray[i+1][j].team == "Red")
					aliveRedNeighbours += 1;
				if(worldArray[i-1][j+1].life == 1 && worldArray[i-1][j+1].team == "Red")
					aliveRedNeighbours += 1;
				if(worldArray[i+1][j+1].life == 1 && worldArray[i+1][j+1].team == "Red")
					aliveRedNeighbours += 1;

				if(worldArray[i-1][j].life == 1 && worldArray[i-1][j].team == "Blue")
					aliveBlueNeighbours += 1;
				if(worldArray[i][j+1].life == 1 && worldArray[i][j+1].team == "Blue")
					aliveBlueNeighbours += 1;
				if(worldArray[i+1][j].life == 1 && worldArray[i+1][j].team == "Blue")
					aliveBlueNeighbours += 1;
				if(worldArray[i-1][j+1].life == 1 && worldArray[i-1][j+1].team == "Blue")
					aliveBlueNeighbours += 1;
				if(worldArray[i+1][j+1].life == 1 && worldArray[i+1][j+1].team == "Blue")
					aliveBlueNeighbours += 1;
			}
			//Understa raden:
			else if (j == heightOfWorld-1) {
				if(worldArray[i-1][j].life == 1 && worldArray[i-1][j].team == "Red")
					aliveRedNeighbours += 1;
				if(worldArray[i][j-1].life == 1 && worldArray[i][j-1].team == "Red")
					aliveRedNeighbours += 1;
				if(worldArray[i+1][j].life == 1 && worldArray[i+1][j].team == "Red")
					aliveRedNeighbours += 1;
				if(worldArray[i-1][j-1].life == 1 && worldArray[i-1][j-1].team == "Red")
					aliveRedNeighbours += 1;
				if(worldArray[i+1][j-1].life == 1 && worldArray[i+1][j-1].team == "Red")
					aliveRedNeighbours += 1;

				if(worldArray[i-1][j].life == 1 && worldArray[i-1][j].team == "Blue")
					aliveBlueNeighbours += 1;
				if(worldArray[i][j-1].life == 1 && worldArray[i][j-1].team == "Blue")
					aliveBlueNeighbours += 1;
				if(worldArray[i+1][j].life == 1 && worldArray[i+1][j].team == "Blue")
					aliveBlueNeighbours += 1;
				if(worldArray[i-1][j-1].life == 1 && worldArray[i-1][j-1].team == "Blue")
					aliveBlueNeighbours += 1;
				if(worldArray[i+1][j-1].life == 1 && worldArray[i+1][j-1].team == "Blue")
					aliveBlueNeighbours += 1;
			}
			//Alla övriga koordinater (som alltså inte ingår i ramen för brädet):
			else {
				if(worldArray[i-1][j].life == 1 && worldArray[i-1][j].team == "Red")
					aliveRedNeighbours += 1;
				if(worldArray[i][j+1].life == 1 && worldArray[i][j+1].team == "Red")
					aliveRedNeighbours += 1;
				if(worldArray[i+1][j].life == 1 && worldArray[i+1][j].team == "Red")
					aliveRedNeighbours += 1;
				if(worldArray[i][j-1].life == 1 && worldArray[i][j-1].team == "Red")
					aliveRedNeighbours += 1;
				if(worldArray[i-1][j-1].life == 1 && worldArray[i-1][j-1].team == "Red")
					aliveRedNeighbours += 1;
				if(worldArray[i+1][j-1].life == 1 && worldArray[i+1][j-1].team == "Red")
					aliveRedNeighbours += 1;
				if(worldArray[i+1][j+1].life == 1 && worldArray[i+1][j+1].team == "Red")
					aliveRedNeighbours += 1;
				if(worldArray[i-1][j+1].life == 1 && worldArray[i-1][j+1].team == "Red")
					aliveRedNeighbours += 1;		

				if(worldArray[i-1][j].life == 1 && worldArray[i-1][j].team == "Blue")
					aliveBlueNeighbours += 1;
				if(worldArray[i][j+1].life == 1 && worldArray[i][j+1].team == "Blue")
					aliveBlueNeighbours += 1;
				if(worldArray[i+1][j].life == 1 && worldArray[i+1][j].team == "Blue")
					aliveBlueNeighbours += 1;
				if(worldArray[i][j-1].life == 1 && worldArray[i][j-1].team == "Blue")
					aliveBlueNeighbours += 1;
				if(worldArray[i-1][j-1].life == 1 && worldArray[i-1][j-1].team == "Blue")
					aliveBlueNeighbours += 1;
				if(worldArray[i+1][j-1].life == 1 && worldArray[i+1][j-1].team == "Blue")
					aliveBlueNeighbours += 1;
				if(worldArray[i+1][j+1].life == 1 && worldArray[i+1][j+1].team == "Blue")
					aliveBlueNeighbours += 1;
				if(worldArray[i-1][j+1].life == 1 && worldArray[i-1][j+1].team == "Blue")
					aliveBlueNeighbours += 1;		
			}
			//Nu kontrolleras värdet av aliveNeighbours och därmed avgörs "ödet" för individen beroende på om denna från början är levande eller död:
			
			aliveNeighbours = aliveRedNeighbours + aliveBlueNeighbours;

			//Lever individen och har mindre än (0 eller 1) grannar, så dör den.
			if (aliveNeighbours < 2 && worldArray[i][j].life == 1) {
				arrayFilledWithIndividualsToUpdate[indexCounter] = worldArray[i][j];
				arrayFilledWithIndividualsToUpdate[indexCounter].futureTeam = "Dead";
				indexCounter++;
			}
			/*
			//Lever individen och har exakt 2 eller 3 grannar, så överlever den men förlorar tidsenheter i liv.
			else if (aliveNeighbours == 2 && worldArray[i][j].life == 1 ) {
				worldArray[i][j].life -= 2;
			}
			else if (aliveNeighbours == 3 && worldArray[i][j].life == 1) {
				worldArray[i][j].life -= 1;
			}
			*/
			//Lever invididen och har fler än 3 grannar, så dör den.
			else if (aliveNeighbours > 3 && worldArray[i][j].life == 1) {
				arrayFilledWithIndividualsToUpdate[indexCounter] = worldArray[i][j]; 
				arrayFilledWithIndividualsToUpdate[indexCounter].futureTeam = "Dead";
				indexCounter++;
			}
			//Är "individen" död och har exakt tre grannar som lever, så kommer den till liv.
			else if (aliveNeighbours == 3 && worldArray[i][j].life == 0) {
				arrayFilledWithIndividualsToUpdate[indexCounter] = worldArray[i][j];
				if(aliveRedNeighbours > aliveBlueNeighbours)
					arrayFilledWithIndividualsToUpdate[indexCounter].futureTeam = "Red";
				else if (aliveBlueNeighbours > aliveRedNeighbours)
					arrayFilledWithIndividualsToUpdate[indexCounter].futureTeam = "Blue";
				indexCounter++;
			}
		}
	}	


	return arrayFilledWithIndividualsToUpdate;
}
