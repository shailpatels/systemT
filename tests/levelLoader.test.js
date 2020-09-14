import {LevelLoader} from '../src/levelLoader.js';
import {stateManager} from '../src/stateManager.js';

var levels;
beforeEach(() => {
   levels = new LevelLoader();
   stateManager.init();
});


test('load level 1', () => {
    levels.loadLevel(1); 
});
