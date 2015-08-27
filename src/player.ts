/// <reference path="../tsDefinitions/phaser.d.ts" />
module SoccerGame {

	export class Player extends Phaser.Sprite {

		team: number;

		constructor(game: Phaser.Game, x: number, y: number, teamNumber: number) {
			// create our phaser game
			// 800 - width
			// 600 - height
			// Phaser.AUTO - determine the renderer automatically (canvas, webgl)
			// 'content' - the name of the container to add our game to
			// { preload:this.preload, create:this.create} - functions to call for our states
			
			

		

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

		}

		update() {
			this.body.velocity.x = 0;
			this.body.velocity.y = 0;
			if (this.team == 1) {



				if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
					//  Move to the left
					this.body.velocity.x = -150;

					this.animations.play('walk');
					// move diagonal left down
					if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
						this.body.velocity.y = 150;

					}
					// move diagonal left up
					else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
						this.body.velocity.y = -150;

					}




				}
				else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
					//  Move to the right
					this.body.velocity.x = 150;
					this.animations.play('walk');
					//move diagonal right down
					if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
						this.body.velocity.y = 150;

					}
					// move diagonal right up
					else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
						this.body.velocity.y = -150;

					}


				}
				else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
					this.body.velocity.y = 150;
					this.animations.play('walk');
				}


				else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
					this.body.velocity.y = -150;
					this.animations.play('walk');
				}
				else {
					this.animations.stop();

				}
			}

			else {

				if (this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
					//  Move to the left
					this.body.velocity.x = -150;

					this.animations.play('walk');
					//move diagonal left down
					if (this.game.input.keyboard.isDown(Phaser.Keyboard.S)) {
						this.body.velocity.y = 150;

					}
					// move diagonal left up
					else if (this.game.input.keyboard.isDown(Phaser.Keyboard.W)) {
						this.body.velocity.y = -150;

					}
				}
				else if (this.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
					//  Move to the right
					this.body.velocity.x = 150;
					this.animations.play('walk');
					// move diagonal right down
					if (this.game.input.keyboard.isDown(Phaser.Keyboard.S)) {
						this.body.velocity.y = 150;

					}
					// move diagonal right up
					else if (this.game.input.keyboard.isDown(Phaser.Keyboard.W)) {
						this.body.velocity.y = -150;

					}

				}
				else if (this.game.input.keyboard.isDown(Phaser.Keyboard.S)) {
					this.body.velocity.y = 150;
					this.animations.play('walk');
				}


				else if (this.game.input.keyboard.isDown(Phaser.Keyboard.W)) {
					this.body.velocity.y = -150;
					this.animations.play('walk');
				}
				else {
					this.animations.stop();

				}


			}

		}


	}

}