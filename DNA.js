function individual(x, y, team){
	this.x = x+1;
	this.y = y+1;
	this.team = team;
	this.life = 0;
	this.futureTeam = "";
	this.animationSpeed = 0.1;	
	if(this.team == "Red" || this.team == "Blue") {
		this.life = 1;
	}
	else {
		this.team = "Dead";
		this.life = 0;
	}		

	this.oldTeam = this.team;
	this.animationStatus = this.life;
	this.animationGoal = 1-this.life;
	this.doAnimation = false;
	this.canChange = true;
	this.color = color(0,0,0);
	this.red = 0;
	this.blue = 0;
	
	this.updateColor = function() {
		if(this.team == "Red") {
			this.red = 255;
			this.blue = 0;
		}
		else if(this.team == "Blue") {
			this.red = 0;
			this.blue = 255;
		}

		this.color = [this.red*this.animationStatus, 0, this.blue*this.animationStatus];
	}
	this.updateColor();

	this.updateAnimation = function (indexToRemove) {
		if(this.doAnimation == true) {
			if(this.animationGoal == 1) {
				this.animationStatus += this.animationSpeed;
				if(this.animationStatus >= this.animationGoal) {
					this.animationStatus = 1;
					this.animationGoal = 0;
					this.doAnimation = false;
					this.canChange = true;
					individualsToUpdate.splice(indexToRemove, 1);
				}
			}
			else if(this.animationGoal == 0) {
				this.animationStatus -= this.animationSpeed;
				if(this.animationStatus <= this.animationGoal) {
					this.animationStatus = 0;
					this.animationGoal = 1;
					this.doAnimation = false;
					this.canChange = true;
					individualsToUpdate.splice(indexToRemove, 1);
				}
			}
			this.updateColor();
			//FÄRGEN VERKAR INTE UPPDATERAS I TAKT MED LIVET. .
			//Ibland behåller en ruta life = 1 men color = "dead"...men visas ändå som röd/blå. Varför?	
		}
	}

	this.changeLife = function() { 
		this.life = 1-this.life;
	}

	this.revertTeam = function() {
		this.team = this.oldTeam;
	}

	this.changeTeam = function () {
		if(this.team == "Red" || this.team == "Blue") {
			this.team = "Dead";
		}
		else if(this.team == "Dead") {
			if(isItRedsTurn)
				this.team = "Red";
			else
				this.team = "Blue";
		}		
	}

	this.mouseIsOver = function () {
		this.changeTeam();
		this.changeLife(this.team);
		this.doAnimation = true;
		this.canChange = false;
		updateFutureTeam();
	}

	this.mouseDraw = function () {
		line(this.x, this.y, this.x+drawSize, this.y);
		line(this.x, this.y, this.x, this.y+drawSize);
		line(this.x+drawSize, this.y, this.x+drawSize, this.y+drawSize);
		line(this.x, this.y+drawSize, this.x+drawSize, this.y+drawSize);
	}
}