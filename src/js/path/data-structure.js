// 路径数据结构

// eslint-disable-next-line no-unused-vars
import { CanvasDrawHelper } from '../canvas/draw-helper';
import { removePath } from '.';
import {
    calPosition,
    isInCircle
} from '../util/math';
import {
    regularFirstDotPosition,
    regularFollowDotProperty
} from './data-format';
import { getLastColor } from '../canvas/color';

const { dotRadius } = require('../config.json');

/** 路径数据结构 */
class Path {
    /**
     * @param {{x: number, y: number}} position 
     */
    constructor (position) {
        const regularPosition = regularFirstDotPosition(position);
        this.firstDot = new FirstDot(regularPosition, this);
    }
    /**
     * 选择节点
     * @param {{x: number, y: number}} position 
     * @returns {Array<Dot>}
     */
    selectDot (position) {
        const selectedDots = [];
        const activeRadius = 2 * dotRadius;
        const { firstDot } = this;
        if (isInCircle(position, firstDot, activeRadius))
        {
            selectedDots.push(firstDot);
        }
        let dots = [firstDot];
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
                if (isInCircle(position, dot, activeRadius))
                {
                    selectedDots.push(dot);
                }
            }
        }
        return selectedDots;
    }
    /**
     * 重置路径
     */
    reset () {
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
                dot.reset();
            }
        }
    }
    /**
     * 动画播放时重新计算动画路径
     */
    updateCartoonPath () {
        let dots = this.firstDot.followDots;
        // 固定刷新间隔为 10ms
        const duration = 10;
        while (dots.length)
        {
            let newDots = [];
            for (const dot of dots)
            {
                newDots = newDots.concat(dot.followDots);
                dot.updateDurationState(duration);
            }
            dots = newDots;
        }
    }
    /**
     * 动画播放时绘制动画路径
     * @param {CanvasDrawHelper} drawHelper 
     */
    drawCartoonPath (drawHelper) {
        let dots = this.firstDot.followDots;
        while (dots.length)
        {
            let newDots = [];
            for (const dot of dots)
            {
                newDots = newDots.concat(dot.followDots);
                dot.drawCartoonPath(drawHelper);
            }
            dots = newDots;
        }
    }
    /**
     * 绘制路径节点
     * @param {CanvasDrawHelper} drawHelper 
     */
    drawPathDots (drawHelper) {
        const { firstDot } = this;
        drawHelper.drawPathFirstDot(firstDot);
        let dots = firstDot.followDots;
        while (dots.length)
        {
            let newDots = [];
            for (const dot of dots)
            {
                newDots = newDots.concat(dot.followDots);
                drawHelper.drawPathFollowDot(dot);
            }
            dots = newDots;
        }
    }
}

/** 节点数据结构 */
class Dot {
    /**
     * @param {{x: number, y: number}} param0 
     */
    constructor ({ x, y }) {
        this.x = x;
        this.y = y;
        this.followDots = [];
        this.isTarget = false;
        this.opacity = 1;
    }
    /**
     * 追加节点
     * @param {{x: number, y: number}} position 
     * @returns {FollowDot}
     */
    appendDot (position) {
        const followDotProperty = regularFollowDotProperty(position, this);
        const __followDot = new FollowDot(followDotProperty, this);
        this.followDots.push(__followDot);
        return __followDot;
    }
    /**
     * 移除节点
     * @returns {?Dot} 上个点或空
     */
    removeDot () {
        throw Error('removeDot 未实现');
    }
}

/** 首个节点数据结构 */
class FirstDot extends Dot {
    /**
     * @param {{x: number, y: number}} position 
     * @param {Path} path 
     */
    constructor (position, path) {
        super(position);
        this.path = path;
    }
    /**
     * @override
     */
    removeDot () {
        removePath(this.path);
        return undefined;
    }
}

class FollowDot extends Dot {
    /**
     * @param {{position: {x: number, y: number}, radius: number, angle: number}} param0 
     * @param {Dot} lastDot 
     */
    constructor ({ position, radius, angle }, lastDot) {
        super(position);
        this.radius = radius;
        this.angle = angle;
        this.angleVelocity = 10;
        this.isAntiClockwise = false;
        this.color = getLastColor();
        this.lastDot = lastDot;
        const { x, y } = position;
        this.__initialState = { x, y, angle };
    }
    /**
     * 重置节点
     */
    reset () {
        this.setState(this.__initialState);
    }
    /**
     * 设置节点状态
     * @param {{x: number, y: number, angle: number}} param0 
     */
    setState ({ x, y, angle }) {
        this.x = x;
        this.y = y;
        this.angle = angle;
    }
    /**
     * @override
     */
    removeDot () {
        const lastDotFollowDots = this.lastDot.followDots;
        const index = lastDotFollowDots.indexOf(this);
        lastDotFollowDots.splice(index, 1);
        return this.lastDot;
    }
    /**
     * 绘制动画路径
     * @param {CanvasDrawHelper} drawHelper 
     */
    drawCartoonPath (drawHelper) {
        drawHelper.drawCartoonPath(this, this.__lastState);
    }
    /**
     * 计算位置数据
     * @param {number} duration 
     */
    updateDurationState (duration) {
        this.__saveLastState();
        const state = this.__calDurationState(duration);
        this.setState(state);
    }
    __saveLastState () {
        const { x, y, angle } = this;
        this.__lastState = { x, y, angle };
    }
    __calDurationState (duration) {
        const { radius, angleVelocity, lastDot } = this;
        const angleChange = angleVelocity * duration / 100;
        const angle = this.angle + (this.isAntiClockwise ? -angleChange : angleChange);
        const { x, y } = calPosition(lastDot, angle, radius);
        return { x, y, angle };
    }
}

export {
    Path,
    Dot,
    FirstDot,
    FollowDot
};
