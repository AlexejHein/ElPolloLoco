/**
 * @class
 * @extends {MovableObject}
 * Represents a chicken enemy in the game.
 *
 * @property {number} y - The y-coordinate for the chicken.
 * @property {number} x - The x-coordinate for the chicken.
 * @property {number} height - The height of the chicken.
 * @property {number} width - The width of the chicken.
 * @property {number} energy - The energy level of the chicken.
 * @property {string[]} IMAGES_ENEMIES_WALKING - Array of image paths for chicken walking animation.
 * @property {string[]} IMAGE_DEAD - Array containing the image path for the dead chicken.
 * @property {Audio} CHICKEN_DEAD_SOUND - The sound effect to play when the chicken is dead.
 * @property {Object} offset - The offsets for rendering the chicken image.
 *
 * @example
 * const chicken = new Chicken(); // Creates a new Chicken instance.
 */
class Chicken extends MovableObject {
    y = 340;
    x = 1200;
    height = 80;
    width = 80;
    energy = 100;
    IMAGES_ENEMIES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    IMAGE_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];
    CHICKEN_DEAD_SOUND = new Audio('audio/chicken.mp3');
    offset = {
        x: 0,
        y: 0,
        width: 0,
        height: 30
    };

    /**
     * Creates an instance of Chicken.
     */
    constructor() {
        super().loadImg('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.IMAGES_ENEMIES_WALKING);
        this.loadImages(this.IMAGE_DEAD);
        this.x = this.x + Math.random() * 3000;
        this.speed = 0.20 + Math.random() * 0.3
        this.animate();
    }

    /**
     * Moves the chicken to the left.
     */
    moveLeftFn() {
        if (this.isDead()) return;
        this.moveLeft();
    }

    /**
     * Plays the appropriate animation for the chicken.
     * Chooses between walking and dead animations based on the chicken's state.
     */
    playAnimationFn() {
        this.playAnimation(this.IMAGES_ENEMIES_WALKING)
        if (this.isDead()) {
            this.playAnimation(this.IMAGE_DEAD);
        }
    }

    /**
     * Sets up the animations for the chicken.
     * Defines intervals for moving and playing animations.
     */
    animate() {
        setStoppableInterval(this.moveLeftFn.bind(this), 1000 / 60);
        setStoppableInterval(this.playAnimationFn.bind(this), 200);
    }
}