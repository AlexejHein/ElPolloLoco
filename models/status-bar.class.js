/**
 * Statusbar class
 * @extends Bar
 */
class Statusbar extends Bar{

    IMAGES= [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];

    percentages = 100;

    /**
     * Constructor of the class
     */
    constructor(){
        super();
        this.loadImages(this.IMAGES)
        this.setPercentage(100);
        this.x = 50;
        this.y = -10;
        this.height = 70;
        this.width = 220;
    }
}