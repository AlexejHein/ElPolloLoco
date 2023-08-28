/**
 * Class EndbossBar
 * @class EndbossBar
 */
class EndbossBar extends Bar{

    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
    ];

    life = 100;

    /**
     * Constructor of the class EndbossBar
     */
    constructor(){
        super();
        this.loadImages(this.IMAGES)
        this.setPercentage(this.life);
        this.x = 460;
        this.y = 0;
        this.height = 70;
        this.width = 220;
    }


}