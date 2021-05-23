// 选择目标管理

import { refreshCanvas } from '../canvas';
// eslint-disable-next-line no-unused-vars
import { CanvasDrawHelper } from '../canvas/draw-helper';
import {
    hideDotSetting,
    showFirstDotSetting,
    showFollowDotSetting
} from '../cover/dot-setting';
import {
    // eslint-disable-next-line no-unused-vars
    Dot,
    FirstDot
} from './data-structure';

/** @type {Dot} */
let __target;

/**
 * 获取选择的目标点
 * @returns {Dot}
 */
function getTargetDot () {
    return __target;
}

/**
 * 设置选择节点
 * @param {Dot} target 
 */
function setTargetDot (target) {
    if (__target !== undefined)
    {
        __target.isTarget = false;
    }

    __target = target;
    if (__target instanceof FirstDot)
    {
        showFirstDotSetting();
    } else
    {
        showFollowDotSetting(__target);
    }
    __target.isTarget = true;
    refreshCanvas();
}

/**
 * 移除目标点
 */
function removeTargetDot () {
    if (__target === undefined)
    {
        return;
    }
    const lastDot = __target.removeDot();
    if (lastDot === undefined)
    {
        unsetTargetDot();
    } else
    {
        setTargetDot(lastDot);
    }
}

/**
 * 取消选择目标节点
 */
function unsetTargetDot () {
    if (__target === undefined)
    {
        return;
    }
    __target.isTarget = false;
    hideDotSetting();
    __target = undefined;
    refreshCanvas();
}

/**
 * @param {{x: number, y: number}} location 
 */
function appendFollowDot (location) {
    const target = getTargetDot();
    const newTarget = target.appendDot(location);
    setTargetDot(newTarget);
}

/**
 * 绘制选择节点
 * @param {CanvasDrawHelper} drawHelper 
 */
function drawTargetDot (drawHelper) {
    drawHelper.clearCanvas();
    const target = getTargetDot();
    if (target !== undefined)
    {
        drawHelper.drawTargetDot(target);
    }
}

export {
    getTargetDot,
    setTargetDot,
    removeTargetDot,
    unsetTargetDot,
    appendFollowDot,
    drawTargetDot
};
