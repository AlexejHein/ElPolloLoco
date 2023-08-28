/**
 * Class representing the Endboss character in the game.
 * @extends MovableObject
 */
class Endboss extends MovableObject {
    height = 450;
    width = 400;
    y = 5;
    energy = 100;
    IMAGES_ENDBOSS_SPAWNING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];
    IMAGES_ENDBOSS_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ENDBOSS_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_ENDBOSS_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];
    IMAGES_ENDBOSS_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];
    ENDOSSHURT_SOUND = new Audio('audio/bosschicken.mp3');
    ENDBOSSDEAD_SOUND = new Audio('audio/chicken.mp3');
    firstContact = false;
    world;
    deadAnimationPlayed = false;
    deadCounter = 0;

    /**
     * Create a Endboss.
     */
    constructor() {
        super().loadImg(this.IMAGES_ENDBOSS_SPAWNING[0]);
        this.loadImages(this.IMAGES_ENDBOSS_SPAWNING);
        this.loadImages(this.IMAGES_ENDBOSS_WALKING);
        this.loadImages(this.IMAGES_ENDBOSS_ATTACK);
        this.loadImages(this.IMAGES_ENDBOSS_HURT);
        this.loadImages(this.IMAGES_ENDBOSS_DEAD);
        this.x = 3700;
        this.speed = 0.06;
        this.animate();
    }

    offset = {
        x: 50,
        y: 80,
        width: 30,
        height: 15
    };

    /**
     * Manages the animations for Endboss.
     */
    animate() {
        let frameCounter = 0;
        let deadAnimationTriggered = false;
        const animationInterval = 200;
        setInterval(() => {
            if (deadAnimationTriggered) return;
            if (frameCounter < 8) this.playAnimation(this.IMAGES_ENDBOSS_SPAWNING);
            if (this.firstContact && !this.isDead()) {
                this.animateWalking();
                this.playAnimation(this.IMAGES_ENDBOSS_WALKING);
                this.attackAnimation();
                this.ifHurtAnimation();
            }
            if (this.isDead()) {
                this.ifDeadAnimation();
                deadAnimationTriggered = true;
                return;
            }
            frameCounter++;
            this.updateFirstContact(frameCounter);
        }, animationInterval);
    }

    /**
     * Updates the firstContact property based on the position of the character.
     * @param {number} frameCounter - The current frame counter.
     */
    updateFirstContact(frameCounter) {
        if (this.world.character.x > 3200 && !this.firstContact && !this.isDead()) {
            frameCounter = 0;
            this.firstContact = true;
        }
    }

    /**
     * Reduces the energy level of Endboss when hit.
     */
    hit() {
        this.energy -= 40;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Animates the walking movement of Endboss.
     */
    animateWalking() {
        setStoppableInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

    /**
     * Animates the attack movement of Endboss.
     */
    attackAnimation() {
        if (this.x < this.world.character.x + 250 && !this.isDead()) {
            setTimeout(() => {
                this.playAnimation(this.IMAGES_ENDBOSS_ATTACK);
            }, 800)
        }
    }

    /**
     * Animates the dead movement of Endboss.
     */
    ifDeadAnimation() {
        this.ENDBOSSDEAD_SOUND.volume = playSoundVolume();
        this.ENDBOSSDEAD_SOUND.currentTime = 2;
        this.ENDBOSSDEAD_SOUND.play();
        this.deadAnimationInterval = setInterval(() => {
            if (this.deadCounter < this.IMAGES_ENDBOSS_DEAD.length) {
                this.loadImg(this.IMAGES_ENDBOSS_DEAD[this.deadCounter]);
                this.deadCounter++;
            } else {
                clearInterval(this.deadAnimationInterval);
            }
        }, 100);
        this.gameOver = true;
    }

    /**
     * Animates the hurt movement of Endboss.
     */
    ifHurtAnimation() {
        if (this.isHurt() && !this.isDead()) {
            this.playAnimation(this.IMAGES_ENDBOSS_HURT);
            this.ENDOSSHURT_SOUND.volume = playSoundVolume();
            this.ENDOSSHURT_SOUND.play();
        }
    }
}