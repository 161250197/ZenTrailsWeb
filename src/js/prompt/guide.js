// 引导信息

import {
    enableResetCartoon,
    showResetBtnElement,
    showStartBtnElement
} from '../cartoon';
import {
    enableChooseDot,
    enableClosePresentPath
} from '../cover';
import { enableShowDotSetting } from '../cover/dot-setting';
import { addPrompt } from '.';
import { emptyFunc } from '../util/base';
import {
    enableSaveData,
    enableUploadData,
    showDataSaveBtnElement,
    showDataUploadBtnElement
} from '../path/data-save-upload';

const __guidePromptArr = {
    loadingFin: '游戏加载完成！',
    guideFin: '欢迎回来，继续你的 ZenTrailsWeb 之旅吧！',
    beginNewPath: '通过 双击 空白区域开启新路径吧！',
    addFollowDot: '通过 单击 可以增加后续节点！',
    closePresentPath: '通过 右击 可以结束当前路径！',
    startPlayCartoon: '点击 左下角 播放按钮就可以开始播放动画啦 (<ゝω•)~☆ ',
    exportPicture: '点击 左下角 导出图片按钮可以导出轨迹图片！',
    resetCartoon: '点击 左下角 重置按钮可以返回编辑节点！',
    saveData: '点击 左下角 导出按钮可以保存路径数据，这样就可以保存和分享给朋友啦！',
    uploadData: '点击 左下角 导入按钮就可以导入保存的路径数据啦！',
    chooseDot: '通过 点击 节点就可以修改节点信息！',
    addMoreFollowDot: '通过 单击 可以继续增加后续节点！',
    changeDotSetting: '操作 右下角 面板就可以修改节点信息啦！',
    promptFin: '你已经学会所有的基本操作啦，开启你的 ZenTrailsWeb 之旅吧！',
    helpWanted: '← 需要帮忙可以点击这里查看帮助信息',
    emptyPrompt: ''
};

const {
    __setGuideFin,
    __isGuideFin
} = (function () {
    const guideFinKey = 'ZenTrailsWeb-guideFinKey';
    return {
        __setGuideFin: function () {
            localStorage.setItem(guideFinKey, true);
        },
        __isGuideFin: () => !!localStorage.getItem(guideFinKey)
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
    enableClosePresentPath();
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
    enableResetCartoon();
    showResetBtnElement();
    addPrompt(__guidePromptArr.resetCartoon);
    setGuideAfterExportPicture = emptyFunc;
};

/**
 * 设置引导信息 重置动画后
 */
let setGuideAfterResetPlayCartoon = function () {
    enableSaveData();
    showDataSaveBtnElement();
    addPrompt(__guidePromptArr.saveData);
    setGuideAfterResetPlayCartoon = emptyFunc;
};

/**
 * 设置引导信息 保存数据后
 */
let setGuideAfterSaveData = function () {
    enableUploadData();
    showDataUploadBtnElement();
    addPrompt(__guidePromptArr.uploadData);
    setGuideAfterSaveData = emptyFunc;
};

/**
 * 设置引导信息 导入数据后
 */
let setGuideAfterUploadData = function () {
    enableChooseDot();
    addPrompt(__guidePromptArr.chooseDot);
    setGuideAfterUploadData = emptyFunc;
};

/**
 * 设置引导信息 选择节点后
 */
let setGuideAfterChooseDot = function () {
    enableShowDotSetting();
    addPrompt(__guidePromptArr.addMoreFollowDot);
    addPrompt(__guidePromptArr.changeDotSetting);
    setGuideAfterChooseDot = emptyFunc;
};

/**
 * 设置引导信息 修改节点信息后
 */
let setGuideAfterChangeDotSetting = __setGuideAllFinished;

function __hidePrompt () {
    addPrompt(__guidePromptArr.emptyPrompt);
}

function __enableAllFeature () {
    showStartBtnElement();
    enableClosePresentPath();
    enableShowDotSetting();
    enableResetCartoon();
    enableChooseDot();
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
    setGuideAfterSaveData,
    setGuideAfterUploadData,
    setGuideAfterChooseDot,
    setGuideAfterChangeDotSetting
};
