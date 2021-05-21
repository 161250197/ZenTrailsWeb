// 帮助信息

import {
    createSingletonFunc,
    hideElement,
    setElementEventUsed,
    showElement
} from '../util/base';

const __createHelpPromtsUlElementStr = function () {
    const helpPrompts = [
        {
            prompt: '通过 双击 空白区域可以开启新路径：',
            subPrompts: [
                '通过 单击 可以增加后续节点；',
                '通过 右击 可以结束当前路径。'
            ]
        },
        {
            prompt: '点击 左下角 播放按钮可以开始播放动画：',
            subPrompts: [
                '点击 左下角 重置按钮可以返回编辑节点；'
            ]
        },
        {
            prompt: '通过 点击 可以选择节点，修改节点信息：',
            subPrompts: [
                '通过 右下角 面板就可以修改节点信息；',
                '通过 单击 可以继续增加后续节点；'
            ]
        },
        '祝你有一段快乐的 ZenTrailsWeb 之旅！'
    ];

    function createPromptLiElement (promptData) {
        if (promptData === undefined)
        {
            return '';
        }
        if (typeof (promptData) === 'string')
        {
            return `<li>${ promptData }</li>`;
        }
        if (promptData instanceof Object)
        {
            const { prompt, subPrompts } = promptData;
            return `<li>\n${ prompt }\n${ createSubPromptUlElement(subPrompts) }\n</li>`;
        }
    }

    function createSubPromptUlElement (subPrompts) {
        const subPromptLiElementsStr = subPrompts.map(prompt => `<li>${ prompt }</li>`).join('\n');
        return `<ul>${ subPromptLiElementsStr }</ul>`;
    }

    return helpPrompts
        .map(createPromptLiElement)
        .join('\n');
};

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
    __getHelpUlElement().innerHTML = __createHelpPromtsUlElementStr();

    const helpElement = __getHelpElement();
    setElementEventUsed(helpElement);
    helpElement.addEventListener('click', __hideHelp);
}

export {
    showHelp,
    initHelp
};
