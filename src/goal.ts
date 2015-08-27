/// <reference path="../tsDefinitions/phaser.d.ts" />
module SoccerGame {

	export class Goal extends Phaser.Sprite {



		constructor(game: Phaser.Game, x: number, y: number) {
			// create our phaser game
			// 800 - width
			// 600 - height
			// Phaser.AUTO - determine the renderer automatically (canvas, webgl)
			// 'content' - the name of the container to add our game to
			// { preload:this.preload, create:this.create} - functions to call for our states

			super(game, x, y, 'goal', 0);
			this.anchor.setTo(0.5, 0.5);
			//this.scale.setTo(2, 2);
			game.physics.enable(this, Phaser.Physics.ARCADE);
			game.add.existing(this);

		}

		update() {
		}


	}

}