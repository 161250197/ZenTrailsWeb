// 遮罩管理

import { getDownCanvasElement, getUpCanvasElement } from './canvas-manager';
import { setCanvas, setColor, clearCanvas, closePath, concatDot, resetColor, drawCircle, startPath } from './draw-helper';
import { getPathArr, addDot, closePrevPath } from './path-manager';
import { angleToRadian } from './math';

/**
 * 获取遮罩节点
 * @returns {HTMLElement}
 */
let getCoverElement = function () {
    const cover = document.getElementById('cover');
    getCoverElement = function () {
        return cover;
    };
    return cover;
};

/**
 * 初始化遮罩管理
 */
function initCoverManager () {
    const cover = getCoverElement();
    cover.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        e.stopPropagation();
    });

    function getXY (e) {
        const { clientX, clientY } =
            e.touches && e.touches[0] ?
                e.touches[0] :
                e;
        return { x: clientX, y: clientY };
    }

    const upCanvas = getUpCanvasElement();
    const downCanvas = getDownCanvasElement();

    let isPlaying = false;
    let updateCartoonHandle;
    let lastTime;

    function startCartoon () {
        setCanvas(downCanvas);
        clearCanvas();
        isPlaying = true;
        setUpdateCartoonHandle(Date.now());
    }

    function setUpdateCartoonHandle (time) {
        updateCartoonHandle = requestAnimationFrame(updateCartoon);
        lastTime = time;
    }

    function updateCartoon () {
        const time = Date.now();
        const duration = time - lastTime;
        setCanvas(upCanvas);
        clearCanvas();
        const pathArr = getPathArr();
        pathArr.forEach(drawCartoonPath.bind(this, duration));
        setUpdateCartoonHandle(time);
    }

    function drawCartoonPath (duration, path) {
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

    function stopCartoon () {
        isPlaying = false;
        cancelAnimationFrame(updateCartoonHandle);
    }

    cover.addEventListener('mousedown', (e) => {
        e.preventDefault();
        switch (e.button)
        {
            case 0:
                addDot(getXY(e), downCanvas, upCanvas);
                break;
            case 1:
                isPlaying ? stopCartoon() : startCartoon();
                break;
            case 2:
                closePrevPath();
        }
    });
}

export {
    getCoverElement,
    initCoverManager
};
