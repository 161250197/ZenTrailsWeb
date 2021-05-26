// 帮助信息

import {
    createSingletonFunc,
    hideElement,
    setElementEventUsed,
    showElement
} from '../util/base';
import { setGuideAfterCloseHelp } from './guide';

let __getHelpElement = createSingletonFunc(
    function () {
        return document.getElementById('help');
    },
    func => __getHelpElement = func
);

function __hideHelp () {
    hideElement(__getHelpElement());
    setGuideAfterCloseHelp();
}

/**
 * 显示帮助信息
 */
function showHelp () {
    showElement(__getHelpElement());
}

/**
 * 初始化帮助信息
 */
function initHelp () {
    const helpElement = __getHelpElement();
    setElementEventUsed(helpElement);
    helpElement.addEventListener('click', __hideHelp);
}

export {
    showHelp,
    initHelp
};
