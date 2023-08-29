let keyboard = new Keyboard();
let canvas;
let world;
let globalVolume = 0.2;
let intervalIds = [];
let gameStop = false;
let gameMute = false;

BACKGROUND_MUSIC = new Audio('audio/bg-music.mp3');
GAMEOVER_MUSIC = new Audio('audio/game-over.mp3');
GAMEWON_MUSIC = new Audio('audio/won.mp3');
WALKING_SOUND = new Audio('audio/walking.mp3');
HIT_SOUND = new Audio('audio/pain.mp3');
DEAD_SOUND = new Audio('audio/dead.mp3');

/**
 * @function setStoppableInterval
 * @description sets an interval that can be stopped
 * @param fn
 * @param time
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push({ id, fn, time });
}

/**
 * @function clearAllIntervals
 * @description clears all intervals
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
    showGameOver();
}


/**
 * @function init
 * @description initializes the game
 */
function init() {
    detectPhonePosition();
    loadDesktopControlEvents();
    loadMobileControlEvents();
    addResponsiveDesign();
}

/**
 * @function showStartScreen
 * @description shows the start screen
 */
function showStartScreen() {
    let muteBtn = document.getElementById('mute-btn');
    let fullscreenBtn = document.getElementById('fullscreen-btn');
    fullscreenBtn.style.cssText = 'background: content-box; right: 5px;'
    muteBtn.style.cssText = 'background: content-box; right: 70px; left: unset;';
    document.getElementById('overlay').classList.add('d-none');
    document.getElementById('start-screen').classList.add('d-none');
}

/**
 *@function startGame
 * @description starts the game
 */
function startGame() {
    initLevel();
    initGame();
    showStartScreen();
    BACKGROUND_MUSIC.volume = globalVolume;
    BACKGROUND_MUSIC.play();
}


/**
 * @function initGame
 * @description initializes the game
 */
function initGame() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, this)
}


/**
 *@function playSoundVolume
 * @description plays the sound volume
 */
function playSoundVolume() {
    if (gameMute) {
        return 0;
    } else {
        return 0.3;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const storedMuteStatus = localStorage.getItem('gameMute');
    if (storedMuteStatus !== null) {
        gameMute = JSON.parse(storedMuteStatus);
        globalVolume = gameMute ? 0 : 0.2;
        updateMuteIcon();
        setVolumeOfSounds(globalVolume);
    }
});


/**
 * @function mute
 * @description mutes the game
 */
function mute() {
    const muteImg = document.getElementById('mute-img');
    globalVolume = (globalVolume === 0) ? 0.2 : 0;
    gameMute = (globalVolume === 0);
    localStorage.setItem('gameMute', JSON.stringify(gameMute));
    updateMuteIcon();
    setVolumeOfSounds(globalVolume);
}


/**
 * @function updateMuteIcon
 * @description updates the mute icon
 */
function updateMuteIcon() {
    const muteImg = document.getElementById('mute-img');
    muteImg.innerHTML = `<i class="fa fa-volume-${gameMute ? 'off' : 'up'}" style="font-size:32px"></i>`;
}


/**
 * @function setVolumeOfSounds
 * @description sets the volume of the sounds
 * @param volume
 */
function setVolumeOfSounds(volume) {
    const sounds = [BACKGROUND_MUSIC, GAMEOVER_MUSIC, GAMEWON_MUSIC, WALKING_SOUND, HIT_SOUND, DEAD_SOUND];
    sounds.forEach(sound => sound.volume = volume);
}

/**
 * @function toggleFullScreen
 * @description toggles the full screen
 */
function toggleFullScreen() {
    const fullscreenIcon = document.getElementById("fullscreen-icon");
    const isFullScreen = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
    isFullScreen ? exitFullScreen() : openFullScreen();
    fullscreenIcon.innerHTML = `<i class="fa fa-${isFullScreen ? 'expand' : 'compress'}" style="font-size:36px"></i>`;
}


/**
 * @function openFullScreen
 * @description opens the full screen
 */
function openFullScreen() {
    const content = document.getElementById('content');
    const methods = ['requestFullscreen', 'mozRequestFullScreen', 'webkitRequestFullscreen', 'msRequestFullscreen'];
    for (let method of methods) {
        if (content[method]) {
            content[method]();
            break;
        }
    }
}


/**
 * @function exitFullScreen
 * @description exits the full screen
 */
function exitFullScreen() {
    const methods = ['exitFullscreen', 'webkitExitFullscreen', 'msExitFullscreen'];
    for (let method of methods) {
        if (document[method]) {
            document[method]();
            break;
        }
    }
}

/**
 * @function detectPhonePosition
 * @description detects the phone position
 */
function detectPhonePosition() {
    window.addEventListener("resize", function () {
        document.getElementById('rotate-device').classList.add('d-none');
        document.getElementById('tutorial').classList.remove('d-none');
        document.getElementById('overlay-bottom').classList.add('d-none');
        addResponsiveDesign();
    });
}


/**
 * @function addResponsiveDesign
 * @description adds the responsive design
 */
function addResponsiveDesign(){
    if (window.innerWidth < 740 && window.innerHeight < 480) {
        document.getElementById('tutorial').classList.add('d-none');
        if (window.matchMedia("(orientation: landscape)").matches && window.innerWidth < 740) {
            document.getElementById('overlay-bottom').classList.remove('d-none');

        } else if (window.matchMedia("(orientation: portrait)").matches && window.innerWidth < 740) {
            document.getElementById('overlay-bottom').classList.add('d-none');
            document.getElementById('rotate-device').classList.remove('d-none');
        }
    }
}


/**
 * @function showGameOver
 * @description shows the game over
 */
function showGameOver() {
    BACKGROUND_MUSIC.pause();
    GAMEOVER_MUSIC.currentTime = 13;
    GAMEOVER_MUSIC.volume = globalVolume;
    if (world.character.gameOver) {
        showGameLostScreen();
    } else {
        showYouWonScreen();
    }
    gameStop = true;
}


/**
 * @function showGameLostScreen
 * @description shows the game lost screen
 */
function showGameLostScreen() {
    let youLost = document.getElementById('you-lost');
    youLost.classList.remove('fade-out');
    youLost.classList.add('fade-in');
    GAMEOVER_MUSIC.play();
}


/**
 * @function showYouWonScreen
 * @description shows the you won screen
 */
function showYouWonScreen() {
    let gameOver = document.getElementById('you-won');
    gameOver.classList.remove('fade-out');
    gameOver.classList.add('fade-in');
    GAMEWON_MUSIC.play();
}


/**
 * @function restartGame
 * @description restarts the game
 */
function restartGame() {
    console.log('restart');
    window.location.reload();
}



