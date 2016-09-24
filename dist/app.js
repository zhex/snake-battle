"use strict";
var phaser_1 = require('phaser');
var SnakeGame = (function () {
    function SnakeGame() {
        this.game = new phaser_1.Game(document.body.clientWidth, document.body.clientHeight, phaser_1.AUTO, 'content', { preload: this.preload, create: this.create });
    }
    SnakeGame.prototype.preload = function () {
    };
    SnakeGame.prototype.create = function () {
    };
    return SnakeGame;
}());
new SnakeGame();
//# sourceMappingURL=app.js.map