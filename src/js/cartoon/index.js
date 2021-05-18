// 动画管理

// eslint-disable-next-line no-unused-vars
import { closePresentPath, getPathArr, Path } from '../path';
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
    let lastDots = [path.firstDot];
    while (lastDots.length)
    {
        let newLastDots = [];
        for (const lastDot of lastDots)
        {
            newLastDots = newLastDots.concat(lastDot.followDots);
            for (const dot of lastDot.followDots)
            {
                const { x, y, color, isAntiClockwise } = dot;
                const oldPosition = { x, y };
                updateDot(duration, lastDot, dot);
                upCanvasDrawHelper.setColor(color);
                upCanvasDrawHelper.drawLine(lastDot, dot);
                downCanvasDrawHelper.setColor(color);
                downCanvasDrawHelper.drawLine(oldPosition, dot);
                upCanvasDrawHelper.drawCircle(dot);
                if (isAntiClockwise)
                {
                    upCanvasDrawHelper.drawCircle(dot, 5);
                }
            }
        }
        lastDots = newLastDots;
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
