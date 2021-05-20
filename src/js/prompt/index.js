// 提示信息

import { createSingletonFunc } from '../util/base';


let getPromptContent = createSingletonFunc(
    function () {
        const promptElement = document.getElementById('prompt');
        return promptElement.getElementsByClassName('content')[0];
    },
    func => getPromptContent = func
);

function setPrompt (prompt) {
    getPromptContent().innerText = prompt;
}

export {
    setPrompt
};
