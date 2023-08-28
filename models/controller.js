/**
 * Mapping of key codes to their respective key names.
 * @type {Object.<number, string>}
 */
const keyMapping = {
    37: 'LEFT',
    38: 'UP',
    39: 'RIGHT',
    40: 'DOWN',
    32: 'SPACE'
};

/**
 * Initializes event listeners for desktop controls.
 * Binds keydown and keyup events to update the `keyboard` object.
 */
function loadDesktopControlEvents() {
    window.addEventListener("keydown", (e) => {
        if (keyMapping[e.keyCode]) {
            if (e.keyCode == 32 && !keyboard.SPACE) {
                world.throwBottle();
            }
            keyboard[keyMapping[e.keyCode]] = true;
        }
    });
    window.addEventListener("keyup", (e) => {
        if (keyMapping[e.keyCode]) {
            keyboard[keyMapping[e.keyCode]] = false;
        }
    });
}

/**
 * Mapping of mobile control button IDs to their respective key names.
 * @type {Object.<string, string>}
 */
const mobileControls = {
    'btnRight': 'RIGHT',
    'btnLeft': 'LEFT',
    'btnUp': 'UP',
    'btnThrow': 'SPACE'
};

/**
 * Handles touch events for mobile controls.
 *
 * @param {string} id - The ID of the element to attach the event to.
 * @param {boolean} state - The state to set the corresponding key in `keyboard`.
 */
function handleTouchEvent(id, state) {
    document.getElementById(id).addEventListener(state ? 'touchstart' : 'touchend', (e) => {
        e.preventDefault();
        if (id === 'btnThrow' && !keyboard.SPACE && state) {
            world.throwBottle();
        }
        keyboard[mobileControls[id]] = state;
    });
}

/**
 * Initializes event listeners for mobile controls.
 * Uses `handleTouchEvent` to set up touchstart and touchend events for each control.
 */
function loadMobileControlEvents() {
    for (let id in mobileControls) {
        handleTouchEvent(id, true);
        handleTouchEvent(id, false);
    }
}