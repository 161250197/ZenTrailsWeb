// 清空画布

import { refreshCanvas } from '.';
import { setPathArr } from '../path';
import { unsetTargetDot } from '../path/target';
import { setGuideAfterClearCanvas } from '../prompt/guide';
import {
    createSingletonFunc,
    hideElement,
    setElementEventUsed,
    showElement
} from '../util/base';

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

const {
    enableClearCanvas,
    showClearCanvasBtnElement
} = (function () {
    let dataSaveEnabled = false;
    return {
        enableClearCanvas: function () {
            dataSaveEnabled = true;
        },
        showClearCanvasBtnElement: function () {
            if (dataSaveEnabled)
            {
                showElement(__getClearElement());
            }
        }
    };
}());

/**
 * 清空画布
 */
function __clearCanvas () {
    setPathArr([]);
    unsetTargetDot();
    refreshCanvas();
    setGuideAfterClearCanvas();
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
    enableClearCanvas,
    showClearCanvasBtnElement
};
