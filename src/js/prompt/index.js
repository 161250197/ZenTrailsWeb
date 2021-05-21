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
import {
    initHelp,
    helpPromptArr,
    showHelp
} from './help';

let getPromptIconWrapperElement = createSingletonFunc(
    function () {
        return document.querySelector('#prompt .i-wrapper');
    },
    func => getPromptIconWrapperElement = func
);

let getPromptContentElement = createSingletonFunc(
    function () {
        return document.querySelector('#prompt .content');
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

/**
 * 设置提示信息 加载完成
 */
let setPromptLoadingFin = function () {
    addPrompt(helpPromptArr.loadingFin);
    addPrompt(helpPromptArr.beginNewPath);
    setPromptLoadingFin = emptyFunc;
};

/**
 * 设置提示信息 创建新路径后
 */
let setPromptAfterStartPath = function () {
    addPrompt(helpPromptArr.addFollowDot);
    setPromptAfterStartPath = emptyFunc;
};

/**
 * 设置提示信息 增加新节点后
 */
let setPromptAfterAddFollowDot = function () {
    addPrompt(helpPromptArr.closePresentPath);
    enableClosePresentPath();
    setPromptAfterAddFollowDot = emptyFunc;
};

/**
 * 设置提示信息 关闭当前路径后
 */
let setPromptAfterClosePresentPath = function () {
    addPrompt(helpPromptArr.startPlayCartoon);
    showStartBtnElement();
    setPromptAfterClosePresentPath = emptyFunc;
};

/**
 * 设置提示信息 播放动画后
 */
let setPromptAfterPlayCartoon = function () {
    addPrompt(helpPromptArr.resetCartoon);
    setPromptAfterPlayCartoon = emptyFunc;
};

/**
 * 设置提示信息 重置动画后
 */
let setPromptAfterResetPlayCartoon = function () {
    addPrompt(helpPromptArr.chooseDot);
    setPromptAfterResetPlayCartoon = emptyFunc;
};

/**
 * 设置提示信息 选择节点后
 */
let setPromptAfterChooseDot = function () {
    addPrompt(helpPromptArr.changeDotSetting);
    addPrompt(helpPromptArr.addMoreFollowDot);
    addPrompt(helpPromptArr.promptFin);
    addPrompt(helpPromptArr.helpWanted);
    addPrompt(helpPromptArr.emptyPrompt);
    enableShowDotSetting();
    setPromptAfterChooseDot = emptyFunc;
};

/**
 * 初始化提示信息
 */
function initPrompt () {
    const promptIconWrapperElement = getPromptIconWrapperElement();
    promptIconWrapperElement.addEventListener('click', preventDefaultStopPropagation);
    promptIconWrapperElement.addEventListener('click', showHelp);
    promptIconWrapperElement.addEventListener('dblclick', preventDefaultStopPropagation);
    setPromptLoadingFin();
    initHelp();
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
