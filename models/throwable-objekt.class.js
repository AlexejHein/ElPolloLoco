/**
 * ThrowableObjects
 * @class ThrowableObjects
 */
class ThrowableObjects extends MovableObject {

    IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]
    IMAGE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]
    bottleDestroyed = false;
    offset = {
        x: 20,
        y: 20,
        width: 28,
        height: 5
    };
    flipBottle;

    /**
     * @constructor
     * @param x
     * @param y
     * @param otherDirection
     */
    constructor(x, y, otherDirection) {
        super().loadImg('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES);
        this.loadImages(this.IMAGE_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 90;
        this.width = 90;
        this.throw();
        this.acceleration = 3;
        this.flipBottle = otherDirection;
    }

    /**
     * @method throw
     * @description throw the bottle
     */
    throw() {
        this.speedY = 20 ;
        this.applyGravity();
        this.animate();

    }

    /**
     * @method animate
     * @description animate the bottle
     */
    animate() {
        if (this.flipBottle) {
            this.x -= 5;
            this.playAnimation(this.IMAGES)
        }else{
            this.x += 7;
            this.playAnimation(this.IMAGES)
        }
        if (this.bottleDestroyed) this.splash();
        else requestAnimationFrame(() => this.animate());
    }

    /**
     * @method splash
     * @description splash the bottle
     */
    splash() {
        this.playAnimation(this.IMAGE_SPLASH);
        setTimeout(() => {
            this.splash();
        }, 1000);
    }
}