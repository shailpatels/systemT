import {LevelLoader} from '../src/levelLoader.js';


var levels;
beforeEach(() => {
   levels = new LevelLoader();
});


test('load level 1', () => {
    levels.loadLevel(1); 
});
