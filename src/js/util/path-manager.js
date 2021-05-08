// 路径管理

import { closePath, concatDot, drawCircle, setCanvas, startPath } from './draw-helper';
import { radianToAngle, randomBoolean } from './math';

let pathArr = [];
let path;
let lastDot;

class FirstDot {
    constructor ({ x, y }) {
        this.x = x;
        this.y = y;
    }
}

class FollowDot {
    constructor ({ x, y, lastDot, angleVelocity = 10, isAntiClockwise = randomBoolean() }) {
        this.x = x;
        this.y = y;
        const xDistance = x - lastDot.x;
        const yDistance = y - lastDot.y;
        this.radius = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
        this.angleVelocity = angleVelocity;
        this.isAntiClockwise = isAntiClockwise;
        let radian = Math.atan(yDistance / xDistance);
        if (xDistance < 0)
        {
            radian += Math.PI;
        }
        this.angle = radianToAngle(radian);
    }
}

/**
 * @param {{x: Number, y: Number}} location 
 * @param {HTMLCanvasElement} downCanvas 
 * @param {HTMLCanvasElement} upCanvas 
 */
let addDot = addFirstDot;

function addFirstDot (location, downCanvas, upCanvas) {
    const dot = new FirstDot(location);
    path = [dot];
    requestAnimationFrame(() => {
        setCanvas(downCanvas);
        startPath(dot);
        setCanvas(upCanvas);
        drawCircle(dot);
    });
    lastDot = dot;

    addDot = addFollowDot;
}

function addFollowDot (location, downCanvas, upCanvas) {
    const dot = new FollowDot({ ...location, lastDot });
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

/**
 * @returns {Array<FirstDot|FollowDot>}
 */
function getPathArr () {
    return pathArr;
}

/**
 * 关闭当前路径
 */
function closePrevPath () {
    if (path !== undefined)
    {
        pathArr.push(path);
        path = undefined;
        closePath();

        addDot = addFirstDot;
    }
}

export {
    addDot,
    getPathArr,
    closePrevPath
};
