// 入口文件

import '../style/style.less';
import { init } from './util/init';
import { getCoverElement, getDownCanvasElement, getUpCanvasElement } from './util/canvas-manager';
import { drawCircle, concatDot, setCanvas, startPath, closePath, clearCanvas } from './util/draw-helper';
import { angleToRadian } from './util/math';
import { addDot, closePrevPath, getPathArr } from './util/path-manager';

init();

(function () {
    const cover = getCoverElement();

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
        drawCircle(lastDot);
        const dotCount = path.length;
        for (let i = 1; i < dotCount; i++)
        {
            const dot = path[i];
            const { angle, radius, angleVelocity } = dot;
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
            const { x, y, lastX, lastY } = dot;
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

    /**
     * @param {MouseEvent} e 
     */
    let onCoverMouseDown = function (e) {
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
    };
    cover.addEventListener('mousedown', onCoverMouseDown);

    /**
     * @param {MouseEvent} e 
     */
    function onCentextMenu (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    cover.addEventListener('contextmenu', onCentextMenu);
}());
