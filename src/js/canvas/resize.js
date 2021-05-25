// 缩放

import { debounce } from '../util/base';
import { updateCanvasSize } from './element';
import { refreshCanvas } from '.';

const __onResize = function () {
    updateCanvasSize();
    refreshCanvas();
};

function initResize () {
    const debouncedOnResize = debounce(this, __onResize);
    window.addEventListener('resize', debouncedOnResize);
}

export {
    initResize
};
