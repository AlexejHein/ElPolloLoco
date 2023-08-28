
let level1;

/**
 * @function initLevel
 * @description initializes the level
 */
function initLevel() {
    level1 = new Level([
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new ChickenSmall(),
            new ChickenSmall(),
            new ChickenSmall(),
            new ChickenSmall(),

        ],
        [
            new cloud(500),
            new cloud(1600),
            new cloud(2500),
            new cloud(3300),

        ],
        [
            new BackgroundObjects('../img/5_background/layers/air.png', -719),
            new BackgroundObjects('../img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObjects('../img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObjects('../img/5_background/layers/1_first_layer/2.png', -719),

            new BackgroundObjects('../img/5_background/layers/air.png', 0),
            new BackgroundObjects('../img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObjects('../img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObjects('../img/5_background/layers/1_first_layer/1.png', 0),

            new BackgroundObjects('../img/5_background/layers/air.png', 719),
            new BackgroundObjects('../img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObjects('../img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObjects('../img/5_background/layers/1_first_layer/2.png', 719),

            new BackgroundObjects('../img/5_background/layers/air.png', 719 * 2),
            new BackgroundObjects('../img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObjects('../img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObjects('../img/5_background/layers/1_first_layer/1.png', 719 * 2),

            new BackgroundObjects('../img/5_background/layers/air.png', 719 * 3),
            new BackgroundObjects('../img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObjects('../img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObjects('../img/5_background/layers/1_first_layer/2.png', 719 * 3),

            new BackgroundObjects('../img/5_background/layers/air.png', 719 * 4),
            new BackgroundObjects('../img/5_background/layers/3_third_layer/1.png', 719 * 4),
            new BackgroundObjects('../img/5_background/layers/2_second_layer/1.png', 719 * 4),
            new BackgroundObjects('../img/5_background/layers/1_first_layer/1.png', 719 * 4),

            new BackgroundObjects('../img/5_background/layers/air.png', 719 * 5),
            new BackgroundObjects('../img/5_background/layers/3_third_layer/2.png', 719 * 5),
            new BackgroundObjects('../img/5_background/layers/2_second_layer/2.png', 719 * 5),
            new BackgroundObjects('../img/5_background/layers/1_first_layer/2.png', 719 * 5),
        ],

        [
            new Coins(200, 100),
            new Coins(500, 100),
            new Coins(1000, 100),
            new Coins(1500, 100),
            new Coins(2000, 100),
            new Coins(2500, 100),
            new Coins(3000, 100),
            new Coins(3200, 100),
            new Coins(700, 100),
            new Coins(1200, 100)

        ],
        [
            new Bottles(1000),
            new Bottles(2000),
            new Bottles(2500),
            new Bottles(3000),
            new Bottles(2200),
        ],
        [
            new Endboss()
        ],

    );
}