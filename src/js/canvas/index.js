// 画布

import { drawPath } from '../path';
import {
    getDownCanvasDrawHelper,
    getUpCanvasDrawHelper
} from './draw-helper';

function refreshCanvas () {
    return requestAnimationFrame(() => {
        getDownCanvasDrawHelper().clearCanvas();
        const drawHelper = getUpCanvasDrawHelper();
        drawHelper.clearCanvas();
        drawPath(drawHelper);
    });
}

export {
    refreshCanvas
};
