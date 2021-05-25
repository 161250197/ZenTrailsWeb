// 鼠标移动

import { getCoverElement } from '.';
import { throttle } from '../util/base';

function __onMouseMove () {
    // TODO
    console.log('__onMouseMove');
}

const {
    addCoverMouseMoveListener,
    removeCoverMouseMoveListener
} = (function () {
    const throttledOnMouseMove = throttle(this, __onMouseMove);
    const coverElement = getCoverElement();
    return {
        addCoverMouseMoveListener: function () {
            coverElement.addEventListener('mousemove', throttledOnMouseMove);
        },
        removeCoverMouseMoveListener: function () {
            coverElement.removeEventListener('mousemove', throttledOnMouseMove);
        }
    };
}());

/**
 * 初始化鼠标移动
 */
function initMouseMove () {
    addCoverMouseMoveListener();
}

export {
    initMouseMove,
    removeCoverMouseMoveListener,
    addCoverMouseMoveListener
};
