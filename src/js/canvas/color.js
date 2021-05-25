// 颜色

const { defaultColor } = require('../config.json');

const {
    getLastColor,
    setLastColor
} = (function () {
    let lastColor = defaultColor;
    return {
        /**
         * 获取上次使用的颜色
         * @returns {string}
         */
        getLastColor: function () {
            return lastColor;
        },
        /**
         * 设置上次使用的颜色
         * @param {string} color 
         */
        setLastColor: function (color) {
            lastColor = color;
        }
    };
}());

export {
    getLastColor,
    setLastColor
};
