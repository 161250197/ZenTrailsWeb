// 画布

import { drawPath } from '../path';
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
        drawPath(drawHelper);
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
