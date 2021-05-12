// 入口文件

import '../style/style.less';
import { initCanvasManager } from './util/canvas-manager';
import { initCoverManager } from './util/cover-manager';
import { initDotSetting } from './util/dot-setting';

initCanvasManager();
initDotSetting();
initCoverManager();
