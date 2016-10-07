import { Sprite, Group, Game } from 'phaser';

export default class Snake {
	private bodyContainer: Group;
	private movePath: number[] = [];
	private spacer: number = 8;
	
	public speed: number = 150;

	constructor(game: Game, x, y) {
		this.bodyContainer = game.add.group();
		this.bodyContainer.enableBody = true;

		for (let i = 0; i < 5; i++) {
			this.appendBody(x, y);
		}
	}

	get head(): Sprite {
		return this.bodyContainer.getChildAt(0);
	}

	get tail(): sprite {
		return this.bodyContainer.getChildAt(this.bodyContainer.length - 1);
	}

	move() {
		this.bodyContainer.game.physics.arcade.velocityFromRotation(this.head.rotation, this.speed, this.head.body.velocity);

		let part = this.movePath.pop();
		part.x = this.head.x;
		part.y = this.head.y;
		this.movePath.unshift(part);

		for (let i = 1; i < this.bodyContainer.length; i++) {
			let { x, y } = this.movePath[ i * this.spacer ];
			let p = this.bodyContainer.getChildAt(i);
			p.x = x;
			p.y = y;
		}
	}

	appendBody(x: number, y: number): Sprite {
		let p: Sprite = this.bodyContainer.create(x, y, 'player');
		p.angle = 180;
		p.anchor.setTo(.5, .5);
		p.scale.setTo(.5, .5);
		p.body.collideWorldBounds = true;

		for (let i = 0; i < this.spacer; i++) {
			this.movePath.push({ x, y });
		}
		return p;
	}
}
