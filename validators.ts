import {Maze, Point} from './types';
import {INVALID_LINE_SIZE, NOT_PATH, START_POINT_NOT_AT_THE_EDGE, START_POINT_NOT_VALID} from './messages';
import {getEdgePoints} from './utils';


const isPointAtTheEdge = (point: Point): boolean => {
    return !point.x || !point.y;
}

const isValidMazeSize = (maze: Maze) => {
    if (!maze.length) {
        return false;
    }
    const sizeY = maze[0].length;
    return maze.every((line) => line.length === sizeY);
}

const existExit = (maze: Maze) => {
    return getEdgePoints(maze).length > 1;
}

export const validateMaze = (maze: Maze, start: Point) => {
    if (!isPointAtTheEdge(start)) {
        throw new Error(START_POINT_NOT_AT_THE_EDGE);
    }

    if (!maze[start.y][start.x]) {
        throw new Error(START_POINT_NOT_VALID);
    }

    if (!isValidMazeSize(maze)) {
        throw new Error(INVALID_LINE_SIZE)
    }

    if (!existExit(maze)) {
        throw new Error(NOT_PATH);
    }
}