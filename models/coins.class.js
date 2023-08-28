/**
 * @class
 * @extends {MovableObject}
 * Represents a coin object in the game.
 *
 * @property {number} height - The height of the coin.
 * @property {number} width - The width of the coin.
 * @property {number} y - The initial y-coordinate for the coin.
 * @property {Object} offset - The offsets for rendering the coin image.
 * @property {string[]} IMAGES - An array of image paths for coin animations.
 *
 * @example
 * const myCoin = new Coins(200, 100); // Creates a new coin at x-coordinate 200 and y-coordinate 100.
 */
class Coins extends MovableObject {
    height = 150;
    width = 150;
    y = 100
    offset = {
        x: 50,
        y: 50,
        width: 50,
        height: 50
    };

    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ]

    /**
     * Creates a new coin object.
     * @param x
     * @param y
     */
    constructor(x,y) {
        super().loadImg(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.coinsAnimation();
        this.x = x;
        this.y = y + Math.random() * 200;
    }

    /**
     * Animates the coin.
     */
    coinsAnimation() {
        setInterval(() => {
            this.playAnimation(this.IMAGES)
        }, 300);
    }
}