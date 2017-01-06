import Phaser from 'phaser';
import Bullet from '../sprites/Bullet';
import {setResponsiveWidth} from '../utils';

const MOVE_SPEED       = 8;
const SPRITE_IMAGE     = 'starShip';
const RESPONSIVE_WIDTH = 10;

export default class extends Phaser.Sprite {

    constructor(game, Bullets) {
        super(game, game.world.centerX, game.height - 50, SPRITE_IMAGE);

        this.game       = game;
        this.Bullets    = Bullets;
        this.anchor.setTo(0.5);
        this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.specialFireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.C);

        this.checkWorldBounds = true;
        this.game.physics.arcade.enable(this);
        setResponsiveWidth(this, RESPONSIVE_WIDTH, this.game.world);

    }

    update() {

        //console.info(this.Bullets.length);

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.moveLeft();
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.moveRight();
        }

        if (this.fireButton.isDown) {
            this.fire();
        }

        if (this.specialFireButton.isDown) {
            this.specialFire();
        }
    }

    specialFire() {
        if (this.game.time.now > this.Bullets.specialWearponTime) {
            var x = 0;
            for (let i = 0; i < this.game.world.width / 18; i++) {
                let bullet = new Bullet(this.game);
                console.log(bullet.width);
                if (bullet) {
                    bullet.reset(x, this.y - 50);
                    bullet.body.velocity.y = -400;
                    this.Bullets.add(bullet);
                    this.Bullets.specialWearponTime = this.game.time.now + 3000;
                }
                x += 18;
            }
        }

    }

    fire() {
        if (this.game.time.now > this.Bullets.time) {
            let bullet = new Bullet(this.game);
            if (bullet) {
                bullet.reset(this.x - 5, this.y - 50);
                bullet.body.velocity.y = -400;
                this.Bullets.add(bullet);
                this.Bullets.time      = this.game.time.now + 300;
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
}
