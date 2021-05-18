// 画布

import { getPathArr } from '../path';
import {
    getDownCanvasDrawHelper,
    getUpCanvasDrawHelper
} from './draw-helper';

function refreshCanvas () {
    getDownCanvasDrawHelper().clearCanvas();
    getUpCanvasDrawHelper().clearCanvas();
    const pathArr = getPathArr();
    pathArr.forEach(path => drawPath(path));
}

function drawPath (path) {
    const downCanvasDrawHelper = getDownCanvasDrawHelper();
    const upCanvasDrawHelper = getUpCanvasDrawHelper();
    upCanvasDrawHelper.resetColor();
    upCanvasDrawHelper.drawCircle(path.firstDot);
    let dots = [path.firstDot];
    while (dots.length)
    {
        let newDots = [];
        for (const dot of dots)
        {
            newDots = newDots.concat(dot.followDots);
        }
        dots = newDots;
        for (const dot of dots)
        {
            const { color, isAntiClockwise, lastDot } = dot;
            upCanvasDrawHelper.setColor(color);
            upCanvasDrawHelper.drawCircle(dot);
            downCanvasDrawHelper.drawLine(lastDot, dot);
            if (isAntiClockwise)
            {
                upCanvasDrawHelper.drawCircle(dot, 5);
            }
        }
    }
}

export {
    refreshCanvas
};
