/// <reference path="player.ts"/>
/// <reference path="goal.ts"/>
/// <reference path="ai.ts"/>

module SoccerGame {

	var scores: Array<number> = new Array<number>(2);
	export class Match extends Phaser.State {

		background: Phaser.Sprite;
		player1: Phaser.Sprite;
		player2: Phaser.Sprite;
		ball: Phaser.Sprite;
		goal1: Phaser.Sprite;
		goal2: Phaser.Sprite;

		scoreText: Phaser.Text;

		create() {

			this.background = this.add.sprite(0, 0, 'background');
			this.player1 = new Player(this.game, 500, 300, 1, Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.P);
            //this.player2 = new Player(this.game, 300, 300, 2,Phaser.Keyboard.W,Phaser.Keyboard.S,Phaser.Keyboard.A,Phaser.Keyboard.D,Phaser.Keyboard.Q);

			this.ball = new Ball(this.game);


			this.goal1 = new Goal(this.game, this.game.world.width - 10, this.world.centerY);
			this.goal2 = new Goal(this.game, 10, this.world.centerY);
			scores[0] = 0;
			scores[1] = 0;
			this.scoreText = this.game.add.text(16, 16, '', { fontSize: '20px', fill: '#000' });
			this.player2 = new Ai(this.game, 300, 300, 2, 0, this.ball, this.goal1, this.goal2);
		}

		update() {
			this.game.physics.arcade.collide(this.player1, this.ball);
			this.game.physics.arcade.collide(this.player2, this.ball);
			this.game.physics.arcade.collide(this.player1, this.player2);
			this.game.physics.arcade.overlap(this.ball, this.goal1, this.score2);
			this.game.physics.arcade.overlap(this.ball, this.goal2, this.score1);

			if (this.ball.visible == false) {
				this.game.world.remove(this.game);
				this.ball.destroy();
				this.ball = null;
				this.ball = new Ball(this.game);
				this.player2.setBall(this.ball);
			}
			this.scoreText.text = scores[0] + " : " + scores[1];


		}

		// Team 1 scored
		score1(ball, goal) {
			ball.destroy();
			scores[1] += 1;

		}
		// Team 2 scored
		score2(ball, goal) {
			ball.destroy();
			scores[0] += 1;

		}


	}

}

