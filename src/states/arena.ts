import { Game, TileSprite, CursorKeys, Sprite, Group, Keyboard, Graphics } from 'phaser';

export default class ArenaState {
	private game: Game;
	private bgTile: TileSprite;
	private cursors: CursorKeys;
	private player: Group;
	private movePath = [];
	private spacer = 8;
	private speed = 150;
	private spacebar: Keyboard;
	private points: Group;

	constructor(game: Game) {
		this.game = game;
	}

	preload() {
		this.game.load.image('bgtile', 'bg.png');
		this.game.load.image('player', 'player.png');
		this.game.load.image('dot', 'diamond.png');
	}

	create() {
		let { world, physics, camera } = this.game;

		world.setBounds(0, 0, 3840, 3840);
		physics.arcade.setBounds(500, 500, 3340, 3340);
		// physics.startSystem(Phaser.Physics.ARCADE);

		this.bgTile = this.game.add.tileSprite(500, 500, 3340, 3340, 'bgtile');
		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		this.player = this.game.add.group();
		this.player.enableBody = true;
		for (let i = 0; i < 5; i++) {
			let p: Sprite = this.player.create(world.centerX, world.centerY, 'player');
			p.anchor.setTo(.5, .5);
			p.angle = 180;
			p.scale.setTo(.5, .5);
			p.body.collideWorldBounds = true;
		}

		let head = this.player.getChildAt(0);

		for (let i = 0; i < this.player.length * this.spacer; i++) {
			this.movePath.push({ x: world.centerX, y: world.centerY });
		}

		camera.follow(head);

		this.points = this.game.add.group();
		this.points.enableBody = true;
		for (let i = 0; i < 500; i++) {
			this.points.create(Math.random() * world.width, Math.random() * world.height, 'dot');
		}
	}

	update() {
		const { physics } this.game;
		let head: Sprite = this.player.getChildAt(0);

		physics.arcade.overlap(head, this.points, this.collectPoint, null, this);

		let angle: number = this.getMoveAngle();
		if (angle != null) head.angle = angle;

		if (this.spacebar.isDown) {
			this.speed = 300;
		} else {
			this.speed = 150;
		}
		physics.arcade.velocityFromRotation(head.rotation, this.speed, head.body.velocity);

		let part = this.movePath.pop();
		part.x = head.x;
		part.y = head.y;
		this.movePath.unshift(part);

		for (let i = 1; i < this.player.length; i++) {
			let { x, y } = this.movePath[i * this.spacer];
			let p = this.player.getChildAt(i);
			p.x = x;
			p.y = y;
		}
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
		
		let last: Sprite = this.player.getChildAt(this.player.length - 1);
		let newBody: Sprite = this.player.create(last.x, last.y, 'player');
		newBody.anchor.setTo(.5, .5);
		newBody.scale.setTo(.5, .5);
		newBody.body.collideWorldBounds = true;

		for (let i = 0; i < this.spacer; i++) {
			this.movePath.push({ x: last.x, y: last.y });
		}
	}
}
