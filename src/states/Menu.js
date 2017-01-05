import Phaser from 'phaser'
import {setResponsiveWidth} from '../utils'

export default class extends Phaser.State {
    init() {
        this.stage.backgroundColor = '#000';

        let title = this.add.text(
            this.world.centerX - 200,
            this.world.centerY - 200,
            'Galaxy war v 0.1',
            {font: '56px Arial', fill: '#fff', align: 'center'}
        );
    }

    create() {


        let button = this.game.add.button(
            this.game.world.centerX - 85,
            this.game.world.centerY,
            'startBtn',
            this.startGame,
            this
        );

        setResponsiveWidth(button, 20, this.game.world);

    }

    startGame() {
        this.state.start('Game');
    }


    render() {
    }

}
