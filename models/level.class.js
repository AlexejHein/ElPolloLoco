/**
 * Class representing a game level.
 */
class Level{
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 3630;
    coins;
    bottles;
    endboss;

    /**
     * Create a level.  A level consists of enemies, clouds, background objects, coins, bottles and an endboss.
     * @param enemies
     * @param clouds
     * @param backgroundObjects
     * @param coins
     * @param bottles
     * @param endboss
     */
    constructor(enemies,clouds,backgroundObjects,coins,bottles,endboss){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
        this.endboss = endboss;
    }
}