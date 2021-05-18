// 遮罩管理

import { isPlayingCartoon } from '../cartoon';
import { addFirstDot, addFollowDot, closePresentPath, pathStarted, selectDot } from '../path';
import { preventDefaultStopPropagation, isEventUsed } from '../util/base';

/**
 * 获取遮罩节点
 * @returns {HTMLElement}
 */
let getCoverElement = function () {
    const __cover = document.getElementById('cover');
    getCoverElement = function () {
        return __cover;
    };
    return __cover;
};

/**
 * 获取点击或触摸事件的位置
 * @param {MouseEvent|TouchEvent} e 
 * @returns {x: Number, y: Number}
 */
function getPosition (e) {
    const { clientX, clientY } =
        e.touches && e.touches[0] ?
            e.touches[0] :
            e;
    return { x: clientX, y: clientY };
}

let __onCoverLeftClickHandlerTimeoutId;

/**
 * 遮罩左键点击响应
 * @param {MouseEvent} e 
 */
function onCoverClick (e) {
    if (isPlayingCartoon() || isEventUsed(e))
    {
        return;
    }
    const isLeftBtnClick = e.button === 0;
    if (isLeftBtnClick)
    {
        clearTimeout(__onCoverLeftClickHandlerTimeoutId);
        const position = getPosition(e);
        const CLICK_TIMEOUT = 200;
        __onCoverLeftClickHandlerTimeoutId = setTimeout(() => onCoverLeftClickHandler(position), CLICK_TIMEOUT);
    }
}

/**
 * 遮罩左键点击响应
 * @param {{x: Number, y: Number}} position 
 */
function onCoverLeftClickHandler (position) {
    if (pathStarted())
    {
        addFollowDot(position);
    } else
    {
        selectDot(position);
    }
}

/**
 * 遮罩辅助点击响应
 * @param {MouseEvent} e 
 */
function onCoverAuxClick (e) {
    if (isPlayingCartoon() || isEventUsed(e))
    {
        return;
    }
    const isRightBtnClick = e.button === 2;
    if (isRightBtnClick)
    {
        closePresentPath();
    }
}

/**
 * 遮罩双击响应
 * @param {MouseEvent} e 
 */
function onCoverDblClick (e) {
    if (isPlayingCartoon() || isEventUsed(e))
    {
        return;
    }
    const isLeftBtnClick = e.button === 0;
    if (isLeftBtnClick)
    {
        clearTimeout(__onCoverLeftClickHandlerTimeoutId);
        const position = getPosition(e);
        addFirstDot(position);
    }
}

/**
 * 初始化遮罩管理
 */
function initCoverManager () {
    const cover = getCoverElement();
    cover.addEventListener('contextmenu', preventDefaultStopPropagation);
    cover.addEventListener('click', onCoverClick);
    cover.addEventListener('auxclick', onCoverAuxClick);
    cover.addEventListener('dblclick', onCoverDblClick);
}

export {
    getCoverElement,
    initCoverManager
};
