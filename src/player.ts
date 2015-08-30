/// <reference path="../tsDefinitions/phaser.d.ts" />
module SoccerGame {

	export class Player extends Phaser.Sprite {

		team: number;
		stamina: number;
		speed: number;
		keyCodeUp: number;
		keyCodeDown: number;
		keyCodeLeft: number;
		keyCodeRight: number;
		keyCodeSprint: number;
		staminaReduceFactor: number;
		staminaRecoverFactor: number;
		staminaText: Phaser.Text;


		constructor(game: Phaser.Game, x: number, y: number, teamNumber: number, keyCodeUp: number, keyCodeDown: number, keyCodeLeft: number, keyCodeRight: number, keyCodeSprint: number) {
			// create our phaser game
			// 800 - width
			// 600 - height
			// Phaser.AUTO - determine the renderer automatically (canvas, webgl)
			// 'content' - the name of the container to add our game to
			// { preload:this.preload, create:this.create} - functions to call for our states
			
			this.stamina = 100;
			this.speed = 150;
			this.keyCodeUp = keyCodeUp;
			this.keyCodeDown = keyCodeDown;
			this.keyCodeLeft = keyCodeLeft;
			this.keyCodeRight = keyCodeRight;
			this.keyCodeSprint = keyCodeSprint;
			this.staminaReduceFactor = 1.0;
			this.staminaRecoverFactor = 0.5;




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
			this.anchor.setTo(0.5, 0);
			this.scale.setTo(2, 2);
			game.physics.enable(this, Phaser.Physics.ARCADE);
			game.add.existing(this);
			this.body.collideWorldBounds = true;
			this.staminaText = game.add.text(x - this.width / 2, y + this.height, "" + this.stamina, { fontSize: '18px', fill: '#000' });
		}

		update() {
			this.body.velocity.x = 0;
			this.body.velocity.y = 0;
			this.staminaText.text = "" + Phaser.Math.roundAwayFromZero(this.stamina);
			this.staminaText.position.x = this.x - this.width / 2;
			this.staminaText.position.y = this.y + this.height;
			if (this.game.input.keyboard.isDown(this.keyCodeSprint) && this.stamina > 0) {
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
			if (this.game.input.keyboard.isDown(this.keyCodeLeft)) {
				//  Move to the left
				this.body.velocity.x = -this.speed;
				this.animations.play('walk');
				// move diagonal left down
				if (this.game.input.keyboard.isDown(this.keyCodeDown)) {
					this.body.velocity.y = this.speed;
				}
				// move diagonal left up
				else if (this.game.input.keyboard.isDown(this.keyCodeUp)) {
					this.body.velocity.y = -this.speed;
				}
			}
			else if (this.game.input.keyboard.isDown(this.keyCodeRight)) {
				//  Move to the right
				this.body.velocity.x = this.speed;
				this.animations.play('walk');
				//move diagonal right down
				if (this.game.input.keyboard.isDown(this.keyCodeDown)) {
					this.body.velocity.y = this.speed;
				}
				// move diagonal right up
				else if (this.game.input.keyboard.isDown(this.keyCodeUp)) {
					this.body.velocity.y = -this.speed;
				}
			}
			else if (this.game.input.keyboard.isDown(this.keyCodeDown)) {
				this.body.velocity.y = this.speed;
				this.animations.play('walk');
			}


			else if (this.game.input.keyboard.isDown(this.keyCodeUp)) {
				this.body.velocity.y = -this.speed;
				this.animations.play('walk');
			}
			else {
				this.animations.stop();

			}
		}





	}

}