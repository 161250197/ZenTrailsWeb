// 帮助信息

import {
    createSingletonFunc,
    hideElement,
    setElementEventUsed,
    showElement
} from '../util/base';
import { guidePromptArr } from './guide';

const __helpPromptNameOrder = [
    'beginNewPath',
    'addFollowDot',
    'closePresentPath',
    'startPlayCartoon',
    'resetCartoon',
    'chooseDot',
    'changeDotSetting',
    'addMoreFollowDot',
    'promptFin'
];

let __getHelpElement = createSingletonFunc(
    function () {
        return document.getElementById('help');
    },
    func => __getHelpElement = func
);

let __getHelpUlElement = createSingletonFunc(
    function () {
        return document.querySelector('#help .help-ul');
    },
    func => __getHelpUlElement = func
);

function __hideHelp () {
    hideElement(__getHelpElement());
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
    __getHelpUlElement().innerHTML =
        __helpPromptNameOrder
            .map(name => guidePromptArr[name])
            .map(prompt => `<li>${ prompt }</li>`)
            .join('\n');

    const helpElement = __getHelpElement();
    setElementEventUsed(helpElement);
    helpElement.addEventListener('click', __hideHelp);
}

export {
    showHelp,
    initHelp
};
