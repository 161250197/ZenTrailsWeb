// 导出导入数据

import {
    setElementEventUsed,
    createSingletonFunc,
    hideElement,
    showElement,
    downloadFile
} from '../util/base';
import {
    setGuideAfterUploadData,
    setGuideAfterSaveData
} from '../prompt/guide';
import {
    getPathArr,
    setPathArr
} from '.';
import { refreshCanvas } from '../canvas';
import { Path } from './data-structure';

let __getDataUploadBtnElement = createSingletonFunc(
    function () {
        return document.getElementById('data-upload-btn');
    },
    func => __getDataUploadBtnElement = func
);

let __getDataSaveBtnElement = createSingletonFunc(
    function () {
        return document.getElementById('data-save-btn');
    },
    func => __getDataSaveBtnElement = func
);

const __uploadData = (function () {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.accept = '.ZenTrailsWeb';
    inputElement.addEventListener('change', function () {
        if (inputElement.files.length === 0)
        {
            return;
        }
        const file = inputElement.files[0];
        reader.readAsText(file);
    });

    const reader = new FileReader();
    reader.onload = function () {
        const pathArr = (function () {
            const __pathArr = [];
            const dataStr = __decodeFileContent(reader.result);
            const [
                idToFollowIdsStr,
                firstIdDotStr,
                followIdDotStr
            ] = dataStr.split('\n');
            const idToFollowIdsMap = (function () {
                const map = {};
                const idToFollowIdsArr = idToFollowIdsStr
                    .split(';')
                    .map(str => {
                        const [id, followIdsStr] = str.split(' ');
                        const followIds = followIdsStr.split(',');
                        return { id, followIds };
                    });
                for (const { id, followIds } of idToFollowIdsArr)
                {
                    map[id] = followIds;
                }
                return map;
            }());
            const firstIdDotArr = firstIdDotStr
                .split(';')
                .map(str => {
                    const [id, xValue, yValue] = str.split(' ');
                    const x = Number(xValue);
                    const y = Number(yValue);
                    const path = new Path({ x, y });
                    __pathArr.push(path);
                    return { id, dot: path.firstDot };
                });
            const idToFollowDotDataMap = (function () {
                const map = {};
                const idToFollowDataArr = followIdDotStr
                    .split(';')
                    .map(str => {
                        const [id, xValue, yValue, angleVelocityValue, isAntiClockwiseValue, color] = str.split(' ');
                        const x = Number(xValue);
                        const y = Number(yValue);
                        const angleVelocity = Number(angleVelocityValue);
                        const isAntiClockwise = !!isAntiClockwiseValue;
                        return { id, x, y, angleVelocity, isAntiClockwise, color };
                    });
                for (const { id, x, y, angleVelocity, isAntiClockwise, color } of idToFollowDataArr)
                {
                    map[id] = { x, y, angleVelocity, isAntiClockwise, color };
                }
                return map;
            }());
            let idDotArr = firstIdDotArr;
            while (idDotArr.length)
            {
                let newIdDotArr = [];
                for (const { id, dot } of idDotArr)
                {
                    const followIds = idToFollowIdsMap[id];
                    if (followIds)
                    {
                        for (const followId of followIds)
                        {
                            const { x, y, angleVelocity, isAntiClockwise, color } = idToFollowDotDataMap[followId];
                            const followDot = dot.appendDot({ x, y });
                            followDot.angleVelocity = angleVelocity;
                            followDot.isAntiClockwise = isAntiClockwise;
                            followDot.color = color;
                            newIdDotArr.push({ id: followId, dot: followDot });
                        }
                    }
                }
                idDotArr = newIdDotArr;
            }
            return __pathArr;
        }());
        setPathArr(pathArr);
        refreshCanvas();
        setGuideAfterUploadData();
    };
    return function () {
        inputElement.click();
    };
}());

function __saveData () {
    const dataStr = (function () {
        const {
            createFirstIdDot,
            createFollowIdDot,
            getFirstIdDotArr,
            getFollowIdDotArr
        } = (function () {
            let id = 0;
            const firstIdDotArr = [];
            const followIdDotArr = [];
            return {
                createFirstIdDot: function (dot) {
                    const idDot = { id, dot };
                    firstIdDotArr.push(idDot);
                    id++;
                    return idDot;
                },
                getFirstIdDotArr: function () {
                    return firstIdDotArr;
                },
                createFollowIdDot: function (dot) {
                    const idDot = { id, dot };
                    followIdDotArr.push(idDot);
                    id++;
                    return idDot;
                },
                getFollowIdDotArr: function () {
                    return followIdDotArr;
                }
            };
        }());
        const idToFollowIdsArr = (function () {
            const __idToFollowIdsArr = [];
            const pathArr = getPathArr();
            let idDotArr = pathArr.map(({ firstDot }) => createFirstIdDot(firstDot));
            while (idDotArr.length)
            {
                let newIdDotArr = [];
                for (const { dot, id } of idDotArr)
                {
                    const followIdDotArr = dot.followDots.map(createFollowIdDot);
                    __idToFollowIdsArr.push({
                        id,
                        followIds: followIdDotArr.map(({ id }) => id)
                    });
                    newIdDotArr = newIdDotArr.concat(followIdDotArr);
                }
                idDotArr = newIdDotArr;
            }
            return __idToFollowIdsArr;
        }());
        const idToFollowIdsStr = (function () {
            let idToFollowIdsStrArr = [];
            for (const { id, followIds } of idToFollowIdsArr)
            {
                if (followIds.length)
                {
                    idToFollowIdsStrArr.push(`${ id } ${ followIds.join(',') }`);
                }
            }
            return idToFollowIdsStrArr.join(';');
        }());
        const firstIdDotStr = (function () {
            return getFirstIdDotArr()
                .map(({ id, dot }) => {
                    const { x, y } = dot;
                    return `${ id } ${ x } ${ y }`;
                })
                .join(';');
        }());
        const followIdDotStr = (function () {
            return getFollowIdDotArr()
                .map(({ id, dot }) => {
                    const { x, y, angleVelocity, isAntiClockwise, color } = dot;
                    return `${ id } ${ x } ${ y } ${ angleVelocity } ${ isAntiClockwise ? '1' : '' } ${ color }`;
                })
                .join(';');
        }());
        return [
            idToFollowIdsStr,
            firstIdDotStr,
            followIdDotStr
        ].join('\n');
    }());
    downloadFile('data.ZenTrailsWeb', __encodeDataStr(dataStr));
    setGuideAfterSaveData();
}

function __decodeFileContent (content) {
    return decodeURIComponent(content);
}

function __encodeDataStr (dataStr) {
    return `data:text/plain;base64,${ btoa(encodeURIComponent(dataStr)) }`;
}

/**
 * 隐藏数据导出节点
 */
function hideDataSaveBtnElement () {
    hideElement(__getDataSaveBtnElement());
}

/**
 * 隐藏数据导入节点
 */
function hideDataUploadBtnElement () {
    hideElement(__getDataUploadBtnElement());
}

const {
    enableSaveData,
    showDataSaveBtnElement
} = (function () {
    let saveDataEnabled = false;
    return {
        enableSaveData: function () {
            saveDataEnabled = true;
        },
        showDataSaveBtnElement: function () {
            if (saveDataEnabled)
            {
                showElement(__getDataSaveBtnElement());
            }
        }
    };
}());

const {
    enableUploadData,
    showDataUploadBtnElement
} = (function () {
    let saveDataEnabled = false;
    return {
        enableUploadData: function () {
            saveDataEnabled = true;
        },
        showDataUploadBtnElement: function () {
            if (saveDataEnabled)
            {
                showElement(__getDataUploadBtnElement());
            }
        }
    };
}());

/**
 * 初始化导出导入数据
 */
function initDataSaveUpload () {
    const dataUploadBtnElement = __getDataUploadBtnElement();
    setElementEventUsed(dataUploadBtnElement);
    dataUploadBtnElement.addEventListener('click', __uploadData);

    const dataSaveBtnElement = __getDataSaveBtnElement();
    setElementEventUsed(dataSaveBtnElement);
    dataSaveBtnElement.addEventListener('click', __saveData);
}

export {
    enableSaveData,
    enableUploadData,
    hideDataSaveBtnElement,
    showDataSaveBtnElement,
    hideDataUploadBtnElement,
    showDataUploadBtnElement,
    initDataSaveUpload
};
