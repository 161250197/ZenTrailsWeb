// 路径管理

// eslint-disable-next-line no-unused-vars
import { CanvasDrawHelper } from '../canvas/draw-helper';
import { refreshCanvas } from '../canvas';
import {
    hideDotSetting,
    showFirstDotSetting,
    showFollowDotSetting
} from '../cover/dot-setting';
import {
    // eslint-disable-next-line no-unused-vars
    Dot,
    FirstDot,
    Path
} from './data';

/** @type {Array<Path>} */
let __pathArr = [];
/** @type {Dot} */
let __target;

/**
 * 开启新路径
 * @param {{x: number, y: number}} location 
 */
function startPath (location) {
    // TODO 绘制效果优化
    const path = new Path(location);
    __pathArr.push(path);
    setTargetDot(path.firstDot);
    refreshCanvas();
}

/**
 * @param {{x: number, y: number}} location 
 */
function addFollowDot (location) {
    // TODO 绘制效果优化
    setTargetDot(__target.appendDot(location));
    refreshCanvas();
}

/**
 * @returns {Array<FirstDot|FollowDot>}
 */
function getPathArr () {
    return __pathArr;
}

/**
 * 关闭当前路径
 */
function closePresentPath () {
    setTargetDot(undefined);
}

/**
 * 获取路径是否已经开启
 * @returns {Boolean}
 */
function pathStarted () {
    return __target !== undefined;
}

/**
 * 选择点
 * @param {{x: number, y: number}} position  
 */
function selectDot (position) {
    let selectedDots = [];
    for (const path of __pathArr)
    {
        selectedDots = selectedDots.concat(path.selectDot(position));
    }
    if (selectedDots.length)
    {
        // TODO 多个重叠点时的优先级处理
        setTargetDot(selectedDots[0]);
        refreshCanvas();
    }
}

/**
 * 获取选择的目标点
 * @returns {Dot}
 */
function getTargetDot () {
    return __target;
}

/**
 * 设置选择的目标点
 * @param {?Dot} target 
 */
function setTargetDot (target) {
    if (__target !== undefined)
    {
        __target.isTarget = false;
    }

    __target = target;
    if (__target === undefined)
    {
        hideDotSetting();
    } else
    {
        if (__target instanceof FirstDot)
        {
            showFirstDotSetting();
        } else
        {
            showFollowDotSetting(__target);
        }
        __target.isTarget = true;
    }
    refreshCanvas();
}

/**
 * 重置路径
 */
function resetPaths () {
    __pathArr.forEach(path => {
        path.reset();
    });
}

/**
 * 移除目标点
 */
function removeTargetDot () {
    if (__target === undefined)
    {
        return;
    }
    setTargetDot(__target.removeDot());
}

/**
 * 动画播放时更新路径
 * @param {CanvasDrawHelper} drawHelperPath 
 * @param {CanvasDrawHelper} drawHelperDots 
 * @param {number} duration 
 */
function updateCartoonPath (drawHelperPath, drawHelperDots, duration) {
    __pathArr.forEach(path => {
        path.updateCartoonPath(duration);
        path.drawCartoonPath(drawHelperPath);
    });
    drawPath(drawHelperDots);
}

/**
 * 绘制路径
 * @param {CanvasDrawHelper} drawHelper 
 */
function drawPath (drawHelper) {
    drawHelper.clearCanvas();
    __pathArr.forEach(path => {
        path.drawPathDots(drawHelper);
    });
}

/**
 * 删除路径
 * @param {Path} path 
 */
function removePath (path) {
    const index = __pathArr.indexOf(path);
    __pathArr.splice(index, 1);
}

export {
    startPath,
    addFollowDot,
    getPathArr,
    closePresentPath,
    pathStarted,
    selectDot,
    getTargetDot,
    resetPaths,
    removeTargetDot,
    updateCartoonPath,
    drawPath,
    removePath
};
