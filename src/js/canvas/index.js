// 画布

import { drawPath } from '../path';
import {
    getDownCanvasDrawHelper,
    getUpCanvasDrawHelper
} from './draw-helper';

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

export {
    refreshCanvas
};
