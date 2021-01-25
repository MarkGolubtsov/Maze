import {Maze, Point, walk} from './walk';

const X = false;
const _ = true;
const maze: Maze = [
    [X, X, X, X, X, X, X, X, X],
    [X, _, X, _, _, X, _, _, X],
    [X, _, X, X, _, X, _, X, X],
    [_, _, X, _, _, _, _, _, _],
    [X, _, X, _, X, _, X, X, X],
    [X, _, _, _, X, _, _, _, X],
    [X, X, X, X, X, X, X, X, X],
];

type path = Point[];

console.log(walk(maze, {x: 0, y: 3}));
//console.log(walkWave(maze, {x: 0, y: 3}));;
