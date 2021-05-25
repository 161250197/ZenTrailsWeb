// 选择目标管理

import { getPathArr } from '.';
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
}

/**
 * @param {{x: number, y: number}} position 
 */
function appendFollowDot (position) {
    const target = getTargetDot();
    const newTarget = target.appendDot(position);
    setTargetDot(newTarget);
}

/**
 * 绘制选择节点
 * @param {CanvasDrawHelper} drawHelper 
 */
function drawTargetDot (drawHelper) {
    const target = getTargetDot();
    if (target !== undefined)
    {
        drawHelper.drawTargetDot(target);
    }
}

/**
 * 选择点
 * @param {{x: number, y: number}} position  
 * @returns {?Dot}
 */
function getTargetDotByPosition (position) {
    let selectedDots = [];
    const pathArr = getPathArr();
    for (const path of pathArr)
    {
        selectedDots = selectedDots.concat(path.selectDot(position));
    }
    let selectedDot = undefined;
    if (selectedDots.length)
    {
        // TODO 多个重叠点时的优先级处理
        selectedDot = selectedDots[0];
    }
    return selectedDot;
}

/**
 * 选择点
 * @param {{x: number, y: number}} position  
 */
function selectDot (position) {
    const target = getTargetDotByPosition(position);
    if (target)
    {
        setTargetDot(target);
        refreshCanvas();
    }
}

export {
    getTargetDotByPosition,
    selectDot,
    getTargetDot,
    setTargetDot,
    removeTargetDot,
    unsetTargetDot,
    appendFollowDot,
    drawTargetDot
};
