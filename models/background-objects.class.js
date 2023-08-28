/**
 * @class
 * @extends {MovableObject}
 * Represents a movable background object.
 *
 * @param {string} imagePath - Path to the image.
 * @param {number} x - Initial x-coordinate.
 */
class BackgroundObjects extends MovableObject{
    width = 720;
    height = 480;
    constructor(imagePath, x){
        super().loadImg(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}