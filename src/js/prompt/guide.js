// 引导信息

import { showStartBtnElement } from '../cartoon';
import { enableClosePresentPath } from '../cover';
import { enableShowDotSetting } from '../cover/dot-setting';
import { addPrompt } from '.';
import { emptyFunc } from '../util/base';

const guidePromptArr = {
    loadingFin: '游戏加载完成！',
    helpWanted: '← 需要帮忙可以点击这里查看帮助信息',
    emptyPrompt: '',
    // 需要显示的帮助信息
    beginNewPath: '通过 双击 空白区域开启新路径吧！',
    addFollowDot: '通过 单击 可以增加后续节点！',
    closePresentPath: '通过 右击 可以结束当前路径！',
    startPlayCartoon: '点击 左下角 播放按钮就可以开始播放动画啦 (<ゝω•)~☆ ',
    resetCartoon: '点击 左下角 重置按钮可以返回编辑节点！',
    chooseDot: '通过 点击 节点就可以修改节点信息！',
    changeDotSetting: '操作 右下角 面板就可以修改节点信息啦！',
    addMoreFollowDot: '通过 单击 也可以继续增加后续节点啦！',
    promptFin: '你已经学会所有的基本操作啦，开启你的 ZenTrailsWeb 之旅吧！'
};

/**
 * 设置引导信息 加载完成
 */
let setGuideLoadingFin = function () {
    addPrompt(guidePromptArr.loadingFin);
    addPrompt(guidePromptArr.beginNewPath);
    setGuideLoadingFin = emptyFunc;
};

/**
 * 设置引导信息 创建新路径后
 */
let setGuideAfterStartPath = function () {
    addPrompt(guidePromptArr.addFollowDot);
    setGuideAfterStartPath = emptyFunc;
};

/**
 * 设置引导信息 增加新节点后
 */
let setGuideAfterAddFollowDot = function () {
    addPrompt(guidePromptArr.closePresentPath);
    enableClosePresentPath();
    setGuideAfterAddFollowDot = emptyFunc;
};

/**
 * 设置引导信息 关闭当前路径后
 */
let setGuideAfterClosePresentPath = function () {
    addPrompt(guidePromptArr.startPlayCartoon);
    showStartBtnElement();
    setGuideAfterClosePresentPath = emptyFunc;
};

/**
 * 设置引导信息 播放动画后
 */
let setGuideAfterPlayCartoon = function () {
    addPrompt(guidePromptArr.resetCartoon);
    setGuideAfterPlayCartoon = emptyFunc;
};

/**
 * 设置引导信息 重置动画后
 */
let setGuideAfterResetPlayCartoon = function () {
    addPrompt(guidePromptArr.chooseDot);
    setGuideAfterResetPlayCartoon = emptyFunc;
};

/**
 * 设置引导信息 选择节点后
 */
let setGuideAfterChooseDot = function () {
    addPrompt(guidePromptArr.changeDotSetting);
    addPrompt(guidePromptArr.addMoreFollowDot);
    addPrompt(guidePromptArr.promptFin);
    addPrompt(guidePromptArr.helpWanted);
    addPrompt(guidePromptArr.emptyPrompt);
    enableShowDotSetting();
    setGuideAfterChooseDot = emptyFunc;
};

export {
    setGuideLoadingFin,
    setGuideAfterStartPath,
    setGuideAfterAddFollowDot,
    setGuideAfterClosePresentPath,
    setGuideAfterPlayCartoon,
    setGuideAfterResetPlayCartoon,
    setGuideAfterChooseDot,
    guidePromptArr
};
