// 路径数据结构

// eslint-disable-next-line no-unused-vars
import { CanvasDrawHelper } from '../canvas/draw-helper';
import { removePath } from '.';
import {
    angleToRadian,
    calPointDistance,
    calPointLineAngle,
    isInCircle
} from '../util/math';


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
     * @param {number} duration 
     */
    updateCartoonPath (duration) {
        let dots = this.firstDot.followDots;
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
                dot.drawDurationPath(drawHelper);
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
        drawHelper.drawCircle(firstDot);
        let dots = firstDot.followDots;
        while (dots.length)
        {
            let newDots = [];
            for (const dot of dots)
            {
                newDots = newDots.concat(dot.followDots);
                const { color, isAntiClockwise, lastDot } = dot;
                drawHelper.drawLine(lastDot, dot);
                drawHelper.setColor(color);
                drawHelper.drawCircle(dot);
                if (isAntiClockwise)
                {
                    drawHelper.drawCircle(dot, 5);
                }
                drawHelper.resetColor();
            }
            dots = newDots;
        }
    }
}

class Dot {
    constructor ({ x, y }) {
        this.x = x;
        this.y = y;
        this.followDots = [];
        this.isTarget = false;
    }
    appendDot (location) {
        const __followDot = new FollowDot(location, this);
        this.followDots.push(__followDot);
        return __followDot;
    }
    /**
     * @returns {?Dot} 上个点或空
     */
    removeDot () {
        throw Error('removeDot 未实现');
    }
}

class FirstDot extends Dot {
    constructor (position, path) {
        super(position);
        this.path = path;
    }
    removeDot () {
        removePath(this);
        return undefined;
    }
    __getDurationState () {
        return this;
    }
}

class FollowDot extends Dot {
    constructor (position, lastDot) {
        super(position);
        this.radius = calPointDistance(lastDot, position);
        this.angle = calPointLineAngle(lastDot, position);
        this.angleVelocity = 10;
        this.isAntiClockwise = false;
        this.color = '#000000';
        this.lastDot = lastDot;
        this.__initialState = {
            ...position,
            angle: this.angle
        };
    }
    reset () {
        this.setState(this.__initialState);
    }
    setState ({ x, y, angle }) {
        this.x = x;
        this.y = y;
        this.angle = angle;
    }
    removeDot () {
        const lastDotFollowDots = this.lastDot.followDots;
        const index = lastDotFollowDots.indexOf(this);
        lastDotFollowDots.splice(index, 1);
        return this.lastDot;
    }
    /**
     * 动画播放时绘制动画路径
     * @param {CanvasDrawHelper} drawHelper 
     */
    drawDurationPath (drawHelper) {
        drawHelper.setColor(this.color);
        drawHelper.startPath(this);
        drawHelper.concatDot(this.__lastState);
        drawHelper.closePath();
        drawHelper.resetColor();
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
        const x = lastDot.x + Math.cos(angleToRadian(angle)) * radius;
        const y = lastDot.y + Math.sin(angleToRadian(angle)) * radius;
        return { x, y, angle };
    }
}

export {
    Path,
    Dot,
    FirstDot,
    FollowDot
};
