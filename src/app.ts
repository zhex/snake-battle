/// <reference path="../node_modules/phaser/typescript/phaser.d.ts" />

import './load-resource';
import { Game, AUTO, TileSprite } from 'phaser';
import ArenaState from './states/arena';

class SnakeGame {
	private game: Game;

	constructor() {
		this.game = new Game(window.innerWidth, window.innerHeight, AUTO, 'content');
		this.game.state.add('arena', new ArenaState(this.game));
	}

	start() {
		this.game.state.start('arena');
	}
}

new SnakeGame().start();
