/// <reference path="player.ts"/>

module SoccerGame {


	export class Preloader extends Phaser.State {
		preloadBar: Phaser.Sprite;



		preload() {
			//  Set-up our preloader sprite
            
			this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);
 
            //  Load our actual games assets
			this.game.load.image('background', "assets/background.png");
			this.game.load.spritesheet('players', "assets/Chars.png", 16, 16, 64, 0, 0);
			this.game.load.image('titlepage',"assets/titlepage.png");
			this.game.load.image('clickToPlay', "assets/clickToPlay.png");
		}

		create() {

			var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
			tween.onComplete.add(this.startMainMenu, this);

		}

		startMainMenu() {
			this.game.state.start('MainMenu', true, false);
		}

	}


}

