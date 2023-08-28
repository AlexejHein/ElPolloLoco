/**
 * @class
 * @extends {MovableObject}
 * Represents the main character in the game.
 *
 * @property {string[]} IMAGES_PEPE_WALKING - Array of image paths for walking animation.
 * @property {string[]} IMAGES_JUMPING - Array of image paths for jumping animation.
 * @property {string[]} IMAGES_DEAD - Array of image paths for dead animation.
 * @property {string[]} IMAGES_HURT - Array of image paths for hurt animation.
 * @property {string[]} IMAGES_IDLE - Array of image paths for idle animation.
 * @property {string[]} IMAGES_LONG_IDLE - Array of image paths for long idle animation.
 * @property {number} height - Height of the character.
 * @property {number} width - Width of the character.
 * @property {number} y - Y-coordinate of the character.
 * @property {number} speed - Speed of the character.
 * @property {number} energy - Energy level of the character.
 * @property {number} collectedBottles - Number of bottles collected.
 * @property {boolean} flipBottle - Whether to flip the bottle direction.
 * @property {string} state - Current state of the character ("IDLE", "WALKING", etc.)
 * @property {boolean} isJumping - Whether the character is jumping.
 * @property {boolean} isDeadSoundPlayed - Whether the dead sound has been played.
 * @property {number} time - Timestamp for tracking idle time.
 * @property {Object} offset - Offset for rendering.
 *
 * @example
 * const character = new Character(); // Creates a new Character instance.
 */
class Character extends MovableObject {

    IMAGES_PEPE_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];
    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    height = 240;
    width = 150;
    y = 200;
    speed = 9;
    energy = 100;
    collectedBottles = 0;
    flipBottle = false;
    state = "IDLE";
    isJumping = false;
    isDeadSoundPlayed = false;
    time = 0;
    offset = {
        x: 20,
        y: 94,
        width: 30,
        height: 5
    };

    /**
     * Creates a new Character instance.
     */
    constructor() {
        super().loadImg('img/2_character_pepe/2_walk/W-21.png')
        this.loadImages(this.IMAGES_PEPE_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();
        this.animate();
        this.time = new Date().getTime();
    }

    /**
     * Handles right movement for the character.
     * Plays walking sound if the right arrow key is pressed.
     */
    moveRightFn() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            WALKING_SOUND.play();
        }
    }


    /**
     * Handles left movement for the character.
     * Plays walking sound and flips the bottle if the left arrow key is pressed.
     */
    moveLeftFn() {
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            this.flipBottle = true;
            WALKING_SOUND.play();
        }
    }

    /**
     * Handles jumping for the character.
     * Plays walking sound if the up arrow key is pressed.
     */
    jumpFn() {
        if (this.world.keyboard.UP && !this.isAboveGround() && !this.isJumping) {
            this.jump();
            this.isJumping = true;
            WALKING_SOUND.pause();
        } else if (!this.world.keyboard.UP) {
            this.isJumping = false;
        }
    }

    /**
     * Sets up animations and actions to run at different intervals.
     */
    animate() {
        const runEveryFrame = (fn) => setStoppableInterval(fn, 1000 / 60);
        const runEvery200ms = (fn) => setStoppableInterval(fn, 200);
        const runEvery100ms = (fn) => setStoppableInterval(fn, 100);
        runEveryFrame(this.moveRightFn.bind(this));
        runEveryFrame(this.moveLeftFn.bind(this));
        runEveryFrame(this.jumpFn.bind(this));
        runEveryFrame(() => { this.world.camera_x = -this.x + 50; });
        runEvery200ms(() => { WALKING_SOUND.pause(); });
        runEvery100ms(() => { this.handleStateChanges(); });
    }

    /**
     * Handles state changes for the character.
     * Updates the character's state based on various conditions like death, hurt, etc.
     */
    handleStateChanges() {
        if (this.isDead() && !this.isDeadSoundPlayed) this.playDeadAnimation();
        else if (this.isHurt()) this.changeState("HURT", this.IMAGES_HURT);
        else if (this.isAboveGround()) this.playJumpAnimation();
        else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) this.changeState("WALKING", this.IMAGES_PEPE_WALKING);
        else this.changeState("IDLE", this.IMAGES_IDLE);

        this.isLongIdle();
    }

    /**
     * Changes the state and animation of the character.
     *
     * @param {string} newState - The new state to set.
     * @param {string[]} newImages - The new images to use for the animation.
     */
    changeState(newState, newImages) {
        this.state = newState;
        this.playAnimation(newImages);
    }


    /**
     * Checks for long idle state and updates the character's state if needed.
     */
    isLongIdle() {
        let currentTime = new Date().getTime();
        let passedTime = (currentTime - this.time) / 1000;
        if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.isJumping && !this.isAboveGround()) {
            if (passedTime > 5 && this.state !== "LONG_IDLE") {
                this.state = "LONG_IDLE";
                this.playAnimation(this.IMAGES_LONG_IDLE);
            }
        } else {
            this.time = currentTime;
        }
    }

    /**
     * Checks if the character is dead.
     */
    playDeadAnimation() {
        DEAD_SOUND.play();
        this.isDeadSoundPlayed = true;
        this.state = "DEAD";
        this.gameOver = true;
        this.playAnimation(this.IMAGES_DEAD);
        setInterval(() => {
            this.y += 6;
        }, 1000 / 60);
    }

    /**
     * Checks if the character is Jumping.
     */
    playJumpAnimation() {
        if (this.state !== "JUMPING") {
            this.state = "JUMPING";
            this.currentImage = 0;
        }
        if (this.currentImage < 7 && this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        }
    }
}