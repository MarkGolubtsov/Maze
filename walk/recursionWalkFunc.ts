import {Maze, Path, Point} from '../types';
import {NOT_PATH} from '../messages';
import {createMatrix, getEdgePoints} from '../utils';
import {AVAILABLE_STEP, steps} from '../steps';
import {validateMaze} from '../validators';

export function recursionWalkFunc(maze: Maze, start: Point): Path {
    validateMaze(maze, start);

    const width = maze[0].length;
    const height = maze.length;

    const visitedPoints: boolean[][] = createMatrix(width, height, false);
    const points: Point[] = [];

    const exitsPoints = getEdgePoints(maze).filter((point) => !(point.x === start.x && point.y === start.y));

    const recursiveSolve = (y: number, x: number) => {
        const isExitPoint = exitsPoints.find(point => (point.x === x && point.y === y));

        if (isExitPoint) {
            points.push({x, y});
            return true;
        }

        if (!maze[y][x] || visitedPoints[y][x]) {
            return false;
        }

        visitedPoints[y][x] = true;

        const leftPoint = steps[AVAILABLE_STEP.LEFT]({x, y}, width, height);
        if (leftPoint) {
            if (recursiveSolve(leftPoint.y, leftPoint.x)) {
                points.push({x, y});
                return true;
            }
        }

        const rightPoint = steps[AVAILABLE_STEP.RIGHT]({x, y}, width, height);
        if (rightPoint) {
            if (recursiveSolve(rightPoint.y, rightPoint.x)) {
                points.push({x, y});
                return true;
            }
        }

        const upPoint = steps[AVAILABLE_STEP.UP]({x, y}, width, height);
        if (rightPoint) {
            if (recursiveSolve(upPoint.y, upPoint.x)) {
                points.push({x, y});
                return true;
            }
        }

        const downPoint = steps[AVAILABLE_STEP.DOWN]({x, y}, width, height);
        if (downPoint) {
            if (recursiveSolve(downPoint.y, downPoint.x)) {
                points.push({x, y});
                return true;
            }
        }

        return false;
    }

    const hasExitPath = recursiveSolve(start.y, start.x);

    if (!hasExitPath) {
        throw new Error(NOT_PATH);
    }

    return points.reverse();
}

