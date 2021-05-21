// 入口文件

import '../style/style.less';
import { initCanvasElement } from './canvas/element';
import { initDotSetting } from './cover/dot-setting';
import { initCover } from './cover';
import { initCartoon } from './cartoon';
import { initPrompt } from './prompt';

initCanvasElement();
initDotSetting();
initCover();
initCartoon();
initPrompt();
