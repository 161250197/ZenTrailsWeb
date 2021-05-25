// 路径管理

// eslint-disable-next-line no-unused-vars
import { CanvasDrawHelper } from '../canvas/draw-helper';
import { refreshCanvas } from '../canvas';
import { Path } from './data-structure';
import {
    setGuideAfterAddFollowDot,
    setGuideAfterClosePresentPath,
    setGuideAfterStartPath
} from '../prompt/guide';
import { initDataSaveUpload } from './data-save-upload';
import {
    appendFollowDot,
    getTargetDot,
    setTargetDot,
    unsetTargetDot
} from './target';

/** @type {Array<Path>} */
let __pathArr = [];

/**
 * 开启新路径
 * @param {{x: number, y: number}} position 
 */
function startPath (position) {
    const path = new Path(position);
    __pathArr.push(path);
    setTargetDot(path.firstDot);
    refreshCanvas();

    setGuideAfterStartPath();
}

/**
 * 获取路径集合
 * @returns {Array<Path>}
 */
function getPathArr () {
    return __pathArr;
}

/**
 * 设置路径集合
 * @returns {Array<Path>}
 */
function setPathArr (pathArr) {
    __pathArr = pathArr;
}

/**
 * 关闭当前路径
 */
function closePresentPath () {
    unsetTargetDot();

    setGuideAfterClosePresentPath();
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
 * 动画播放时更新路径
 * @param {CanvasDrawHelper} drawHelperPath 
 * @param {CanvasDrawHelper} drawHelperDots 
 */
function updateCartoonPath (drawHelperPath, drawHelperDots) {
    __pathArr.forEach(path => {
        path.updateCartoonPath();
        path.drawCartoonPath(drawHelperPath);
    });
    drawHelperDots.clearCanvas();
    drawPaths(drawHelperDots);
}

/**
 * 绘制路径
 * @param {CanvasDrawHelper} drawHelper 
 */
function drawPaths (drawHelper) {
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

/**
 * 初始化路径模块
 */
function initPath () {
    initDataSaveUpload();
}

/**
 * 获取路径是否已经开启
 * @returns {boolean}
 */
function pathStarted () {
    const targetDot = getTargetDot();
    return targetDot !== undefined;
}

/**
 * 添加后续节点
 * @param {{x: number, y: number}} position 
 */
function addFollowDot (position) {
    appendFollowDot(position);
    refreshCanvas();

    setGuideAfterAddFollowDot();
}

export {
    initPath,
    startPath,
    addFollowDot,
    getPathArr,
    setPathArr,
    closePresentPath,
    pathStarted,
    resetPaths,
    updateCartoonPath,
    drawPaths,
    removePath
};
