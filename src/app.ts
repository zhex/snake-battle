/// <reference path="../node_modules/phaser/typescript/phaser.d.ts" />

import { Game, AUTO } from 'phaser';

class SnakeGame {
	private game: Game;

	constructor() {
		this.game = new Game(
			document.body.clientWidth, 
			document.body.clientHeight, 
			AUTO, 
			'content',
			{ preload: this.preload, create: this.create }
		);
	}

	preload() {

	}

	create() {
		
	}
}

new SnakeGame();
