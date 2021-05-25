// 鼠标移动

import { getUpCanvasDrawHelper } from '../canvas/draw-helper';
import { pathStarted } from '../path';
import {
    regularFirstDotPosition,
    regularFollowDotProperty
} from '../path/data-format';
import { getTargetDot } from '../path/target';
import {
    getEventPosition,
    isEventUsed,
    throttle
} from '../util/base';
import { getCoverElement } from './element';

function __onMouseMove (e) {
    const drawHelper = getUpCanvasDrawHelper();
    drawHelper.clearCanvas();
    if (isEventUsed(e))
    {
        return;
    }
    const position = getEventPosition(e);
    if (pathStarted())
    {
        const lastDot = getTargetDot();
        const followDotProperty = regularFollowDotProperty(position, lastDot);
        drawHelper.drawMouseMoveFollowDot(followDotProperty.position, lastDot);
    } else
    {
        const regularPosition = regularFirstDotPosition(position);
        drawHelper.drawMouseMoveFirstDot(regularPosition);
    }
}

const {
    addCoverMouseMoveListener,
    removeCoverMouseMoveListener
} = (function () {
    const throttledOnMouseMove = throttle(this, __onMouseMove, 20);
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
