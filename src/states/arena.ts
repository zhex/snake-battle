import { Game, TileSprite, CursorKeys, Sprite, Group, Keyboard, Graphics } from 'phaser';
import Snake from '../models/snake';

export default class ArenaState {
	private game: Game;
	private bgTile: TileSprite;
	private cursors: CursorKeys;
	private spacer = 8;
	private spacebar: Keyboard;
	private points: Group;
	private snake: Snake;

	constructor(game: Game) {
		this.game = game;
	}

	preload() {
		this.game.load.image('bgtile', 'bg.png');
		this.game.load.image('dot', 'diamond.png');
		this.game.load.image('player', 'player.png');
	}

	create() {
		let { world, physics, camera } = this.game;

		world.setBounds(0, 0, 3840, 3840);
		physics.arcade.setBounds(500, 500, 3340, 3340);

		this.bgTile = this.game.add.tileSprite(500, 500, 3340, 3340, 'bgtile');
		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		this.snake = new Snake(this.game, world.centerX, world.centerY);
		camera.follow(this.snake.head);

		this.points = this.game.add.group();
		this.points.enableBody = true;
		
		for (let i = 0; i < 500; i++) {
			this.points.create(Math.random() * world.width, Math.random() * world.height, 'dot');
		}
	}

	update() {
		const { physics } this.game;
		let head: Sprite = this.snake.head;

		physics.arcade.overlap(head, this.points, this.collectPoint, null, this);

		let angle: number = this.getMoveAngle();
		if (angle != null) head.angle = angle;

		this.snake.speed = this.spacebar.isDown ? 300 : 150;
		this.snake.move();
	}

	private getMoveAngle() {
		let angle = null;
		if (this.cursors.up.isDown && this.cursors.right.isDown) {
			angle = 315;
		} else if (this.cursors.up.isDown && this.cursors.left.isDown) {
			angle = 225;
		} else if (this.cursors.down.isDown && this.cursors.left.isDown) {
			angle = 135;
		} else if (this.cursors.down.isDown && this.cursors.right.isDown) {
			angle = 45;
		} else if (this.cursors.up.isDown) {
			angle = 270;
		} else if (this.cursors.down.isDown) {
			angle = 90;
		} else if (this.cursors.left.isDown) {
			angle = 180;
		} else if (this.cursors.right.isDown) {
			angle = 0;
		}
		return angle;
	}

	private collectPoint(head: Sprite, point: Sprite) {
		point.kill();
		const { x, y } = this.snake.tail;
		this.snake.appendBody(x, y);
	}
}
