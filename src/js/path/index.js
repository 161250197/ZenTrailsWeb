// 路径管理

import {
    getDownCanvasDrawHelper,
    getUpCanvasDrawHelper
} from '../canvas/draw-helper';
import { showDotSetting } from '../cover/dot-setting';
import {
    radianToAngle,
    isInCircle
} from '../util/math';

/** @type {Array<Path>} */
let __pathArr = [];
/** @type {Path} */
let __path;
/** @type {Dot} */
let __target;

class Path {
    constructor (position) {
        this.firstDot = new FirstDot(position, this);
    }
    selectDot (position) {
        const selectedDots = [];
        if (isInCircle(position, this.firstDot, 10))
        {
            selectedDots.push(this.firstDot);
        }
        let dots = [this.firstDot];
        while (dots.length)
        {
            let newDots = [];
            for (const dot of dots)
            {
                newDots = newDots.concat(dot.followDots);
            }
            dots = newDots;
            for (const dot of dots)
            {
                if (isInCircle(position, dot, 10))
                {
                    selectedDots.push(dot);
                }
            }
        }
        return selectedDots;
    }
    resetPosition () {
        this.firstDot.resetPosition();
        let dots = [this.firstDot];
        while (dots.length)
        {
            let newDots = [];
            for (const dot of dots)
            {
                newDots = newDots.concat(dot.followDots);
            }
            dots = newDots;
            for (const dot of dots)
            {
                dot.resetPosition();
            }
        }
    }
}

class Dot {
    constructor ({ x, y }) {
        this.x = x;
        this.y = y;
        this.followDots = [];
        this.__position = { x, y };
    }
    appendDot (location) {
        const __followDot = new FollowDot(location, this);
        this.followDots.push(__followDot);
        return __followDot;
    }
    resetPosition () {
        const { x, y } = this.__position;
        this.x = x;
        this.y = y;
    }
}
class FirstDot extends Dot {
    constructor (position, path) {
        super(position);
        this.path = path;
    }
}

class FollowDot extends Dot {
    constructor (position, lastDot) {
        super(position);
        const xDistance = this.x - lastDot.x;
        const yDistance = this.y - lastDot.y;
        this.radius = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
        this.angleVelocity = 10;
        this.isAntiClockwise = false;
        let radian = Math.atan(yDistance / xDistance);
        if (xDistance < 0)
        {
            radian += Math.PI;
        }
        this.angle = radianToAngle(radian);
        this.color = '#000000';
        this.lastDot = lastDot;
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
    }
    __target = undefined;
    getDownCanvasDrawHelper().closePath();
}

/**
 * 获取路径是否已经开启
 * @returns {Boolean}
 */
function pathStarted () {
    return __target !== undefined;
}

/**
 * 选择点
 * @param {{x: number, y: number}} position  
 */
function selectDot (position) {
    let selectedDots = [];
    for (const path of __pathArr)
    {
        selectedDots = selectedDots.concat(path.selectDot(position));
    }
    if (selectedDots.length)
    {
        // TODO 多个重叠点时的优先级处理
        __target = selectedDots[0];
        requestAnimationFrame(() => {
            getDownCanvasDrawHelper().startPath(__target);
        });
        if (__target instanceof FollowDot)
        {
            showDotSetting(__target);
        }
    }
}

/**
 * 获取选择的目标点
 * @returns {Dot}
 */
function getTargetDot () {
    return __target;
}

/**
 * 重置位置
 */
function resetPosition () {
    __pathArr.forEach(path => {
        path.resetPosition();
    });
}

export {
    Path,
    startPath,
    addFollowDot,
    getPathArr,
    closePresentPath,
    pathStarted,
    selectDot,
    getTargetDot,
    resetPosition
};
