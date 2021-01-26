import {validateMaze} from '../validators';
import {Maze, Path, Point} from '../types';
import {NOT_PATH} from '../messages';
import {getEdgePoints, getMatrixCopy} from '../utils';
import {steps} from '../steps';

const BLANK = 0;
const WALL = -1;

export function waveWalkFunc(maze: Maze, start: Point): Path {
    validateMaze(maze, start);

    const exitsPoints = getEdgePoints(maze).filter((point) => !(point.x === start.x && point.y === start.y));

    const matrix: number[][] = convertMazeToMatrix(maze);

    const matrixAfterWave = getMatrixAfterWave(start, matrix, exitsPoints);

    if (!isExitPathFound(matrixAfterWave, exitsPoints)) {
        throw new Error(NOT_PATH);
    }

    const nearestExitPoint = exitsPoints.find(({x, y}) => matrixAfterWave[y][x] !== BLANK);

    return getExitPathFromMatrix(nearestExitPoint, matrixAfterWave);
}

const getExitPathFromMatrix = (exitPoint: Point, matrix: number[][]): Path => {
    const width = matrix[0].length;
    const height = matrix.length;

    const path = [exitPoint];
    let weightExit = matrix[exitPoint.y][exitPoint.x];

    do {
        const previousPoint = path[0];
        Object.values(steps).forEach(getNextPoint => {
            const point = getNextPoint(previousPoint, width, height);
            if (point && (matrix[point.y][point.x] - weightExit === -1)) {
                path.unshift(point);
            }
        })
        weightExit--;
    } while (weightExit > 1);

    return path;
};

const getMatrixAfterWave = (start: Point, baseMatrix: number[][], exitsPoints: Point[]) => {
    const matrix = getMatrixCopy(baseMatrix);

    const width = matrix[0].length;
    const height = matrix.length;

    let waveWeight = 1;
    matrix[start.y][start.x] = waveWeight;

    let stop = true;

    do {
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (matrix[y][x] == waveWeight) {
                    Object.values(steps).forEach(getNextPoint => {
                        const point = getNextPoint({x, y}, width, height);
                        if (point && matrix[point.y][point.x] === BLANK) {
                            stop = false;
                            matrix[point.y][point.x] = waveWeight + 1;
                        }
                    })
                }
            }
        }
        waveWeight++;
    } while (!stop && !isExitPathFound(matrix, exitsPoints));

    return matrix;
}

const convertMazeToMatrix = (maze: Maze) => {
    return maze.map(line => {
        return line.map(element => {
            return element ? BLANK : WALL;
        })
    })
}

const isExitPathFound = (matrix: number[][], exitsPoints: Point[]) => {
    return exitsPoints.some(({x, y}) => matrix[y][x] !== BLANK);
}
