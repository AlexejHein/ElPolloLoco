/**
 * Class representing a movable object in the game, extending DrawableObjects.
 */
class MovableObject extends DrawableObjects {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    lastHit = 0;
    gameOver = false;
    offset = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    };

    /**
     * Applies gravity to the object.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }

        }, 1000 / 25)
    }

    /**
     * Checks if the object is above the ground.
     * @returns {boolean} - True if above ground, otherwise false.
     */
    isAboveGround() {
        if (this instanceof ThrowableObjects) {
            return true
        }else{
            return this.y < 180
        }}

    /**
     * Checks for collision with another movable object.
     * @param {MovableObject} mo - The other movable object to check collision against.
     * @returns {boolean} - True if colliding, otherwise false.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.width > mo.x + mo.offset.x &&
            this.y + this.height - this.offset.height > mo.y + mo.offset.y &&
            this.x + this.offset.x < mo.x + mo.width - mo.offset.x &&
            this.y + this.offset.y < mo.y + mo.height - mo.offset.y;
    }

    /**
     * Decreases the energy level when the object is hit.
     */
    hit(){
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        }else{
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * Checks if the object is hurt.
     * @returns {boolean} - True if hurt, otherwise false.
     */
    isHurt(){
        let timePassed = new Date().getTime()- this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

    /**
     * Checks if the object is dead.
     * @returns {boolean} - True if dead (energy is zero), otherwise false.
     */
    isDead() {
        return this.energy === 0;
    }

    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the object jump.
     */
    jump() {
        this.speedY = 30;
    }

    /**
     * Plays an animation.
     * @param images
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}