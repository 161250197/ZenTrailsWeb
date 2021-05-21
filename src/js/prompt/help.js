// 帮助信息

import {
    createSingletonFunc,
    hideElement,
    showElement
} from '../util/base';

const helpPromptArr = {
    loadingFin: '游戏加载完成！',
    beginNewPath: '通过 双击 空白区域开启新路径吧！',
    addFollowDot: '通过 单击 可以增加后续节点！',
    closePresentPath: '通过 右击 可以结束当前路径！',
    startPlayCartoon: '点击 左下角 播放按钮就可以开始播放动画啦 (<ゝω•)~☆ ',
    resetCartoon: '点击 左下角 重置按钮可以返回编辑节点！',
    chooseDot: '通过 点击 节点就可以修改节点信息！',
    changeDotSetting: '操作 右下角 面板就可以修改节点信息啦！',
    addMoreFollowDot: '通过 单击 也可以继续增加后续节点啦！',
    promptFin: '你已经学会所有的基本操作啦，开启你的 ZenTrailsWeb 之旅吧！',
    helpWanted: '← 需要帮忙可以点击这里查看帮助信息',
    emptyPrompt: '',
    helpPromptNameOrder: [
        'beginNewPath',
        'addFollowDot',
        'closePresentPath',
        'startPlayCartoon',
        'resetCartoon',
        'chooseDot',
        'changeDotSetting',
        'addMoreFollowDot',
        'promptFin'
    ]
};

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
        helpPromptArr.helpPromptNameOrder
            .map(name => helpPromptArr[name])
            .map(prompt => `<li>${ prompt }</li>`)
            .join('\n');
    getHelpElement().addEventListener('click', hideHelp);
}

export {
    helpPromptArr,
    showHelp,
    initHelp
};
