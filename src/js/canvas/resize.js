// 缩放

import { debounce } from '../util/base';
import { updateCanvasSize } from './element';

const __onResize = function () {
    updateCanvasSize();
};

function initResize () {
    const debouncedOnResize = debounce(this, __onResize);
    window.addEventListener('resize', debouncedOnResize);
}

export {
    initResize
};
