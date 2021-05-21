// 提示信息

import {
    addElementClass,
    createSingletonFunc,
    preventDefaultStopPropagation,
    removeElementClass
} from '../util/base';
import {
    initGuide,
    setGuideLoadingFin
} from './guide';
import {
    initHelp,
    showHelp
} from './help';

let __getPromptIconWrapperElement = createSingletonFunc(
    function () {
        return document.querySelector('#prompt .i-wrapper');
    },
    func => __getPromptIconWrapperElement = func
);

let __getPromptContentElement = createSingletonFunc(
    function () {
        return document.querySelector('#prompt .content');
    },
    func => __getPromptContentElement = func
);

const __prompts = [];

const __refreshPrompt = (function () {
    const promptContentElement = __getPromptContentElement();
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
                    setTimeout(__refreshPrompt, transitionTime * 2);
                }
            }, transitionTime);
        }, transitionTime);
    };
}());

/**
 * 添加信息信息显示
 * @param {string} prompt 
 */
function addPrompt (prompt) {
    if (__prompts.length === 0)
    {
        setTimeout(__refreshPrompt);
    }
    __prompts.push(prompt);
}

/**
 * 启用显示帮助
 */
function enableShowHelp () {
    const promptIconWrapperElement = __getPromptIconWrapperElement();
    promptIconWrapperElement.addEventListener('click', showHelp);
}

/**
 * 初始化提示信息
 */
function initPrompt () {
    const promptIconWrapperElement = __getPromptIconWrapperElement();
    promptIconWrapperElement.addEventListener('click', preventDefaultStopPropagation);
    promptIconWrapperElement.addEventListener('dblclick', preventDefaultStopPropagation);
    setGuideLoadingFin();
    initHelp();
    initGuide();
}

export {
    enableShowHelp,
    addPrompt,
    initPrompt
};
