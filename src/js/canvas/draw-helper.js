// 绘制辅助

// eslint-disable-next-line no-unused-vars
import { Dot, FirstDot, FollowDot } from '../path/data-structure';
import { createSingletonFunc } from '../util/base';
import {
    getDownCanvasElement,
    getUpCanvasElement
} from './element';

const __dotRadius = 5;
const defaultColor = '#888888';

/** 画布绘制工具 */
class CanvasDrawHelper {
    /**
     * @param {HTMLCanvasElement} canvasElement 
     */
    constructor (canvasElement) {
        const ctx = canvasElement.getContext('2d');
        ctx.lineJoin = 'round';
        ctx.lineWidth = 3;
        this.__ctx = ctx;
    }
    __createDotRadialGradient ({ x, y, color = defaultColor }) {
        const radius = __dotRadius;
        const gradient = this.__ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, '#bbbbbb');
        gradient.addColorStop(0.2, color);
        gradient.addColorStop(0.8, color);
        gradient.addColorStop(0.9, 'white');
        return gradient;
    }
    __createDotLinearGradient ({ x, y, color, lastDot }) {
        const lastColor = lastDot.color || defaultColor;
        const gradient = this.__ctx.createLinearGradient(lastDot.x, lastDot.y, x, y);
        gradient.addColorStop(0, lastColor);
        gradient.addColorStop(0.2, lastColor);
        gradient.addColorStop(0.8, color);
        gradient.addColorStop(1, color);
        return gradient;
    }
    __drawDotFunc ({ x, y }) {
        this.__ctx.fillRect(x - __dotRadius, y - __dotRadius, 2 * __dotRadius, 2 * __dotRadius);
    }
    /**
     * 绘制选中的路径节点效果
     * @param {Dot} dot 
     */
    drawTargetDot (dot) {
        const { __ctx } = this;
        __ctx.save();
        __ctx.lineWidth = 5;
        __ctx.strokeStyle = defaultColor;
        this.drawCircle(dot, __dotRadius);
        __ctx.lineWidth = 1;
        __ctx.strokeStyle = 'white';
        this.drawCircle(dot, __dotRadius);
        __ctx.restore();
    }
    /**
     * 绘制路径首节点
     * @param {FirstDot} dot 
     */
    drawPathFirstDot (dot) {
        const { __ctx } = this;
        __ctx.save();
        __ctx.fillStyle = this.__createDotRadialGradient(dot);
        this.__drawDotFunc(dot);
        __ctx.restore();
    }
    /**
     * 绘制路径后续节点
     * @param {FollowDot} dot 
     */
    drawPathFollowDot (dot) {
        const { __ctx } = this;
        __ctx.save();
        __ctx.fillStyle = this.__createDotRadialGradient(dot);
        this.__drawDotFunc(dot);
        __ctx.lineWidth = 1;
        __ctx.strokeStyle = this.__createDotLinearGradient(dot);
        // TODO 根据 angle 和 顺逆时针 绘制提示效果
        this.drawLine(dot.lastDot, dot);
        __ctx.restore();
    }
    /**
     * 绘制动画路径节点运动轨迹
     * @param {FollowDot} dot 
     * @param {{x: number, y: number}} lastPosition 
     */
    drawCartoonPath (dot, lastPosition) {
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
     * @param {number} radius 半径
     */
    drawCircle ({ x, y }, radius) {
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
    defaultColor,
    CanvasDrawHelper,
    getUpCanvasDrawHelper,
    getDownCanvasDrawHelper
};
