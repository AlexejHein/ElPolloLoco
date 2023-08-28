/**
 * @class
 * @extends {MovableObject}
 * Represents a bottle object in the game that is movable.
 *
 * @property {number} height - The height of the bottle. Default is 110.
 * @property {number} width - The width of the bottle. Default is 110.
 * @property {number} y - The y-coordinate of the bottle on the canvas. Default is 330.
 * @property {Object} offset - The offsets for rendering the bottle image.
 * @property {number} offset.x - The x-offset. Default is 30.
 * @property {number} offset.y - The y-offset. Default is 25.
 * @property {number} offset.width - The offset width. Default is 34.
 * @property {number} offset.height - The offset height. Default is 10.
 * @property {string[]} IMAGE - An array containing the image path for the bottle.
 *
 * @example
 * const bottle = new Bottles(100); // Creates a new bottle at x-coordinate 100
 *
 * @param {number} x - The initial x-coordinate of the bottle on the canvas.
 */
class Bottles extends MovableObject {
    height = 110;
    width = 110;
    y = 330;
    offset = {
        x: 30,
        y: 25,
        width: 34,
        height: 10
    };

    IMAGE = ['img/6_salsa_bottle/2_salsa_bottle_on_ground.png',];

    constructor(x) {
        super().loadImg(this.IMAGE);
        this.x = x;
    }
}
