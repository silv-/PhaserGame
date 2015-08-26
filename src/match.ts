/// <reference path="player.ts"/>

module SoccerGame {


	export class Match extends Phaser.State {
		
		background: Phaser.Sprite;
		player1: Phaser.Sprite;
		player2: Phaser.Sprite;

		create() {

			this.background = this.add.sprite(0, 0, 'background');
 
 			this.player1 = new Player(this.game, 500 , 300 , 1);
			
            this.player2 = new Player(this.game, 300 , 300 , 2);


		}

	
	}


}

