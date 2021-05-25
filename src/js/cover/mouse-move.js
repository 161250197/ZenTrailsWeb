// 鼠标移动

import { getUpCanvasDrawHelper } from '../canvas/draw-helper';
import { pathStarted } from '../path';
import {
    regularFirstDotPosition,
    regularFollowDotProperty
} from '../path/data-format';
import {
    getTargetDotByPosition,
    getTargetDot
} from '../path/target';
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
        // 增加后续节点特效提示
        const lastDot = getTargetDot();
        const followDotProperty = regularFollowDotProperty(position, lastDot);
        drawHelper.drawMouseMoveFollowDot(followDotProperty.position, lastDot);
    } else
    {
        const target = getTargetDotByPosition(position);
        if (target)
        {
            // 选择节点特效提示
            drawHelper.drawMouseMoveSelectDot(target);
        } else
        {
            // 开启路径特效提示
            const regularPosition = regularFirstDotPosition(position);
            drawHelper.drawMouseMoveFirstDot(regularPosition);
        }
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

function __addCoverMouseOutListener () {
    const coverElement = getCoverElement();
    const drawHelper = getUpCanvasDrawHelper();
    coverElement.addEventListener('mouseout', function () {
        drawHelper.clearCanvas();
    });
}

/**
 * 初始化鼠标移动
 */
function initMouseMove () {
    addCoverMouseMoveListener();
    __addCoverMouseOutListener();
}

export {
    initMouseMove,
    removeCoverMouseMoveListener,
    addCoverMouseMoveListener
};
