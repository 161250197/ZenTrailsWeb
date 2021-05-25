// 画布

import { drawPaths } from '../path';
import { drawTargetDot } from '../path/target';
import { initClear } from './clear';
import {
    clearAllCanvas,
    getDownCanvasDrawHelper
} from './draw-helper';
import { initCanvasElement } from './element';
import { initResize } from './resize';

/**
 * 刷新画布
 */
function refreshCanvas () {
    clearAllCanvas();
    const drawHelper = getDownCanvasDrawHelper();
    drawPaths(drawHelper);
    drawTargetDot(drawHelper);
}

/**
 * 初始化画布模块
 */
function initCanvas () {
    initCanvasElement();
    initClear();
    initResize();
}

export {
    initCanvas,
    refreshCanvas
};
