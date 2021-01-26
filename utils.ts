import {Maze, Point} from './types';

export const getEdgePoints = (matrix: Maze): Point[] => {
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

export const createMatrix = (width: number, height: number, value?: any): boolean[][] => {
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

export const getMatrixCopy = (matrix: number[][]) => {
    return matrix.map(line => [...line]);
}