/// <reference path="player.ts"/>
/// <reference path="preloader.ts"/>
/// <reference path="mainmenu.ts"/>
/// <reference path="match.ts"/>
/// <reference path="boot.ts"/>

module SoccerGame {


	export class Game extends Phaser.Game {

		constructor() {
			// create our phaser game
			// 800 - width
			// 600 - height
			// Phaser.AUTO - determine the renderer automatically (canvas, webgl)
			// 'content' - the name of the container to add our game to
			// { preload:this.preload, create:this.create} - functions to call for our states
			super(800, 600, Phaser.AUTO, 'content', null);
			this.state.add('Boot', Boot, false);
			this.state.add('Preloader', Preloader, false);
			this.state.add('MainMenu', MainMenu, false);
			this.state.add('Match', Match, false);
			this.state.start('Boot');

		}





	}


}
