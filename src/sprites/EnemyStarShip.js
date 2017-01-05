import Phaser from 'phaser';

const MOVE_SPEED = 120;

export default class extends Phaser.Sprite {

    constructor(game) {
        let xPosition = Math.random().toString()[3] * 100;
        xPosition = xPosition >= game.width ? game.width - 100 : (xPosition < 100 ? 100 : xPosition);
        super(game, xPosition, 0, 'enemy');
        game.physics.arcade.enable(this);
        this.body.velocity.y = +MOVE_SPEED;
    }

    update() {

    }

}
