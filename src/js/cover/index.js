// 遮罩管理

import { isPlayingCartoon } from '../cartoon';
import {
    startPath,
    addFollowDot,
    closePresentPath,
    pathStarted
} from '../path';
import { selectDot } from '../path/target';
import {
    preventDefaultStopPropagation,
    isEventUsed,
    createSingletonFunc,
    getEventPosition
} from '../util/base';
import { initDotSetting } from './dot-setting';
import { initMouseMove } from './mouse-move';

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
        const position = getEventPosition(e);
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
        const position = getEventPosition(e);
        startPath(position);
    }
}

/**
 * 初始化遮罩模块
 */
function initCover () {
    const cover = getCoverElement();
    cover.addEventListener('contextmenu', preventDefaultStopPropagation);
    cover.addEventListener('click', __onCoverClick);
    cover.addEventListener('dblclick', __onCoverDblClick);
    cover.addEventListener('auxclick', __onCoverAuxClick);

    initDotSetting();
    initMouseMove();
}

export {
    getCoverElement,
    initCover
};
