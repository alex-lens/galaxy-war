import Phaser from 'phaser';

const SPRITE_IMAGE = 'bullet';

export default class extends Phaser.Sprite {

    constructor(game) {
        super(game, 0, 0, SPRITE_IMAGE);
        this.game = game;
        this.enableBody = true;
        this.checkWorldBounds = true;
        this.events.onOutOfBounds.add(this.game.destroyObject, this);
        this.game.physics.arcade.enable(this);
    }

}
