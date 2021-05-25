// 缩放

import { debounce } from '../util/base';
import {
    getCanvasWrapperSize,
    updateCanvasSize
} from './element';
import { getDownCanvasDrawHelper } from './draw-helper';

const __onResize = function () {
    const wrapperSize = getCanvasWrapperSize();
    const drawHelper = getDownCanvasDrawHelper();
    const imageData = drawHelper.getImageData(wrapperSize);
    updateCanvasSize();
    drawHelper.putImageData(imageData);
};

function initResize () {
    const debouncedOnResize = debounce(this, __onResize);
    window.addEventListener('resize', debouncedOnResize);
}

export {
    initResize
};
