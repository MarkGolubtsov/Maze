import {recursionWalkFunc} from './walk/recursionWalkFunc';
import {waveWalkFunc} from './walk/waveWalkFunc';
import {Maze} from './types';

const X = false;
const _ = true;

const maze: Maze = [
    [X, _, X, X, X, X, X, X, X],
    [X, _, _, _, X, _, X, _, _],
    [X, _, X, _, X, _, X, _, X],
    [_, _, X, _, X, _, X, _, X],
    [X, _, X, _, X, _, X, _, X],
    [X, _, X, _, _, _, _, _, X],
    [X, X, X, X, X, X, X, X, X],
];

const START_POINT = {x: 0, y: 3};

const recExitPath = recursionWalkFunc(maze, START_POINT)
const waveExitPath = waveWalkFunc(maze, START_POINT);
