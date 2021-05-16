// 遮罩管理

import { getDownCanvasElement, getUpCanvasElement } from './canvas-manager';
import { isPlayingCartoon, startCartoon, stopCartoon } from './cartoon-manager';
import { addDot, closePrevPath } from './path-manager';

/**
 * 获取遮罩节点
 * @returns {HTMLElement}
 */
let getCoverElement = function () {
    const cover = document.getElementById('cover');
    getCoverElement = function () {
        return cover;
    };
    return cover;
};

/**
 * 初始化遮罩管理
 */
function initCoverManager () {
    const cover = getCoverElement();
    cover.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        e.stopPropagation();
    });

    function getXY (e) {
        const { clientX, clientY } =
            e.touches && e.touches[0] ?
                e.touches[0] :
                e;
        return { x: clientX, y: clientY };
    }

    const upCanvas = getUpCanvasElement();
    const downCanvas = getDownCanvasElement();

    cover.addEventListener('mousedown', (e) => {
        e.preventDefault();
        switch (e.button)
        {
            case 0:
                addDot(getXY(e), downCanvas, upCanvas);
                break;
            case 1:
                isPlayingCartoon() ? stopCartoon() : startCartoon();
                break;
            case 2:
                closePrevPath();
        }
    });
}

export {
    getCoverElement,
    initCoverManager
};
