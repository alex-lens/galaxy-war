import Phaser from 'phaser'
import {setResponsiveWidth} from '../utils'

export default class extends Phaser.State {
    init() {
        this.stage.backgroundColor = '#000';
    }

    preload() {

        this.load.image('startBtn', './assets/images/menu/again-button.png');
        this.load.image('mainBtn', './assets/images/menu/main.png');
        let text = this.add.text(
            this.world.centerX,
            this.world.centerY - 60,
            'Game Over',
            {font: '54px Arial', fill: '#fff', align: 'center'}
        );

        text.anchor.setTo(0.5, 0.5);
    }

    create() {

        let startBtn = this.game.add.button(
            this.game.world.centerX - 85,
            this.game.world.centerY,
            'startBtn',
            this.startGame,
            this
        );

        let menuBtn = this.game.add.button(
            this.game.world.centerX - 120,
            this.game.world.centerY + 70,
            'mainBtn',
            this.mainMenu,
            this
        );

        setResponsiveWidth(startBtn, 20, this.game.world);
        setResponsiveWidth(menuBtn, 30, this.game.world);
    }

    startGame() {
        this.state.start('Game');
    }

    mainMenu() {
        this.state.start('Menu');
    }

}
