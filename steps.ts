import {Point} from './types';

export enum AVAILABLE_STEP {
    UP = 'UP', DOWN = 'DOWN', LEFT = 'LEFT', RIGHT = 'RIGHT'
}

export interface Steps {
    [key: string]: (point: Point, width: number, height: number) => Point | undefined;
}

export const steps: Steps = {
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