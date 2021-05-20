// 提示信息

import {
    addElementClass,
    createSingletonFunc,
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
        return getPromptWrapperElement().getElementsByClassName('content')[0];
    },
    func => getPromptContentElement = func
);

const setPrompt = (function () {
    const promptWrapperElement = getPromptWrapperElement();
    const promptContentElement = getPromptContentElement();
    const transparentClassName = 'transparent';
    const transitionTime = 500;
    let __timeoutId = undefined;
    return (prompt) => {
        if (__timeoutId === undefined)
        {
            addElementClass(promptWrapperElement, transparentClassName);
        } else
        {
            clearTimeout(__timeoutId);
        }
        __timeoutId = setTimeout(() => {
            promptContentElement.innerText = prompt;
            removeElementClass(promptWrapperElement, transparentClassName);
            __timeoutId = undefined;
        }, transitionTime);
    };
}());

/**
 * 设置加载完成提示信息
 */
function setPromptLoadingFin () {
    setPrompt('游戏加载完成！');
}

export {
    setPrompt,
    setPromptLoadingFin
};
