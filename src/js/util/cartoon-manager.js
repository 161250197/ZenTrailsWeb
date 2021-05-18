// 动画管理

import { getPathArr } from './path-manager';
import { angleToRadian } from './math';
import { getDownCanvasDrawHelper, getUpCanvasDrawHelper } from './draw-helper';

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

/**
 * 开始动画
 */
function startCartoon () {
    getDownCanvasDrawHelper().clearCanvas();
    __isPlayingCartoon = true;
    setUpdateCartoonHandle(Date.now());
}

/**
 * 结束动画
 */
function stopCartoon () {
    __isPlayingCartoon = false;
    cancelAnimationFrame(__updateCartoonHandle);
}

/**
 * 获取是否正在播放动画
 * @returns {Boolean}
 */
function isPlayingCartoon () {
    return __isPlayingCartoon;
}

export {
    startCartoon,
    stopCartoon,
    isPlayingCartoon
};
