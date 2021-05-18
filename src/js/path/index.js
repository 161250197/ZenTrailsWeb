// 路径管理

import { setTargetDot } from '../cover/dot-setting';
import { getDownCanvasDrawHelper, getUpCanvasDrawHelper } from '../canvas/draw-helper';
import { radianToAngle, randomBoolean } from '../util/math';

let __pathArr = [];
let __path;
let __lastDot;

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
        this.color = '#000000';
    }
}

/**
 * @param {{x: Number, y: Number}} location 
 */
function addFirstDot (location) {
    // TODO 绘制效果优化
    const dot = new FirstDot(location);
    __path = [dot];
    requestAnimationFrame(() => {
        getDownCanvasDrawHelper().startPath(dot);
        getUpCanvasDrawHelper().drawCircle(dot);
    });
    __lastDot = dot;
}

/**
 * @param {{x: Number, y: Number}} location 
 */
function addFollowDot (location) {
    // TODO 绘制效果优化
    const dot = new FollowDot({ ...location, lastDot: __lastDot });
    requestAnimationFrame(() => {
        getDownCanvasDrawHelper().concatDot(dot);
        getUpCanvasDrawHelper().drawCircle(dot);
        if (dot.isAntiClockwise)
        {
            getUpCanvasDrawHelper().drawCircle(dot, 5);
        }
    });
    __path.push(dot);
    __lastDot = dot;

    setTargetDot(dot);
}

/**
 * @returns {Array<FirstDot|FollowDot>}
 */
function getPathArr () {
    return __pathArr;
}

/**
 * 关闭当前路径
 */
function closePrevPath () {
    if (__path !== undefined)
    {
        __pathArr.push(__path);
        __path = undefined;
        getDownCanvasDrawHelper().closePath();
    }
}

/**
 * 获取路径是否已经开启
 * @returns {Boolean}
 */
function pathStarted () {
    return __path !== undefined;
}

export {
    addFirstDot,
    addFollowDot,
    getPathArr,
    closePrevPath,
    pathStarted
};
