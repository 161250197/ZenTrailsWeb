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

const __promptArr = {
    loadingFin: '游戏加载完成！通过 双击 空白区域开启新路径吧！',
    changeDotSetting: '操作 右下角 面板就可以修改节点信息啦！',
    addFollowDot: '通过 单击 可以增加后续节点！',
    closePresentPath: '通过 右击 可以结束当前路径！',
    startPlayCartoon: '点击 左下角 播放按钮就可以开始播放动画啦 (<ゝω•)~☆ ',
    resetCartoon: '点击 左下角 重置按钮可以返回编辑路径！',
    chooseDot: '通过 点击 节点可以修改节点信息！',
    afterChooseDot: '选择节点后可以重新 修改节点信息 和 增加后续节点 啦！',
    promptFin: '你已经学会所有的基本操作啦，开启你的 ZenTrailsWeb 之旅吧！'
};

const __promptUpdateTime = 2000;

/**
 * 设置提示信息 加载完成
 */
let setPromptLoadingFin = function () {
    setPrompt(__promptArr.loadingFin);
    setPromptLoadingFin = emptyFunc;
};

/**
 * 设置提示信息 创建新路径后
 */
let setPromptAfterStartPath = function () {
    setPrompt(__promptArr.changeDotSetting);
    setTimeout(() => {
        setPrompt(__promptArr.addFollowDot);
    }, __promptUpdateTime);
    setPromptAfterStartPath = emptyFunc;
};

/**
 * 设置提示信息 增加新节点后
 */
let setPromptAfterAddFollowDot = function () {
    setPrompt(__promptArr.closePresentPath);
    setPromptAfterAddFollowDot = emptyFunc;
};

/**
 * 设置提示信息 关闭当前路径后
 */
let setPromptAfterClosePresentPath = function () {
    setPrompt(__promptArr.startPlayCartoon);
    setPromptAfterClosePresentPath = emptyFunc;
};

/**
 * 设置提示信息 播放动画后
 */
let setPromptAfterPlayCartoon = function () {
    setPrompt(__promptArr.resetCartoon);
    setPromptAfterPlayCartoon = emptyFunc;
};

/**
 * 设置提示信息 重置动画后
 */
let setPromptAfterResetPlayCartoon = function () {
    setPrompt(__promptArr.chooseDot);
    setPromptAfterResetPlayCartoon = emptyFunc;
};

/**
 * 设置提示信息 选择节点后
 */
let setPromptAfterChooseDot = function () {
    setPrompt(__promptArr.afterChooseDot);
    setTimeout(() => {
        setPrompt(__promptArr.promptFin);
    }, __promptUpdateTime);
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
    setPrompt,
    setPromptLoadingFin,
    setPromptAfterStartPath,
    setPromptAfterAddFollowDot,
    setPromptAfterClosePresentPath,
    setPromptAfterPlayCartoon,
    setPromptAfterResetPlayCartoon,
    setPromptAfterChooseDot,
    initPrompt
};
