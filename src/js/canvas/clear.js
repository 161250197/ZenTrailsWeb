// 清空画布

import { setPathArr } from '../path';
import { unsetTargetDot } from '../path/target';
import {
    createSingletonFunc,
    hideElement,
    setElementEventUsed,
    showElement
} from '../util/base';
import { clearAllCanvas } from './draw-helper';

let __getClearElement = createSingletonFunc(
    function () {
        return document.getElementById('clear-btn');
    },
    func => __getClearElement = func
);

/**
 * 隐藏清空画布节点
 */
function hideClearCanvasBtnElement () {
    hideElement(__getClearElement());
}

/**
 * 显示清空画布节点
 */
function showClearCanvasBtnElement () {
    showElement(__getClearElement());
}

/**
 * 清空画布
 */
function __clearCanvas () {
    setPathArr([]);
    unsetTargetDot();
    clearAllCanvas();
}

/**
 * 初始化清空画布模块
 */
function initClear () {
    const clearElement = __getClearElement();
    setElementEventUsed(clearElement);
    clearElement.addEventListener('click', __clearCanvas);
}

export {
    initClear,
    hideClearCanvasBtnElement,
    showClearCanvasBtnElement
};
