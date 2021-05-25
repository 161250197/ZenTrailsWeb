// 引导信息

import { addPrompt } from '.';
import { emptyFunc } from '../util/base';
import { showHelp } from './help';

const {
    __setGuideFin,
    __guideNotFin
} = (function () {
    const guideFinKey = 'ZenTrailsWeb-guideFinKey';
    return {
        __setGuideFin: function () {
            localStorage.setItem(guideFinKey, true);
        },
        __guideNotFin: () => !localStorage.getItem(guideFinKey)
    };
}());

/**
 * 设置引导信息 关闭帮助后
 */
let setGuideAfterCloseHelp = function () {
    addPrompt('← 需要帮忙可以点击这里查看帮助信息');
    __hidePrompt();
    __setGuideFin();
    setGuideAfterCloseHelp = emptyFunc;
};

function __hidePrompt () {
    addPrompt('');
}

/**
 * 初始化引导信息
 */
function initGuide () {
    if (__guideNotFin())
    {
        showHelp();
    } else
    {
        setGuideAfterCloseHelp();
    }
}

export {
    initGuide,
    setGuideAfterCloseHelp
};
