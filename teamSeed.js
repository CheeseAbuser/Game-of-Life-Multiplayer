function teamSeed(worldArray, widthOfWorld, heightOfWorld) {
	for (var i = 0; i < widthOfWorld; i++) {
		worldArray[i] = new Array();
		for (var j = 0; j < widthOfWorld; j++) {
			var team = "";
			if(widthOfWorld == 5)
			{
				if(i == floor(widthOfWorld/2)-1 && (j == floor(heightOfWorld/2)-1  || j == floor(heightOfWorld/2) || j == floor(heightOfWorld/2)+1 || j == floor(heightOfWorld/2)+2))
					team = "Red";
				else if(i == floor(widthOfWorld/2)-2 && (j == floor(heightOfWorld/2)-2 || j == floor(heightOfWorld/2) ))
					team = "Red";
				else if(i == floor(widthOfWorld/2)+1 && (j == floor(heightOfWorld/2)-2 || j == floor(heightOfWorld/2)-1 || j == floor(heightOfWorld/2) || j == floor(heightOfWorld/2)+1))
					team = "Blue";
				else if(i == floor(widthOfWorld/2)+2 && (j == floor(heightOfWorld/2) || j == floor(heightOfWorld/2)+2))
					team = "Blue";					
			}
			else if (widthOfWorld == 10) {
				if(i == floor(widthOfWorld/2)-4 && (j == floor(heightOfWorld/2)-4 || j == floor(heightOfWorld/2)-3 || j == floor(heightOfWorld/2)-2 || j == floor(heightOfWorld/2)+1 || j == floor(heightOfWorld/2)+2 || j == floor(heightOfWorld/2)+3))
					team = "Red";
			/*
				else if(i == floor(widthOfWorld/2)-4 && (j == floor(heightOfWorld/2)-3 || j == floor(heightOfWorld/2)+2))
					team = "Red";
				else if(i == floor(widthOfWorld/2)-5 && (j == floor(heightOfWorld/2)-3  || j == floor(heightOfWorld/2)+2))
					team = "Red";
			*/
				else if(i == floor(widthOfWorld/2)+3 && (j == floor(heightOfWorld/2)-4 || j == floor(heightOfWorld/2)-3 || j == floor(heightOfWorld/2)-2 || j == floor(heightOfWorld/2)+1 || j == floor(heightOfWorld/2)+2 || j == floor(heightOfWorld/2)+3))
					team = "Blue";
			/*
				else if(i == floor(widthOfWorld/2)+3 && (j == floor(heightOfWorld/2)-3 || j == floor(heightOfWorld/2)+2))
					team = "Blue";
				else if(i == floor(widthOfWorld/2)+4 && (j == floor(heightOfWorld/2)-3  || j == floor(heightOfWorld/2)+2))
					team = "Blue";
			*/
			}
			else if(widthOfWorld == 15) {
				if(i == floor(widthOfWorld/2)-1 && (j == floor(heightOfWorld/2)-1 || j == floor(heightOfWorld/2) || j == floor(heightOfWorld/2)+1))
					team = "Red";
				else if(i == floor(widthOfWorld/2)-2 && (j == floor(heightOfWorld/2)-2 || j == floor(heightOfWorld/2)+2))
					team = "Red";
				else if(i == floor(widthOfWorld/2)-5 && (j == floor(heightOfWorld/2)-1 || j == floor(heightOfWorld/2) || j == floor(heightOfWorld/2)+1))
					team = "Red";
				else if(i == floor(widthOfWorld/2)+1 && (j == floor(heightOfWorld/2)-1 || j == floor(heightOfWorld/2) || j == floor(heightOfWorld/2)+1))
					team = "Blue";
				else if(i == floor(widthOfWorld/2)+2 && (j == floor(heightOfWorld/2)-2 || j == floor(heightOfWorld/2)+2))
					team = "Blue";	
				else if(i == floor(widthOfWorld/2)+5 && (j == floor(heightOfWorld/2)-1 || j == floor(heightOfWorld/2) || j == floor(heightOfWorld/2)+1))					
					team = "Blue";
			}
			else
				team = "Dead";
			worldArray[i][j] = new individual(i, j, team);
			}
		}

		return worldArray;
}