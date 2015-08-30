/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="ball.ts" />
module SoccerGame {

	export class Ai extends Phaser.Sprite {

		team: number;
		stamina: number;
		speed: number;
		// 0 = easy, 1 = medium, 2 = hard , 3 = defensive , 4 = offensive
		difficulty: number;
		staminaReduceFactor: number;
		staminaRecoverFactor: number;
		staminaText: Phaser.Text;
		ball: Ball;
		goal1: Goal;
		goal2: Goal;
		sprintDistanceFactor: number;


		constructor(game: Phaser.Game, x: number, y: number, teamNumber: number, difficulty: number, ball: Ball, goal1: Goal, goal2: Goal) {
			this.stamina = 100;
			this.speed = 150;



			this.ball = ball;
			this.goal1 = goal1;
			this.goal2 = goal2;
			this.difficulty = difficulty;

			if (teamNumber == 1) {
				super(game, x, y, 'players', 0);
				this.animations.add('walk', [0, 1, 2, 3], 10, true);
				this.team = 1;

			}
			else {
				super(game, x, y, 'players', 36);
				this.animations.add('walk', [36, 37, 38, 39], 10, true);
				this.team = 2;

			}
			// easy bot
			if (this.difficulty == 0) {
				this.sprintDistanceFactor = 200;
				this.staminaReduceFactor = 2.0;
				this.staminaRecoverFactor = 1.0;
			}

			this.anchor.setTo(0.5, 0);
			this.scale.setTo(2, 2);
			game.physics.enable(this, Phaser.Physics.ARCADE);
			game.add.existing(this);
			this.body.collideWorldBounds = true;
			this.staminaText = game.add.text(x - this.width / 2, y + this.height, "" + this.stamina, { fontSize: '18px', fill: '#000' });
		}


		public setBall(ball: Ball) {
			this.ball = ball;
		}


		update() {
			this.body.velocity.x = 0;
			this.body.velocity.y = 0;
			this.staminaText.text = "" + Phaser.Math.roundAwayFromZero(this.stamina);
			this.staminaText.position.x = this.x - this.width / 2;
			this.staminaText.position.y = this.y + this.height;
			// if difficulty is easy
			//console.log("ball Position: " + this.ball.x + " : " + this.ball.y);
			//console.log("AI Position : " + this.x + " : " +this.y);
			if (this.difficulty == 0) {
				if (((Phaser.Math.distance(this.goal1.x, this.goal1.y, this.ball.x, this.ball.y) < 200 || Phaser.Math.distance(this.goal2.x, this.goal2.y, this.ball.x, this.ball.y) < 200)) && this.stamina > 0) {
					this.speed = 300;
					this.stamina = this.stamina - this.staminaReduceFactor;
					if (this.stamina < 0) {
						this.stamina = 0;
					}
				}
				else {

					this.speed = 150;
					if (this.stamina < 100) {
						this.stamina = this.stamina + this.staminaRecoverFactor;
					}
				}

				if (this.x < this.ball.x) {
					this.body.velocity.x = this.speed;

					if (this.y < this.ball.y) {
						this.body.velocity.y = this.speed;
					}
					else {
						this.body.velocity.y = -this.speed;
					}

				}
				else {
					this.body.velocity.x = -this.speed;

					if (this.y < this.ball.y) {
						this.body.velocity.y = this.speed;
					}
					else {
						this.body.velocity.y = -this.speed;
					}

				}




			}




		}




	}

}