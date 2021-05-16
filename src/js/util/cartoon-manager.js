// 动画管理

import { getDownCanvasElement, getUpCanvasElement } from './canvas-manager';
import { setCanvas, setColor, clearCanvas, closePath, concatDot, resetColor, drawCircle, startPath } from './draw-helper';
import { getPathArr } from './path-manager';
import { angleToRadian } from './math';

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
    const upCanvas = getUpCanvasElement();
    setCanvas(upCanvas);
    clearCanvas();
    const pathArr = getPathArr();
    pathArr.forEach(drawCartoonPath.bind(this, duration));
    setUpdateCartoonHandle(time);
}

function drawCartoonPath (duration, path) {
    const downCanvas = getDownCanvasElement();
    const upCanvas = getUpCanvasElement();
    let lastDot = path[0];
    resetColor();
    drawCircle(lastDot);
    const dotCount = path.length;
    for (let i = 1; i < dotCount; i++)
    {
        const dot = path[i];
        const { angle, radius, angleVelocity, color } = dot;
        setColor(color);
        const angleChange = angleVelocity * duration / 100;
        const newAngle = angle + (dot.isAntiClockwise ? -angleChange : angleChange);
        const newX = lastDot.x + Math.cos(angleToRadian(newAngle)) * radius;
        const newY = lastDot.y + Math.sin(angleToRadian(newAngle)) * radius;
        dot.angle = newAngle;
        dot.x = newX;
        dot.y = newY;
        drawCircle(dot);
        if (dot.isAntiClockwise)
        {
            drawCircle(dot, 5);
        }
        lastDot = dot;
    }
    resetColor();
    startPath(path[0]);
    for (let i = 1; i < dotCount; i++)
    {
        concatDot(path[i]);
    }
    closePath();
    setCanvas(downCanvas);
    for (let i = 1; i < dotCount; i++)
    {
        const dot = path[i];
        const { x, y, lastX, lastY, color } = dot;
        setColor(color);
        startPath({ x: lastX, y: lastY });
        concatDot(dot);
        closePath();
        dot.lastX = x;
        dot.lastY = y;
    }
    setCanvas(upCanvas);
}

/**
 * 开始动画
 */
function startCartoon () {
    const downCanvas = getDownCanvasElement();
    setCanvas(downCanvas);
    clearCanvas();
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
