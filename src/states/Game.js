import Phaser from 'phaser'
import StarShip from '../sprites/StarShip'
import EnemyStarShip from '../sprites/EnemyStarShip'
import {setResponsiveWidth} from '../utils'

const RESPONSIVE_WIDTH = 10;

export default class extends Phaser.State {

    create() {
        this.speed = 20;
        this.scores = 0;
        this.starfield = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'star');

        this.Bullets = this.game.add.group();
        this.Bullets.time = 0;
        this.Bullets.enableBody = true;
        this.Bullets.physicsBodyType = Phaser.Physics.ARCADE;

        this.game.add.existing(this.Bullets);

        this.starShip = new StarShip(this.game, this.Bullets);

        setResponsiveWidth(this.starShip, RESPONSIVE_WIDTH, this.game.world);
        this.game.add.existing(this.starShip);

        this.Enemies = this.game.add.group();
        this.Enemies.enableBody = true;
        this.Enemies.physicsBodyType = Phaser.Physics.ARCADE;
        this.game.add.existing(this.Enemies);

        this.scoresText = this.add.text(
            this.world.width - 80,
            20,
            this.scores + ' scores',
            {font: '16px Arial', fill: '#dddddd'}
        );
    }

    update() {
        this.starfield.tilePosition.y += this.speed;

        if (this.starShip && this.starShip.overlap(this.Enemies)) {
            this.state.start('GameOver');
        }

        if (this.Enemies.length < 2 && Math.random().toString()[3] == 1) {
            let Enemy = new EnemyStarShip(this.game);
            Enemy.checkWorldBounds = true;
            setResponsiveWidth(Enemy, RESPONSIVE_WIDTH, this.game.world);
            this.Enemies.add(Enemy);
            Enemy.events.onOutOfBounds.add(this.destroyEnemy, this);
        }

        this.game.physics.arcade.overlap(this.Enemies, this.Bullets, this.enemyCrash, null, this);
    }

    enemyCrash(Enemy, Bullet) {
        setTimeout(() => {
            Enemy.destroy();
            Bullet.destroy();
            this.updateScores();
        }, 0);
    }

    updateScores() {
        this.scores += 10;
        this.scoresText.setText(this.scores + ' scores');
    }

    destroyEnemy(Enemy) {
        Enemy.destroy();
    }

}
