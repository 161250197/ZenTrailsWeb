// 画布

import { drawPaths } from '../path';
import {
    getDownCanvasDrawHelper,
    getUpCanvasDrawHelper
} from './draw-helper';
import { initCanvasElement } from './element';

/**
 * 刷新画布
 */
function refreshCanvas () {
    requestAnimationFrame(() => {
        getDownCanvasDrawHelper().clearCanvas();
        const drawHelper = getUpCanvasDrawHelper();
        drawHelper.clearCanvas();
        drawPaths(drawHelper);
    });
}

/**
 * 初始化画布模块
 */
function initCanvas () {
    initCanvasElement();
}

export {
    initCanvas,
    refreshCanvas
};
