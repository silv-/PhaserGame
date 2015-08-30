var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../tsDefinitions/phaser.d.ts" />
var SoccerGame;
(function (SoccerGame) {
    var Ball = (function (_super) {
        __extends(Ball, _super);
        function Ball(game) {
            // create our phaser game
            // 800 - width
            // 600 - height
            // Phaser.AUTO - determine the renderer automatically (canvas, webgl)
            // 'content' - the name of the container to add our game to
            // { preload:this.preload, create:this.create} - functions to call for our states
            _super.call(this, game, game.world.centerX, game.world.centerY, 'ball', 0);
            this.anchor.setTo(0.5, 0);
            //this.scale.setTo(2, 2);
            game.physics.enable(this, Phaser.Physics.ARCADE);
            game.add.existing(this);
            this.body.collideWorldBounds = true;
            this.body.bounce.x = 1.1;
            this.body.bounce.y = 1.1;
        }
        Ball.prototype.update = function () {
        };
        return Ball;
    })(Phaser.Sprite);
    SoccerGame.Ball = Ball;
})(SoccerGame || (SoccerGame = {}));
/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="ball.ts" />
var SoccerGame;
(function (SoccerGame) {
    var Ai = (function (_super) {
        __extends(Ai, _super);
        function Ai(game, x, y, teamNumber, difficulty, ball, goal1, goal2) {
            // create our phaser game
            // 800 - width
            // 600 - height
            // Phaser.AUTO - determine the renderer automatically (canvas, webgl)
            // 'content' - the name of the container to add our game to
            // { preload:this.preload, create:this.create} - functions to call for our states
            this.stamina = 100;
            this.speed = 150;
            this.ball = ball;
            this.goal1 = goal1;
            this.goal2 = goal2;
            this.difficulty = difficulty;
            if (teamNumber == 1) {
                _super.call(this, game, x, y, 'players', 0);
                this.animations.add('walk', [0, 1, 2, 3], 10, true);
                this.team = 1;
            }
            else {
                _super.call(this, game, x, y, 'players', 36);
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
        Ai.prototype.setBall = function (ball) {
            this.ball = ball;
        };
        Ai.prototype.update = function () {
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
        };
        return Ai;
    })(Phaser.Sprite);
    SoccerGame.Ai = Ai;
})(SoccerGame || (SoccerGame = {}));
/// <reference path="../tsDefinitions/phaser.d.ts" />
var SoccerGame;
(function (SoccerGame) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y, teamNumber, keyCodeUp, keyCodeDown, keyCodeLeft, keyCodeRight, keyCodeSprint) {
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
                _super.call(this, game, x, y, 'players', 0);
                this.animations.add('walk', [0, 1, 2, 3], 10, true);
                this.team = 1;
            }
            else {
                _super.call(this, game, x, y, 'players', 36);
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
        Player.prototype.update = function () {
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
        };
        return Player;
    })(Phaser.Sprite);
    SoccerGame.Player = Player;
})(SoccerGame || (SoccerGame = {}));
/// <reference path="player.ts"/>
var SoccerGame;
(function (SoccerGame) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            //  Set-up our preloader sprite
            this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);
            //  Load our actual games assets
            this.game.load.image('background', "assets/background.png");
            this.game.load.spritesheet('players', "assets/Chars.png", 16, 16, 64, 0, 0);
            this.game.load.image('titlepage', "assets/titlepage.png");
            this.game.load.image('clickToPlay', "assets/clickToPlay.png");
            this.game.load.image('ball', "assets/ball.png");
            this.game.load.image('goal', "assets/goal.png");
        };
        Preloader.prototype.create = function () {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
        };
        Preloader.prototype.startMainMenu = function () {
            this.game.state.start('MainMenu', true, false);
        };
        return Preloader;
    })(Phaser.State);
    SoccerGame.Preloader = Preloader;
})(SoccerGame || (SoccerGame = {}));
/// <reference path="player.ts"/>
var SoccerGame;
(function (SoccerGame) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
        }
        MainMenu.prototype.create = function () {
            this.background = this.add.sprite(0, 0, 'titlepage');
            this.background.alpha = 0;
            this.logo = this.add.sprite(this.world.centerX, -300, 'clickToPlay');
            this.logo.anchor.setTo(0.5, 0.5);
            this.add.tween(this.background).to({ alpha: 1 }, 2000, Phaser.Easing.Bounce.InOut, true);
            this.add.tween(this.logo).to({ y: 220 }, 2000, Phaser.Easing.Elastic.Out, true, 2000);
            this.input.onDown.addOnce(this.fadeOut, this);
        };
        MainMenu.prototype.fadeOut = function () {
            this.add.tween(this.background).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            var tween = this.add.tween(this.logo).to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startGame, this);
        };
        MainMenu.prototype.startGame = function () {
            this.game.state.start('Match', true, false);
        };
        return MainMenu;
    })(Phaser.State);
    SoccerGame.MainMenu = MainMenu;
})(SoccerGame || (SoccerGame = {}));
/// <reference path="../tsDefinitions/phaser.d.ts" />
var SoccerGame;
(function (SoccerGame) {
    var Goal = (function (_super) {
        __extends(Goal, _super);
        function Goal(game, x, y) {
            // create our phaser game
            // 800 - width
            // 600 - height
            // Phaser.AUTO - determine the renderer automatically (canvas, webgl)
            // 'content' - the name of the container to add our game to
            // { preload:this.preload, create:this.create} - functions to call for our states
            _super.call(this, game, x, y, 'goal', 0);
            this.anchor.setTo(0.5, 0.5);
            //this.scale.setTo(2, 2);
            game.physics.enable(this, Phaser.Physics.ARCADE);
            game.add.existing(this);
        }
        Goal.prototype.update = function () {
        };
        return Goal;
    })(Phaser.Sprite);
    SoccerGame.Goal = Goal;
})(SoccerGame || (SoccerGame = {}));
/// <reference path="player.ts"/>
/// <reference path="goal.ts"/>
/// <reference path="ai.ts"/>
var SoccerGame;
(function (SoccerGame) {
    var scores = new Array(2);
    var Match = (function (_super) {
        __extends(Match, _super);
        function Match() {
            _super.apply(this, arguments);
        }
        Match.prototype.create = function () {
            this.background = this.add.sprite(0, 0, 'background');
            this.player1 = new SoccerGame.Player(this.game, 500, 300, 1, Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.P);
            //this.player2 = new Player(this.game, 300, 300, 2,Phaser.Keyboard.W,Phaser.Keyboard.S,Phaser.Keyboard.A,Phaser.Keyboard.D,Phaser.Keyboard.Q);
            this.ball = new SoccerGame.Ball(this.game);
            this.goal1 = new SoccerGame.Goal(this.game, this.game.world.width - 10, this.world.centerY);
            this.goal2 = new SoccerGame.Goal(this.game, 10, this.world.centerY);
            scores[0] = 0;
            scores[1] = 0;
            this.scoreText = this.game.add.text(16, 16, '', { fontSize: '20px', fill: '#000' });
            this.player2 = new SoccerGame.Ai(this.game, 300, 300, 2, 0, this.ball, this.goal1, this.goal2);
        };
        Match.prototype.update = function () {
            this.game.physics.arcade.collide(this.player1, this.ball);
            this.game.physics.arcade.collide(this.player2, this.ball);
            this.game.physics.arcade.collide(this.player1, this.player2);
            this.game.physics.arcade.overlap(this.ball, this.goal1, this.score2);
            this.game.physics.arcade.overlap(this.ball, this.goal2, this.score1);
            if (this.ball.visible == false) {
                this.game.world.remove(this.game);
                this.ball.destroy();
                this.ball = null;
                this.ball = new SoccerGame.Ball(this.game);
                this.player2.setBall(this.ball);
            }
            this.scoreText.text = scores[0] + " : " + scores[1];
        };
        // Team 1 scored
        Match.prototype.score1 = function (ball, goal) {
            ball.destroy();
            scores[1] += 1;
        };
        // Team 2 scored
        Match.prototype.score2 = function (ball, goal) {
            ball.destroy();
            scores[0] += 1;
        };
        return Match;
    })(Phaser.State);
    SoccerGame.Match = Match;
})(SoccerGame || (SoccerGame = {}));
/// <reference path="../tsDefinitions/phaser.d.ts" />
var SoccerGame;
(function (SoccerGame) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            this.load.image('preloadBar', 'assets/loader.png');
        };
        Boot.prototype.create = function () {
            //  Unless you specifically need to support multitouch I would recommend setting this to 1
            this.input.maxPointers = 1;
            //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
            this.stage.disableVisibilityChange = true;
            if (this.game.device.desktop) {
            }
            else {
            }
            this.game.state.start('Preloader', true, false);
        };
        return Boot;
    })(Phaser.State);
    SoccerGame.Boot = Boot;
})(SoccerGame || (SoccerGame = {}));
/// <reference path="player.ts"/>
/// <reference path="preloader.ts"/>
/// <reference path="mainmenu.ts"/>
/// <reference path="match.ts"/>
/// <reference path="boot.ts"/>
var SoccerGame;
(function (SoccerGame) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            // create our phaser game
            // 800 - width
            // 600 - height
            // Phaser.AUTO - determine the renderer automatically (canvas, webgl)
            // 'content' - the name of the container to add our game to
            // { preload:this.preload, create:this.create} - functions to call for our states
            _super.call(this, 800, 600, Phaser.AUTO, 'content', null);
            this.state.add('Boot', SoccerGame.Boot, false);
            this.state.add('Preloader', SoccerGame.Preloader, false);
            this.state.add('MainMenu', SoccerGame.MainMenu, false);
            this.state.add('Match', SoccerGame.Match, false);
            this.state.start('Boot');
        }
        return Game;
    })(Phaser.Game);
    SoccerGame.Game = Game;
})(SoccerGame || (SoccerGame = {}));
/// <reference path="game.ts"/>
window.onload = function () {
    var game = new SoccerGame.Game();
};
