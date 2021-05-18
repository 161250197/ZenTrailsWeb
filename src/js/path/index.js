// 路径管理

import { setTargetDot } from '../cover/dot-setting';
import { getDownCanvasDrawHelper, getUpCanvasDrawHelper } from '../canvas/draw-helper';
import { radianToAngle, randomBoolean } from '../util/math';

/** @type {Array<Path>} */
let __pathArr = [];
/** @type {Path} */
let __path;
/** @type {Dot} */
let __target;

class Path {
    constructor (position) {
        this.firstDot = new FirstDot(position);
    }
}

class Dot {
    constructor ({ x, y }) {
        this.x = x;
        this.y = y;
        this.followDots = [];
    }
    appendDot (location) {
        const __followDot = new FollowDot(location, this);
        this.followDots.push(__followDot);
        return __followDot;
    }
}
class FirstDot extends Dot {
    constructor (position) {
        super(position);
    }
}

class FollowDot extends Dot {
    constructor (position, lastDot) {
        super(position);
        const xDistance = this.x - lastDot.x;
        const yDistance = this.y - lastDot.y;
        this.radius = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
        this.angleVelocity = 10;
        this.isAntiClockwise = randomBoolean();
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
 * 开启新路径
 * @param {{x: number, y: number}} location 
 */
function startPath (location) {
    // TODO 绘制效果优化
    __path = new Path(location);
    __target = __path.firstDot;
    requestAnimationFrame(() => {
        getDownCanvasDrawHelper().startPath(__target);
        getUpCanvasDrawHelper().drawCircle(__target);
    });
}

/**
 * @param {{x: number, y: number}} location 
 */
function addFollowDot (location) {
    // TODO 绘制效果优化
    __target = __target.appendDot(location);
    setTargetDot(__target);
    requestAnimationFrame(() => {
        getDownCanvasDrawHelper().concatDot(location);
        getUpCanvasDrawHelper().drawCircle(location);
        if (__target.isAntiClockwise)
        {
            getUpCanvasDrawHelper().drawCircle(location, 5);
        }
    });
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
function closePresentPath () {
    if (__path !== undefined)
    {
        __pathArr.push(__path);
        __path = undefined;
        __target = undefined;
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

/**
 * 选择点
 * @param {{x: number, y: number}} position  
 */
function selectDot (position) {
    // TODO 逻辑实现
    console.log('selectDot', position);
}

/**
 * 获取选择的目标点
 * @returns {Dot}
 */
function getTargetDot () {
    return __target;
}

export {
    Path,
    startPath,
    addFollowDot,
    getPathArr,
    closePresentPath,
    pathStarted,
    selectDot,
    getTargetDot
};
