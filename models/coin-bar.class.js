/**
 * @class
 * @extends {Bar}
 * Represents a specialized status bar for displaying the coin collection status in the game.
 *
 * @property {string[]} IMAGES - An array of image paths for different states of the coin bar.
 * @property {number} collected - The number of coins collected.
 * @property {Audio} COLLECTING_SOUND - The sound effect to play when a coin is collected.
 *
 * @example
 * const coinBar = new CoinBar(); // Creates a new CoinBar instance with initial percentage of 0.
 */
class CoinBar extends Bar{
    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ]

    collected = 0;
    COLLECTING_SOUND = new Audio('audio/coin.mp3')

    /**
     * @constructor
     * @description Creates a new instance of the CoinBar class.
     */
    constructor(){
        super();
        this.loadImages(this.IMAGES)
        this.setPercentage(0);
        this.x = 50;
        this.y = 50;
        this.height = 70;
        this.width = 220;
    }
}