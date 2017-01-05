import Phaser from 'phaser';

const MOVE_SPEED = 8;

export default class extends Phaser.Sprite {

    constructor(game, Bullets) {
        super(game, game.world.centerX, game.height - 50, 'starShip');

        this.game = game;
        this.Bullets = Bullets;
        this.anchor.setTo(0.5);
        this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    }

    update() {

        //console.info('starShip update');

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.moveLeft();
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.moveRight();
        }

        if (this.fireButton.isDown) {
            this.fire();
        }

    }

    fire() {
        if (this.game.time.now > this.Bullets.time) {
            this.Bullets.createMultiple(1, 'bullet');
            let Bullet = this.Bullets.getFirstExists(false);

            if (Bullet) {
                Bullet.checkWorldBounds = true;
                Bullet.events.onOutOfBounds.add(this.destroyEnemy, this);
                Bullet.reset(this.x - 10, this.y - 50);
                Bullet.body.velocity.y = -400;
                this.Bullets.time = this.game.time.now + 300;
            }
        }
    }

    moveLeft() {
        if (this.x > 0) {
            this.x -= MOVE_SPEED;
        }
    }

    moveRight() {
        if (this.x < this.game.width) {
            this.x += MOVE_SPEED;
        }
    }

    destroyEnemy(Enemy) {
        Enemy.destroy();
    }


}
