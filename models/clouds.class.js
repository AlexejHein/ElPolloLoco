/**
 * @class
 * @extends {MovableObject}
 * Represents a cloud in the game background.
 *
 * @property {number} y - The y-coordinate for the cloud.
 * @property {number} height - The height of the cloud.
 * @property {number} width - The width of the cloud.
 *
 * @example
 * const myCloud = new cloud(500); // Creates a new cloud instance at x-coordinate 500.
 */
class cloud extends MovableObject{
    y = 20;
    height = 300;
    width = 500;

    /**
     * Creates a new cloud instance.
     * @param x
     */
    constructor(x){
        super().loadImg('img/5_background/layers/4_clouds/1.png')
        this.x = x;
        this.animate();
    }

    /**
     * Animates the cloud by moving it to the left.
     */
    animate(){
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60)
    }
}