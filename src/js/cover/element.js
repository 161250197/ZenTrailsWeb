// 遮罩节点

import { createSingletonFunc } from '../util/base';

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

export {
    getCoverElement
};
