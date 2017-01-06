import Phaser from 'phaser'
import WebFont from 'webfontloader'

export default class extends Phaser.State {
    init() {
        this.stage.backgroundColor = '#EDEEC9';
        this.fontsReady = false;
        this.fontsLoaded = this.fontsLoaded.bind(this);
    }

    preload() {
        WebFont.load({
            google: {
                families: ['Nunito']
            },
            active: this.fontsLoaded
        });

        let text = this.add.text(
            this.world.centerX,
            this.world.centerY,
            'loading fonts',
            {font: '16px Arial', fill: '#dddddd', align: 'center'}
        );

        text.anchor.setTo(0.5, 0.5);

        this.load.image('loaderBg', './assets/images/loader-bg.png');
        this.load.image('loaderBar', './assets/images/loader-bar.png');
        this.load.image('startBtn', './assets/images/menu/again-button.png');
        this.load.image('mainBtn', './assets/images/menu/main.png');
        this.load.image('star', './assets/images/star.png');
        this.load.image('enemy', './assets/images/enemy.png');
        this.load.image('starShip', './assets/images/star-ship.png');
        this.load.image('bullet', './assets/images/starShip/bullet.gif');
    }

    render() {
        if (this.fontsReady) {
            this.state.start('Menu')
        }
    }

    fontsLoaded() {
        this.fontsReady = true
    }

}
