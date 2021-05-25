// 遮罩管理

import { isPlayingCartoon } from '../cartoon';
import {
    startPath,
    addFollowDot,
    closePresentPath,
    pathStarted
} from '../path';
import {
    getTargetDotByPosition,
    setTargetDot
} from '../path/target';
import {
    preventDefaultStopPropagation,
    isEventUsed,
    getEventPosition
} from '../util/base';
import { initDotSetting } from './dot-setting';
import { getCoverElement } from './element';
import { initMouseMove } from './mouse-move';

const {
    __setupClickHandler,
    __execDblClickHandler
} = (function () {
    let position;
    let target;
    let timeoutId;

    function execClickHandler () {
        if (pathStarted())
        {
            addFollowDot(position);
        } else if (target)
        {
            setTargetDot(target);
        }
    }

    return {
        __setupClickHandler: function (e) {
            clearTimeout(timeoutId);
            position = getEventPosition(e);
            target = getTargetDotByPosition(position);
            const CLICK_TIMEOUT = 200;
            timeoutId = setTimeout(execClickHandler, CLICK_TIMEOUT);
        },
        __execDblClickHandler: function () {
            clearTimeout(timeoutId);
            if (target)
            {
                setTargetDot(target);
            } else
            {
                startPath(position);
            }
        }
    };
}());

function __onCoverClick (e) {
    if (isEventUsed(e) || isPlayingCartoon())
    {
        return;
    }
    const isLeftBtnClick = e.button === 0;
    if (isLeftBtnClick)
    {
        __setupClickHandler(e);
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
        __execDblClickHandler();
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
    initCover
};
