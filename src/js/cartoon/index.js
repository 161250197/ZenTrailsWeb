// 动画管理

import {
    closePresentPath,
    resetPaths,
    updateCartoonPath
} from '../path';
import {
    clearAllCanvas,
    getDownCanvasDrawHelper,
    getUpCanvasDrawHelper
} from '../canvas/draw-helper';
import {
    createSingletonFunc,
    hideElement,
    setElementEventUsed,
    showElement
} from '../util/base';
import { refreshCanvas } from '../canvas';
import {
    hideExportPictureElement,
    initExportPicture,
    showExportPictureElement
} from './export-picture';
import {
    hideDataSaveBtnElement,
    hideDataUploadBtnElement,
    showDataSaveBtnElement,
    showDataUploadBtnElement
} from '../path/data-save-upload';
import {
    hideClearCanvasBtnElement,
    showClearCanvasBtnElement
} from '../canvas/clear';
import {
    removeCoverMouseMoveListener,
    addCoverMouseMoveListener
} from '../cover/mouse-move';

let __updateCartoonHandle;
let __updateCartoonPathFunc;

function __setUpdateCartoonHandle () {
    __updateCartoonHandle = requestAnimationFrame(__updateCartoon);
}

function __updateCartoon () {
    __updateCartoonPathFunc();
    __setUpdateCartoonHandle();
}

let __getStartBtnElement = createSingletonFunc(
    function () {
        return document.getElementById('start-btn');
    },
    func => __getStartBtnElement = func
);

let __getResetBtnElement = createSingletonFunc(
    function () {
        return document.getElementById('reset-btn');
    },
    func => __getResetBtnElement = func
);

function __showResetBtnElement () {
    showElement(__getResetBtnElement());
}

function __startCartoon () {
    hideDataSaveBtnElement();
    hideDataUploadBtnElement();
    hideElement(__getStartBtnElement());
    hideClearCanvasBtnElement();
    removeCoverMouseMoveListener();

    closePresentPath();
    setIsPlayingCartoon(true);
    __setUpdateCartoonHandle();
    clearAllCanvas();
    const drawHelperPath = getDownCanvasDrawHelper();
    const drawHelperDots = getUpCanvasDrawHelper();
    __updateCartoonPathFunc = updateCartoonPath.bind(this, drawHelperPath, drawHelperDots);

    showExportPictureElement();
    __showResetBtnElement();
}

function __resetCartoon () {
    hideExportPictureElement();
    hideElement(__getResetBtnElement());
    addCoverMouseMoveListener();

    setIsPlayingCartoon(false);
    cancelAnimationFrame(__updateCartoonHandle);
    resetPaths();
    refreshCanvas();

    showDataSaveBtnElement();
    showDataUploadBtnElement();
    showElement(__getStartBtnElement());
    showClearCanvasBtnElement();
}

const {
    isPlayingCartoon,
    setIsPlayingCartoon
} = (function () {
    let isPlayingCartoon = false;
    return {
        isPlayingCartoon: function () {
            return isPlayingCartoon;
        },
        setIsPlayingCartoon: function (flag) {
            isPlayingCartoon = flag;
        }
    };
}());

/**
 * 初始化动画模块
 */
function initCartoon () {
    const startBtnElement = __getStartBtnElement();
    setElementEventUsed(startBtnElement);
    startBtnElement.addEventListener('click', __startCartoon);

    const resetBtnElement = __getResetBtnElement();
    setElementEventUsed(resetBtnElement);
    resetBtnElement.addEventListener('click', __resetCartoon);

    initExportPicture();
}

export {
    initCartoon,
    isPlayingCartoon
};
