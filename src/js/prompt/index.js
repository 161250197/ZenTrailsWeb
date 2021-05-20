// 提示信息

import {
    addElementClass,
    createSingletonFunc,
    removeElementClass
} from '../util/base';

let getPromptContentElement = createSingletonFunc(
    function () {
        const promptWrapperElement = document.getElementById('prompt');
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
