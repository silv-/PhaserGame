var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../tsDefinitions/phaser.d.ts" />
var SoccerGame;
(function (SoccerGame) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y, teamNumber) {
            // create our phaser game
            // 800 - width
            // 600 - height
            // Phaser.AUTO - determine the renderer automatically (canvas, webgl)
            // 'content' - the name of the container to add our game to
            // { preload:this.preload, create:this.create} - functions to call for our states
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
        }
        Player.prototype.update = function () {
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            if (this.team == 1) {
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                    //  Move to the left
                    this.body.velocity.x = -150;
                    this.animations.play('walk');
                }
                else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                    //  Move to the right
                    this.body.velocity.x = 150;
                    this.animations.play('walk');
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
                }
                else if (this.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
                    //  Move to the right
                    this.body.velocity.x = 150;
                    this.animations.play('walk');
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
/// <reference path="player.ts"/>
var SoccerGame;
(function (SoccerGame) {
    var Match = (function (_super) {
        __extends(Match, _super);
        function Match() {
            _super.apply(this, arguments);
        }
        Match.prototype.create = function () {
            this.background = this.add.sprite(0, 0, 'background');
            this.player1 = new SoccerGame.Player(this.game, 500, 300, 1);
            this.player2 = new SoccerGame.Player(this.game, 300, 300, 2);
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
