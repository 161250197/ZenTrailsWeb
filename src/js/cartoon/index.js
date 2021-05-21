// 动画管理

import {
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
    setElementEventUsed,
    showElement
} from '../util/base';
import { refreshCanvas } from '../canvas';
import {
    setGuideAfterPlayCartoon,
    setGuideAfterResetPlayCartoon
} from '../prompt/guide';
import {
    hideExportPictureElement,
    initExportPicture,
    showExportPictureElement
} from './export-picture';

let __isPlayingCartoon = false;
let __updateCartoonHandle;
let __lastTime;
let __updateCartoonPathFunc;

function __setUpdateCartoonHandle (time) {
    __updateCartoonHandle = requestAnimationFrame(__updateCartoon);
    __lastTime = time;
}

function __updateCartoon () {
    const time = Date.now();
    const duration = time - __lastTime;
    __updateCartoonPathFunc(duration);
    __setUpdateCartoonHandle(time);
}

function __startCartoon () {
    closePresentPath();
    showElement(__getResetBtnElement());
    hideElement(__getStartBtnElement());
    __isPlayingCartoon = true;
    const time = Date.now();
    __setUpdateCartoonHandle(time);
    const drawHelperPath = getDownCanvasDrawHelper();
    const drawHelperDots = getUpCanvasDrawHelper();
    drawHelperPath.clearCanvas();
    drawHelperPath.resetColor();
    drawHelperDots.clearCanvas();
    __updateCartoonPathFunc = updateCartoonPath.bind(this, drawHelperPath, drawHelperDots);

    setGuideAfterPlayCartoon();
    showExportPictureElement();
}

function __resetCartoon () {
    showElement(__getStartBtnElement());
    hideElement(__getResetBtnElement());
    __isPlayingCartoon = false;
    cancelAnimationFrame(__updateCartoonHandle);
    resetPaths();
    refreshCanvas();

    setGuideAfterResetPlayCartoon();
    hideExportPictureElement();
}

/**
 * 获取是否正在播放动画
 * @returns {boolean}
 */
function isPlayingCartoon () {
    return __isPlayingCartoon;
}

let __getStartBtnElement = createSingletonFunc(
    function () {
        return document.getElementById('start-btn');
    },
    func => __getStartBtnElement = func
);

let __getResetBtnElement = createSingletonFunc(
    function () {
        return document.getElementById('reset-btn');
    },
    func => __getResetBtnElement = func
);

/**
 * 初始化动画模块
 */
function initCartoon () {
    const startBtnElement = __getStartBtnElement();
    setElementEventUsed(startBtnElement);
    startBtnElement.addEventListener('click', __startCartoon);

    const resetBtnElement = __getResetBtnElement();
    setElementEventUsed(resetBtnElement);
    resetBtnElement.addEventListener('click', __resetCartoon);

    initExportPicture();
}

/**
 * 显示开始播放动画节点
 */
function showStartBtnElement () {
    showElement(__getStartBtnElement());
}

export {
    initCartoon,
    isPlayingCartoon,
    showStartBtnElement
};
