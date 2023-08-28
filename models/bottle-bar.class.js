/**
 * @class
 * @extends {Bar}
 * Represents a specialized bar for displaying the bottle collection status in the game.
 *
 * @property {string[]} IMAGES - An array of image paths for different states of the bottle bar.
 * @property {number} collected - The number of bottles collected.
 * @property {Audio} COLLECTING_SOUND - The sound effect to play when a bottle is collected.
 *
 * @example
 * const bottleBar = new BottleBar(); // Creates a new BottleBar instance with initial 0%.
 */
class BottleBar extends Bar {

    /**
     * Image paths for different states of the bottle bar.
     */
    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    /**
     * The number of bottles collected.
     */
    collected = 0;

    /**
     * The sound effect for bottle collection.
     */
    COLLECTING_SOUND = new Audio('audio/bottlecollect.mp3');

    /**
     * Creates a new BottleBar object.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(0);
        this.y = 100;
        this.x = 50;
        this.height = 70;
        this.width = 220;
    }
}
