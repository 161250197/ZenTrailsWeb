// 动画管理

import { closePresentPath, getPathArr } from '../path';
import { angleToRadian } from '../util/math';
import { getDownCanvasDrawHelper, getUpCanvasDrawHelper } from '../canvas/draw-helper';
import { preventDefaultStopPropagation, setElementEventUsed } from '../util/base';
import { getCoverElement } from '../cover';

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
    pathArr.forEach(drawCartoonPath.bind(this, duration));
    setUpdateCartoonHandle(time);
}

function drawCartoonPath (duration, path) {
    const upCanvasDrawHelper = getUpCanvasDrawHelper();
    let lastDot = path[0];
    upCanvasDrawHelper.resetColor();
    upCanvasDrawHelper.drawCircle(lastDot);
    const dotCount = path.length;
    for (let i = 1; i < dotCount; i++)
    {
        const dot = path[i];
        const { angle, radius, angleVelocity, color } = dot;
        upCanvasDrawHelper.setColor(color);
        const angleChange = angleVelocity * duration / 100;
        const newAngle = angle + (dot.isAntiClockwise ? -angleChange : angleChange);
        const newX = lastDot.x + Math.cos(angleToRadian(newAngle)) * radius;
        const newY = lastDot.y + Math.sin(angleToRadian(newAngle)) * radius;
        dot.angle = newAngle;
        dot.x = newX;
        dot.y = newY;
        upCanvasDrawHelper.drawCircle(dot);
        if (dot.isAntiClockwise)
        {
            upCanvasDrawHelper.drawCircle(dot, 5);
        }
        lastDot = dot;
    }
    upCanvasDrawHelper.resetColor();
    upCanvasDrawHelper.startPath(path[0]);
    for (let i = 1; i < dotCount; i++)
    {
        upCanvasDrawHelper.concatDot(path[i]);
    }
    upCanvasDrawHelper.closePath();

    const downCanvasDrawHelper = getDownCanvasDrawHelper();
    for (let i = 1; i < dotCount; i++)
    {
        const dot = path[i];
        const { x, y, lastX, lastY, color } = dot;
        downCanvasDrawHelper.setColor(color);
        downCanvasDrawHelper.startPath({ x: lastX, y: lastY });
        downCanvasDrawHelper.concatDot(dot);
        downCanvasDrawHelper.closePath();
        dot.lastX = x;
        dot.lastY = y;
    }
}

function startCartoon () {
    closePresentPath();
    hideElement(getCoverElement());
    getDownCanvasDrawHelper().clearCanvas();
    __isPlayingCartoon = true;
    const time = Date.now();
    setUpdateCartoonHandle(time);
}

function stopCartoon ({ key }) {
    const isEscapeKey = key === 'Escape';
    if (isEscapeKey)
    {
        showElement(getCoverElement());
        __isPlayingCartoon = false;
        cancelAnimationFrame(__updateCartoonHandle);
    }
}

/**
 * 获取是否正在播放动画
 * @returns {Boolean}
 */
function isPlayingCartoon () {
    return __isPlayingCartoon;
}

let getStartBtnElement = function () {
    const __startBtnElement = document.getElementById('start-btn');
    getStartBtnElement = function () {
        return __startBtnElement;
    };
    return __startBtnElement;
};

const HIDE = 'hide';

/**
 * @param {HTMLElement} element 
 */
function hideElement (element) {
    element.classList.add(HIDE);
}

/**
 * @param {HTMLElement} element 
 */
function showElement (element) {
    element.classList.remove(HIDE);
}

/**
 * 初始化动画管理
 */
function initCartoonManager () {
    const startBtnElement = getStartBtnElement();
    setElementEventUsed(startBtnElement);
    startBtnElement.addEventListener('click', preventDefaultStopPropagation);
    startBtnElement.addEventListener('click', startCartoon);

    document.addEventListener('keydown', stopCartoon);
}

export {
    initCartoonManager,
    isPlayingCartoon
};
