// 入口文件

import '../style/style.less';
import { initCanvas } from './canvas';
import { initCover } from './cover';
import { initCartoon } from './cartoon';
import {
    initPrompt,
    setPromptLoadFin
} from './prompt';
import { initPath } from './path';

initCanvas();
initCover();
initCartoon();
initPath();
initPrompt();
setPromptLoadFin();
