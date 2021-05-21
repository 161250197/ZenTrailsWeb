// 提示信息

import { showStartBtnElement } from '../cartoon';
import { enableClosePresentPath } from '../cover';
import { enableShowDotSetting } from '../cover/dot-setting';
import {
    addElementClass,
    createSingletonFunc,
    emptyFunc,
    preventDefaultStopPropagation,
    removeElementClass
} from '../util/base';

let getPromptWrapperElement = createSingletonFunc(
    function () {
        return document.getElementById('prompt');
    },
    func => getPromptWrapperElement = func
);

let getPromptIconWrapperElement = createSingletonFunc(
    function () {
        const promptWrapperElement = getPromptWrapperElement();
        return promptWrapperElement.getElementsByClassName('i-wrapper')[0];
    },
    func => getPromptIconWrapperElement = func
);

let getPromptContentElement = createSingletonFunc(
    function () {
        const promptWrapperElement = getPromptWrapperElement();
        return promptWrapperElement.getElementsByClassName('content')[0];
    },
    func => getPromptContentElement = func
);

const __prompts = [];

const refreshPrompt = (function () {
    const promptContentElement = getPromptContentElement();
    const transparentClassName = 'transparent';
    const transitionTime = 500;
    return () => {
        if (__prompts.length === 0)
        {
            return;
        }
        addElementClass(promptContentElement, transparentClassName);
        setTimeout(() => {
            promptContentElement.innerText = __prompts[0];
            removeElementClass(promptContentElement, transparentClassName);
            setTimeout(() => {
                __prompts.shift();
                if (__prompts.length)
                {
                    setTimeout(refreshPrompt, transitionTime * 2);
                }
            }, transitionTime);
        }, transitionTime);
    };
}());

function addPrompt (prompt) {
    if (__prompts.length === 0)
    {
        setTimeout(refreshPrompt);
    }
    __prompts.push(prompt);
}

const __promptArr = {
    loadingFin: '游戏加载完成！通过 双击 空白区域开启新路径吧！',
    addFollowDot: '通过 单击 可以增加后续节点！',
    closePresentPath: '通过 右击 可以结束当前路径！',
    startPlayCartoon: '点击 左下角 播放按钮就可以开始播放动画啦 (<ゝω•)~☆ ',
    resetCartoon: '点击 左下角 重置按钮可以返回编辑节点！',
    chooseDot: '通过 点击 节点就可以修改节点信息！',
    changeDotSetting: '操作 右下角 面板就可以修改节点信息啦！',
    addMoreFollowDot: '通过 单击 也可以继续增加后续节点 啦！',
    promptFin: '你已经学会所有的基本操作啦，开启你的 ZenTrailsWeb 之旅吧！',
    helpWanted: '← 需要帮忙可以点击这里查看帮助信息',
    emptyPrompt: ''
};

/**
 * 设置提示信息 加载完成
 */
let setPromptLoadingFin = function () {
    addPrompt(__promptArr.loadingFin);
    setPromptLoadingFin = emptyFunc;
};

/**
 * 设置提示信息 创建新路径后
 */
let setPromptAfterStartPath = function () {
    addPrompt(__promptArr.addFollowDot);
    setPromptAfterStartPath = emptyFunc;
};

/**
 * 设置提示信息 增加新节点后
 */
let setPromptAfterAddFollowDot = function () {
    addPrompt(__promptArr.closePresentPath);
    enableClosePresentPath();
    setPromptAfterAddFollowDot = emptyFunc;
};

/**
 * 设置提示信息 关闭当前路径后
 */
let setPromptAfterClosePresentPath = function () {
    addPrompt(__promptArr.startPlayCartoon);
    showStartBtnElement();
    setPromptAfterClosePresentPath = emptyFunc;
};

/**
 * 设置提示信息 播放动画后
 */
let setPromptAfterPlayCartoon = function () {
    addPrompt(__promptArr.resetCartoon);
    setPromptAfterPlayCartoon = emptyFunc;
};

/**
 * 设置提示信息 重置动画后
 */
let setPromptAfterResetPlayCartoon = function () {
    addPrompt(__promptArr.chooseDot);
    setPromptAfterResetPlayCartoon = emptyFunc;
};

/**
 * 设置提示信息 选择节点后
 */
let setPromptAfterChooseDot = function () {
    addPrompt(__promptArr.changeDotSetting);
    addPrompt(__promptArr.addMoreFollowDot);
    addPrompt(__promptArr.promptFin);
    addPrompt(__promptArr.helpWanted);
    addPrompt(__promptArr.emptyPrompt);
    enableShowDotSetting();
    setPromptAfterChooseDot = emptyFunc;
};

/**
 * 初始化提示信息
 */
function initPrompt () {
    const promptIconWrapperElement = getPromptIconWrapperElement();
    promptIconWrapperElement.addEventListener('click', preventDefaultStopPropagation);
    promptIconWrapperElement.addEventListener('dblclick', preventDefaultStopPropagation);
    setPromptLoadingFin();
}

export {
    setPromptLoadingFin,
    setPromptAfterStartPath,
    setPromptAfterAddFollowDot,
    setPromptAfterClosePresentPath,
    setPromptAfterPlayCartoon,
    setPromptAfterResetPlayCartoon,
    setPromptAfterChooseDot,
    initPrompt
};
