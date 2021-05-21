// 提示信息

import {
    addElementClass,
    createSingletonFunc,
    preventDefaultStopPropagation,
    removeElementClass
} from '../util/base';
import { setGuideLoadingFin } from './guide';
import {
    initHelp,
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
 * 初始化提示信息
 */
function initPrompt () {
    const promptIconWrapperElement = getPromptIconWrapperElement();
    promptIconWrapperElement.addEventListener('click', preventDefaultStopPropagation);
    promptIconWrapperElement.addEventListener('click', showHelp);
    promptIconWrapperElement.addEventListener('dblclick', preventDefaultStopPropagation);
    setGuideLoadingFin();
    initHelp();
}

export {
    addPrompt,
    initPrompt
};
