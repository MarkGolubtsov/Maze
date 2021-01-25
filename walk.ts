export type Maze = boolean[][];

export interface Point {
    x: number,
    y: number
}

export type Path = Point[];

const START_POINT_NOT_AT_THE_EDGE = "Start point isn't at the edge.";
const START_POINT_NOT_VALID = "Start point is wall!";
const INVALID_LINE_SIZE = "Invalid maze. Line size aren't equals.";
const NOT_PATH = "There isn't path.";

enum AVAILABLE_STEP {
    UP = 'UP', DOWN = 'DOWN', LEFT = 'LEFT', RIGHT = 'RIGHT'
}

interface Steps {
    [key: string]: (point: Point, width: number, height: number) => Point | undefined;
}

const steps: Steps = {
    [AVAILABLE_STEP.UP]: ({x, y}) => {
        if (y != 0) {
            return {x, y: y - 1}
        }
    },
    [AVAILABLE_STEP.DOWN]: ({x, y}, width, height) => {
        if (y != height - 1) {
            return {x, y: y + 1}
        }
    },
    [AVAILABLE_STEP.LEFT]: ({x, y}) => {
        if (x != 0) {
            return {x: x - 1, y}
        }
    },
    [AVAILABLE_STEP.RIGHT]: ({x, y}, width) => {
        if (x != width - 1) {
            return {x: x + 1, y}
        }
    }
};

export function walk(maze: Maze, start: Point): Path {
    if (!isPointAtTheEdge(start)) {
        throw new Error(START_POINT_NOT_AT_THE_EDGE);
    }

    if (!maze[start.y][start.x]) {
        throw new Error(START_POINT_NOT_VALID);
    }

    if (!isValidMazeSize(maze)) {
        throw new Error(INVALID_LINE_SIZE)
    }

    const width = maze[0].length;
    const height = maze.length;

    const visitedPoints: boolean[][] = createMatrix(width, height, false);
    const points: Point[] = [];

    const edgePoints = getEdgePoints(maze).filter((point) => !(point.x === start.x && point.y === start.y));

    const recursiveSolve = (y: number, x: number) => {
        const isEdgePoint = edgePoints.find(point => (point.x === x && point.y === y));
        if (isEdgePoint) {
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

    const hasPath = recursiveSolve(start.y, start.x);

    if (!hasPath) {
        throw new Error(NOT_PATH);
    }

    return points.reverse();
}

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

const getEdgePoints = (matrix: Maze): Point[] => {
    const width = matrix[0].length;
    const height = matrix.length;
    const points = [];
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (matrix[y][x]) {
                if ((y === 0 || y === height - 1)) {
                    points.push({x, y});
                } else {
                    if (x === 0 || x === width - 1) {
                        points.push({x, y});
                    }
                }
            }

        }
    }
    return points;
}

const createMatrix = (width: number, height: number, value?: any): boolean[][] => {
    const arr = [];
    while (arr.length < height) {
        arr.push([]);
    }
    return arr.map((line) => {
        while (line.length < width) {
            line.push(value);
        }
        return line;
    });
};

