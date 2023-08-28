const ENEMY_DELETION_DELAY = 600;

/**
 * @class World
 * @description
 * Class that represents the world of the game.
 * It contains all the objects that are drawn on the canvas.
 * It also contains the logic for the collisions between the objects.
 */
class World {
    ctx;
    canvas;
    game;
    keyboard;
    camera_x;
    level = level1;
    character = new Character();
    endbossBar = new EndbossBar();
    statusBar = new Statusbar();
    coinsBar = new CoinBar();
    bottlesBar = new BottleBar();
    endboss = this.level.endboss[0];
    throwableObjects = [];

    /**
     * @constructor
     * @description
     * Creates a new world.
     * @param canvas
     * @param keyboard
     * @param game
     */
    constructor(canvas, keyboard, game) {
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.game = game;
        this.ctx = canvas.getContext('2d');
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * @method draw
     * @description
     * Draws the world on the canvas.
     * It draws the background, the character, the enemies and the collectibles.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.coinsBar);
        this.addToMap(this.bottlesBar);
        if (this.endboss.firstContact) {
            this.addToMap(this.endbossBar);
        }
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0);
        requestAnimationFrame(function () {
            self.draw();
        })
        let self = this;
    }

    /**
     * @method addObjectsToMap
     * @description
     * Adds the objects to the map.
     * @param objects
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });

    }

    /**
     * @method addToMap
     * @description
     * Adds the object to the map.
     * @param mo
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo)}
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx)
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * @method flipImage
     * @description
     * Flips the image.
     * @param mo
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1)
        mo.x = mo.x * -1;
    }

    /**
     * @method flipImageBack
     * @description
     * Flips the image back.
     * @param mo
     */
    flipImageBack(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1;
    }

    /**
     * @method setWorld
     * @description
     * Sets the world.
     */
    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
    }

    /**
     * @method run
     * @description
     * Runs the game.
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
        }, 100);
    }

    /**
     * @method throwBottle
     * @description
     * Throws a bottle.
     * It checks if the character has bottles left and if the endboss is hurt.
     */
    throwBottle() {
        if (this.character.collectedBottles > 0 && !this.endboss.isHurt()) {
            let bottle = new ThrowableObjects(this.character.x + 50, this.character.y + 50, this.character.otherDirection);
            this.throwableObjects.push(bottle);
            this.character.collectedBottles--;
            this.bottlesBar.collected -= 20;
            this.bottlesBar.setPercentage(this.bottlesBar.collected);
        }
    }

    /**
     * @method checkCollisions
     * @description
     * Checks the collisions between the objects.
     */
    checkCollisions() {
        this.checkChickenCollision();
        this.checkCollectiblesCollision(this.level.coins, this.coinsBar);
        this.checkCollectiblesCollision(this.level.bottles, this.bottlesBar);
        this.checkEndbossCollision();
        this.checkIfBottleHitChicken();
        this.checkIfBottleHitEndboss();
    }

    /**
     * @method handleEnemyCollision
     * @description
     * Handles the collision between the enemy and the bottle.
     * @param enemy
     * @param bottle
     */
    handleEnemyCollision(enemy, bottle) {
        this.deleteChickenAfterCollision(enemy);
        this.deleteBottleAfterCollision(bottle);
        setTimeout(() => {
            this.deleteAfterCollected(this.level.enemies, enemy);
        }, ENEMY_DELETION_DELAY);
    }

    /**
     * @method processEnemy
     * @description
     * Processes the enemy.
     * It checks if the enemy is dead.
     * @param enemy
     */
    processEnemy(enemy) {
        if (enemy.isDead()) return;
        this.throwableObjects.forEach((bottle) => {
            if (bottle.isColliding(enemy)) {
                this.handleEnemyCollision(enemy, bottle);
            }
        });
    }


    /**
     * @method checkIfBottleHitChicken
     * @description
     * Checks if the bottle hits the chicken.
     */
    checkIfBottleHitChicken() {
        this.level.enemies.forEach((enemy) => {
            this.processEnemy(enemy);
        });
    }

    /**
     * @method checkIfBottleHitEndboss
     * @description
     * Checks if the bottle hits the endboss.
     */
    checkIfBottleHitEndboss() {
        this.level.endboss.forEach((endboss) => {
            this.throwableObjects.forEach((bottle) => {
                if (bottle.isColliding(endboss)) {
                    this.deleteBottleAfterCollision(bottle);
                    if (!endboss.isHurt()) endboss.hit();
                    this.stopGameIfEndbossIsDead(endboss);
                    this.endbossBar.setPercentage(this.endboss.energy);
                }
            });
        });
    }

    /**
     * @method stopGameIfEndbossIsDead
     * @description
     * Stops the game if the endboss is dead.
     * @param endboss
     */
    stopGameIfEndbossIsDead(endboss) {
        if (endboss.isDead()) {
            endboss.speed = 0;
            setTimeout(() => {
                clearAllIntervals();
            }, 1000);
        }
    }

    /**
     * @method stopGameIfCharacterIsDead
     * @description
     * Stops the game if the character is dead.
     */
    stopGameIfCharacterIsDead(){
        if (this.character.gameOver) {
            setTimeout(() => {
                clearAllIntervals();
            }, 1500);
        }
    }

    /**
     * @method checkChickenCollision
     * @description
     * Checks the collision between the character and the chicken.
     */
    checkChickenCollision() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.isDead()) { return }
            this.ifCharacterHitChickeninAir(enemy);
            this.ifChickenHitCharacter(enemy);
            this.stopGameIfCharacterIsDead();
        });
    }

    /**
     * @method handleCharacterHitChickenInAir
     * @description
     * Handles the collision between the character and the chicken in the air.
     * @param enemy
     */
    handleCharacterHitChickenInAir(enemy) {
        this.deleteChickenAfterCollision(enemy);
        this.character.jump();
        setTimeout(() => {
            this.deleteAfterCollected(this.level.enemies, enemy);
        }, ENEMY_DELETION_DELAY);
    }

    /**
     * @method handleChickenHitCharacter
     * @description
     * Handles the collision between the chicken and the character.
     * @param enemy
     */
    handleChickenHitCharacter(enemy) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
        HIT_SOUND.play();
    }

    /**
     * @method handleEndbossCollision
     * @description
     * Handles the collision between the character and the endboss.
     * @param endboss
     */
    handleEndbossCollision(endboss) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
        HIT_SOUND.play();
    }

    /**
     * @method ifCharacterHitChickeninAir
     * @description
     * Checks if the character hits the chicken in the air.
     * @param enemy
     */
    ifCharacterHitChickeninAir(enemy) {
        if (this.character.isColliding(enemy) && this.character.isAboveGround() && !this.character.isHurt()) {
            this.handleCharacterHitChickenInAir(enemy);
        }
    }

    /**
     * @method ifChickenHitCharacter
     * @description
     * Checks if the chicken hits the character.
     * @param enemy
     */
    ifChickenHitCharacter(enemy) {
        if (this.character.isColliding(enemy) && !this.character.isAboveGround() && !this.character.isHurt()) {
            this.handleChickenHitCharacter(enemy);
        }
    }

    /**
     * @method checkEndbossCollision
     * @description
     * Checks the collision between the character and the endboss.
     */
    checkEndbossCollision() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.isColliding(endboss)) {
                this.handleEndbossCollision(endboss);
            }
        });
    }

    /**
     * @method updateBar
     * @description
     * Updates the bar.
     * @param bar
     */
    updateBar(bar) {
        if(bar.collected >= 100) return;
        bar.collected += 20;
        bar.setPercentage(bar.collected);
        bar.COLLECTING_SOUND.volume = playSoundVolume();
        bar.COLLECTING_SOUND.play();
    }

    /**
     * @method handleBottleCollection
     * @description
     * Handles the bottle collection.
     * @param collectiblesArray
     */
    handleBottleCollection(collectiblesArray) {
        if (collectiblesArray === this.level.bottles) {
            this.character.collectedBottles++;
        }
    }

    /**
     * @method checkCollectiblesCollision
     * @description
     * Checks the collision between the character and the collectibles.
     * @param collectiblesArray
     * @param bar
     */
    checkCollectiblesCollision(collectiblesArray, bar) {
        if (!Array.isArray(collectiblesArray) || !bar) {
            console.error("Invalid parameters");
            return;
        }
        collectiblesArray.forEach((collectible) => {
            if (this.bottlesBar.collected >= 100) return;
            if (this.character.isColliding(collectible)) {
                this.updateBar(bar);
                this.deleteAfterCollected(collectiblesArray, collectible);

                this.handleBottleCollection(collectiblesArray);
            }
        });
    }

    /**
     * @method deleteChickenAfterCollision
     * @description
     * Deletes the chicken after the collision.
     * @param enemy
     */
    deleteChickenAfterCollision(enemy) {
        enemy.energy -= 100;
        enemy.CHICKEN_DEAD_SOUND.volume = playSoundVolume();
        enemy.CHICKEN_DEAD_SOUND.play();
    }

    /**
     * @method deleteBottleAfterCollision
     * @description
     * Deletes the bottle after the collision.
     * @param bottle
     */
    deleteBottleAfterCollision(bottle) {
        bottle.bottleDestroyed = true;
        bottle.splash();
    }

    /**
     * @method deleteAfterCollected
     * @description
     * Deletes the object after it is collected.
     * @param object
     * @param item
     */
    deleteAfterCollected(object, item) {
        object.splice(object.indexOf(item), 1);
    }
}
