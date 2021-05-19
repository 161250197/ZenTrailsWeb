// 动画管理

import {
    // eslint-disable-next-line no-unused-vars
    Path,
    closePresentPath,
    getPathArr,
    resetPosition
} from '../path';
import { angleToRadian } from '../util/math';
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

function setUpdateCartoonHandle (time) {
    __updateCartoonHandle = requestAnimationFrame(updateCartoon);
    __lastTime = time;
}

function updateCartoon () {
    const time = Date.now();
    const duration = time - __lastTime;
    getUpCanvasDrawHelper().clearCanvas();
    const pathArr = getPathArr();
    pathArr.forEach(path => drawCartoonPath(duration, path));
    setUpdateCartoonHandle(time);
}

function updateDot (duration, lastDot, dot) {
    const { angle, radius, angleVelocity } = dot;
    const angleChange = angleVelocity * duration / 100;
    const newAngle = angle + (dot.isAntiClockwise ? -angleChange : angleChange);
    const newX = lastDot.x + Math.cos(angleToRadian(newAngle)) * radius;
    const newY = lastDot.y + Math.sin(angleToRadian(newAngle)) * radius;
    dot.angle = newAngle;
    dot.x = newX;
    dot.y = newY;
}

/**
 * 绘制
 * @param {number} duration 
 * @param {Path} path 
 */
function drawCartoonPath (duration, path) {
    const downCanvasDrawHelper = getDownCanvasDrawHelper();
    const upCanvasDrawHelper = getUpCanvasDrawHelper();
    upCanvasDrawHelper.resetColor();
    upCanvasDrawHelper.drawCircle(path.firstDot);
    let dots = [path.firstDot];
    while (dots.length)
    {
        let newDots = [];
        for (const dot of dots)
        {
            newDots = newDots.concat(dot.followDots);
        }
        dots = newDots;
        for (const dot of dots)
        {
            const { x, y, color, isAntiClockwise, lastDot } = dot;
            const oldPosition = { x, y };
            updateDot(duration, lastDot, dot);
            upCanvasDrawHelper.setColor(color);
            upCanvasDrawHelper.drawLine(lastDot, dot);
            upCanvasDrawHelper.drawCircle(dot);
            downCanvasDrawHelper.setColor(color);
            downCanvasDrawHelper.drawLine(oldPosition, dot);
            if (isAntiClockwise)
            {
                upCanvasDrawHelper.drawCircle(dot, 5);
            }
        }
    }
}

function startCartoon () {
    closePresentPath();
    showElement(getResetBtnElement());
    hideElement(getStartBtnElement());
    getDownCanvasDrawHelper().clearCanvas();
    __isPlayingCartoon = true;
    const time = Date.now();
    setUpdateCartoonHandle(time);
}

function resetCartoon () {
    showElement(getStartBtnElement());
    hideElement(getResetBtnElement());
    __isPlayingCartoon = false;
    cancelAnimationFrame(__updateCartoonHandle);
    resetPosition();
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
 * 初始化动画管理
 */
function initCartoonManager () {
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
    initCartoonManager,
    isPlayingCartoon
};
