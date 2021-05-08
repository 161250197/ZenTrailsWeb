// 入口文件

import '../style/style.less';
import { init } from './util/init';
import { getCoverElement, getDownCanvasElement, getUpCanvasElement } from './util/canvas-manager';
import { drawCircle, concatDot, setCanvas, startPath, closePath, clearCanvas } from './util/draw-helper';

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

    const pathArr = [];
    let path;
    let lastDot;

    const upCanvas = getUpCanvasElement();
    const downCanvas = getDownCanvasElement();

    /**
     * 角度转弧度
     * @param {Number} angle 角度
     * @return {Number} 弧度
     */
    function angleToRadian (angle) {
        return angle * Math.PI / 180;
    }

    /**
     * 弧度转角度
     * @param {Number} radian 弧度
     * @return {Number} 角度
     */
    function radianToAngle (radian) {
        return radian * 180 / Math.PI;
    }

    function addDot ({ x, y }) {
        if (path === undefined)
        {
            const dot = { x, y };
            path = [dot];
            requestAnimationFrame(() => {
                setCanvas(downCanvas);
                startPath(dot);
                setCanvas(upCanvas);
                drawCircle(dot);
            });
            lastDot = dot;
            return;
        }

        const dot = { x, y, lastX: x, lastY: y };
        const xDistance = x - lastDot.x;
        const yDistance = y - lastDot.y;
        dot.radius = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
        dot.angleVelocity = 10;
        dot.isAntiClockwise = Math.random() > 0.5;
        let radian = Math.atan(yDistance / xDistance);
        if (xDistance < 0)
        {
            radian += Math.PI;
        }
        dot.angle = radianToAngle(radian);
        requestAnimationFrame(() => {
            setCanvas(downCanvas);
            concatDot(dot);
            setCanvas(upCanvas);
            drawCircle(dot);
            if (dot.isAntiClockwise)
            {
                drawCircle(dot, 5);
            }
        });
        path.push(dot);
        lastDot = dot;
    }

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
                addDot(getXY(e));
                break;
            case 1:
                isPlaying ? stopCartoon() : startCartoon();
                break;
            case 2:
                if (path !== undefined)
                {
                    pathArr.push(path);
                    path = undefined;
                    closePath();
                }
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
