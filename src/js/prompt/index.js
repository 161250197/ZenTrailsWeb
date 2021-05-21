// 提示信息

import {
    addElementClass,
    createSingletonFunc,
    preventDefaultStopPropagation,
    removeElementClass
} from '../util/base';

let getPromptWrapperElement = createSingletonFunc(
    function () {
        return document.getElementById('prompt');
    },
    func => getPromptWrapperElement = func
);

let getPromptContentElement = createSingletonFunc(
    function () {
        const promptWrapperElement = getPromptWrapperElement();
        return promptWrapperElement.getElementsByClassName('content')[0];
    },
    func => getPromptContentElement = func
);

const setPrompt = (function () {
    const promptContentElement = getPromptContentElement();
    const transparentClassName = 'transparent';
    const transitionTime = 500;
    let __timeoutId = undefined;
    return (prompt) => {
        if (__timeoutId === undefined)
        {
            addElementClass(promptContentElement, transparentClassName);
        } else
        {
            clearTimeout(__timeoutId);
        }
        __timeoutId = setTimeout(() => {
            promptContentElement.innerText = prompt;
            removeElementClass(promptContentElement, transparentClassName);
            __timeoutId = undefined;
        }, transitionTime);
    };
}());

function emptyFunc () { }

const __promptArr = [
    '游戏加载完成！通过 双击 空白区域开启新路径吧！',
    '通过 单击 可以增加后续节点！',
    '通过 右击 可以结束当前路径！',
    '点击 左下角 播放按钮就可以开始播放动画啦 (<ゝω•)~☆ '
];

/**
 * 设置提示信息 加载完成
 */
let setPromptLoadingFin = function () {
    setPrompt(__promptArr[0]);
    setPromptLoadingFin = emptyFunc;
};

/**
 * 设置提示信息 创建新路径后
 */
let setPromptAfterStartPath = function () {
    setPrompt(__promptArr[1]);
    setPromptAfterStartPath = emptyFunc;
};

/**
 * 设置提示信息 增加新节点后
 */
let setPromptAfterAddFollowDot = function () {
    setPrompt(__promptArr[2]);
    setPromptAfterAddFollowDot = emptyFunc;
};

/**
 * 设置提示信息 关闭当前路径后
 */
let setPromptAfterClosePresentPath = function () {
    setPrompt(__promptArr[3]);
    setPromptAfterClosePresentPath = emptyFunc;
};

/**
 * 初始化提示信息
 */
function initPrompt () {
    const promptWrapperElement = getPromptWrapperElement();
    promptWrapperElement.addEventListener('click', preventDefaultStopPropagation);
    setPromptLoadingFin();
}

export {
    setPrompt,
    setPromptLoadingFin,
    setPromptAfterStartPath,
    setPromptAfterAddFollowDot,
    setPromptAfterClosePresentPath,
    initPrompt
};
