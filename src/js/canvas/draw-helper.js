// 绘制辅助

// eslint-disable-next-line no-unused-vars
import { Dot, FirstDot, FollowDot } from '../path/data-structure';
import { createSingletonFunc } from '../util/base';
import { angleToRadian } from '../util/math';
import { getLastColor } from './color';
import {
    getExportCanvasElement,
    getDownCanvasElement,
    getUpCanvasElement
} from './element';

const {
    dotRadius,
    defaultColor
} = require('../config.json');

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
    __drawLine (start, end) {
        this.startPath(start);
        this.concatDot(end);
        this.closePath();
    }
    __drawCircle ({ x, y }, radius, startRadian = 0, endRadian = 2 * Math.PI, isAntiClockwise) {
        const { __ctx } = this;
        __ctx.beginPath();
        __ctx.arc(x, y, radius, startRadian, endRadian, isAntiClockwise);
        __ctx.stroke();
        __ctx.closePath();
    }
    __createDotRadialGradient ({ x, y, color = defaultColor }) {
        const radius = dotRadius;
        const gradient = this.__ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, '#bbbbbb');
        gradient.addColorStop(0.2, color);
        gradient.addColorStop(0.8, color);
        gradient.addColorStop(0.9, 'white');
        gradient.addColorStop(0.9, 'transparent');
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
    __drawDotFunc (dot) {
        const { __ctx } = this;
        __ctx.save();
        __ctx.fillStyle = this.__createDotRadialGradient(dot);
        const { x, y, opacity } = dot;
        __ctx.globalAlpha = opacity;
        __ctx.fillRect(x - dotRadius, y - dotRadius, 2 * dotRadius, 2 * dotRadius);
        __ctx.restore();
    }
    __drawLastDotToDotLine (dot) {
        const { __ctx } = this;
        __ctx.save();
        __ctx.lineWidth = 1;
        __ctx.globalAlpha = 0.6;
        __ctx.strokeStyle = this.__createDotLinearGradient(dot);
        this.__drawLine(dot.lastDot, dot);
        __ctx.restore();
    }
    __drawDotDirection (dot) {
        const { __ctx } = this;
        __ctx.save();

        const { color, angle, isAntiClockwise } = dot;

        const radian = angleToRadian(angle);
        const restRadian = Math.PI / 6;
        const startRadian = radian + restRadian;
        const endRadian = radian + Math.PI;

        __ctx.strokeStyle = color;
        __ctx.lineWidth = 5;
        this.__drawCircle(dot, dotRadius, startRadian, endRadian, isAntiClockwise);

        __ctx.strokeStyle = 'white';
        __ctx.lineWidth = 1;
        this.__drawCircle(dot, dotRadius, startRadian, endRadian, isAntiClockwise);

        __ctx.restore();
    }
    /**
     * 绘制鼠标移动选择节点效果
     * @param {{Dot}} dot 
     */
    drawMouseMoveSelectDot (dot) {
        const { __ctx } = this;
        __ctx.save();
        this.drawTargetDot(dot, 0.4);
        __ctx.restore();
    }
    /**
     * 绘制鼠标移动后续节点效果
     * @param {{x: number, y: number}} position 
     * @param {{Dot}} lastDot 
     */
    drawMouseMoveFollowDot (position, lastDot) {
        const { __ctx } = this;
        __ctx.save();
        const opacity = 0.6;
        const color = getLastColor();
        const dot = { ...position, color, opacity, lastDot };
        this.__drawLastDotToDotLine(dot);
        this.__drawDotFunc(dot);
        this.drawTargetDot(dot, 0.4);
        __ctx.restore();
    }
    /**
     * 绘制鼠标移动首个节点效果
     * @param {{x: number, y: number}} position 
     */
    drawMouseMoveFirstDot (position) {
        const { __ctx } = this;
        __ctx.save();
        const opacity = 0.6;
        const color = defaultColor;
        const dot = { ...position, color, opacity };
        this.__drawDotFunc(dot);
        this.drawTargetDot(dot, 0.4);
        __ctx.restore();
    }
    /**
     * 绘制选中的路径节点效果
     * @param {Dot} dot 
     * @param {?number} opacity 
     */
    drawTargetDot (dot, opacity) {
        const { __ctx } = this;
        __ctx.save();
        __ctx.lineWidth = 5;
        __ctx.globalAlpha = opacity || 0.6;
        __ctx.strokeStyle = dot.color || defaultColor;
        this.__drawCircle(dot, dotRadius);
        __ctx.lineWidth = 1;
        __ctx.strokeStyle = 'white';
        this.__drawCircle(dot, dotRadius);
        __ctx.restore();
    }
    /**
     * 绘制路径首节点
     * @param {FirstDot} dot 
     */
    drawPathFirstDot (dot) {
        this.__drawDotFunc(dot);
    }
    /**
     * 绘制路径后续节点
     * @param {FollowDot} dot 
     */
    drawPathFollowDot (dot) {
        this.__drawLastDotToDotLine(dot);
        this.__drawDotDirection(dot);
        this.__drawDotFunc(dot);
    }
    /**
     * 绘制动画路径节点运动轨迹
     * @param {FollowDot} dot 
     * @param {{x: number, y: number}} lastPosition 
     */
    drawCartoonPath (dot, lastPosition) {
        const { __ctx } = this;
        __ctx.save();
        const { color, opacity } = dot;
        __ctx.strokeStyle = color;
        __ctx.globalAlpha = opacity;
        this.__drawLine(dot, lastPosition);
        __ctx.restore();
    }
    /**
     * 开启绘制路径
     * @param {{x: number, y: number}} dot 
     */
    startPath ({ x, y }) {
        const { __ctx } = this;
        __ctx.beginPath();
        __ctx.moveTo(x, y);
    }
    /**
     * 连接新的路径点
     * @param {{x: number, y: number}} dot 
     */
    concatDot ({ x, y }) {
        const { __ctx } = this;
        __ctx.lineTo(x, y);
        __ctx.stroke();
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
    /**
     * 清空画布
     */
    drawWhiteShadow () {
        const { __ctx } = this;
        __ctx.save();
        __ctx.fillStyle = 'white';
        __ctx.globalAlpha = 0.01;
        const maxSafeInteger = Number.MAX_SAFE_INTEGER;
        __ctx.fillRect(0, 0, maxSafeInteger, maxSafeInteger);
        __ctx.restore();
    }
    /**
     * 获取图像数据
     * @returns {ImageData}
     */
    getImageData ({ width, height }) {
        return this.__ctx.getImageData(0, 0, width, height);
    }
    /**
     * 设置图像数据
     * @param {ImageData} imageData 
     */
    putImageData (imageData) {
        this.__ctx.putImageData(imageData, 0, 0);
    }
}

/**
 * 获取导出画布节点绘制工具
 * @returns {CanvasDrawHelper}
 */
let getExportCanvasDrawHelper = createSingletonFunc(
    function () {
        return new CanvasDrawHelper(getExportCanvasElement());
    },
    func => getExportCanvasDrawHelper = func
);

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

/**
 * 清空所有画布
 */
function clearAllCanvas () {
    getExportCanvasDrawHelper().clearCanvas();
    getUpCanvasDrawHelper().clearCanvas();
    getDownCanvasDrawHelper().clearCanvas();
}

export {
    clearAllCanvas,
    dotRadius,
    defaultColor,
    CanvasDrawHelper,
    getExportCanvasDrawHelper,
    getUpCanvasDrawHelper,
    getDownCanvasDrawHelper
};
