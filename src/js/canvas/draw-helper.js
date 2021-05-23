// 绘制辅助

// eslint-disable-next-line no-unused-vars
import { FirstDot, FollowDot } from '../path/data-structure';
import { createSingletonFunc } from '../util/base';
import {
    getDownCanvasElement,
    getUpCanvasElement
} from './element';

/** 画布绘制工具 */
class CanvasDrawHelper {
    /**
     * @param {HTMLCanvasElement} ctx 
     */
    constructor (ctx) {
        this.__ctx = ctx.getContext('2d');
    }
    /**
     * 绘制路径首节点
     * @param {FirstDot} dot 
     */
    drawPathFirstDot (dot) {
        // TODO 优化效果
        this.drawCircle(dot);
    }
    /**
     * 绘制路径后续节点
     * @param {FollowDot} dot 
     */
    drawPathFollowDot (dot) {
        // TODO 优化效果
        const { color, isAntiClockwise, lastDot } = dot;
        this.setColor(color);
        this.drawCircle(dot);
        if (isAntiClockwise)
        {
            this.drawCircle(dot, 5);
        }
        this.resetColor();
        this.drawLine(lastDot, dot);
    }
    /**
     * 绘制动画路径节点运动轨迹
     * @param {FollowDot} dot 
     * @param {{x: number, y: number}} lastPosition 
     */
    drawCartoonPath (dot, lastPosition) {
        // TODO 优化效果
        this.setColor(dot.color);
        this.drawLine(dot, lastPosition);
        this.resetColor();
    }
    /**
     * 重置颜色
     */
    resetColor () {
        this.setColor('black');
    }
    /**
     * 设置颜色
     * @param {string} color 
     */
    setColor (color) {
        this.__ctx.strokeStyle = color;
    }
    /**
     * 绘制线段
     * @param {{x: number, y: number}} start 
     * @param {{x: number, y: number}} end 
     */
    drawLine (start, end) {
        this.startPath(start);
        this.concatDot(end);
        this.closePath();
    }
    /**
     * 绘制圆形
     * @param {{x: number, y: number}} param0 圆心
     * @param {?number} radius 半径
     */
    drawCircle ({ x, y }, radius = 10) {
        this.__ctx.beginPath();
        this.__ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.__ctx.stroke();
        this.__ctx.closePath();
    }
    /**
     * 开启绘制路径
     * @param {{x: number, y: number}} dot 
     */
    startPath ({ x, y }) {
        this.__ctx.beginPath();
        this.__ctx.moveTo(x, y);
    }
    /**
     * 连接新的路径点
     * @param {{x: number, y: number}} dot 
     */
    concatDot ({ x, y }) {
        this.__ctx.lineTo(x, y);
        this.__ctx.stroke();
    }
    /**
     * 结束路径
     */
    closePath () {
        this.__ctx.closePath();
    }
    /**
     * 清空画布
     */
    clearCanvas () {
        const maxSafeInteger = Number.MAX_SAFE_INTEGER;

        this.__ctx.clearRect(0, 0, maxSafeInteger, maxSafeInteger);
    }
}

/**
 * 获取上层画布节点绘制工具
 * @returns {CanvasDrawHelper}
 */
let getUpCanvasDrawHelper = createSingletonFunc(
    function () {
        return new CanvasDrawHelper(getUpCanvasElement());
    },
    func => getUpCanvasDrawHelper = func
);

/**
 * 获取下层画布节点绘制工具
 * @returns {CanvasDrawHelper}
 */
let getDownCanvasDrawHelper = createSingletonFunc(
    function () {
        return new CanvasDrawHelper(getDownCanvasElement());
    },
    func => getDownCanvasDrawHelper = func
);

export {
    CanvasDrawHelper,
    getUpCanvasDrawHelper,
    getDownCanvasDrawHelper
};
