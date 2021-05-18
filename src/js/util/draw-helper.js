// 绘制辅助

import { getDownCanvasElement, getUpCanvasElement } from './canvas-manager';

class CanvasDrawHelper {
    /**
     * 
     * @param {HTMLCanvasElement} ctx 
     */
    constructor (ctx) {
        this.__ctx = ctx.getContext('2d');
    }
    /**
     * 重置颜色
     */
    resetColor () {
        this.setColor('black');
    }
    /**
     * 设置颜色
     * @param {String} color 
     */
    setColor (color) {
        this.__ctx.strokeStyle = color;
    }
    /**
     * 绘制圆形
     * @param {{x: Number, y: Number}}} param0 圆心
     * @param {?Number} radius 半径
     */
    drawCircle ({ x, y }, radius = 10) {
        this.__ctx.beginPath();
        this.__ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.__ctx.stroke();
        this.__ctx.closePath();
    }
    /**
     * 开启绘制路径
     * @param {{x: Number, y: Number}} dot 
     */
    startPath ({ x, y }) {
        this.__ctx.beginPath();
        this.__ctx.moveTo(x, y);
    }
    /**
     * 连接新的路径点
     * @param {{x: Number, y: Number}} dot 
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
let getUpCanvasDrawHelper = function () {
    const canvasElement = getUpCanvasElement();
    const __canvasDrawHelper = new CanvasDrawHelper(canvasElement);
    getUpCanvasDrawHelper = function () {
        return __canvasDrawHelper;
    };
    return __canvasDrawHelper;
};

/**
 * 获取下层画布节点绘制工具
 * @returns {CanvasDrawHelper}
 */
let getDownCanvasDrawHelper = function () {
    const canvasElement = getDownCanvasElement();
    const __canvasDrawHelper = new CanvasDrawHelper(canvasElement);
    getDownCanvasDrawHelper = function () {
        return __canvasDrawHelper;
    };
    return __canvasDrawHelper;
};

export {
    CanvasDrawHelper,
    getUpCanvasDrawHelper,
    getDownCanvasDrawHelper
};
