import 'pixi';
import 'p2';
import Phaser from 'phaser';

import BootState from './states/Boot';
import Menu from './states/Menu';
import GameState from './states/Game';
import GameOver from './states/GameOver';

class Game extends Phaser.Game {

    constructor() {
        let width = document.documentElement.clientWidth > 768 ? 768 : document.documentElement.clientWidth;
        let height = document.documentElement.clientHeight > 500 ? 500 : document.documentElement.clientHeight;

        super(width, height, Phaser.AUTO, 'content', null);

        this.state.add('Boot', BootState, false);
        this.state.add('Menu', Menu, false);
        this.state.add('Game', GameState, false);
        this.state.add('GameOver', GameOver, false);

        this.state.start('Boot');
    }
}

window.game = new Game();
