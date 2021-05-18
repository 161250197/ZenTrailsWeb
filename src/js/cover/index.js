// 遮罩管理

import { isPlayingCartoon } from '../cartoon';
import { addFirstDot, addFollowDot, closePrevPath, pathStarted } from '../path';

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
 * 遮罩初始化
 */
function coverPreventDefault () {
    const cover = getCoverElement();
    cover.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
    cover.addEventListener('mousedown', (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
}

/**
 * 遮罩初始化
 */
function addCoverHandler () {
    function getXY (e) {
        const { clientX, clientY } =
            e.touches && e.touches[0] ?
                e.touches[0] :
                e;
        return { x: clientX, y: clientY };
    }

    const cover = getCoverElement();

    cover.addEventListener('mousedown', (e) => {
        if (isPlayingCartoon())
        {
            return;
        }
        switch (e.button)
        {
            case 0:
                pathStarted() ? addFollowDot(getXY(e)) : addFirstDot(getXY(e));
                break;
            case 2:
                closePrevPath();
        }
    });
}

/**
 * 初始化遮罩管理
 */
function initCoverManager () {
    coverPreventDefault();
    addCoverHandler();
}

export {
    getCoverElement,
    initCoverManager
};
