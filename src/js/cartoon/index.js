// 动画管理

import {
    // eslint-disable-next-line no-unused-vars
    Path,
    closePresentPath,
    resetPaths,
    updateCartoonPath
} from '../path';
import {
    getDownCanvasDrawHelper,
    getUpCanvasDrawHelper
} from '../canvas/draw-helper';
import {
    createSingletonFunc,
    hideElement,
    preventDefaultStopPropagation,
    setElementEventUsed,
    showElement
} from '../util/base';
import { refreshCanvas } from '../canvas';

let __isPlayingCartoon = false;
let __updateCartoonHandle;
let __lastTime;
let __updateCartoonPathFunc;

function setUpdateCartoonHandle (time) {
    __updateCartoonHandle = requestAnimationFrame(updateCartoon);
    __lastTime = time;
}

function updateCartoon () {
    const time = Date.now();
    const duration = time - __lastTime;
    __updateCartoonPathFunc(duration);
    setUpdateCartoonHandle(time);
}

function startCartoon () {
    closePresentPath();
    showElement(getResetBtnElement());
    hideElement(getStartBtnElement());
    __isPlayingCartoon = true;
    const time = Date.now();
    setUpdateCartoonHandle(time);
    const drawHelperPath = getDownCanvasDrawHelper();
    const drawHelperDots = getUpCanvasDrawHelper();
    drawHelperPath.clearCanvas();
    drawHelperPath.resetColor();
    drawHelperDots.clearCanvas();
    __updateCartoonPathFunc = updateCartoonPath.bind(this, drawHelperPath, drawHelperDots);
}

function resetCartoon () {
    showElement(getStartBtnElement());
    hideElement(getResetBtnElement());
    __isPlayingCartoon = false;
    cancelAnimationFrame(__updateCartoonHandle);
    resetPaths();
    refreshCanvas();
}

/**
 * 获取是否正在播放动画
 * @returns {Boolean}
 */
function isPlayingCartoon () {
    return __isPlayingCartoon;
}

let getStartBtnElement = createSingletonFunc(
    function () {
        return document.getElementById('start-btn');
    },
    func => getStartBtnElement = func
);

let getResetBtnElement = createSingletonFunc(
    function () {
        return document.getElementById('reset-btn');
    },
    func => getResetBtnElement = func
);

/**
 * 初始化动画
 */
function initCartoon () {
    const startBtnElement = getStartBtnElement();
    setElementEventUsed(startBtnElement);
    startBtnElement.addEventListener('click', preventDefaultStopPropagation);
    startBtnElement.addEventListener('click', startCartoon);

    const resetBtnElement = getResetBtnElement();
    setElementEventUsed(resetBtnElement);
    resetBtnElement.addEventListener('click', preventDefaultStopPropagation);
    resetBtnElement.addEventListener('click', resetCartoon);
}

export {
    initCartoon,
    isPlayingCartoon
};
