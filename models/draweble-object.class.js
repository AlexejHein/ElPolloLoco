/**
 * @class
 * Represents a base class for drawable game objects.
 *
 * @property {Image} img - The image object for drawing.
 * @property {Object} imageCache - Cache for storing loaded images.
 * @property {number} currentImage - The index for the current image in animation.
 * @property {number} x - The x-coordinate for drawing.
 * @property {number} y - The y-coordinate for drawing.
 * @property {number} height - The height of the object.
 * @property {number} width - The width of the object.
 * @property {Object} offset - The offsets for rendering the image.
 *
 * @example
 * const drawable = new DrawableObjects();
 * drawable.loadImg('path/to/image.png');
 * drawable.draw(context);
 */
class DrawableObjects {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    offset = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    };

    /**
     * Draws the object on the canvas.
     *
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Loads an image from the given path.
     *
     * @param {string} path - The path to the image.
     */
    loadImg(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images and stores them in the image cache.
     *
     * @param {string[]} arr - An array of paths to the images.
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws a frame around the object. Used for debugging and object boundaries.
     *
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof ThrowableObjects || this instanceof Bottles || this instanceof Coins || this instanceof ChickenSmall) {
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "red";
            ctx.rect(this.x + this.offset.x , this.y + this.offset.y,(this.x + this.width - this.offset.width) - (this.x + this.offset.x),(this.y + this.height - this.offset.height) - (this.y + this.offset.y));
            //ctx.stroke();
        }
    }
}