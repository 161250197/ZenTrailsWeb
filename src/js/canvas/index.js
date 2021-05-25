// 画布

import { drawPaths } from '../path';
import { drawTargetDot } from '../path/target';
import { initClear } from './clear';
import {
    getDownCanvasDrawHelper,
    getUpCanvasDrawHelper
} from './draw-helper';
import { initCanvasElement } from './element';

/**
 * 刷新画布
 */
function refreshCanvas () {
    const upCanvasDrawHelper = getUpCanvasDrawHelper();
    upCanvasDrawHelper.clearCanvas();
    const downCanvasDrawHelper = getDownCanvasDrawHelper();
    drawPaths(downCanvasDrawHelper);
    drawTargetDot(downCanvasDrawHelper);
}

/**
 * 初始化画布模块
 */
function initCanvas () {
    initCanvasElement();
    initClear();
}

export {
    initCanvas,
    refreshCanvas
};
