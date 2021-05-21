// 帮助信息

import {
    createSingletonFunc,
    hideElement,
    preventDefaultStopPropagation,
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

let getHelpElement = createSingletonFunc(
    function () {
        return document.getElementById('help');
    },
    func => getHelpElement = func
);

let getHelpUlElement = createSingletonFunc(
    function () {
        return document.querySelector('#help .help-ul');
    },
    func => getHelpUlElement = func
);

function hideHelp () {
    hideElement(getHelpElement());
}

/**
 * 显示帮助信息
 */
function showHelp () {
    showElement(getHelpElement());
}

/**
 * 初始化帮助信息
 */
function initHelp () {
    getHelpUlElement().innerHTML =
        __helpPromptNameOrder
            .map(name => guidePromptArr[name])
            .map(prompt => `<li>${ prompt }</li>`)
            .join('\n');

    const helpElement = getHelpElement();
    helpElement.addEventListener('click', preventDefaultStopPropagation);
    helpElement.addEventListener('click', hideHelp);
}

export {
    showHelp,
    initHelp
};
