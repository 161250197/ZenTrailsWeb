// 遮罩管理

import { isPlayingCartoon } from '../cartoon';
import {
    startPath,
    addFollowDot,
    closePresentPath,
    pathStarted,
    selectDot
} from '../path';
import {
    preventDefaultStopPropagation,
    isEventUsed,
    createSingletonFunc
} from '../util/base';
import { initDotSetting } from './dot-setting';

/**
 * 获取遮罩节点
 * @returns {HTMLElement}
 */
let getCoverElement = createSingletonFunc(
    function () {
        return document.getElementById('cover');
    },
    func => getCoverElement = func
);

function __getPosition (e) {
    const { clientX, clientY } =
        e.touches && e.touches[0] ?
            e.touches[0] :
            e;
    return { x: clientX, y: clientY };
}

let __onCoverLeftClickHandlerTimeoutId;

function __onCoverClick (e) {
    if (isEventUsed(e) || isPlayingCartoon())
    {
        return;
    }
    const isLeftBtnClick = e.button === 0;
    if (isLeftBtnClick)
    {
        clearTimeout(__onCoverLeftClickHandlerTimeoutId);
        const position = __getPosition(e);
        const CLICK_TIMEOUT = 200;
        __onCoverLeftClickHandlerTimeoutId = setTimeout(() => __onCoverLeftClickHandler(position), CLICK_TIMEOUT);
    }
}

function __onCoverLeftClickHandler (position) {
    if (pathStarted())
    {
        addFollowDot(position);
    } else
    {
        selectDot(position);
    }
}

function __onCoverAuxClick (e) {
    if (isEventUsed(e) || isPlayingCartoon())
    {
        return;
    }
    const isRightBtnClick = e.button === 2;
    if (isRightBtnClick)
    {
        closePresentPath();
    }
}

function __onCoverDblClick (e) {
    if (isEventUsed(e) || isPlayingCartoon())
    {
        return;
    }
    const isLeftBtnClick = e.button === 0;
    if (isLeftBtnClick)
    {
        clearTimeout(__onCoverLeftClickHandlerTimeoutId);
        const position = __getPosition(e);
        startPath(position);
    }
}

/**
 * 允许关闭当前路径
 */
function enableClosePresentPath () {
    getCoverElement().addEventListener('auxclick', __onCoverAuxClick);
}

/**
 * 初始化遮罩模块
 */
function initCover () {
    const cover = getCoverElement();
    cover.addEventListener('contextmenu', preventDefaultStopPropagation);
    cover.addEventListener('click', __onCoverClick);
    cover.addEventListener('dblclick', __onCoverDblClick);

    initDotSetting();
}

export {
    getCoverElement,
    enableClosePresentPath,
    initCover
};
