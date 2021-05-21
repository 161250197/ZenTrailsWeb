// 引导信息

import {
    enableResetCartoon,
    showResetBtnElement,
    showStartBtnElement
} from '../cartoon';
import { enableClosePresentPath } from '../cover';
import { enableShowDotSetting } from '../cover/dot-setting';
import { addPrompt } from '.';
import { emptyFunc } from '../util/base';

const __guidePromptArr = {
    loadingFin: '游戏加载完成！',
    guideFin: '欢迎回来，继续你的 ZenTrailsWeb 之旅吧！',
    beginNewPath: '通过 双击 空白区域开启新路径吧！',
    addFollowDot: '通过 单击 可以增加后续节点！',
    closePresentPath: '通过 右击 可以结束当前路径！',
    startPlayCartoon: '点击 左下角 播放按钮就可以开始播放动画啦 (<ゝω•)~☆ ',
    resetCartoon: '点击 左下角 重置按钮可以返回编辑节点！',
    exportPicture: '点击 左下角 导出图片按钮可以导出轨迹图片！',
    chooseDot: '通过 点击 节点就可以修改节点信息！',
    changeDotSetting: '操作 右下角 面板就可以修改节点信息啦！',
    addMoreFollowDot: '通过 单击 也可以继续增加后续节点啦！',
    promptFin: '你已经学会所有的基本操作啦，开启你的 ZenTrailsWeb 之旅吧！',
    helpWanted: '← 需要帮忙可以点击这里查看帮助信息',
    emptyPrompt: ''
};

/**
 * 设置引导信息 加载完成
 */
let setGuideLoadingFin = function () {
    addPrompt(__guidePromptArr.loadingFin);
    if (__isGuideFin())
    {
        addPrompt(__guidePromptArr.guideFin);
        addPrompt(__guidePromptArr.helpWanted);
    } else
    {
        addPrompt(__guidePromptArr.beginNewPath);
    }
    setGuideLoadingFin = emptyFunc;
};

/**
 * 设置引导信息 创建新路径后
 */
let setGuideAfterStartPath = function () {
    addPrompt(__guidePromptArr.addFollowDot);
    setGuideAfterStartPath = emptyFunc;
};

/**
 * 设置引导信息 增加新节点后
 */
let setGuideAfterAddFollowDot = function () {
    addPrompt(__guidePromptArr.closePresentPath);
    enableClosePresentPath();
    setGuideAfterAddFollowDot = emptyFunc;
};

/**
 * 设置引导信息 关闭当前路径后
 */
let setGuideAfterClosePresentPath = function () {
    addPrompt(__guidePromptArr.startPlayCartoon);
    showStartBtnElement();
    setGuideAfterClosePresentPath = emptyFunc;
};

/**
 * 设置引导信息 播放动画后
 */
let setGuideAfterPlayCartoon = function () {
    addPrompt(__guidePromptArr.exportPicture);
    setGuideAfterPlayCartoon = emptyFunc;
};

/**
 * 设置引导信息 导出图片后
 */
let setGuideAfterExportPicture = function () {
    addPrompt(__guidePromptArr.resetCartoon);
    enableResetCartoon();
    showResetBtnElement();
    setGuideAfterExportPicture = emptyFunc;
};

/**
 * 设置引导信息 重置动画后
 */
let setGuideAfterResetPlayCartoon = function () {
    addPrompt(__guidePromptArr.chooseDot);
    setGuideAfterResetPlayCartoon = emptyFunc;
};

/**
 * 设置引导信息 选择节点后
 */
let setGuideAfterChooseDot = function () {
    addPrompt(__guidePromptArr.changeDotSetting);
    enableShowDotSetting();
    addPrompt(__guidePromptArr.addMoreFollowDot);
    addPrompt(__guidePromptArr.promptFin);
    addPrompt(__guidePromptArr.helpWanted);
    __hidePrompt();
    __setGuideFin();
    setGuideAfterChooseDot = emptyFunc;
};

function __hidePrompt () {
    addPrompt(__guidePromptArr.emptyPrompt);
}

const { __setGuideFin, __isGuideFin } = (function () {
    const guideFinKey = 'ZenTrailsWeb-guideFinKey';
    return {
        __setGuideFin: function () {
            localStorage.setItem(guideFinKey, true);
        },
        __isGuideFin: () => !!localStorage.getItem(guideFinKey)
    };
}());

function __enableAllFeature () {
    showStartBtnElement();
    enableClosePresentPath();
    enableShowDotSetting();
    enableResetCartoon();
}

function __disableAllGuide () {
    setGuideLoadingFin = emptyFunc;
    setGuideAfterStartPath = emptyFunc;
    setGuideAfterAddFollowDot = emptyFunc;
    setGuideAfterClosePresentPath = emptyFunc;
    setGuideAfterPlayCartoon = emptyFunc;
    setGuideAfterExportPicture = emptyFunc;
    setGuideAfterResetPlayCartoon = emptyFunc;
    setGuideAfterChooseDot = emptyFunc;
}

/**
 * 初始化引导信息
 */
function initGuide () {
    if (__isGuideFin())
    {
        __hidePrompt();
        __enableAllFeature();
        __disableAllGuide();
    }
}

export {
    initGuide,
    setGuideLoadingFin,
    setGuideAfterStartPath,
    setGuideAfterAddFollowDot,
    setGuideAfterClosePresentPath,
    setGuideAfterPlayCartoon,
    setGuideAfterExportPicture,
    setGuideAfterResetPlayCartoon,
    setGuideAfterChooseDot
};
