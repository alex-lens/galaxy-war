import Phaser from 'phaser';
import {setResponsiveWidth} from '../utils'

const MOVE_SPEED   = 120;
const SPRITE_IMAGE = 'enemy';
const RESPONSIVE_WIDTH = 10;

export default class extends Phaser.Sprite {

    constructor(game) {
        let xPosition = Math.random().toString()[3] * 100;
        xPosition = xPosition >= game.width ? game.width - 100 : (xPosition < 100 ? 100 : xPosition);
        super(game, xPosition, 0, SPRITE_IMAGE);
        this.checkWorldBounds = true;
        this.events.onOutOfBounds.add(this.game.gameOver, this.game);
        this.game.physics.arcade.enable(this);
        this.body.velocity.y = +MOVE_SPEED;
        setResponsiveWidth(this, RESPONSIVE_WIDTH, this.game.world);
    }

    update() {

    }

}
