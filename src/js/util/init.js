// 初始化工具

import { initCanvasSize } from './canvas-manager';
import { initDotSetting } from './dot-setting';

/**
 * 初始化方法
 */
function init () {
    initCanvasSize();
    initDotSetting();
}

export {
    init
};
