import { Game, TileSprite, CursorKeys, Sprite, Group } from 'phaser';

export default class ArenaState {
	private game: Game;
	private bgTile: TileSprite;
	private cursors: CursorKeys;
	private player: Group;

	constructor(game: Game) {
		this.game = game;
	}

	preload() {
		this.game.load.image('bgtile', 'bg.png');
		this.game.load.image('player');
	}

	create() {
		let { world, physics, camera } = this.game;

		world.setBounds(0, 0, 3840, 3840);
		// physics.startSystem(Phaser.Physics.Arcade);

		this.bgTile = this.game.add.tileSprite(500, 500, 2840, 2840, 'bgtile');
		this.cursors = this.game.input.keyboard.createCursorKeys();

		this.player = this.game.add.group();

		for (var i = 0; i < 4; i++) {
			let p = this.player.create(world.centerX + i * 50, world.centerY, 'player');
			p.anchor.setTo(.5, .5);
			physics.arcade.enable(p);
		}
		camera.follow(this.player.getChildAt(0));

	}

	update() {
		let speed = 150;

		this.player.forEach(p => {
			if (this.cursors.up.isDown && this.cursors.right.isDown) {
				p.angle = -45;
			} else if (this.cursors.up.isDown && this.cursors.left.isDown) {
				p.angle = 225;
			} else if (this.cursors.down.isDown && this.cursors.left.isDown) {
				p.angle = 135;
			} else if (this.cursors.down.isDown && this.cursors.right.isDown) {
				p.angle = 45;
			} else if (this.cursors.up.isDown) {
				p.angle = -90;
			} else if (this.cursors.down.isDown) {
				p.angle = 90;
			} else if (this.cursors.left.isDown) {
				p.angle = 180;
			} else if (this.cursors.right.isDown) {
				p.angle = 0;
			}
			this.game.physics.arcade.velocityFromRotation(p.rotation, speed, p.body.velocity);
		});
	}
}
