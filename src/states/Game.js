import Phaser from 'phaser';
import StarShip from '../sprites/StarShip';
import EnemyStarShip from '../sprites/EnemyStarShip';

const GAME_SPEED       = 20;

export default class extends Phaser.State {

    create() {
        this.speed     = GAME_SPEED;
        this.scores    = 0;
        this.starfield = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'star');

        this.Bullets   = this.game.add.group();
        this.Bullets.time = 0;
        this.Bullets.specialWearponTime = 0;

        this.game.add.existing(this.Bullets);

        this.starShip = new StarShip(this.game, this.Bullets);
        this.game.add.existing(this.starShip);

        this.Enemies = this.game.add.group();
        this.game.add.existing(this.Enemies);

        this.scoresText = this.add.text(
            this.world.width - 80,
            30,
            this.scores + ' scores',
            {font: '13px Arial', fill: '#dddddd'}
        );

        this.game.destroyObject = this.destroyObject;
        this.game.gameOver      = this.gameOver;

    }

    update() {
        this.starfield.tilePosition.y += this.speed;

        if (this.starShip.overlap(this.Enemies)) {
            this.gameOver();
        }

        if (this.Enemies.length < 2 && Math.random().toString()[3] == 1) {
            this.Enemies.add(new EnemyStarShip(this.game));
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

    destroyObject(Object) {
        Object.destroy();
    }

    gameOver() {
        this.state.start('GameOver');
    }

}
