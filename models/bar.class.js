/**
 * @class
 * @extends {DrawableObjects}
 * Represents a bar object with variable visual states based on a percentage.
 *
 * @property {number} percentages - The current percentage value of the bar.
 * @property {string[]} IMAGES - An array of image paths corresponding to different visual states.
 * @property {Image} img - The current image to be drawn.
 */
class Bar extends DrawableObjects {

    /**
     * Creates a new Bar object.
     */
    constructor() {
        super();
    }

    /**
     * Sets the percentage and updates the image of the bar based on it.
     *
     * @param {number} percentages - The new percentage value.
     */
    setPercentage(percentages) {
        this.percentages = percentages;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the appropriate image index based on the current percentage.
     *
     * @returns {number} The index of the image to use, ranging from 0 to 5.
     */
    resolveImageIndex() {
        if (this.percentages === 100) return 5;
        else if (this.percentages >= 80) return 4;
        else if (this.percentages >= 60) return 3;
        else if (this.percentages >= 40) return 2;
        else if (this.percentages >= 20) return 1;
        else return 0;
    }
}