// 引导信息

import {
    showResetBtnElement,
    showStartBtnElement
} from '../cartoon';
import { addPrompt } from '.';
import { emptyFunc } from '../util/base';
import {
    showDataSaveBtnElement,
    showDataUploadBtnElement
} from '../path/data-save-upload';
import { showClearCanvasBtnElement } from '../canvas/clear';
import { showHelp } from './help';

const __guidePromptArr = {
    loadingFin: '游戏加载完成！',
    guideFin: '欢迎回来，继续你的 ZenTrailsWeb 之旅吧！',
    beginNewPath: '通过 双击 空白区域开启新路径吧！',
    addFollowDot: '通过 单击 可以增加后续节点！',
    closePresentPath: '通过 右击 可以结束当前路径！',
    startPlayCartoon: '点击 左下角 播放按钮就可以开始播放动画啦 (<ゝω•)~☆',
    exportPicture: '点击 左下角 导出图片按钮可以导出轨迹图片！',
    resetCartoon: '点击 左下角 重置按钮可以返回编辑节点！',
    dataSave: '点击 左下角 导出按钮可以保存路径数据，这样就可以保存和分享给朋友啦！',
    dataUpload: '点击 左下角 导入按钮就可以导入保存的路径数据啦！',
    chooseDot: '通过 点击 节点就可以修改节点信息！',
    addMoreFollowDotAndChangeDotSetting: '通过 单击 可以继续增加后续节点！操作 右下角 面板就可以修改节点信息啦！',
    clearCanvas: '点击 左下角 清空按钮就可以清空画布啦！清空前记得保存哦 (<ゝω•)~☆',
    promptFin: '你已经学会所有的基本操作啦，开启你的 ZenTrailsWeb 之旅吧！',
    helpWanted: '← 需要帮忙可以点击这里查看帮助信息',
    emptyPrompt: ''
};

const {
    __setGuideFin,
    __isGuideFin,
    __guideNotFin
} = (function () {
    const guideFinKey = 'ZenTrailsWeb-guideFinKey';
    return {
        __setGuideFin: function () {
            localStorage.setItem(guideFinKey, true);
        },
        __isGuideFin: () => !!localStorage.getItem(guideFinKey),
        __guideNotFin: () => !localStorage.getItem(guideFinKey)
    };
}());

let __setGuideAllFinished = function () {
    addPrompt(__guidePromptArr.promptFin);
    addPrompt(__guidePromptArr.helpWanted);
    __hidePrompt();
    __setGuideFin();
    __setGuideAllFinished = emptyFunc;
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
    setGuideAfterAddFollowDot = emptyFunc;
};

/**
 * 设置引导信息 关闭当前路径后
 */
let setGuideAfterClosePresentPath = function () {
    showStartBtnElement();
    addPrompt(__guidePromptArr.startPlayCartoon);
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
    showResetBtnElement();
    addPrompt(__guidePromptArr.resetCartoon);
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
    addPrompt(__guidePromptArr.addMoreFollowDotAndChangeDotSetting);
    setGuideAfterChooseDot = emptyFunc;
};

/**
 * 设置引导信息 修改节点信息后
 */
let setGuideAfterChangeDotSetting = function () {
    showDataSaveBtnElement();
    addPrompt(__guidePromptArr.dataSave);
    setGuideAfterChangeDotSetting = emptyFunc;
};

/**
 * 设置引导信息 保存数据后
 */
let setGuideAfterDataSave = function () {
    showDataUploadBtnElement();
    addPrompt(__guidePromptArr.dataUpload);
    setGuideAfterDataSave = emptyFunc;
};

/**
 * 设置引导信息 导入数据后
 */
let setGuideAfterDataUpload = function () {
    showClearCanvasBtnElement();
    addPrompt(__guidePromptArr.clearCanvas);
    setGuideAfterDataUpload = emptyFunc;
};

/**
 * 设置引导信息 清空画布后
 */
let setGuideAfterClearCanvas = function () {
    __setGuideAllFinished();
    setGuideAfterClearCanvas = emptyFunc;
};

function __hidePrompt () {
    addPrompt(__guidePromptArr.emptyPrompt);
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
        addPrompt(__guidePromptArr.helpWanted);
        __hidePrompt();
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
    setGuideAfterDataSave,
    setGuideAfterDataUpload,
    setGuideAfterChooseDot,
    setGuideAfterChangeDotSetting,
    setGuideAfterClearCanvas
};
